"use client";

import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar1,
  Map,
  DollarSign,
  Vote,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType;
}

const features: Feature[] = [
  {
    name: "Effortless Planning",
    description:
      "Create a trip, invite your group, and let AI handle the hard work—no more endless discussions.",
    icon: Users,
  },
  {
    name: "Smart Date Selection",
    description:
      "Everyone picks their available dates, and we’ll find the best time to travel.",
    icon: Calendar1,
  },
  {
    name: "Tailored Recommendations",
    description:
      "AI suggests destinations based on group preferences, budget, and real-time flight & hotel prices.",
    icon: Map,
  },
  {
    name: "Real-time Cost Estimates",
    description:
      "No surprises—get approximate price breakdowns per person before booking.",
    icon: DollarSign,
  },
  {
    name: "Seamless Voting System",
    description:
      "Let everyone vote on destinations and finalize the trip with a simple majority decision.",
    icon: Vote,
  },
  {
    name: "Live Collaboration & Updates",
    description:
      "Changes sync in real-time, so everyone stays updated as trip plans evolve.",
    icon: RefreshCw,
  },
];

export default function Home() {
  // The `useSession()` hook will be used to get the Clerk `session` object
  const { session } = useSession();
  const router = useRouter();

  // Create a custom supabase client that injects the Clerk Supabase token into the request headers
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          // Get the custom Supabase token from Clerk
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            // Call the default fetch
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      },
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <section className="container mx-auto max-w-2xl py-16 sm:py-24 lg:pt-42">
        <div className="text-center">
          <div className="mt-24 space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Plan a group holiday with ease
            </h1>
            <p className="text-muted-foreground md:text-xl">
              A website to plan your next holiday with friends and family
              hassle-free. No more wasting time chasing up in group chats.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              onClick={() => router.push("/signup")}
              size="lg"
              className="bg-primary"
            >
              Get Started
            </Button>
            <Link href="/login">
              Already have an account? <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-3xl" />
        </div>
      </section>

      <section className="container py-8 lg:py-16 flex flex-col items-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            The perfect group trip starts here
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            No more chasing group chats. Easily plan, collaborate, and book your
            next holiday with friends and family—all in one place.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16 mx-24">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group rounded-lg border p-6 hover:shadow-lg transition-all dark:hover:shadow-primary/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/25 to-secondary/25 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-lg" />
              <div className="relative">
                <div className="h-10 w-10 text-primary mb-4">
                  {" "}
                  <feature.icon />{" "}
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
