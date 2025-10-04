import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/service/task";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return getTasks();
    },
    retry: 3, // 重試 3 次
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指數退避
    staleTime: 5 * 60 * 1000, // 5 分鐘內視為新鮮
    gcTime: 10 * 60 * 1000, // 10 分鐘後清除快取
    refetchOnWindowFocus: false, // 不要在視窗聚焦時重新取得
  });
};
