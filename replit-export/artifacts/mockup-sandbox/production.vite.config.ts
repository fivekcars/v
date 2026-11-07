import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const siteRoot = path.resolve(import.meta.dirname, "vixscan-site");
const outputDirectory = path.resolve(
  import.meta.dirname,
  "../furness-vehicle-insight/dist",
);

export default defineConfig({
  root: siteRoot,
  base: "./",
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: outputDirectory,
    emptyOutDir: true,
  },
});
