"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success("Success", {
        description: "You have successfully logged in.",
      })
      router.push("/dashboard")
    }, 3000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" disabled={isLoading} />
            </div>
          </div>
          <div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading} className="w-full">
            {isLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
            >
              <path
              fill="#4285F4"
              d="M24 9.5c3.2 0 5.9 1.1 8.1 3.1l6-6C34.7 3.2 29.7 1 24 1 14.8 1 7.1 6.6 3.7 14.4l7 5.4C12.4 14.1 17.7 9.5 24 9.5z"
              />
              <path
              fill="#34A853"
              d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3.2-2.4 5.9-5 7.7l7 5.4C43.6 37.4 46.5 31.1 46.5 24z"
              />
              <path
              fill="#FBBC05"
              d="M10.7 28.6c-1-3.2-1-6.6 0-9.8l-7-5.4C1.1 17.4 0 20.6 0 24s1.1 6.6 3.7 9.6l7-5.4z"
              />
              <path
              fill="#EA4335"
              d="M24 46c5.7 0 10.7-1.9 14.3-5.2l-7-5.4c-2 1.3-4.5 2-7.3 2-6.3 0-11.6-4.6-13.3-10.8l-7 5.4C7.1 41.4 14.8 46 24 46z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            )}{" "}
          Google
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-blue-600 hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

