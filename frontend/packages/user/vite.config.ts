import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  // API 서버 설정 목록
  const apiServers = [
    { path: "/user-api", envKey: "VITE_USER_API", name: "User" },
    { path: "/sub-api", envKey: "VITE_SUB_API", name: "Subscription" },
    { path: "/admin-api", envKey: "VITE_ADMIN_API", name: "Admin" },
  ];

  // proxy 설정 생성
  const proxyConfig = apiServers.reduce((acc, { path, envKey, name }) => {
    acc[path] = {
      target: env[envKey],
      changeOrigin: true,
      rewrite: (p: string) => p.replace(new RegExp(`^${path}`), "/api"),
      configure: (proxy: any) => {
        proxy.on("error", (err: Error, req: any, res: any) => {
          console.error(`❌ [Proxy Error][${name}]: ${err.message}`);
          res.writeHead(502, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: `${name} 서버에 연결할 수 없습니다.` })
          );
        });
      },
    };
    return acc;
  }, {} as Record<string, any>);

  return defineConfig({
    plugins: [react()],
    server: {
      host: env.VITE_FRONTEND_HOST || "0.0.0.0",
      port: Number(env.VITE_FRONTEND_PORT) || 5173,
      strictPort: true,
      hmr: { host: "localhost" },
      proxy: proxyConfig,
    },
  });
};
