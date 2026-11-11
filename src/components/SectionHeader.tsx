import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="font-display text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-nerd-700/25 px-3.5 py-1.5 text-xs font-bold text-nerd-700 transition hover:border-nerd-700 hover:bg-nerd-50"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
