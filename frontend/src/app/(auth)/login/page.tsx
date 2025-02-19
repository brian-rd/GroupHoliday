"use client"

import type React from "react"
import { useSignIn } from "@clerk/nextjs"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [isLoading, setIsLoading] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    try {
      setIsLoading(true)
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error.errors?.[0]?.message || "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    if (!isLoaded) return

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      })
    } catch (error: any) {
      toast.error("Error", {
        description: error.errors?.[0]?.message || "Something went wrong",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Toaster
        toastOptions={{
          style: {
            color: 'red',
          },
        }}
      />
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500">Please sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-50 px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" type="button" disabled={isLoading} onClick={signInWithGoogle} className="w-full">
            {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

