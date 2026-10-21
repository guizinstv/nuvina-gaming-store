import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STATUS_LABEL, type Status } from "@/lib/catalog";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[13px] font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background hover:bg-foreground/85",
        accent: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline: "border border-border bg-card text-foreground hover:border-border-strong hover:bg-secondary",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
      },
      size: { sm: "h-8 px-3", md: "h-9 px-4", lg: "h-10 px-5", icon: "h-9 w-9" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof btn>>(
  ({ className, variant, size, ...p }, ref) => <button ref={ref} className={cn(btn({ variant, size }), className)} {...p} />,
);
Button.displayName = "Button";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-baseline font-semibold tracking-[-0.04em] text-[17px]", className)} aria-label="Nuvina.wtf home">
      <span className="text-foreground">nuvina</span>
      <span className="mx-[1px] inline-block h-[5px] w-[5px] translate-y-[-1px] bg-primary" aria-hidden />
      <span className="font-mono text-[13px] font-normal tracking-normal text-muted-foreground">wtf</span>
    </Link>
  );
}

const dot: Record<string, string> = {
  available: "bg-success",
  operational: "bg-success",
  updating: "bg-warning",
  unverified: "bg-warning",
  offline: "bg-destructive",
  not_configured: "bg-muted-foreground",
};

export function StatusDot({ state }: { state: string }) {
  return <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot[state] ?? "bg-muted-foreground")} aria-hidden />;
}

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
      <StatusDot state={status} />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function SectionHead({ index, title, action }: { index: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
      <div className="flex items-baseline gap-3">
        <span className="label-mono">{index}</span>
        <h2 className="text-[15px] font-medium tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function PageHead({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="border-b border-border">
      <div className="container-x py-10 md:py-14">
        <div className="label-mono mb-3">{kicker}</div>
        <h1 className="text-3xl font-semibold tracking-[-0.035em] md:text-4xl">{title}</h1>
        {children && <div className="mt-3 max-w-xl text-[14px] text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}

export function ProductArt({ code, category, className }: { code: string; category: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-surface grid-lines", className)}>
      <div className="absolute inset-0 bg-surface/80" />
      <div className="absolute left-3 top-3 label-mono">{category}</div>
      <div className="absolute bottom-3 right-3 h-px w-10 bg-primary" />
      <div className="relative flex h-full items-center justify-center">
        <span className="font-mono text-4xl font-medium tracking-[0.2em] text-foreground/90">{code}</span>
      </div>
    </div>
  );
}

export const inputCls =
  "h-9 w-full rounded-md border border-input bg-card px-3 text-[13px] text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary";
