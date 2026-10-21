import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { formatBRL } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { quoteOrder } from "@/lib/store.functions";
import { Button, PageHead, btn, inputCls } from "@/components/site/ui";
import { OrderSummary } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Nuvina.wtf" },
      { name: "description", content: "Secure checkout." },
      { property: "og:title", content: "Checkout — Nuvina.wtf" },
      { property: "og:description", content: "Secure checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const cart = useCart();
  const quote = useServerFn(quoteOrder);
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  if (cart.lines.length === 0) {
    return (
      <>
        <PageHead kicker="/ Checkout" title="Checkout" />
        <div className="container-x py-16 text-center">
          <p className="text-[14px] text-muted-foreground">Your cart is empty.</p>
          <Link to="/products" className={btn({ className: "mt-5" })}>Browse products</Link>
        </div>
      </>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMsg({ kind: "error", text: "Enter a valid email address." });
    if (!agree) return setMsg({ kind: "error", text: "You must accept the Terms and Refund Policy." });
    setBusy(true);
    try {
      const r = await quote({ data: { lines: cart.lines, coupon: cart.coupon?.code } });
      if (!r.ok) setMsg({ kind: "error", text: r.error });
      else if (!r.gatewayConfigured)
        setMsg({ kind: "info", text: `Order validated on the server (${formatBRL(r.total)}), but checkout is unavailable: no payment gateway is connected yet. You have not been charged.` });
      else setMsg({ kind: "info", text: "Redirecting to the payment provider…" });
    } catch {
      setMsg({ kind: "error", text: "Could not reach the server. Try again." });
    } finally { setBusy(false); }
  };

  return (
    <>
      <PageHead kicker="/ Checkout" title="Checkout" />
      <div className="container-x grid gap-8 py-8 lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} className="rounded-lg border border-border bg-card p-6" noValidate>
          <div className="mb-5 flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-[12.5px]">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />Payment gateway</span>
            <span className="font-mono text-muted-foreground">NOT CONNECTED</span>
          </div>
          <label htmlFor="email" className="label-mono">Email for delivery</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} mt-2`} placeholder="you@domain.com" autoComplete="email" />
          <div className="mt-6 label-mono">Payment</div>
          <div className="mt-2 rounded-md border border-dashed border-border p-5 text-[13px] text-muted-foreground">
            Card and PIX details are entered on the payment provider's secure page — never on this site.
          </div>
          <label className="mt-6 flex items-start gap-2 text-[13px] text-muted-foreground">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[var(--primary)]" />
            <span>I accept the <Link to="/legal/$doc" params={{ doc: "terms" }} className="text-foreground underline">Terms</Link> and <Link to="/legal/$doc" params={{ doc: "refund" }} className="text-foreground underline">Refund Policy</Link>.</span>
          </label>
          {msg && (
            <div role="alert" className={`mt-5 rounded-md border px-3 py-2.5 text-[13px] ${msg.kind === "error" ? "border-destructive/40 text-destructive" : "border-border text-muted-foreground"}`}>{msg.text}</div>
          )}
          <Button type="submit" variant="accent" size="lg" className="mt-6 w-full" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-3.5 w-3.5" />} Pay securely
          </Button>
        </form>
        <OrderSummary />
      </div>
    </>
  );
}
