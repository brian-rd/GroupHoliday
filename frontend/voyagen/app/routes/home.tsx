import type { Route } from "./+types/home";
import { NavLink } from "react-router";
import { Welcome } from "../welcome/welcome";
import {
  UsersIcon,
  CalendarIcon,
  MapIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Voyagen | WIP" },
    { name: "description", content: "Welcome to Voyagen!" },
  ];
}

const features = [
  {
    name: 'Effortless Planning',
    description:
      'Create a trip, invite your group, and let AI handle the hard work—no more endless discussions.',
    icon: UsersIcon,
  },
  {
    name: 'Smart Date Selection',
    description:
      'Everyone picks their available dates, and we’ll find the best time to travel.',
    icon: CalendarIcon,
  },
  {
    name: 'Tailored Recommendations',
    description:
      'AI suggests destinations based on group preferences, budget, and real-time flight & hotel prices.',
    icon: MapIcon,
  },
  {
    name: 'Real-time Cost Estimates',
    description:
      'No surprises—get approximate price breakdowns per person before booking.',
    icon: CurrencyDollarIcon,
  }
]

export default function Home() {
  // return <Welcome />;
  return (
    <div>
    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:pt-42">
    <div className="text-center">
      <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Plan a group holiday with ease
      </h1>
      <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        A website to plan your next holiday with friends and family hassle-free. No more wasting time chasing up in group chats.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <NavLink to="/register" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</NavLink>
        <NavLink to="/login" className="text-sm/6 font-semibold text-gray-900">
          Already have an account? <span aria-hidden="true">→</span>
        </NavLink>
      </div>
    </div>
  </div>
  <div className="mx-auto mt-20 mb-32 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Vacation stress-free</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The perfect group trip starts here
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              No more chasing group chats. Easily plan, collaborate, and book your next holiday with friends and family—all in one place.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
  </div>

  );
}
