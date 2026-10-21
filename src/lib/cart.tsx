import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Duration } from "./catalog";

export interface CartLine {
  slug: string;
  duration: Duration;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  coupon: { code: string; percent: number } | null;
  add: (l: CartLine) => void;
  remove: (slug: string, duration: Duration) => void;
  update: (slug: string, duration: Duration, patch: Partial<CartLine>) => void;
  setCoupon: (c: { code: string; percent: number } | null) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "nuvina.cart.v1";

export function linePrice(l: CartLine) {
  const p = getProduct(l.slug);
  const plan = p?.plans.find((x) => x.duration === l.duration);
  return plan ? plan.price * l.qty : 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState<CartCtx["coupon"]>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.lines)) setLines(parsed.lines.filter((l: CartLine) => getProduct(l.slug)));
        if (parsed.coupon) setCoupon(parsed.coupon);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify({ lines, coupon }));
  }, [lines, coupon, loaded]);

  const value = useMemo<CartCtx>(() => {
    const merge = (arr: CartLine[]) => {
      const out: CartLine[] = [];
      for (const l of arr) {
        const ex = out.find((o) => o.slug === l.slug && o.duration === l.duration);
        if (ex) ex.qty = Math.min(10, ex.qty + l.qty);
        else out.push({ ...l });
      }
      return out;
    };
    return {
      lines,
      coupon,
      count: lines.reduce((a, l) => a + l.qty, 0),
      subtotal: lines.reduce((a, l) => a + linePrice(l), 0),
      add: (l) => setLines((prev) => merge([...prev, l])),
      remove: (slug, d) => setLines((prev) => prev.filter((l) => !(l.slug === slug && l.duration === d))),
      update: (slug, d, patch) =>
        setLines((prev) => merge(prev.map((l) => (l.slug === slug && l.duration === d ? { ...l, ...patch } : l)))),
      setCoupon,
      clear: () => {
        setLines([]);
        setCoupon(null);
      },
    };
  }, [lines, coupon]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
