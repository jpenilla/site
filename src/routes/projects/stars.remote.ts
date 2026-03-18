import { getRequestEvent, query } from "$app/server";
import { fetchProjectGitHubStars } from "$lib/server/github-stars";

export const getProjectGitHubStars = query(async () => {
  const { fetch, platform, url } = getRequestEvent();
  return fetchProjectGitHubStars(fetch, url.origin, platform?.caches);
});
