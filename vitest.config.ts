import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // environment: 'jsdom',
    environment: "happy-dom",
    exclude: ["e2e/**", "node_modules"],
    setupFiles: ["/test/setup.ts"],
  },
});
