import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/49-50-toast-library",
  test: {
    // globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.js",
  },
});
