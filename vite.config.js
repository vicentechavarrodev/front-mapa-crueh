import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_EXTRANET_URL,
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
  });
};
