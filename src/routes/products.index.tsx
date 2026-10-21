import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, fromPrice, type Category } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHead, inputCls } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Nuvina.wtf" },
      { name: "description", content: "Browse gaming software, external and internal tools and utilities." },
      { property: "og:title", content: "Products — Nuvina.wtf" },
      { property: "og:description", content: "Browse gaming software, tools and utilities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

type Sort = "featured" | "asc" | "desc";

function Catalog() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = PRODUCTS.filter((p) => (cat === "all" || p.category === cat) && (!s || `${p.name} ${p.game} ${p.short}`.toLowerCase().includes(s)));
    if (sort !== "featured") r = [...r].sort((a, b) => (sort === "asc" ? fromPrice(a) - fromPrice(b) : fromPrice(b) - fromPrice(a)));
    return r;
  }, [cat, q, sort]);

  const tabs = [{ id: "all" as const, label: "All" }, ...CATEGORIES];

  return (
    <>
      <PageHead kicker="/ Catalog" title="Products">Demo listings shown for layout. Each product lists its own requirements and limitations.</PageHead>
      <div className="container-x pt-6">
        <div className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1" role="tablist" aria-label="Category">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={cat === t.id}
                onClick={() => setCat(t.id)}
                className={cn(
                  "h-8 rounded-md border px-3 text-[12.5px] transition-colors",
                  cat === t.id ? "border-border-strong bg-secondary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
                <span className="ml-1.5 font-mono text-[10.5px] text-muted-foreground">
                  {t.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === t.id).length}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 md:w-60">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className={cn(inputCls, "pl-8")} />
            </label>
            <label>
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={cn(inputCls, "w-auto pr-8")}>
                <option value="featured">Featured</option>
                <option value="asc">Price: low → high</option>
                <option value="desc">Price: high → low</option>
              </select>
            </label>
          </div>
        </div>
        <div className="py-3 font-mono text-[11px] text-muted-foreground">{list.length} result{list.length === 1 ? "" : "s"}</div>
        {list.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        ) : (
          <div className="rounded-lg border border-dashed border-border py-20 text-center text-[13px] text-muted-foreground">No products match your filters.</div>
        )}
      </div>
    </>
  );
}
