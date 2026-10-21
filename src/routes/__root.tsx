import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { btn } from "@/components/site/ui";

function NotFoundComponent() {
  return (
    <div className="container-x py-32">
      <div className="label-mono">Error 404</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Nothing here.</h1>
      <p className="mt-2 text-[14px] text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className={btn({ className: "mt-6" })}>Go home</Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="container-x py-32">
      <div className="label-mono">Error</div>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">This page didn't load</h1>
      <p className="mt-2 text-[14px] text-muted-foreground">Something went wrong on our end. Try again or head back home.</p>
      <div className="mt-6 flex gap-2">
        <button onClick={() => { router.invalidate(); reset(); }} className={btn()}>Try again</button>
        <a href="/" className={btn({ variant: "outline" })}>Go home</a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nuvina.wtf" },
      { name: "description", content: "Premium gaming tools, built for performance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#080808" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)", borderRadius: 4, fontSize: 13 } }} />
      </CartProvider>
    </QueryClientProvider>
  );
}
