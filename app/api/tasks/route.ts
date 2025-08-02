import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Intentional error - database connection simulation
    if (Math.random() > 0.8) {
      throw new Error("Database connection timeout");
    }

    const tasks = [
      { id: 1, title: "Learn Sentry", completed: false, priority: "high" },
      { id: 2, title: "Fix bugs", completed: true, priority: "medium" },
    ];

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Intentional validation error
    if (!body.title) {
      throw new Error("Title is required");
    }

    // Intentional error - accessing undefined property
    const task = {
      id: Date.now(),
      title: body.title,
      priority: body.priority,
      createdBy: body.user.id, // user might be undefined
      completed: false,
    };

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Task creation error:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 400 }
    );
  }
}
