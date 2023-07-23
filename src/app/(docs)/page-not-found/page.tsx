import Link from "next/link";

export default function PageNotfound() {
  return (
    <div className="prose">
      <h1 className="text-red-400">404 Not found</h1>
      <p>{`The page you're looking for does not exist.`}</p>
      <Link href="/introduction">Back to docs</Link>
    </div>
  );
}