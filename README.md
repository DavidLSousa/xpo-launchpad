<div align="center">
  <img src="https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />
  <h1>🚀 Template Expo Master</h1>
  <p><strong>A fundação definitiva para seus próximos aplicativos de sucesso.</strong></p>
</div>

---

Bem-vindo ao **Template Expo Master**, um esqueleto arquitetural projetado milimetricamente para resolver o maior problema do desenvolvimento de software móvel: _a dívida técnica prematura_.

Nós desenhamos este template para dois mundos:

1. **O Desenvolvedor Júnior**: Encontrará aqui um guia, um guarda-corpo e um GPS. A arquitetura dita as regras e te protege de cometer erros difíceis de reverter, ensinando boas práticas de mercado no processo.
2. **O Desenvolvedor Sênior**: Entregará valor no primeiro dia de trabalho. Chega de perder 3 semanas criando pastas, configurando Linter, ou discutindo onde colocar o `context`. A arquitetura base está escalável e blindada. Seu único trabalho agora é criar a lógica de negócio.

---

## 🏗️ Arquitetura Orientada a Módulos

O sistema abandona o modelo puramente "flat" e adota o conceito de **Domínios (Modules)** para funcionalidades grandes e **Shared** (Compartilhado) para a interface geral. Tudo isso integrado perfeitamente ao _Expo Router_.

### `src/modules/` - Os Templates de Padrões de Projeto

Aqui você não escreve telas soltas. Funcionalidades de escopo fechado possuem seu próprio isolamento (ex: `Login`, `Carrinho`, `Usuários`). Para facilitar sua vida, deixamos dois templates principais que guiam nossos padrões de desenvolvimento:

- 🛡️ **Adapter Template (Clean Architecture)**: Útil para módulos extremamente complexos que requerem isolamento total. Modelos de Domínio Puros, Interfaces explícitas, um ecossistema de Adapters (evitando que a lib de fora suje sua lógica) e injeção centralizada via Context próprio.
- ⚡ **Service Template (Context Simplificado)**: Perfeito para consumo das APIs do dia a dia, usando serviços, hooks customizados limpos, lidando com chamadas assíncronas de um jeito sem dor.

### `src/app/` - Roteamento por Pastas

Tirando proveito máximo do **Expo Router**, nós mantemos um pareamento claro com a estrutura do file-system, incluindo a divisão moderna para layouts como `(tabs)` e modals. Foco puramente em UI.

### `src/shared/` - O Core da sua UI

Nossa "biblioteca" interna blindada.

- **`components/`**: Arquitetura visual inspirada em _Atomic Design_. Tudo organizado em pastas (`/layout`, `/buttons`, `/feedback`, `/overlays`, `/icons`, `/typography`). Reutilize em qualquer lugar.
- **`constants/`**: Nada de "Magic Numbers" e Cores soltas ('#FF0000'). Todos os **Spacings**, **Colors** e **Typography** seguem Design Tokens rigorosos.
- **`utils/` & `context/`**: Ferramentas genéricas do dia a dia (formatadores, validadores globais) e provedores magnos (ex: App Providers).

### Configurações Globais Robustas Base

O template já nasce falando fluente em **React Query** (TanStack) para cache e dados de rede mutáveis, **i18n** configurado para a Internacionalização fácil das suas strings, e **Dark/Light Theme** integrado desde a camada base do roteamento.

---

## 🔒 Segurança de Qualidade (Lint & Husky)

Nunca mais deixe código "sujo" poluir seu repositório. O template é guardado a cadeados por mecanismos automáticos de qualidade locais no processo do Git:

- **Husky / Commitlint**: Seus commits não entram no hitórico sem respeitar o _Conventional Commits_ (ex: `feat: add awesome button`, `fix: header padding`).
- **Lint-Staged**: Apenas os arquivos que você tocou serão processados no pre-commit por Prettier (formatação) e ESLint (Regras rígidas em conjunto com Typescript v9 Flat Config).

---

## 🧶 Desempenho e Pacotes: O uso do Yarn

Migramos do clássico NPM para resolver de vez problemas de dependências de árvore conflituosas _(peerDependencies)_ com React v19+ e Expo SDK 50+. A gestão de pacotes por **Yarn** garante logs limpos, auditorias (`yarn audit`) velozes e controle determinístico e cravado via `resolutions`.

---

## 🛠️ O Makefile: Seu Operador DevOps do Dia a Dia

Aborrecido com rodar comandos enormes pra buildar? Centralizamos tudo no Makefile. Ele aceita parâmetros fáceis!

### Comandos de Desenvolvimento e Gestão

```bash
# Rodando a aplicação
make run            # Inicia o Expo server (Go)
make run-a          # Roda o Build nativo Android (simulador/device) diretamente da máquina local

# Gestão de Código
make lint-fix       # Mágica de formatação e cura de warning nos arquivos.
make test           # Roda o Jest configurado velozmente

# Gerenciamento de Pacotes (Yarn Encapsulado)
make install        # Instalar tudo (yarn install)
make add PKG=axios  # Fácil, não? (yarn add axios)
make remove PKG=x   # Remover dependência (yarn remove x)
make audit-fix      # Analisa possíveis furos de vulnerabilidade das libs.
```

### O Fluxo de Build Profissional e Versionamento (XPO CLI)

Em vez de scripts enormes no Makefile, adotamos por padrão em nossa arquitetura a **XPO CLI** ([github.com/DavidLSousa/xpo](https://github.com/DavidLSousa/xpo)). Ela abstrai toda a orquestração complexa de builds com o EAS.

Quer aumentar a versão (`1.0.0` para `1.0.1`), cuidar do buildNumber/versionCode do `app.json` com backup automático e submeter para as Lojas (ou gerar um APK local) em um único comando blindado de erros?

```bash
xpo build android --local --profile production --bump patch
```

O sistema altera e salva preventivamente o `app.json`, orquestra credenciais críticas da Apple/Google e engatilha o servidor do **EAS Build** de forma fluida, limpa e visando seu DevEx!

---

<br />

> _Explore os arquivos e templates em `/docs` ou `/modules` para maiores orientações sob os fluxos internos. O palco está montado, hora do show!_ 🎸
