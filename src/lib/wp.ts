/**
 * WordPress REST API client for stockmarketmasala.in
 */

export const WP_BASE = "https://stockmarketmasala.in";
const API = `${WP_BASE}/wp-json/wp/v2`;

const REVALIDATE = 120; // seconds

export interface WPMedia {
  source_url: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
  alt_text?: string;
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy?: string;
  count?: number;
  description?: string;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
  description?: string;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  _embedded?: {
    author?: WPAuthor[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

async function wpFetch<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(path, API + "/");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE },
    headers: { "User-Agent": "stockmarketmasala-next/1.0" },
  });
  if (!res.ok) throw new Error(`WP API ${res.status} for ${url.pathname}${url.search}`);
  return res.json() as Promise<T>;
}

async function wpFetchWithHeaders<T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<{ data: T; total: number; totalPages: number }> {
  const url = new URL(path, API + "/");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE },
    headers: { "User-Agent": "stockmarketmasala-next/1.0" },
  });
  if (!res.ok) throw new Error(`WP API ${res.status} for ${url.pathname}${url.search}`);
  const data = (await res.json()) as T;
  return {
    data,
    total: Number(res.headers.get("X-WP-Total") ?? 0),
    totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 1),
  };
}

/* ------------------------------ Posts ------------------------------ */

export async function getPosts(opts: {
  perPage?: number;
  page?: number;
  categories?: number | number[];
  exclude?: number[];
  search?: string;
  orderby?: string;
} = {}): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const params: Record<string, string | number> = {
    per_page: opts.perPage ?? 10,
    page: opts.page ?? 1,
    _embed: 1,
    orderby: opts.orderby ?? "date",
    order: "desc",
  };
  if (opts.categories) params.categories = Array.isArray(opts.categories) ? opts.categories.join(",") : opts.categories;
  if (opts.exclude?.length) params.exclude = opts.exclude.join(",");
  if (opts.search) params.search = opts.search;

  const { data, total, totalPages } = await wpFetchWithHeaders<WPPost[]>("posts", params);
  return { posts: data, total, totalPages };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>("posts", { slug, _embed: 1 });
  return posts[0] ?? null;
}

export async function getRelatedPosts(post: WPPost, count = 4): Promise<WPPost[]> {
  if (!post.categories.length) return [];
  const { posts } = await getPosts({
    categories: post.categories[0],
    exclude: [post.id],
    perPage: count,
  });
  return posts;
}

/* ------------------------------ Pages ------------------------------ */

export interface WPPage {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>("pages", { slug });
  return pages[0] ?? null;
}

/* ---------------------------- Categories ---------------------------- */

export async function getCategories(): Promise<WPTerm[]> {
  return wpFetch<WPTerm[]>("categories", { per_page: 50, hide_empty: 1, orderby: "count", order: "desc" });
}

export async function getCategoryBySlug(slug: string): Promise<WPTerm | null> {
  const cats = await wpFetch<WPTerm[]>("categories", { slug });
  return cats[0] ?? null;
}

/* ----------------------------- Helpers ----------------------------- */

export function featuredImage(post: WPPost, size: "full" | "large" | "medium" | "medium_large" = "full") {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  const sized = size !== "full" ? media.media_details?.sizes?.[size]?.source_url : undefined;
  return {
    url: sized ?? media.source_url,
    alt: media.alt_text || stripHtml(post.title.rendered),
    width: media.media_details?.width ?? 1200,
    height: media.media_details?.height ?? 675,
  };
}

export function postCategories(post: WPPost): WPTerm[] {
  return (post._embedded?.["wp:term"]?.[0] ?? []).filter((t) => t.taxonomy === "category" || !t.taxonomy);
}

export function postTags(post: WPPost): WPTerm[] {
  return post._embedded?.["wp:term"]?.[1] ?? [];
}

export function postAuthor(post: WPPost): WPAuthor | null {
  const author = post._embedded?.author?.[0];
  return author?.name ? author : null;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#038;/g, "&").replace(/&hellip;/g, "…").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).trim();
}
