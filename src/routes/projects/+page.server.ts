import type { PageServerLoad } from "./$types";
import { readCachedProjectGitHubStars } from "$lib/server/github-stars";

export const load: PageServerLoad = async ({ platform }) => {
  return {
    cachedGitHubStars: await readCachedProjectGitHubStars(platform?.caches),
  };
};
