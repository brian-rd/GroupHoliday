import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, LogIn, UserPlus } from "lucide-react"

const VoyagenLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="coastalBlue" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E81B0"/>
        <stop offset="1" stopColor="#5AB9EA"/>
      </linearGradient>
    </defs>
    <path
      d="M4 6 L16 26 L28 6"
      stroke="url(#coastalBlue)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <VoyagenLogo />
          <span className="text-2xl font-bold text-gray-900">Voyagen</span>
        </Link>
        <nav className="hidden md:flex space-x-4 lg:space-x-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/signup">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </Button>
        </nav>
        <Button variant="outline" className="md:hidden">
          Menu
        </Button>
      </div>
    </header>
  )
}

