import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VIX-SCAN is a static site deployed to the domain root (https://vix-scan.co.uk/).
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: false,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
