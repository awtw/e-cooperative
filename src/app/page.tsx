import { TasksTable } from "@/components/task";

export default async function HomePage() {
  return (
    <div className="space-y-5 p-4 h-full">
      <TasksTable />
    </div>
  );
}
