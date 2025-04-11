import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, LogIn, UserPlus } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-8 w-8" />
          <span className="text-2xl font-bold">Voyagen</span>
        </Link>
        <nav className="hidden md:flex space-x-4 lg:space-x-6">
          <SignedOut>
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
          </SignedOut>
          <ThemeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
        <Button variant="outline" className="md:hidden">
          Menu
        </Button>
      </div>
    </header>
  );
}
