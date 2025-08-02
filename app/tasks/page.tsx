import { TaskList } from "./components/task-list"
import { AddTaskForm } from "./components/add-task-form"
import { ErrorTrigger } from "./components/error-trigger"

// Intentional server-side error - sometimes fails
async function getTasks() {
  // Simulate random server error
  if (Math.random() > 0.7) {
    throw new Error("Database connection failed")
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    { id: 1, title: "Learn Sentry", completed: false, priority: "high" },
    { id: 2, title: "Fix bugs", completed: true, priority: "medium" },
    { id: 3, title: "Deploy app", completed: false, priority: "low" },
  ]
}

export default async function TasksPage() {
  const tasks = await getTasks()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Task Management</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* @ts-expect-error */}
            <TaskList initialTasks={tasks} />
          </div>

          <div className="space-y-6">
            <AddTaskForm />
            <ErrorTrigger />
          </div>
        </div>
      </div>
    </div>
  )
}
