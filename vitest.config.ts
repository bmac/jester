import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "happy-dom",
    exclude: ["e2e/**", "node_modules"],
    setupFiles: ["/test/setup.ts"],
  },
});
