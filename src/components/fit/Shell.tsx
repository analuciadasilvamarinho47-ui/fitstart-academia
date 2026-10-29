import { Link } from "@tanstack/react-router";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const links = [
  { to: "/", label: "Início" },
  { to: "/entrar", label: "Entrar" },
  { to: "/cadastro", label: "Criar conta" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-md font-display text-2xl font-extrabold uppercase tracking-tight">
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Dumbbell className="size-5" aria-hidden />
      </span>
      Fit<span className="text-success">Start</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: true }}
                  className={
                    l.to === "/cadastro"
                      ? "ml-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:brightness-110"
                      : "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[status=active]:text-foreground data-[status=active]:font-bold"
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-border md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu móvel" className="border-t border-border md:hidden">
          <ul className="flex flex-col p-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: true }}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-medium hover:bg-muted data-[status=active]:bg-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xl font-extrabold uppercase">FitStart</p>
        <p className="opacity-70">© {new Date().getFullYear()} FitStart · Protótipo para testes</p>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function DemoNotice() {
  return (
    <p className="mt-6 text-center text-xs text-muted-foreground" role="note">
      Modo demonstração: nenhum dado é enviado ou armazenado.
    </p>
  );
}

export function Field({
  id, label, error, children,
}: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-bold">{label}</label>
      {children}
      {error && (
        <p id={`${id}-erro`} className="text-sm font-medium text-destructive" role="alert">{error}</p>
      )}
    </div>
  );
}

export const inputCls =
  "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-base outline-none transition focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 aria-[invalid=true]:border-destructive";

export const btnPrimary =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--primary)] transition hover:brightness-95 disabled:opacity-60";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h1 className="font-display text-4xl font-extrabold uppercase">{title}</h1>
        <p className="mt-1 text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
