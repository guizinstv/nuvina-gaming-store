import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Logo, btn } from "./ui";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/faq", label: "FAQ" },
  { to: "/status", label: "Status" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-x flex h-14 items-center gap-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className={btn({ variant: "ghost", size: "sm", className: "hidden sm:inline-flex" })}>
            Log in
          </Link>
          <Link to="/cart" className={btn({ variant: "outline", size: "sm", className: "gap-2" })} aria-label={`Cart, ${count} items`}>
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="font-mono text-[12px] tabular-nums">{count}</span>
          </Link>
          <button className={btn({ variant: "ghost", size: "icon", className: "md:hidden" })} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border md:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-2">
            {[...NAV, { to: "/login", label: "Log in" } as const].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border py-3 text-[14px] text-muted-foreground last:border-0 data-[status=active]:text-foreground">
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
