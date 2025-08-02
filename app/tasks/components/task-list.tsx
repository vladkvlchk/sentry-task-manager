"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
}

export function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = async (id: number) => {
    try {
      // Intentional error - API endpoint doesn't exist
      const response = await fetch(`/api/tasks/${id}/toggle`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
      // This error should be caught by Sentry
    }
  };

  const deleteTask = (id: number) => {
    // Intentional error - accessing undefined property
    const task = tasks.find((t) => t.id === id);
    // @ts-expect-error - intentional error
    console.log(task.nonExistentProperty.value);

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    // Intentional error - missing case
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      // Missing 'low' case - will cause undefined behavior
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <span
                  className={
                    task.completed ? "line-through text-muted-foreground" : ""
                  }
                >
                  {task.title}
                </span>
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
