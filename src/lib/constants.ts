export const SITE = {
  name: "Stock Market Masala",
  tagline: "Practical money advice for Indian investors",
  description:
    "Practical financial advice, plain-English investing guides, IPO analysis and personal finance explainers for Indian readers — independent, clear and free of hype.",
  url: "https://stockmarketmasala.in",
};

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/stockmarketmasala.in" },
  { label: "X", href: "https://x.com/stockmasala" },
  { label: "Substack", href: "https://stockmarketmasala.substack.com" },
  { label: "YouTube", href: "https://youtube.com/@stockmarketmasala" },
];

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  menu?: NavColumn[];
}

/** Primary nav — every href maps to a real, published WP category or site page.
 *  Dropdown columns mirror a NerdWallet-style mega menu. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Investing",
    href: "/category/markets",
    menu: [
      {
        heading: "Market Coverage",
        links: [
          { label: "Markets & Investing", href: "/category/markets" },
          { label: "Global Market Cues", href: "/category/global-markets" },
          { label: "Latest Market News", href: "/category/news" },
        ],
      },
      {
        heading: "Learn the Basics",
        links: [
          { label: "Investing Guides", href: "/category/learn" },
          { label: "Mutual Funds & SIPs", href: "/category/mutual-funds" },
          { label: "IPO Analysis", href: "/category/ipo" },
        ],
      },
      {
        heading: "Tools",
        links: [
          { label: "Wealth Calculator", href: "/#calculators" },
          { label: "Search Research", href: "/search" },
        ],
      },
    ],
  },
  {
    label: "IPO Center",
    href: "/category/ipo",
    menu: [
      {
        heading: "IPO Research",
        links: [
          { label: "Latest IPO Reviews", href: "/category/ipo" },
          { label: "Markets & Investing", href: "/category/markets" },
        ],
      },
      {
        heading: "Before You Bid",
        links: [
          { label: "Investing Guides", href: "/category/learn" },
          { label: "The 3-5-7 Risk Rule", href: "/post/3-5-7-rule-in-stock-trading" },
        ],
      },
      {
        heading: "Tools",
        links: [
          { label: "Wealth Calculator", href: "/#calculators" },
          { label: "Search Research", href: "/search" },
        ],
      },
    ],
  },
  {
    label: "Mutual Funds",
    href: "/category/mutual-funds",
    menu: [
      {
        heading: "Fund Guides",
        links: [
          { label: "Mutual Funds & SIPs", href: "/category/mutual-funds" },
          { label: "Personal Finance", href: "/category/personal-finance" },
        ],
      },
      {
        heading: "Tools",
        links: [
          { label: "SIP Calculator", href: "/#calculators" },
          { label: "Savings Goal Planner", href: "/#calculators" },
        ],
      },
    ],
  },
  {
    label: "Personal Finance",
    href: "/category/personal-finance",
    menu: [
      {
        heading: "Managing Money",
        links: [
          { label: "Personal Finance", href: "/category/personal-finance" },
          { label: "Taxes & Deductions", href: "/category/tax" },
          { label: "Insurance & Protection", href: "/category/insurance" },
        ],
      },
      {
        heading: "Tools",
        links: [
          { label: "50/30/20 Budget Split", href: "/#calculators" },
          { label: "Savings Goal Planner", href: "/#calculators" },
        ],
      },
    ],
  },
  {
    label: "Insurance",
    href: "/category/insurance",
    menu: [
      {
        heading: "Coverage Guides",
        links: [
          { label: "Insurance & Protection", href: "/category/insurance" },
          { label: "Personal Finance", href: "/category/personal-finance" },
          { label: "Investing Guides", href: "/category/learn" },
        ],
      },
      {
        heading: "Tools",
        links: [
          { label: "Search Research", href: "/search" },
          { label: "Calculators", href: "/#calculators" },
        ],
      },
    ],
  },
  {
    label: "Guides",
    href: "/category/learn",
    menu: [
      {
        heading: "Start Here",
        links: [
          { label: "All Financial Guides", href: "/category/learn" },
          { label: "Taxes & Deductions", href: "/category/tax" },
          { label: "Global Markets", href: "/category/global-markets" },
        ],
      },
      {
        heading: "Tools",
        links: [
          { label: "Calculators", href: "/#calculators" },
          { label: "Search Research", href: "/search" },
        ],
      },
    ],
  },
];

/** Editorial homepage sections — titles are editorial, slugs are real WP categories */
export const HOME_SECTIONS: { slug: string; title: string; layout: "grid" | "list" }[] = [
  { slug: "ipo", title: "IPO Center", layout: "grid" },
  { slug: "learn", title: "Popular Money Guides", layout: "grid" },
  { slug: "markets", title: "Markets & Investing", layout: "list" },
  { slug: "personal-finance", title: "Smart Money Strategies", layout: "list" },
  { slug: "insurance", title: "Insurance & Protection", layout: "list" },
  { slug: "global-markets", title: "Global Economy", layout: "list" },
];

/** Hero topic cards for the homepage — slugs are real WP categories */
export const TOPICS: { slug: string; label: string; blurb: string }[] = [
  { slug: "markets", label: "Markets", blurb: "Nifty, Sensex and the day's big moves" },
  { slug: "ipo", label: "IPO Center", blurb: "New listings, GMP and verdicts" },
  { slug: "mutual-funds", label: "Mutual Funds", blurb: "SIPs, direct plans and fund picks" },
  { slug: "personal-finance", label: "Personal Finance", blurb: "Budgeting, saving and planning" },
  { slug: "insurance", label: "Insurance", blurb: "Term, health and protection" },
  { slug: "tax", label: "Taxes", blurb: "Regimes, deductions and filing" },
  { slug: "learn", label: "Investing Basics", blurb: "First steps into stocks and markets" },
  { slug: "global-markets", label: "Global Markets", blurb: "World cues that move India" },
  { slug: "companies", label: "Companies", blurb: "Earnings, fundamentals and results" },
];
