import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  test: {
    // environment: 'jsdom',
    environment: "happy-dom",
    exclude: ["e2e/**", "node_modules"],
    setupFiles: ["/test/setup.ts"],
  },
});
