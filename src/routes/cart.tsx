import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { DURATION_LABEL, formatBRL, getProduct, type Duration } from "@/lib/catalog";
import { linePrice, useCart } from "@/lib/cart";
import { validateCoupon } from "@/lib/store.functions";
import { Button, PageHead, ProductArt, btn, inputCls } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Nuvina.wtf" },
      { name: "description", content: "Review your cart." },
      { property: "og:title", content: "Cart — Nuvina.wtf" },
      { property: "og:description", content: "Review your cart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

export function OrderSummary({ cta }: { cta?: React.ReactNode }) {
  const cart = useCart();
  const discount = cart.coupon ? Math.round((cart.subtotal * cart.coupon.percent) / 100) : 0;
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="label-mono mb-4">Summary</div>
      <Row k="Subtotal" v={formatBRL(cart.subtotal)} />
      {cart.coupon && <Row k={`Coupon ${cart.coupon.code} (−${cart.coupon.percent}%)`} v={`− ${formatBRL(discount)}`} />}
      <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
        <span className="text-[13px]">Total</span>
        <span className="font-mono text-xl tabular-nums">{formatBRL(cart.subtotal - discount)}</span>
      </div>
      <p className="mt-2 text-[11.5px] text-muted-foreground">Final amount is recalculated on the server at checkout.</p>
      {cta}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-1 text-[13px]"><span className="text-muted-foreground">{k}</span><span className="font-mono tabular-nums">{v}</span></div>
  );
}

function CartPage() {
  const cart = useCart();
  const check = useServerFn(validateCoupon);
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!code.trim()) return setErr("Enter a coupon code.");
    setBusy(true);
    try {
      const r = await check({ data: { code } });
      if (r.ok) { cart.setCoupon({ code: r.code, percent: r.percent }); setCode(""); }
      else setErr(r.error);
    } catch {
      setErr("Could not validate the coupon. Try again.");
    } finally { setBusy(false); }
  };

  return (
    <>
      <PageHead kicker="/ Cart" title="Your cart" />
      <div className="container-x py-8">
        {cart.lines.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-20 text-center">
            <p className="text-[14px]">Your cart is empty.</p>
            <p className="mt-1 text-[13px] text-muted-foreground">Pick a product and license to get started.</p>
            <Link to="/products" className={btn({ className: "mt-5" })}>Browse products</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="divide-y divide-border rounded-lg border border-border bg-card">
              {cart.lines.map((l) => {
                const p = getProduct(l.slug)!;
                return (
                  <div key={`${l.slug}-${l.duration}`} className="flex gap-4 p-4">
                    <ProductArt code={p.code} category="" className="hidden h-16 w-24 shrink-0 rounded-md border border-border sm:block [&_span]:text-base" />
                    <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="min-w-0 flex-1">
                        <Link to="/products/$slug" params={{ slug: p.slug }} className="text-[14px] font-medium hover:underline">{p.name}</Link>
                        <div className="text-[12px] text-muted-foreground">{p.game}</div>
                      </div>
                      <select aria-label="License" value={l.duration} onChange={(e) => cart.update(l.slug, l.duration, { duration: e.target.value as Duration })} className={cn(inputCls, "h-8 w-32")}>
                        {p.plans.map((pl) => <option key={pl.duration} value={pl.duration}>{DURATION_LABEL[pl.duration]}</option>)}
                      </select>
                      <select aria-label="Quantity" value={l.qty} onChange={(e) => cart.update(l.slug, l.duration, { qty: Number(e.target.value) })} className={cn(inputCls, "h-8 w-16")}>
                        {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                      </select>
                      <div className="w-24 font-mono text-[13px] tabular-nums sm:text-right">{formatBRL(linePrice(l))}</div>
                    </div>
                    <button onClick={() => cart.remove(l.slug, l.duration)} className="self-start text-muted-foreground hover:text-foreground" aria-label={`Remove ${p.name}`}><X className="h-4 w-4" /></button>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3">
              <form onSubmit={apply} className="rounded-lg border border-border bg-card p-5">
                <label htmlFor="coupon" className="label-mono">Coupon</label>
                {cart.coupon ? (
                  <div className="mt-2 flex items-center justify-between text-[13px]">
                    <span className="font-mono">{cart.coupon.code}</span>
                    <button type="button" onClick={() => cart.setCoupon(null)} className="text-muted-foreground hover:text-foreground">Remove</button>
                  </div>
                ) : (
                  <div className="mt-2 flex gap-2">
                    <input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} className={cn(inputCls, "font-mono uppercase")} placeholder="CODE" maxLength={32} />
                    <Button type="submit" variant="outline" disabled={busy}>{busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Apply"}</Button>
                  </div>
                )}
                {err && <p className="mt-2 text-[12px] text-destructive" role="alert">{err}</p>}
              </form>
              <OrderSummary cta={<Link to="/checkout" className={btn({ variant: "accent", size: "lg", className: "mt-4 w-full" })}>Continue to checkout</Link>} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
