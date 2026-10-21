import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES, DURATION_LABEL, formatBRL, getProduct, type Duration } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { Button, ProductArt, StatusPill } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const title = p ? `${p.name} — ${p.game} · Nuvina.wtf` : "Product · Nuvina.wtf";
    return {
      meta: [
        { title },
        { name: "description", content: p?.short ?? "Product details" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.short ?? "Product details" },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const cart = useCart();
  const [duration, setDuration] = useState<Duration>(p.plans[0].duration);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const plan = p.plans.find((x) => x.duration === duration)!;
  const cat = CATEGORIES.find((c) => c.id === p.category)?.label ?? "";
  const disabled = p.status === "offline";

  const add = () => {
    cart.add({ slug: p.slug, duration, qty });
    toast.success(`${p.name} · ${DURATION_LABEL[duration]} added to cart`, {
      action: { label: "View cart", onClick: () => (window.location.href = "/cart") },
    });
  };

  return (
    <div className="container-x py-8">
      <nav className="mb-6 font-mono text-[11px] text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/products" className="hover:text-foreground">Products</Link> / <span className="text-foreground">{p.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <ProductArt code={p.code} category={`${cat} · view ${shot + 1}`} className="aspect-[16/10] rounded-lg border border-border" />
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button key={i} onClick={() => setShot(i)} aria-label={`Screenshot ${i + 1}`} className={cn("rounded-md border", shot === i ? "border-primary" : "border-border hover:border-border-strong")}>
                <ProductArt code={p.code} category="" className="aspect-[16/10] rounded-md [&_span]:text-sm" />
              </button>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            <Block title="Overview"><p className="text-[14px] leading-relaxed text-muted-foreground">{p.description}</p></Block>
            <Block title="Features">
              <ul className="grid gap-2 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px]"><Check className="mt-0.5 h-3.5 w-3.5 text-primary" />{f}</li>
                ))}
              </ul>
            </Block>
            <Block title="System requirements">
              <dl className="divide-y divide-border rounded-lg border border-border bg-card text-[13px]">
                {p.requirements.map((r, i) => (
                  <div key={r} className="flex gap-4 px-4 py-2.5"><dt className="w-6 font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</dt><dd>{r}</dd></div>
                ))}
              </dl>
            </Block>
            <Block title="FAQ">
              <div className="divide-y divide-border border-y border-border">
                {p.faq.map((f) => (
                  <details key={f.q} className="group py-3">
                    <summary className="cursor-pointer list-none text-[13.5px] font-medium marker:hidden">{f.q}</summary>
                    <p className="mt-2 text-[13px] text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </Block>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border p-5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-muted-foreground">{p.game}</span>
                <StatusPill status={p.status} />
              </div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">{p.name}</h1>
              <p className="mt-1 text-[13px] text-muted-foreground">{p.short}</p>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Demo listing</p>
            </div>
            <div className="p-5">
              <div className="label-mono mb-2">License</div>
              <div className="grid gap-1.5" role="radiogroup" aria-label="License duration">
                {p.plans.map((pl) => (
                  <button
                    key={pl.duration}
                    role="radio"
                    aria-checked={duration === pl.duration}
                    onClick={() => setDuration(pl.duration)}
                    className={cn(
                      "flex h-10 items-center justify-between rounded-md border px-3 text-[13px] transition-colors",
                      duration === pl.duration ? "border-primary bg-secondary" : "border-border hover:border-border-strong",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full border", duration === pl.duration ? "border-primary bg-primary" : "border-border-strong")} />
                      {DURATION_LABEL[pl.duration]}
                    </span>
                    <span className="font-mono tabular-nums">{formatBRL(pl.price)}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="label-mono">Quantity</div>
                <div className="flex items-center rounded-md border border-border">
                  <button className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                  <span className="w-8 text-center font-mono text-[13px] tabular-nums">{qty}</span>
                  <button className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase"><Plus className="h-3 w-3" /></button>
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <span className="label-mono">Total</span>
                <span className="font-mono text-xl tabular-nums">{formatBRL(plan.price * qty)}</span>
              </div>
              <Button variant="accent" size="lg" className="mt-4 w-full" onClick={add} disabled={disabled}>
                {disabled ? "Currently offline" : "Add to cart"}
              </Button>
              <p className="mt-3 text-[12px] text-muted-foreground">Delivery: the license key is issued to your dashboard after the payment is confirmed by our server.</p>
            </div>
            <div className="border-t border-border p-5">
              <div className="mb-2 flex items-center gap-2 text-[12.5px] font-medium"><AlertTriangle className="h-3.5 w-3.5 text-warning" />Requirements & limitations</div>
              <ul className="space-y-1.5 text-[12px] text-muted-foreground">
                {p.limitations.map((l) => <li key={l}>— {l}</li>)}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="label-mono mb-3">{title}</h2>
      {children}
    </section>
  );
}
