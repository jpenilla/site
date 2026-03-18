import type { PageServerLoad } from "./$types";
import { readCachedProjectGitHubStars } from "$lib/server/github-stars";

export const load: PageServerLoad = async ({ platform, url }) => {
  return {
    cachedGitHubStars: await readCachedProjectGitHubStars(url.origin, platform?.caches),
  };
};
