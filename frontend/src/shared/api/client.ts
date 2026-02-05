import { config } from "../config";

type CacheOptions = {
  revalidate?: number;
  keys?: string[];
};

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  cache?: CacheOptions;
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, cache } = options;

  const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  if (cache) {
    fetchOptions.next = {
      revalidate: cache.revalidate,
      tags: cache.keys,
    };
  }

  if (method !== "GET") {
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(`${config.apiUrl}${endpoint}`, fetchOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      error.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}
