import { TaskList } from "./components/task-list"
import { AddTaskForm } from "./components/add-task-form"
import { ErrorTrigger } from "./components/error-trigger"

// Make this page dynamic to avoid build-time errors
export const dynamic = "force-dynamic"

// Intentional server-side error - but only at runtime
async function getTasks() {
  // Only throw errors at runtime in production, not during build
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    // Simulate random server error only in production runtime
    if (Math.random() > 0.7) {
      throw new Error("Database connection failed")
    }
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return [
    { id: 1, title: "Learn Sentry", completed: false, priority: "high" },
    { id: 2, title: "Fix bugs", completed: true, priority: "medium" },
    { id: 3, title: "Deploy app", completed: false, priority: "low" },
  ]
}

export default async function TasksPage() {
  let tasks = []
  let error = null

  try {
    tasks = await getTasks()
  } catch (err) {
    error = err
    // Provide fallback data so page can still render
    tasks = [
      { id: 1, title: "Learn Sentry", completed: false, priority: "high" },
      { id: 2, title: "Fix bugs", completed: true, priority: "medium" },
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Task Management</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
