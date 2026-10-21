import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { keyauthLogin } from "@/lib/store.functions";
import { Button, Logo, inputCls } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Nuvina.wtf" },
      { name: "description", content: "Sign in to manage your licenses and subscriptions." },
      { property: "og:title", content: "Log in — Nuvina.wtf" },
      { property: "og:description", content: "Sign in to your Nuvina.wtf account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const login = useServerFn(keyauthLogin);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (username.trim().length < 3) return setErr("Username must be at least 3 characters.");
    if (password.length < 6) return setErr("Password must be at least 6 characters.");
    setBusy(true);
    try {
      const r = await login({ data: { username, password } });
      if (!r.ok) setErr(r.error);
    } catch {
      setErr("Authentication failed. Try again.");
    } finally { setBusy(false); }
  };

  return (
    <div className="container-x flex justify-center py-16 md:py-24">
      <div className="w-full max-w-sm">
        <Logo />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">{mode === "login" ? "Log in" : "Create account"}</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Access your dashboard, subscriptions and keys.</p>
        <div className="mt-6 grid grid-cols-2 rounded-md border border-border p-0.5">
          {(["login", "register"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setErr(null); }} className={cn("h-8 rounded-sm text-[12.5px]", mode === m ? "bg-secondary text-foreground" : "text-muted-foreground")}>
              {m === "login" ? "Log in" : "Register"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} noValidate className="mt-5 space-y-4">
          <div>
            <label htmlFor="u" className="label-mono">Username</label>
            <input id="u" value={username} onChange={(e) => setU(e.target.value)} className={`${inputCls} mt-2`} autoComplete="username" maxLength={32} />
          </div>
          <div>
            <label htmlFor="p" className="label-mono">Password</label>
            <div className="relative mt-2">
              <input id="p" type={show ? "text" : "password"} value={password} onChange={(e) => setP(e.target.value)} className={`${inputCls} pr-9`} autoComplete={mode === "login" ? "current-password" : "new-password"} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={show ? "Hide password" : "Show password"}>
                {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
          {err && <p role="alert" className="rounded-md border border-destructive/40 px-3 py-2 text-[12.5px] text-destructive">{err}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}{mode === "login" ? "Log in" : "Create account"}
          </Button>
        </form>
        <p className="mt-6 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Authentication by license server</p>
      </div>
    </div>
  );
}
