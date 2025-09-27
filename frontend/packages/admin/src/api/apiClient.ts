import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

export class ApiClient {
  public name: string;
  private client: AxiosInstance;

  constructor(baseURL: string, name: string) {
    this.client = axios.create({ baseURL, timeout: 5000 });
    this.name = name;
  }

  async get<T = any>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await this.client.get<T>(path, config);
      return res.data;
    } catch (err: unknown) {
      return this.handleError(err);
    }
  }

  async post<T = any, D = any>(
    path: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const res = await this.client.post<T>(path, data, config);
      return res.data;
    } catch (err: unknown) {
      return this.handleError(err);
    }
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const aErr = error as AxiosError<{ error?: string }>;
      if (aErr.response?.data?.error) {
        throw new Error(`${this.name} 서버 오류: ${aErr.response.data.error}`);
      }
    }
    throw new Error(`${this.name} 서버 요청 실패`);
  }
}

export const userApi = new ApiClient("/user-api", "User");
export const subscriptionApi = new ApiClient("/sub-api", "Subscription");
export const adminApi = new ApiClient("/admin-api", "Admin");
export const coreApi = new ApiClient("/core-api", "Core");
