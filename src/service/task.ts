import { mockData } from "@/components/task/data";
import { TaskInterface } from "@/types/task";

/**
 * @todo 這邊要改成從後端取得資料
 */
export const getTasks: () => Promise<TaskInterface[]> = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 5000);
  });
};
