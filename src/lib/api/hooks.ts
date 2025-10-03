"use client";
import { useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { createApiClient } from "./client";

export const useApiClient = () => {
  const { data } = useSession();
  const getAccessToken = useCallback(() => data?.accessToken, [data?.accessToken]);

  const client = useMemo(() => createApiClient(getAccessToken), [getAccessToken]);
  return client;
};


