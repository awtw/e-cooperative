"use client";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { createApiClient } from "./client";

export const useApiClient = () => {
  const { data } = useSession();
  const getAccessToken = () => data?.accessToken;

  const client = useMemo(() => createApiClient(getAccessToken), [data?.accessToken]);
  return client;
};


