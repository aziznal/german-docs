import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1>Welcome to German Docs</h1>

      <Link href="/getting-started">Visit the docs to get started</Link>
    </div>
  );
}
