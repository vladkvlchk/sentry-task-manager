import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            TaskBug 🐛
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/tasks">
              <Button variant="ghost">Tasks</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <Link href="/analytics">
              <Button variant="ghost">Analytics</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
