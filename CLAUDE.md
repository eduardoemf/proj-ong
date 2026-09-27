# Instruções do Projeto

## Projeto

ONG Esperança é uma SPA multipágina construída com HTML5, CSS3 e JavaScript Vanilla em módulos ES6. O Vite fornece o servidor de desenvolvimento e o build de produção; não há framework de interface.

- `index.html` e `html/*.html` são entradas HTML independentes do build. Mantenha cabeçalho, navegação, skip link e controle de tema consistentes entre elas.
- `js/app.js` inicializa o comportamento global, restaura o tema e registra eventos delegados.
- `js/router.js` controla a navegação SPA; `js/templates.js` mantém o conteúdo de rotas e a lista de voluntários; `js/formHandler.js` contém máscaras, validação e persistência dos formulários.
- `css/style.css` concentra o design system, responsividade, acessibilidade e tokens visuais.
- `dist/` e `node_modules/` são gerados ou instalados. Altere os arquivos-fonte, não os artefatos gerados.

## Comandos

- `npm run dev`: iniciar o servidor de desenvolvimento Vite.
- `npm run build`: validar e gerar o build multipágina em `dist/`.
- Atualmente não há scripts automatizados de teste ou lint no `package.json`.

Execute `npm run build` após mudanças de código. Para mudanças de interface, valide também no navegador os fluxos afetados, incluindo teclado e viewport móvel quando aplicável.

## Convenções de Implementação

- Preserve JavaScript Vanilla, módulos ES6, APIs públicas existentes e os nomes em português já usados no código.
- Mantenha HTML semântico e os recursos WCAG 2.1 AA existentes: landmarks, skip link, foco visível, navegação por teclado, anúncios `aria-live` e erros de formulário associados aos campos.
- Mantenha o tema baseado em custom properties. Sem preferência salva, respeite `prefers-color-scheme`; valores explícitos `light`/`dark` são persistidos na chave `tema` do `localStorage`. Evite cores inline que contornem os tokens de tema.
- Ao alterar uma navegação ou formulário, verifique as páginas HTML estáticas e os templates SPA aplicáveis.
- Faça mudanças pequenas e relacionadas ao pedido. Não sobrescreva alterações existentes nem faça limpeza ou refatoração não solicitada.

## GitFlow Obrigatório

Todas as modificações futuras devem seguir o GitFlow do repositório:

1. Comece de `develop` atualizado; não trabalhe diretamente em `main` ou `develop`.
2. Crie uma branch de trabalho com prefixo apropriado: `feature/`, `fix/` ou `docs/`.
3. Valide as mudanças e use mensagens de commit Conventional Commits, por exemplo `feat: ...`, `fix: ...` ou `docs: ...`.
4. Integre a branch em `develop` e promova as mudanças validadas para `main`; remova a branch local após a integração.
5. Faça push para o remoto somente quando solicitado explicitamente.

Confira `git status` antes de editar ou integrar. Nunca descarte mudanças locais nem use operações destrutivas de Git sem autorização explícita.
