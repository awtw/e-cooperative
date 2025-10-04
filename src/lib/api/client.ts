import createClient, { type Client, type Middleware } from "openapi-fetch";
import type { paths } from "./types";

export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://hopenet.m9h8.com";

export type ApiClient = Client<paths>;

const createAuthMiddleware = (getAccessToken?: () => string | undefined): Middleware => {
  return {
    onRequest: ({ request }) => {
      const headers = new Headers(request.headers);
      headers.set("Content-Type", "application/json");
      const token = getAccessToken?.();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return new Request(request, { headers });
    },
  };
};

export const createApiClient = (
  getAccessToken?: () => string | undefined,
  baseUrl: string = API_BASE_URL,
  customFetch?: typeof fetch,
): ApiClient => {
  const client = createClient<paths>({ baseUrl, fetch: customFetch });
  client.use(createAuthMiddleware(getAccessToken));
  return client;
};

export const apiClient = createApiClient();


