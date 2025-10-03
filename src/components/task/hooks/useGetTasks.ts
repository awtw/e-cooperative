import { useSuspenseQuery } from "@tanstack/react-query";
import { getTasks } from "@/service/task";

export const useGetTasks = () => {
    return useSuspenseQuery({
        queryKey: ["tasks"],
        queryFn: () => {
            return getTasks();
        },
    });
};