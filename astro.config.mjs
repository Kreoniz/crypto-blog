import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

import mdx from "@astrojs/mdx";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    mdx({
      syntaxHighlight: "prism",
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathjax],
    }),
  ],
});
