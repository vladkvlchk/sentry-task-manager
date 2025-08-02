import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Task Manager with Bugs 🐛</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          A Next.js app designed for learning Sentry error tracking
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Features to Test</CardTitle>
              <CardDescription>Different areas with intentional errors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/tasks">
                <Button className="w-full">Task Management</Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="w-full bg-transparent">
                  User Profile
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="secondary" className="w-full">
                  Analytics Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Types</CardTitle>
              <CardDescription>What you'll be able to track</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Client-side React errors</li>
                <li>• Server-side API errors</li>
                <li>• Async operation failures</li>
                <li>• Network request errors</li>
                <li>• Validation errors</li>
                <li>• Runtime exceptions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">🎯 Learning Goals</h3>
          <p className="text-yellow-700 text-sm">
            This app contains intentional bugs. Use it to practice setting up Sentry, configuring error boundaries, and
            tracking different types of errors in production.
          </p>
        </div>
      </div>
    </div>
  )
}
