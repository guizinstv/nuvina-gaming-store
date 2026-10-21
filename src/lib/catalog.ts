// DEMO catalog — fictional products for layout only. Replace with real data.
export type Category = "fps" | "external" | "internal" | "misc";
export type Status = "available" | "updating" | "offline";
export type Duration = "1d" | "7d" | "30d" | "90d" | "lifetime";

export interface Plan {
  duration: Duration;
  price: number; // BRL cents
}

export interface Product {
  slug: string;
  name: string;
  game: string;
  code: string;
  category: Category;
  status: Status;
  short: string;
  description: string;
  features: string[];
  requirements: string[];
  limitations: string[];
  plans: Plan[];
  faq: { q: string; a: string }[];
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "fps", label: "FPS" },
  { id: "external", label: "External tools" },
  { id: "internal", label: "Internal tools" },
  { id: "misc", label: "Miscellaneous" },
];

export const DURATION_LABEL: Record<Duration, string> = {
  "1d": "1 Day",
  "7d": "7 Days",
  "30d": "30 Days",
  "90d": "90 Days",
  lifetime: "Lifetime",
};

export const STATUS_LABEL: Record<Status, string> = {
  available: "Available",
  updating: "Updating",
  offline: "Offline",
};

const baseReq = ["Windows 10 / 11 (64-bit)", "Administrator privileges", "Up-to-date GPU drivers"];
const baseLim = [
  "Compatibility may change after game updates.",
  "Use may violate the game's terms of service. Account actions are your responsibility.",
  "No guarantee of undetectability is made or implied.",
];
const baseFaq = [
  { q: "How is the product delivered?", a: "After payment is confirmed on our server, your license key appears in your dashboard." },
  { q: "What happens during a game update?", a: "The status changes to Updating until compatibility is re-verified. Paused time is not guaranteed to be refunded; see the Refund Policy." },
];

export const PRODUCTS: Product[] = [
  {
    slug: "vanta-tactical",
    name: "Vanta",
    game: "Tactical FPS (demo)",
    code: "VNT",
    category: "fps",
    status: "available",
    short: "Lightweight overlay with configurable ESP and visual aids.",
    description:
      "Vanta is a demonstration listing for a lightweight external overlay. It focuses on readable visuals and a minimal configuration panel with per-profile settings.",
    features: ["Configurable ESP boxes & names", "Distance & health indicators", "Profile save / load", "Hotkey-driven menu"],
    requirements: baseReq,
    limitations: baseLim,
    plans: [
      { duration: "1d", price: 1990 },
      { duration: "7d", price: 5990 },
      { duration: "30d", price: 14990 },
    ],
    faq: baseFaq,
  },
  {
    slug: "kite-battle-royale",
    name: "Kite",
    game: "Battle Royale (demo)",
    code: "KTE",
    category: "fps",
    status: "updating",
    short: "Loot and player visuals tuned for large maps.",
    description:
      "Kite is a demonstration listing. Built around large-map awareness with item filtering and adjustable render distance.",
    features: ["Item filters by rarity", "Adjustable render distance", "Radar overlay", "Stream-safe mode toggle"],
    requirements: baseReq,
    limitations: baseLim,
    plans: [
      { duration: "1d", price: 2490 },
      { duration: "7d", price: 6990 },
      { duration: "30d", price: 17990 },
    ],
    faq: baseFaq,
  },
  {
    slug: "relay-external",
    name: "Relay",
    game: "Multi-game (demo)",
    code: "RLY",
    category: "external",
    status: "available",
    short: "External toolkit with a clean, scriptable interface.",
    description:
      "Relay is a demonstration listing for an external toolkit. Modular, lightweight and configurable through a single panel.",
    features: ["Modular feature toggles", "Config import / export", "Low memory footprint", "Hotkey remapping"],
    requirements: baseReq,
    limitations: baseLim,
    plans: [
      { duration: "7d", price: 3990 },
      { duration: "30d", price: 9990 },
      { duration: "lifetime", price: 39990 },
    ],
    faq: baseFaq,
  },
  {
    slug: "fold-internal",
    name: "Fold",
    game: "Arena Shooter (demo)",
    code: "FLD",
    category: "internal",
    status: "available",
    short: "Internal build with an in-game menu and aim assistance settings.",
    description: "Fold is a demonstration listing for an internal tool with an in-game menu and fine-grained configuration.",
    features: ["In-game menu", "Smoothing & FOV controls", "Visual customization", "Per-weapon configs"],
    requirements: [...baseReq, "Virtualization disabled in some configurations"],
    limitations: baseLim,
    plans: [
      { duration: "1d", price: 2990 },
      { duration: "30d", price: 19990 },
      { duration: "90d", price: 44990 },
    ],
    faq: baseFaq,
  },
  {
    slug: "husk-internal",
    name: "Husk",
    game: "Survival (demo)",
    code: "HSK",
    category: "internal",
    status: "offline",
    short: "Survival-focused internal tool. Currently offline.",
    description: "Husk is a demonstration listing. Currently offline pending a compatibility check.",
    features: ["Resource ESP", "Base & player markers", "Crosshair overlay"],
    requirements: baseReq,
    limitations: baseLim,
    plans: [
      { duration: "7d", price: 4990 },
      { duration: "30d", price: 12990 },
    ],
    faq: baseFaq,
  },
  {
    slug: "spoof-utility",
    name: "Mask",
    game: "Utility (demo)",
    code: "MSK",
    category: "misc",
    status: "available",
    short: "System utility for hardware identifier management.",
    description: "Mask is a demonstration listing for a system utility. Read requirements carefully before purchasing.",
    features: ["One-click session mode", "Restore to original", "Log viewer"],
    requirements: [...baseReq, "Some motherboards are not supported"],
    limitations: baseLim,
    plans: [
      { duration: "1d", price: 1490 },
      { duration: "30d", price: 7990 },
      { duration: "lifetime", price: 24990 },
    ],
    faq: baseFaq,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function fromPrice(p: Product) {
  return Math.min(...p.plans.map((x) => x.price));
}
