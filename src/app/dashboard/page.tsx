import { Header } from "@/components/common";
import { TasksTable } from "@/components/task";

export default async function DashboardPage() {

  return (
    <div className="space-y-5 p-4 h-full">
            <Header />
            <TasksTable />
    </div>
  );
}
