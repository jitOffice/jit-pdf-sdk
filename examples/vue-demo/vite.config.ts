import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^jit-pdf\/styles\.css$/,
        replacement: resolve(__dirname, "../../dist/style.css")
      },
      {
        find: /^jit-pdf$/,
        replacement: resolve(__dirname, "../../dist/index.js")
      }
    ]
  }
});
