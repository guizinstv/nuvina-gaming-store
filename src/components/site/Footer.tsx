import { Link } from "@tanstack/react-router";
import { Logo } from "./ui";
import { DISCORD_URL } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="container-x grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[13px] text-muted-foreground">Independent digital storefront for gaming software and tools.</p>
        </div>
        <div className="flex flex-col gap-2 text-[13px]">
          <span className="label-mono mb-1">Legal</span>
          <Link to="/legal/$doc" params={{ doc: "terms" }} className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
          <Link to="/legal/$doc" params={{ doc: "privacy" }} className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
          <Link to="/legal/$doc" params={{ doc: "refund" }} className="text-muted-foreground hover:text-foreground">Refund Policy</Link>
        </div>
        <div className="flex flex-col gap-2 text-[13px]">
          <span className="label-mono mb-1">Help</span>
          <Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link>
          <Link to="/support" className="text-muted-foreground hover:text-foreground">Support</Link>
          {DISCORD_URL ? (
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">Community</a>
          ) : (
            <span className="text-muted-foreground/50">Community — soon</span>
          )}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex h-11 items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>© {year} nuvina.wtf</span>
          <span>BRL · Digital goods</span>
        </div>
      </div>
    </footer>
  );
}
