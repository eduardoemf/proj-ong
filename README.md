# ONG Esperança

## Visão Geral

Aplicação de página única (SPA) para apresentar projetos sociais e gerenciar inscrições de voluntários da ONG Esperança. A interface é construída com HTML5 e CSS3, e seu comportamento utiliza JavaScript Vanilla com módulos ES6, sem framework de aplicação.

## Funcionalidades

- Navegação entre início, projetos sociais e cadastro de voluntários sem recarregar a página, usando a History API (`pushState` e `popstate`).
- Validação de formulários com Constraint Validation API e expressões regulares para CPF, telefone e CEP.
- Máscaras de entrada para CPF, telefone e CEP.
- Persistência local dos cadastros no `localStorage` do navegador, com listagem dos voluntários cadastrados.
- Feedback de sucesso e erro com diálogos do SweetAlert2.

## Dependências

O projeto não requer gerenciador de pacotes nem etapa de build. A única biblioteca externa é o SweetAlert2, carregado via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

É necessária conexão com a internet para carregar essa dependência. Os demais recursos usam APIs nativas do navegador.

## Execução Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/eduardoemf/proj-ong.git
   ```

2. Abra a pasta `proj-ong` no editor, por exemplo, no Visual Studio Code.
3. No VS Code, instale ou habilite a extensão **Live Server**.
4. Abra `index.html` e selecione **Open with Live Server**.
5. Acesse o endereço local apresentado pelo Live Server.

Use um servidor local em vez de abrir o HTML diretamente com `file://`: os módulos ES6 são carregados via `import` e podem ser bloqueados pelo navegador por restrições de CORS nesse modo.

Os dados de voluntários ficam apenas no `localStorage` do navegador e da origem local em que foram cadastrados; não são enviados a um servidor.

## Versionamento

Todas as modificações futuras devem seguir o **GitFlow**: `main` contém versões estáveis, `develop` integra as mudanças e branches de trabalho são criadas a partir de `develop`. Use prefixos que indiquem o propósito, como `feature/`, `fix/` e `docs/`; após integrar e validar uma branch, remova-a.

As mensagens de commit seguem **Conventional Commits**, no formato `<tipo>: <descrição>`. Exemplos:

- `feat: adiciona cadastro de voluntários`
- `fix: corrige validação do telefone`
- `docs: atualiza instruções de execução`

As versões seguem **SemVer** (`MAJOR.MINOR.PATCH`): incremente `MAJOR` para mudanças incompatíveis, `MINOR` para funcionalidades compatíveis e `PATCH` para correções compatíveis.