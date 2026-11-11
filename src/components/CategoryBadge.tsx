import Link from "next/link";
import { postCategories, WPPost } from "@/lib/wp";
import { cn } from "@/lib/utils";

export default function CategoryBadge({
  post,
  className,
  variant = "solid",
  interactive = true,
}: {
  post: WPPost;
  className?: string;
  variant?: "solid" | "text";
  interactive?: boolean;
}) {
  const cat = postCategories(post)[0];
  if (!cat) return null;

  const cls =
    variant === "text"
      ? cn(
          "text-[11px] font-extrabold uppercase tracking-wider text-nerd-700 hover:text-nerd-800",
          className
        )
      : cn(
          "inline-block rounded-full bg-nerd-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-nerd-800",
          className
        );

  if (!interactive) return <span className={cls}>{cat.name}</span>;

  return (
    <Link href={`/category/${cat.slug}`} className={cls}>
      {cat.name}
    </Link>
  );
}
