import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from "next/link"


const inter = Inter({ subsets: ["latin"] })
const isDevelopment = process.env.NODE_ENV === 'development'

export const metadata: Metadata = {
  title: "Voyagen",
  description: "Group Holiday Planner",
  icons: {
    icon: isDevelopment ? '/dev_favicon.ico' : '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="min-h-screen flex flex-col">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Header />
              <main className="bg-gray-50">{children}</main>
              <Footer />
            </ThemeProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

