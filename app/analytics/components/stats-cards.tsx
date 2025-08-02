"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/analytics/stats");
      const data = await response.json();

      // Intentional error - assuming data structure
      // @ts-expect-error
      setStats({ totalTasks: data.tasks.count,
        completedTasks: data.tasks.completed,
        // This will fail if data.users is undefined
        activeUsers: data.users.active.length,
      });
    } catch (error) {
      console.error("Stats fetch error:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {/* @ts-expect-error */}
          <div className="text-3xl font-bold">{stats?.totalTasks || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed</CardTitle>
        </CardHeader>
        <CardContent>
          {/* @ts-expect-error */}
          <div className="text-3xl font-bold">{stats?.completedTasks || 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          {/* @ts-expect-error */}
          <div className="text-3xl font-bold">{stats?.activeUsers || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
}
