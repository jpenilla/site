import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { projectGroups } from "$lib/projects";
import type { CacheStorage, Response as CloudflareResponse } from "@cloudflare/workers-types";

interface GitHubUser {
  repos_url: string;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
}

interface CloudflareFetchInit extends RequestInit {
  cf?: {
    cacheEverything?: boolean;
    cacheTtl?: number;
    cacheTtlByStatus?: Record<string, number>;
  };
}

export type GitHubStars = Record<string, number | null>;

const GITHUB_API_HEADERS = {
  accept: "application/vnd.github+json",
  "user-agent": "jpenilla-site",
};

const GITHUB_STARS_CACHE_TTL_MS = 1000 * 60 * 15;
const GITHUB_STARS_CACHE_PATH = "/__cache/github-stars/projects";

class GitHubRateLimitError extends Error {
  constructor(url: string, status: number, statusText: string) {
    super(`GitHub rate limited request for ${url}: ${status} ${statusText}`);
  }
}

export async function fetchProjectGitHubStars(
  fetchFn: typeof fetch,
  requestOrigin: string,
  cacheStorage?: CacheStorage,
): Promise<GitHubStars> {
  const cachedStars = await readCachedProjectGitHubStars(requestOrigin, cacheStorage);
  if (cachedStars) {
    return cachedStars;
  }

  const githubStars: GitHubStars = {};
  const reposByOwner = new Map<string, Set<string>>();

  for (const group of projectGroups) {
    for (const project of group.projects) {
      const fullName = `${project.githubOwner}/${project.githubRepo}`;
      githubStars[fullName] = null;

      let repos = reposByOwner.get(project.githubOwner);
      if (!repos) {
        repos = new Set<string>();
        reposByOwner.set(project.githubOwner, repos);
      }
      repos.add(project.githubRepo);
    }
  }

  await Promise.all(
    [...reposByOwner.entries()].map(async ([owner, repoNames]) => {
      const ownerStars = createOwnerStarsRecord(repoNames);

      try {
        const ownerInfo = await fetchGitHubJson<GitHubUser>(fetchFn, `https://api.github.com/users/${owner}`);
        const repos = await fetchGitHubPages<GitHubRepo>(
          fetchFn,
          withSearchParams(ownerInfo.repos_url, { per_page: "100", type: "owner" }),
        );

        for (const repo of repos) {
          if (repoNames.has(repo.name)) {
            ownerStars[repo.name] = repo.stargazers_count;
          }
        }

        assignOwnerStars(githubStars, owner, ownerStars);
      } catch (error) {
        if (error instanceof GitHubRateLimitError && dev) {
          const fallbackStars = createOwnerStarsRecord(repoNames, 42);
          assignOwnerStars(githubStars, owner, fallbackStars);
          return;
        }

        console.warn(`Failed to fetch GitHub stars for ${owner}`, error);
      }
    }),
  );

  await writeGitHubStarsCache(requestOrigin, cacheStorage, githubStars);
  return githubStars;
}

export async function readCachedProjectGitHubStars(
  requestOrigin: string,
  cacheStorage?: CacheStorage,
): Promise<GitHubStars | null> {
  const cache = cacheStorage?.default;
  if (!cache) {
    return null;
  }

  const response = await cache.match(gitHubStarsCacheKey(requestOrigin));
  if (!response) {
    return null;
  }

  return (await response.json()) as GitHubStars;
}

async function fetchGitHubJson<T>(fetchFn: typeof fetch, url: string): Promise<T> {
  const response = await fetchFn(url, gitHubFetchInit());
  if (!response.ok) {
    await throwGitHubRequestError(response, url);
  }
  return (await response.json()) as T;
}

async function fetchGitHubPages<T>(fetchFn: typeof fetch, initialUrl: string): Promise<T[]> {
  const items: T[] = [];
  let nextUrl: string | null = initialUrl;

  while (nextUrl) {
    const response = await fetchFn(nextUrl, gitHubFetchInit());
    if (!response.ok) {
      await throwGitHubRequestError(response, nextUrl);
    }

    items.push(...((await response.json()) as T[]));
    nextUrl = nextLink(response.headers.get("link"));
  }

  return items;
}

async function throwGitHubRequestError(response: Response, url: string): Promise<never> {
  const responseText = await response.text();

  if (isGitHubRateLimited(response, responseText)) {
    throw new GitHubRateLimitError(url, response.status, response.statusText);
  }

  throw new Error(`GitHub request failed for ${url}: ${response.status} ${response.statusText}`);
}

function gitHubFetchInit(): CloudflareFetchInit {
  const headers = new Headers(GITHUB_API_HEADERS);
  if (env.GITHUB_TOKEN) {
    headers.set("authorization", `Bearer ${env.GITHUB_TOKEN}`);
  }

  return {
    headers,
    cf: {
      cacheEverything: true,
      cacheTtl: 60 * 60 * 6,
      cacheTtlByStatus: {
        "200-299": 60 * 60 * 24,
        "404": 60 * 60,
        "500-599": 0,
      },
    },
  };
}

function isGitHubRateLimited(response: Response, responseText: string): boolean {
  if (response.status === 429) {
    return true;
  }

  if (response.status !== 403) {
    return false;
  }

  if (response.headers.get("x-ratelimit-remaining") === "0") {
    return true;
  }

  return responseText.toLowerCase().includes("rate limit");
}

function createOwnerStarsRecord(
  repoNames: Iterable<string>,
  fallbackStars: number | null = null,
): Record<string, number | null> {
  const starsByRepo: Record<string, number | null> = {};
  for (const repoName of repoNames) {
    starsByRepo[repoName] = fallbackStars;
  }
  return starsByRepo;
}

function assignOwnerStars(githubStars: GitHubStars, owner: string, starsByRepo: Record<string, number | null>): void {
  for (const [repoName, stars] of Object.entries(starsByRepo)) {
    githubStars[`${owner}/${repoName}`] = stars;
  }
}

async function writeGitHubStarsCache(
  requestOrigin: string,
  cacheStorage: CacheStorage | undefined,
  githubStars: GitHubStars,
): Promise<void> {
  const cache = cacheStorage?.default;
  if (!cache) {
    return;
  }

  await cache.put(
    gitHubStarsCacheKey(requestOrigin),
    new Response(JSON.stringify(githubStars), {
      headers: {
        "cache-control": `max-age=${Math.floor(GITHUB_STARS_CACHE_TTL_MS / 1000)}`,
        "content-type": "application/json",
      },
    }) as unknown as CloudflareResponse,
  );
}

function gitHubStarsCacheKey(requestOrigin: string): string {
  return new URL(GITHUB_STARS_CACHE_PATH, requestOrigin).toString();
}

function nextLink(linkHeader: string | null): string | null {
  if (!linkHeader) {
    return null;
  }

  for (const part of linkHeader.split(",")) {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match?.[2] === "next") {
      return match[1];
    }
  }

  return null;
}

function withSearchParams(url: string, params: Record<string, string>): string {
  const urlObj = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    urlObj.searchParams.set(key, value);
  }
  return urlObj.toString();
}
