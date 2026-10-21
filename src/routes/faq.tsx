import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/site/ui";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Nuvina.wtf" },
      { name: "description", content: "Answers about delivery, licenses, payments and refunds." },
      { property: "og:title", content: "FAQ — Nuvina.wtf" },
      { property: "og:description", content: "Delivery, licenses, payments and refunds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Faq,
});

const ITEMS = [
  ["How do I receive my product?", "Once the payment provider confirms your payment to our server, the license is issued and appears in My Dashboard."],
  ["Which payment methods are accepted?", "Payment methods depend on the connected provider. Checkout is currently unavailable until a provider is connected."],
  ["How do license durations work?", "Each license has its own expiration, starting at activation. Lifetime licenses do not expire while the product is supported."],
  ["What does 'Updating' mean?", "The product is being re-checked after a game update. It may not work until the status returns to Available."],
  ["Is use guaranteed to be safe?", "No. We make no claims of undetectability. Using third-party software may violate a game's terms and result in account action."],
  ["Can I get a refund?", "See the Refund Policy. Keys that have been redeemed are generally non-refundable."],
];

function Faq() {
  return (
    <>
      <PageHead kicker="/ Help" title="Frequently asked questions" />
      <div className="container-x max-w-3xl py-8">
        <div className="divide-y divide-border border-y border-border">
          {ITEMS.map(([q, a], i) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-baseline gap-4 text-[14px] font-medium">
                <span className="font-mono text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{q}
              </summary>
              <p className="mt-2 pl-8 text-[13.5px] text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
