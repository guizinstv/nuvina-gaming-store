import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, DURATION_LABEL, formatBRL, fromPrice, type Product } from "@/lib/catalog";
import { ProductArt, StatusPill } from "./ui";

export function ProductCard({ p }: { p: Product }) {
  const cat = CATEGORIES.find((c) => c.id === p.category)?.label ?? "";
  return (
    <Link
      to="/products/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col rounded-lg border border-border bg-card transition-colors duration-100 hover:border-border-strong"
    >
      <ProductArt code={p.code} category={cat} className="aspect-[16/9] rounded-t-lg border-b border-border" />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-muted-foreground">{p.game}</span>
          <StatusPill status={p.status} />
        </div>
        <h3 className="mt-1.5 text-[15px] font-medium tracking-tight">{p.name}</h3>
        <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">{p.short}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {p.plans.map((pl) => (
            <span key={pl.duration} className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">
              {DURATION_LABEL[pl.duration]}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="label-mono text-[10px]">From</div>
            <div className="font-mono text-[15px] tabular-nums">{formatBRL(fromPrice(p))}</div>
          </div>
          <span className="inline-flex items-center gap-1 text-[12.5px] text-muted-foreground transition-colors group-hover:text-foreground">
            View product <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
