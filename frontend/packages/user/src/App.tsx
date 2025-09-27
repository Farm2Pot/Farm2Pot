import React, { useState } from "react";
import { userApi, adminApi, subscriptionApi, coreApi } from "./api/apiClient";

export default function App() {
  const [message, setMessage] = useState<string>("");

  const handleTest = async (api: any, path: string) => {
    try {
      const data = await api.get(`${path}/health`);
      setMessage(`${api.name} 테스트 성공`);
      console.log(data);
    } catch (err: any) {
      setMessage(err?.message ?? "알 수 없는 오류");
    }
  };

  return (
    <div>
      <h2>Bizwell</h2>
      <button onClick={() => handleTest(userApi, "/user")}>User Test</button>
      <button onClick={() => handleTest(adminApi, "/admin")}>Admin Test</button>
      <button onClick={() => handleTest(subscriptionApi, "/subscription")}>
        Subscription Test
      </button>
      <button onClick={() => handleTest(coreApi, "/core")}>Core Test</button>
      <div>{message}</div>
    </div>
  );
}
