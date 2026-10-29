# FitStart Academia Fácil

Crie um protótipo funcional chamado FitStart, totalmente separado de qualquer projeto ou repositório chamado "ruflo-projeto".

Objetivo: app simples de academia para teste, em português do Brasil, com interface limpa, moderna, responsiva e acessível.

Telas e navegação:
1. Página inicial com cabeçalho/logo FitStart, navegação para Início, Entrar e Criar conta; hero com mensagem motivacional, CTA "Começar agora" levando ao cadastro e CTA secundário "Já tenho conta" levando ao login; seção curta com 3 benefícios (treinos simples, acompanhamento, constância); rodapé.
2. Tela de login com e-mail, senha, mostrar/ocultar senha, checkbox "Lembrar de mim", link "Esqueci minha senha", validação, mensagens claras e links para início e cadastro.
3. Tela de cadastro com nome, e-mail, senha, confirmação de senha, aceite de termos, validação, mensagens claras e links para início e login.
4. Após envio válido, mostrar feedback visual de sucesso adequado ao protótipo e navegação coerente.

Design:
- visual fitness contemporâneo, fundo claro com áreas escuras, verde vibrante como cor de destaque, boa hierarquia e espaçamento;
- mobile-first, sem barras horizontais, menu responsivo;
- componentes e estados de foco acessíveis;
- não use imagens externas frágeis; prefira ícones e composição visual em CSS/componentes.

Autenticação:
- Se a autenticação Supabase/Lovable estiver imediatamente disponível sem solicitar credenciais ou aprovação adicional, implemente cadastro e login reais.
- Caso contrário, não simule segurança real: mantenha os formulários como demonstração local e exiba discretamente a mensagem "Modo demonstração: nenhum dado é enviado ou armazenado." Não crie backend falso.

Qualidade:
- garanta que todas as rotas e botões funcionem;
- use TypeScript, Tailwind e componentes adequados ao stack padrão do Lovable;
- deixe o projeto pronto para preview e fácil de conectar depois a um repositório GitHub próprio, diferente de ruflo-projeto. Não conecte nem altere nenhum repositório agora.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dbcbafd9-da65-47ea-941e-1d79ea9f2260).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
