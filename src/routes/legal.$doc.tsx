import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHead } from "@/components/site/ui";

const DOCS: Record<string, { title: string; body: string[] }> = {
  terms: { title: "Terms of Service", body: ["Draft — replace with your reviewed legal text.", "Products are digital goods licensed for personal use for the purchased duration.", "You are responsible for complying with the terms of any third-party software or game you use."] },
  privacy: { title: "Privacy Policy", body: ["Draft — replace with your reviewed legal text.", "We collect only the data needed to deliver licenses and support your account.", "Payment details are handled by the payment provider and never stored by us."] },
  refund: { title: "Refund Policy", body: ["Draft — replace with your reviewed legal text.", "Unredeemed keys may be eligible for a refund within a limited period.", "Redeemed keys are generally non-refundable, except where required by law."] },
};

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    if (!DOCS[params.doc]) throw notFound();
    return { doc: params.doc };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? DOCS[loaderData.doc].title : "Legal";
    return {
      meta: [
        { title: `${t} — Nuvina.wtf` },
        { name: "description", content: `${t} for Nuvina.wtf.` },
        { property: "og:title", content: `${t} — Nuvina.wtf` },
        { property: "og:description", content: `${t} for Nuvina.wtf.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: Legal,
});

function Legal() {
  const { doc } = Route.useLoaderData();
  const d = DOCS[doc];
  return (
    <>
      <PageHead kicker="/ Legal" title={d.title} />
      <div className="container-x max-w-2xl space-y-4 py-8 text-[14px] leading-relaxed text-muted-foreground">
        {d.body.map((b) => <p key={b}>{b}</p>)}
      </div>
    </>
  );
}
