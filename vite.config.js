import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_BASE_TRACCAR_URL,
          secure: false,
        },
        "/api/session": {
          changeOrigin: true,
          target: env.VITE_BASE_TRACCAR_URL,
          secure: false,
        },
        "/api/socket": {
          changeOrigin: true,
          target: env.VITE_WS_TRACCAR_URL,
          ws: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
