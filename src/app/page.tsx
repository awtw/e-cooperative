import { TasksCards } from "@/components/task";

export default async function HomePage() {
  return (
    <div className="container mx-auto space-y-5 px-4 py-4">
      <TasksCards />
    </div>
  );
}
