import { defineConfig } from "vite";
import path from "path";

// API build configuration for Vercel serverless functions
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "api/index.ts"),
      name: "api",
      fileName: "index",
      formats: ["es"],
    },
    outDir: "api",
    target: "node20",
    ssr: true,
    rollupOptions: {
      external: [
        // Node.js built-ins
        "fs",
        "path",
        "url",
        "http",
        "https",
        "os",
        "crypto",
        "stream",
        "util",
        "events",
        "buffer",
        "querystring",
        "child_process",
        // External dependencies
        "express",
        "cors",
        "dotenv",
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs",
      },
    },
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
