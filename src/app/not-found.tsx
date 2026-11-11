import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-site flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-nerd-700">404</p>
      <h1 className="mt-4 font-display text-2xl font-extrabold text-ink-950">This page took a stop-loss</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-nerd-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
