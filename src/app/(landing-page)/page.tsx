import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1>Welcome to German Docs</h1>

      <Link
        href="/getting-started"
        className="font-bold text-blue-500 underline hover:text-blue-400"
      >
        Visit the docs to get started
      </Link>
    </div>
  );
}
