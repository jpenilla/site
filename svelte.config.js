import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import rehypeExternalLinks from "rehype-external-links";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const cwd = dirname(fileURLToPath(import.meta.url));

const mdsvexConfig = {
  layout: join(cwd, "./src/lib/components/MarkdownWrapper.svelte"),
  rehypePlugins: [
    [
      rehypeExternalLinks,
      {
        target: "_blank",
        rel: ["noopener", "noreferrer"],
      },
    ],
  ],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svx"],
  preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
  kit: {
    experimental: {
      remoteFunctions: true,
    },
    adapter: adapter({
      config: "wrangler.jsonc",
      platformProxy: {
        configPath: "wrangler.jsonc",
        environment: undefined,
        persist: undefined,
      },
      fallback: "plaintext",
    }),
  },
};

export default config;
