import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiTarget =
  process.env.LOCAL_LISTS_API_TARGET || "http://localhost:3001";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": apiTarget,
    },
  },
  build: {
    sourcemap: true, // <-- This enables source maps for production builds
  },
});
