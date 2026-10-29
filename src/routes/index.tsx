import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, LineChart, Timer } from "lucide-react";
import { Page } from "@/components/fit/Shell";
import hero from "@/assets/fitstart-hero.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitStart — Comece seus treinos hoje" },
      { name: "description", content: "Treinos simples, acompanhamento e constância para você evoluir na academia." },
      { property: "og:title", content: "FitStart — Comece seus treinos hoje" },
      { property: "og:description", content: "Treinos simples, acompanhamento e constância." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const beneficios = [
  { icon: Timer, t: "Treinos simples", d: "Rotinas curtas e objetivas, prontas para você seguir." },
  { icon: LineChart, t: "Acompanhamento", d: "Veja sua evolução semana a semana, sem complicação." },
  { icon: Flame, t: "Constância", d: "Lembretes e metas para manter o ritmo todos os dias." },
];

function Index() {
  return (
    <Page>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={hero.url}
          alt="Atleta fazendo levantamento terra em academia com iluminação vermelha"
          className="absolute inset-0 -z-20 size-full object-cover object-[72%_center] md:object-center"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40 md:bg-gradient-to-r md:from-ink md:via-ink/75 md:to-transparent" />
        <div className="mx-auto flex min-h-[560px] max-w-6xl items-end px-4 py-16 sm:py-24 md:min-h-[640px] md:items-center">
          <div className="max-w-xl">
            <p className="inline-block rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-bold text-ink-foreground">Seu primeiro passo</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl break-words">
              Cada treino conta. <span className="text-success">Comece hoje.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg opacity-90">
              O FitStart organiza seus treinos para você focar no que importa: aparecer e evoluir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/cadastro" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground hover:brightness-110">
                Começar agora <ArrowRight className="size-5" aria-hidden />
              </Link>
              <Link to="/entrar" className="inline-flex items-center justify-center rounded-full border border-ink-foreground/40 bg-ink/40 px-7 py-3.5 font-bold hover:bg-ink-foreground/10">
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="beneficios">
        <h2 id="beneficios" className="font-display text-4xl font-extrabold uppercase">Por que FitStart?</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {beneficios.map(({ icon: Icon, t, d }) => (
            <li key={t} className="rounded-2xl border border-border bg-card p-6">
              <span className="grid size-12 place-items-center rounded-xl bg-accent text-success">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-2xl font-extrabold uppercase">{t}</h3>
              <p className="mt-1 text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
