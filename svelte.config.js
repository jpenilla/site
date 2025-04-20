import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import rehypeExternalLinks from "rehype-external-links";

const mdsvexConfig = {
  layout: "src/lib/components/MarkdownWrapper.svelte",
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
    adapter: adapter({
      config: undefined,
      platformProxy: {
        configPath: undefined,
        environment: undefined,
        persist: undefined,
      },
      fallback: "plaintext",
      routes: {
        include: ["/*"],
        exclude: ["<all>"],
      },
    }),
  },
};

export default config;
