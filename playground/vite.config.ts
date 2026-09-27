import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
    exclude: ['maplibre-gl']
  },
    resolve: {
        alias: {
            battleforge: path.resolve(__dirname, "../src"),
            react: path.resolve(__dirname, "./node_modules/react"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
        },
    },
});