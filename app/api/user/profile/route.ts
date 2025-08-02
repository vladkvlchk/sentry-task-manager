import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Intentional error - simulating auth failure
    if (Math.random() > 0.7) {
      throw new Error("Authentication failed");
    }

    // Simulate user data
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Intentional error - accessing undefined nested property
    const updatedUser = {
      ...body,
      lastModified: body.metadata.timestamp.iso,
    };

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
