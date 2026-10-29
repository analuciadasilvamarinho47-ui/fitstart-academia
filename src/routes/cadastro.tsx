import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { AuthCard, DemoNotice, Field, Page, btnPrimary, inputCls } from "@/components/fit/Shell";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — FitStart" },
      { name: "description", content: "Crie sua conta FitStart e comece a treinar." },
      { property: "og:title", content: "Criar conta — FitStart" },
      { property: "og:description", content: "Crie sua conta FitStart e comece a treinar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cadastro,
});

const schema = z
  .object({
    nome: z.string().trim().min(2, "Informe seu nome (mínimo 2 letras).").max(100, "Nome muito longo."),
    email: z.string().trim().min(1, "Informe seu e-mail.").email("Digite um e-mail válido.").max(255),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres.").max(100)
      .regex(/[A-Za-z]/, "Inclua ao menos uma letra.").regex(/\d/, "Inclua ao menos um número."),
    confirmar: z.string().min(1, "Confirme sua senha."),
    termos: z.literal(true, { errorMap: () => ({ message: "Você precisa aceitar os termos." }) }),
  })
  .refine((d) => d.senha === d.confirmar, { path: ["confirmar"], message: "As senhas não coincidem." });

type K = "nome" | "email" | "senha" | "confirmar" | "termos";

function Cadastro() {
  const [v, setV] = useState({ nome: "", email: "", senha: "", confirmar: "" });
  const [termos, setTermos] = useState(false);
  const [ver, setVer] = useState(false);
  const [erros, setErros] = useState<Partial<Record<K, string | undefined>>>({});
  const [ok, setOk] = useState(false);

  function enviar(e: FormEvent) {
    e.preventDefault();
    const r = schema.safeParse({ ...v, termos });
    if (!r.success) {
      const f = r.error.flatten().fieldErrors as Partial<Record<K, string[]>>;
      setErros(Object.fromEntries(Object.entries(f).map(([k, m]) => [k, m?.[0]])));
      return;
    }
    setErros({});
    setOk(true);
  }

  const inp = (k: keyof typeof v, label: string, type: string, auto: string) => (
    <Field id={k} label={label} error={erros[k]}>
      <input id={k} type={type} autoComplete={auto} className={inputCls} value={v[k]}
        onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!erros[k]}
        aria-describedby={erros[k] ? `${k}-erro` : undefined} />
    </Field>
  );

  if (ok)
    return (
      <Page>
        <AuthCard title="Conta criada!" subtitle="Cadastro validado com sucesso.">
          <div role="status" className="flex flex-col items-center text-center">
            <CheckCircle2 className="size-16 text-success" aria-hidden />
            <p className="mt-3">Boas-vindas, {v.nome.trim().split(" ")[0]}! Agora é só entrar e começar.</p>
            <Link to="/entrar" className={`${btnPrimary} mt-6`}>Ir para o login</Link>
            <Link to="/" className="mt-3 text-sm font-bold hover:underline">Voltar ao início</Link>
          </div>
          <DemoNotice />
        </AuthCard>
      </Page>
    );

  return (
    <Page>
      <AuthCard title="Criar conta" subtitle="Leva menos de um minuto.">
        <form noValidate onSubmit={enviar} className="space-y-4">
          {inp("nome", "Nome", "text", "name")}
          {inp("email", "E-mail", "email", "email")}
          <Field id="senha" label="Senha" error={erros.senha}>
            <div className="relative">
              <input id="senha" type={ver ? "text" : "password"} autoComplete="new-password"
                className={`${inputCls} pr-12`} value={v.senha} onChange={(e) => setV({ ...v, senha: e.target.value })}
                aria-invalid={!!erros.senha} aria-describedby={erros.senha ? "senha-erro" : "senha-dica"} />
              <button type="button" onClick={() => setVer((x) => !x)} aria-pressed={ver}
                aria-label={ver ? "Ocultar senha" : "Mostrar senha"}
                className="absolute inset-y-0 right-1 my-1 grid w-10 place-items-center rounded-md text-muted-foreground hover:text-foreground">
                {ver ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            {!erros.senha && <p id="senha-dica" className="text-xs text-muted-foreground">Mínimo 8 caracteres, com letras e números.</p>}
          </Field>
          {inp("confirmar", "Confirmar senha", ver ? "text" : "password", "new-password")}
          <div>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={termos} onChange={(e) => setTermos(e.target.checked)}
                aria-invalid={!!erros.termos} aria-describedby={erros.termos ? "termos-erro" : undefined}
                className="mt-0.5 size-4 accent-[var(--success)]" />
              Li e aceito os termos de uso e a política de privacidade.
            </label>
            {erros.termos && <p id="termos-erro" role="alert" className="mt-1 text-sm font-medium text-destructive">{erros.termos}</p>}
          </div>
          <button type="submit" className={btnPrimary}>Criar conta</button>
        </form>
        <p className="mt-6 text-center text-sm">
          Já tem conta? <Link to="/entrar" className="font-bold text-success hover:underline">Entrar</Link>
          {" · "}<Link to="/" className="font-bold hover:underline">Início</Link>
        </p>
        <DemoNotice />
      </AuthCard>
    </Page>
  );
}
