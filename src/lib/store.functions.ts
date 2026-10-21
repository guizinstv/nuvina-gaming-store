import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getProduct } from "./catalog";

// Server-side coupon table (demo). Prices are always recomputed here, never trusted from the browser.
const COUPONS: Record<string, number> = { DEMO10: 10 };

export const validateCoupon = createServerFn({ method: "POST" })
  .inputValidator((i) => z.object({ code: z.string().trim().min(1).max(32) }).parse(i))
  .handler(async ({ data }) => {
    const code = data.code.toUpperCase();
    const percent = COUPONS[code];
    if (!percent) return { ok: false as const, error: "This coupon is invalid or has expired." };
    return { ok: true as const, code, percent };
  });

const lineSchema = z.object({
  slug: z.string().max(64),
  duration: z.enum(["1d", "7d", "30d", "90d", "lifetime"]),
  qty: z.number().int().min(1).max(10),
});

export const quoteOrder = createServerFn({ method: "POST" })
  .inputValidator((i) =>
    z.object({ lines: z.array(lineSchema).min(1).max(20), coupon: z.string().max(32).optional() }).parse(i),
  )
  .handler(async ({ data }) => {
    let subtotal = 0;
    for (const l of data.lines) {
      const p = getProduct(l.slug);
      const plan = p?.plans.find((x) => x.duration === l.duration);
      if (!p || !plan) return { ok: false as const, error: "One of the items is no longer available." };
      if (p.status === "offline") return { ok: false as const, error: `${p.name} is currently offline.` };
      subtotal += plan.price * l.qty;
    }
    const pct = data.coupon ? (COUPONS[data.coupon.toUpperCase()] ?? 0) : 0;
    const discount = Math.round((subtotal * pct) / 100);
    const gatewayConfigured = Boolean(process.env["PAYMENT_GATEWAY_SECRET"]);
    return { ok: true as const, subtotal, discount, total: subtotal - discount, gatewayConfigured };
  });

export const getServiceStatus = createServerFn({ method: "GET" }).handler(async () => {
  const keyauth = Boolean(process.env["1Lz6tGEw5S"] && process.env["fulldbdloader"]);
  const gateway = Boolean(process.env["PAYMENT_GATEWAY_SECRET"]);
  return {
    checkedAt: new Date().toISOString(),
    services: [
      { id: "website", name: "Website", state: "operational" as const, note: "Responding to this request." },
      { id: "api", name: "API", state: "operational" as const, note: "Server functions reachable." },
      { id: "auth", name: "Authentication", state: keyauth ? ("unverified" as const) : ("not_configured" as const), note: keyauth ? "Configured, not health-checked." : "KeyAuth credentials not set." },
      { id: "checkout", name: "Checkout", state: gateway ? ("unverified" as const) : ("not_configured" as const), note: gateway ? "Configured, not health-checked." : "Payment gateway not connected." },
      { id: "delivery", name: "Digital delivery", state: keyauth && gateway ? ("unverified" as const) : ("not_configured" as const), note: "Depends on checkout and KeyAuth." },
    ],
  };
});

export const keyauthLogin = createServerFn({ method: "POST" })
  .inputValidator((i) => z.object({ username: z.string().trim().min(3).max(32), password: z.string().min(6).max(128) }).parse(i))
  .handler(async () => {
    if (!process.env["1Lz6tGEw5S"] || !process.env["fulldbdloader"]) {
      return { ok: false as const, error: "Sign-in is not available yet: the license server is not configured." };
    }
    return { ok: false as const, error: "Sign-in is being finalized. Please try again later." };
  });
