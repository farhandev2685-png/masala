# Stock Market Masala — Next.js Frontend

A modern, Moneycontrol-style financial blog frontend for [stockmarketmasala.in](https://stockmarketmasala.in), powered by the WordPress REST API — no WordPress theme, no PHP.

## Stack

- **Next.js 14** (App Router, TypeScript, ISR)
- **Tailwind CSS** + `@tailwindcss/typography`
- **lucide-react** icons
- Data source: `https://stockmarketmasala.in/wp-json/wp/v2` (posts, pages, categories, embedded media/author)

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Routes

| Route | Description |
|---|---|
| `/` | Homepage: breaking ticker, hero story, Top Stories, IPO Corner, category sections |
| `/post/[slug]` | Article page (content, author, share, tags, related posts) |
| `/category/[slug]` | Category archive with pagination (`?page=N`) |
| `/search?q=...` | Full-text search via WP API |
| `/page/[slug]` | Static WP pages (Disclaimer, Privacy, About, Contact…) |

## Config

- `src/lib/constants.ts` — nav items, homepage section order, site meta
- `src/lib/wp.ts` — API client (`REVALIDATE` controls ISR freshness, default 120s)
- WordPress categories are matched by slug — keep slugs in `HOME_SECTIONS` in sync with WP.

## Notes

- Posts keep canonical slugs; permalinks on the WP side can point to the new host later.
- `next/image` is whitelisted for `stockmarketmasala.in` + gravatar in `next.config.mjs`.
