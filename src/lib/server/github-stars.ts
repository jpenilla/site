import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { projectGroups } from "$lib/projects";

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

const DEV_GITHUB_STARS_CACHE_TTL_MS = 1000 * 60 * 15;

interface DevGitHubStarsCacheEntry {
  expiresAt: number;
  starsByRepo: Record<string, number | null>;
}

class GitHubRateLimitError extends Error {
  constructor(url: string, status: number, statusText: string) {
    super(`GitHub rate limited request for ${url}: ${status} ${statusText}`);
  }
}

export async function fetchProjectGitHubStars(fetchFn: typeof fetch): Promise<GitHubStars> {
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
      const cachedStars = readDevGitHubStarsCache(owner, repoNames);
      if (cachedStars) {
        assignOwnerStars(githubStars, owner, cachedStars);
        return;
      }

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
        writeDevGitHubStarsCache(owner, ownerStars);
      } catch (error) {
        if (error instanceof GitHubRateLimitError && dev) {
          const fallbackStars = createOwnerStarsRecord(repoNames, 42);
          assignOwnerStars(githubStars, owner, fallbackStars);
          writeDevGitHubStarsCache(owner, fallbackStars);
          return;
        }

        console.warn(`Failed to fetch GitHub stars for ${owner}`, error);
      }
    }),
  );

  return githubStars;
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

function readDevGitHubStarsCache(owner: string, repoNames: Set<string>): Record<string, number | null> | null {
  const cache = getDevGitHubStarsCache();
  const entry = cache?.get(owner);
  if (!entry || entry.expiresAt <= Date.now()) {
    cache?.delete(owner);
    return null;
  }

  for (const repoName of repoNames) {
    if (!(repoName in entry.starsByRepo)) {
      return null;
    }
  }

  return entry.starsByRepo;
}

function writeDevGitHubStarsCache(owner: string, starsByRepo: Record<string, number | null>): void {
  const cache = getDevGitHubStarsCache();
  if (!cache) {
    return;
  }

  cache.set(owner, {
    expiresAt: Date.now() + DEV_GITHUB_STARS_CACHE_TTL_MS,
    starsByRepo,
  });
}

function getDevGitHubStarsCache(): Map<string, DevGitHubStarsCacheEntry> | null {
  if (!dev) {
    return null;
  }

  const globalScope = globalThis as typeof globalThis & {
    __devGitHubStarsCache?: Map<string, DevGitHubStarsCacheEntry>;
  };

  globalScope.__devGitHubStarsCache ??= new Map<string, DevGitHubStarsCacheEntry>();
  return globalScope.__devGitHubStarsCache;
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
