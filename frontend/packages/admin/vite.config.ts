import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const makeProxy = (target: string, apiPrefix: string) => ({
    target,
    changeOrigin: true,
    rewrite: (path: string) =>
      path.replace(new RegExp(`^/${apiPrefix}`), "/api"),
    configure: (proxy: any) => {
      proxy.on("error", (_err: any, _req: any, res: any) => {
        console.error(`[Proxy Error][${apiPrefix}]`, _err?.message ?? _err);
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: `${apiPrefix} 서버에 연결할 수 없습니다.` })
        );
      });
    },
  });

  return defineConfig({
    plugins: [react()],
    server: {
      host: env.VITE_FRONTEND_HOST || "0.0.0.0",
      port: Number(env.VITE_FRONTEND_PORT) || 5173,
      strictPort: true,
      proxy: {
        "/user-api": makeProxy(
          env.VITE_USER_API || "http://localhost:28081",
          "user-api"
        ),
        "/sub-api": makeProxy(
          env.VITE_SUB_API || "http://localhost:28083",
          "sub-api"
        ),
        "/admin-api": makeProxy(
          env.VITE_ADMIN_API || "http://localhost:28082",
          "admin-api"
        ),
        "/core-api": makeProxy(
          env.VITE_CORE_API || "http://localhost:28080",
          "core-api"
        ),
      },
    },
  });
};
