import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-lg text-center">
        Welcome to your dashboard. Here you can manage your account, view your
        trips, and more.
      </p>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
