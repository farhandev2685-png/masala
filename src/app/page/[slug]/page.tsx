import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, stripHtml } from "@/lib/wp";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug).catch(() => null);
  return page ? { title: stripHtml(page.title.rendered) } : { title: "Page" };
}

export default async function StaticPage({ params }: Props) {
  const page = await getPageBySlug(params.slug).catch(() => null);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        {stripHtml(page.title.rendered)}
      </h1>
      <p className="mt-3 text-xs font-medium text-stone-400">Last updated {formatDate(page.modified)}</p>
      <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
