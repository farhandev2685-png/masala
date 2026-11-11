"use client";

import { useState } from "react";
import { Check, Facebook, Link2, Linkedin, Share2, Twitter } from "lucide-react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = { url: encodeURIComponent(url), title: encodeURIComponent(title) };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const btn =
    "grid h-9 w-9 place-items-center rounded-full bg-nerd-50 text-ink-700 ring-1 ring-nerd-100 transition hover:bg-nerd-800 hover:text-white";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-400">
        <Share2 className="h-3.5 w-3.5" /> Share
      </span>
      <a
        className={btn}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        className={btn}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`}
        aria-label="Share on X"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        className={btn}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button className={btn} onClick={copy} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-gain" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
