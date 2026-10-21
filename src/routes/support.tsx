import { createFileRoute, Link } from "@tanstack/react-router";
import { DISCORD_URL } from "@/lib/config";
import { PageHead, btn } from "@/components/site/ui";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Nuvina.wtf" },
      { name: "description", content: "Get help with orders, licenses and installation." },
      { property: "og:title", content: "Support — Nuvina.wtf" },
      { property: "og:description", content: "Get help with orders and licenses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Support,
});

function Support() {
  return (
    <>
      <PageHead kicker="/ Help" title="Support">Most answers are in the FAQ. For order or license issues, reach us through the community.</PageHead>
      <div className="container-x flex flex-wrap gap-2 py-8">
        <Link to="/faq" className={btn({ variant: "outline" })}>Read the FAQ</Link>
        {DISCORD_URL ? <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={btn()}>Open a ticket on Discord</a> : <span className="self-center text-[13px] text-muted-foreground">Community link not configured yet.</span>}
      </div>
    </>
  );
}
