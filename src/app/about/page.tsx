import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "about",
  };
}
export default function About() {
  return <main>hello about</main>;
}
