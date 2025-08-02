import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Intentional error - division by zero
    const totalTasks = 10
    const divisor = Math.random() > 0.5 ? 0 : 2
    const averageTasksPerUser = totalTasks / divisor

    // Intentional error - accessing undefined array
    const users: any[] = []
    const activeUsers = users.filter((user) => user.active)

    const stats = {
      tasks: {
        count: totalTasks,
        completed: 7,
        average: averageTasksPerUser,
      },
      users: {
        active: activeUsers,
        total: users.length,
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
