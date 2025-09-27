// apiClient.ts
import axios from "axios";
import type { AxiosInstance } from "axios";

/**
 * 공통 Axios Wrapper
 * client: axios instance
 * name: 서버 이름 (User, Admin, Subscription, Core)
 */
class ApiClient {
  private client: AxiosInstance;
  private name: string;

  constructor(baseURL: string, name: string) {
    this.client = axios.create({ baseURL, timeout: 5000 });
    this.name = name;
  }

  async get<T = any>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.client.get(path, config);
      return res.data;
    } catch (err: unknown) {
      this.handleError(err);
    }
    throw new Error(`${this.name} 서버 요청 실패`);
  }

  async post<T = any, D = any>(
    path: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.client.post(path, data, config);
      return res.data;
    } catch (err: unknown) {
      this.handleError(err);
    }
    throw new Error(`${this.name} 서버 요청 실패`);
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: string }>;
      if (axiosError.response?.data?.error) {
        throw new Error(
          `${this.name} 서버 오류: ${axiosError.response.data.error}`
        );
      }
    }
    throw new Error(`${this.name} 서버 요청 실패`);
  }
}

// 각 서버별 인스턴스
export const userApi = new ApiClient("/user-api", "User");
export const subscriptionApi = new ApiClient("/sub-api", "Subscription");
export const adminApi = new ApiClient("/admin-api", "Admin");
export const coreApi = new ApiClient("/core-api", "Core");
