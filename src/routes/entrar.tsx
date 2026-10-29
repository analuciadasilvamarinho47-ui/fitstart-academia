import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { AuthCard, DemoNotice, Field, Page, btnPrimary, inputCls } from "@/components/fit/Shell";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — FitStart" },
      { name: "description", content: "Acesse sua conta FitStart." },
      { property: "og:title", content: "Entrar — FitStart" },
      { property: "og:description", content: "Acesse sua conta FitStart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Entrar,
});

const schema = z.object({
  email: z.string().trim().min(1, "Informe seu e-mail.").email("Digite um e-mail válido.").max(255),
  senha: z.string().min(1, "Informe sua senha.").min(6, "A senha deve ter pelo menos 6 caracteres.").max(100),
});
type Erros = Partial<Record<"email" | "senha", string | undefined>>;

function Entrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ver, setVer] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [erros, setErros] = useState<Erros>({});
  const [ok, setOk] = useState(false);

  function enviar(e: FormEvent) {
    e.preventDefault();
    const r = schema.safeParse({ email, senha });
    if (!r.success) {
      const f = r.error.flatten().fieldErrors;
      setErros({ email: f.email?.[0], senha: f.senha?.[0] });
      return;
    }
    setErros({});
    setOk(true);
  }

  if (ok)
    return (
      <Page>
        <AuthCard title="Bem-vindo!" subtitle="Login validado com sucesso.">
          <div role="status" className="flex flex-col items-center text-center">
            <CheckCircle2 className="size-16 text-success" aria-hidden />
            <p className="mt-3">Tudo certo, {email}. Neste protótipo, seu painel de treinos aparecerá aqui.</p>
            <Link to="/" className={`${btnPrimary} mt-6`}>Voltar ao início</Link>
          </div>
          <DemoNotice />
        </AuthCard>
      </Page>
    );

  return (
    <Page>
      <AuthCard title="Entrar" subtitle="Bom te ver de volta. Bora treinar?">
        <form noValidate onSubmit={enviar} className="space-y-4">
          <Field id="email" label="E-mail" error={erros.email}>
            <input id="email" type="email" autoComplete="email" className={inputCls} value={email}
              onChange={(e) => setEmail(e.target.value)} aria-invalid={!!erros.email}
              aria-describedby={erros.email ? "email-erro" : undefined} placeholder="voce@email.com" />
          </Field>
          <Field id="senha" label="Senha" error={erros.senha}>
            <div className="relative">
              <input id="senha" type={ver ? "text" : "password"} autoComplete="current-password"
                className={`${inputCls} pr-12`} value={senha} onChange={(e) => setSenha(e.target.value)}
                aria-invalid={!!erros.senha} aria-describedby={erros.senha ? "senha-erro" : undefined} />
              <button type="button" onClick={() => setVer((v) => !v)} aria-pressed={ver}
                aria-label={ver ? "Ocultar senha" : "Mostrar senha"}
                className="absolute inset-y-0 right-1 my-1 grid w-10 place-items-center rounded-md text-muted-foreground hover:text-foreground">
                {ver ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </Field>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} className="size-4 accent-[var(--success)]" />
              Lembrar de mim
            </label>
            <button type="button" className="font-bold text-success underline-offset-4 hover:underline"
              onClick={() => toast.info("Recuperação de senha indisponível no modo demonstração.")}>
              Esqueci minha senha
            </button>
          </div>
          <button type="submit" className={btnPrimary}>Entrar</button>
        </form>
        <p className="mt-6 text-center text-sm">
          Não tem conta? <Link to="/cadastro" className="font-bold text-success hover:underline">Criar conta</Link>
          {" · "}<Link to="/" className="font-bold hover:underline">Início</Link>
        </p>
        <DemoNotice />
      </AuthCard>
    </Page>
  );
}
