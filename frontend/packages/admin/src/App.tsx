import { useState } from "react";
import {
  adminApi,
  coreApi,
  subscriptionApi,
  userApi,
} from "../../core/src/api/apiClient.js";

function App() {
  const [response, setResponse] = useState<string>("");

  const handleCheckHealth = async (api: any, path: string) => {
    try {
      // user-service 헬스체크 API 호출
      const data = await api.get<string>(path);
      setResponse(`✅ 성공: ${data}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResponse(`❌ 실패: ${err.message}`);
      } else {
        setResponse("❌ 알 수 없는 오류 발생");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Service Health Check</h1>
      <button onClick={() => handleCheckHealth(userApi, "user/health")}>
        Check User Health
      </button>
      <button onClick={() => handleCheckHealth(adminApi, "admin/health")}>
        Check Admin Health
      </button>
      <button
        onClick={() =>
          handleCheckHealth(subscriptionApi, "subscription/health")
        }
      >
        Check Sub Health
      </button>
      <button onClick={() => handleCheckHealth(coreApi, "core/health")}>
        Check Core Health
      </button>
      {response && (
        <div style={{ marginTop: "10px" }}>
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default App;
