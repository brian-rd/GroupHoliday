import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Voyagen | WIP" },
    { name: "description", content: "Welcome to Voyagen!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
