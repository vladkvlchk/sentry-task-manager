import { AnalyticsChart } from "./components/analytics-chart"
import { StatsCards } from "./components/stats-cards"

// Make this page dynamic to avoid build-time errors
export const dynamic = "force-dynamic"

// Intentional server error in data fetching - but only at runtime
async function getAnalyticsData() {
  // Only throw errors at runtime, not during build
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    // Simulate random server failure only in production runtime
    if (Math.random() > 0.6) {
      throw new Error("Analytics service unavailable")
    }
  }

  // Return mock data for build time, error data for runtime
  const mockData = {
    metrics: [
      { timestamp: new Date(), value: { amount: 100 } },
      { timestamp: new Date(), value: { amount: 150 } },
    ],
  }

  // Intentional error - trying to parse invalid JSON (only at runtime)
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    try {
      const invalidJson = '{"incomplete": json'
      return JSON.parse(invalidJson)
    } catch (error) {
      throw new Error("Data parsing failed")
    }
  }

  return mockData
}

export default async function AnalyticsPage() {
  let data
  let error = null

  try {
    data = await getAnalyticsData()
  } catch (err) {
    error = err
    // Provide fallback data so page can still render
    data = {
      metrics: [{ timestamp: new Date(), value: { amount: 0 } }],
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

        {error as string && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">⚠️ Error loading analytics: {error as string}</p>
          </div>
        )}

        <div className="space-y-8">
          <StatsCards />
          <AnalyticsChart data={data} />
        </div>
      </div>
    </div>
  )
}
