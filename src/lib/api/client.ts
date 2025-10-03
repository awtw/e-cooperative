import createClient, { type Client, type FetchOptions, type Middleware } from "openapi-fetch";
import type { paths } from "./types";

export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://hanservice.synology.me:8923";

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
  fetchOptions?: FetchOptions,
): ApiClient => {
  const client = createClient<paths>({ baseUrl, fetch: fetchOptions?.fetch });
  client.use(createAuthMiddleware(getAccessToken));
  return client;
};

export const apiClient = createApiClient();


