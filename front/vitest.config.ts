import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [vue() as any],
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    typecheck: {
      tsconfig: "./tsconfig.vitest.json",
    },
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
