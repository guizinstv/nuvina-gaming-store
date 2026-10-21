import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/catalog";
import { DISCORD_URL } from "@/lib/config";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHead, StatusDot, btn } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nuvina.wtf — Your advantage. Your rules." },
      { name: "description", content: "Premium gaming tools, built for performance. Simple, reliable and ready when you are." },
      { property: "og:title", content: "Nuvina.wtf — Your advantage. Your rules." },
      { property: "og:description", content: "Premium gaming tools, built for performance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STRIP = [
  { k: "01", t: "Digital delivery", d: "Keys delivered to your dashboard" },
  { k: "02", t: "Server-validated orders", d: "Prices computed server-side" },
  { k: "03", t: "Product updates", d: "Status tracked per product" },
  { k: "04", t: "Customer support", d: "Ticket-based help" },
];

function Index() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x py-16 md:py-24">
          <Link to="/status" className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground hover:text-foreground">
            <StatusDot state="unverified" /> View system status
          </Link>
          <h1 className="mt-6 max-w-3xl text-[44px] font-semibold leading-[0.98] tracking-[-0.045em] md:text-[72px]">
            Your advantage.
            <br />
            <span className="text-muted-foreground">Your rules.</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Premium gaming tools, built for performance. Simple, reliable and ready when you are.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link to="/products" className={btn({ size: "lg" })}>
              Explore products <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {DISCORD_URL ? (
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={btn({ variant: "outline", size: "lg" })}>Join our community</a>
            ) : (
              <span className={btn({ variant: "outline", size: "lg", className: "cursor-not-allowed opacity-50" })} title="Community link not configured yet">Join our community</span>
            )}
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container-x grid grid-cols-2 md:grid-cols-4">
            {STRIP.map((s, i) => (
              <div key={s.k} className={`py-5 pr-4 ${i > 0 ? "md:border-l md:border-border md:pl-5" : ""} ${i % 2 === 1 ? "border-l border-border pl-5 md:pl-5" : ""}`}>
                <div className="label-mono">{s.k}</div>
                <div className="mt-2 text-[13px] font-medium">{s.t}</div>
                <div className="text-[12px] text-muted-foreground">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pt-16">
        <SectionHead
          index="/ 01"
          title="Catalog"
          action={<Link to="/products" className="text-[12.5px] text-muted-foreground hover:text-foreground">All products →</Link>}
        />
        <div className="mb-4 font-mono text-[11px] text-muted-foreground">Demo listings — placeholder products until the real catalog is published.</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.slice(0, 6).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>
    </>
  );
}
