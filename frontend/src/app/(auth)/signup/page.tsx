"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Toaster, toast } from "sonner"
import { useSignUp } from "@clerk/nextjs"



export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return "Password must contain at least one special character"
    }
    return ""
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    if (password !== confirmPassword) {
      toast.error("Error", {
        description: "Passwords do not match.",
      })
      setIsLoading(false)
      return
    }

    const error = validatePassword(password)
    if (error) {
      toast.error("Error", {
        description: error,
      })
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      await signUp.create({
        emailAddress,
        password,
        firstName: displayName
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true)
      setIsLoading(false)
    } catch (error: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      toast.error("Error", {
        description: error.errors?.[0]?.message || "Something went wrong",
      })
      setIsLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push('/dashboard')
        setIsLoading(false)
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2))
        setIsLoading(false)
      }
    } catch (error: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      toast.error("Error", {
        description: error.errors?.[0]?.message || "Something went wrong",
      })
      setIsLoading(false)
    }
  }

  const signUpWithGoogle = async () => {
    if (!isLoaded) return

    try {
      const result = await signUp.authenticateWithRedirect({
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

  if (verifying) {
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
            <h1 className="text-2xl font-bold">Verify your email</h1>
            <p className="text-gray-500">We&apos;ve sent a verification code to your email</p>
          </div>
          
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code..."
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Email
            </Button>
          </form>
        </div>
      </div>
    )
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
          <div id='clerk-captcha' />
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long and contain at least one special character.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading} onClick={signUpWithGoogle} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 my-2">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path>
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path>
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path>
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
            </svg>
          )}{" "}
          Google
        </Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="font-medium text-blue-600 hover:underline" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

