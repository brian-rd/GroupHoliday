import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Voyagen",
  description: "Plan your group holidays with ease",
}

export default function Dashboard() {
  return (
    // <div className="pt-16 flex flex-col items-center justify-center h-full space-y-4">
    <div className="py-6 min-h-screen min-w-screen">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Button asChild size="lg">
        <Link href="/create-group">Create a new group</Link>
      </Button>
    </div>
  );
}
