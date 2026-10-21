import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getServiceStatus } from "@/lib/store.functions";
import { PRODUCTS, STATUS_LABEL } from "@/lib/catalog";
import { PageHead, SectionHead, StatusDot } from "@/components/site/ui";

const statusQuery = queryOptions({ queryKey: ["status"], queryFn: () => getServiceStatus() });
const LABEL = { operational: "Operational", unverified: "Unverified", not_configured: "Not configured" } as const;

export const Route = createFileRoute("/status")({
  loader: ({ context }) => context.queryClient.ensureQueryData(statusQuery),
  head: () => ({
    meta: [
      { title: "Status — Nuvina.wtf" },
      { name: "description", content: "Live status of Nuvina.wtf services and products." },
      { property: "og:title", content: "Status — Nuvina.wtf" },
      { property: "og:description", content: "Service and product status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  const { data } = useSuspenseQuery(statusQuery);
  return (
    <>
      <PageHead kicker="/ Status" title="System status">States reflect real configuration checks. Services not verified are never shown as operational.</PageHead>
      <div className="container-x space-y-14 py-10">
        <section>
          <SectionHead index="/ 01" title="Services" action={<span className="font-mono text-[11px] text-muted-foreground">checked {new Date(data.checkedAt).toLocaleTimeString("pt-BR")}</span>} />
          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {data.services.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <div className="text-[13.5px]">{s.name}</div>
                  <div className="text-[12px] text-muted-foreground">{s.note}</div>
                </div>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"><StatusDot state={s.state} />{LABEL[s.state]}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <SectionHead index="/ 02" title="Products (demo)" />
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <div key={p.slug} className="flex items-center justify-between bg-card px-4 py-3">
                <div><div className="text-[13.5px]">{p.name}</div><div className="text-[12px] text-muted-foreground">{p.game}</div></div>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase text-muted-foreground"><StatusDot state={p.status} />{STATUS_LABEL[p.status]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
