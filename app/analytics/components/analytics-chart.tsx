"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsChart({ data }: { data: any }) {
  let chartData = []
  let error = null

  try {
    // Intentional error - accessing undefined properties (with fallback)
    if (data?.metrics) {
      chartData = data.metrics.map((metric: any) => ({
        date: metric.timestamp?.toLocaleDateString?.() || "Unknown",
        value: metric.value?.amount || 0,
      }))
    }
  } catch (err) {
    error = err
    chartData = [{ date: "Error", value: 0 }]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          Chart would render here with data: {JSON.stringify(chartData)}
        </div>
      </CardContent>
    </Card>
  )
}
