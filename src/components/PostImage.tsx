import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { featuredImage, WPPost } from "@/lib/wp";
import { cn } from "@/lib/utils";

export default function PostImage({
  post,
  size = "large",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
  priority = false,
}: {
  post: WPPost;
  size?: "full" | "large" | "medium_large" | "medium";
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const img = featuredImage(post, size);

  if (!img) {
    return (
      <div className={cn("grid place-items-center bg-gradient-to-br from-nerd-600 to-nerd-800", className)}>
        <TrendingUp className="h-10 w-10 text-nerd-400/60" />
      </div>
    );
  }

  return (
    <Image
      src={img.url}
      alt={img.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
