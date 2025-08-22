# CLAUDE.md - Stock Analysis Frontend MVP

## 🎯 Project Overview

You are helping build a **Stock/ETF Analysis Web Application** MVP called InvestPal using modern React/Next.js stack. This is a financial data visualization and AI analysis tool for investors.

### Target Users

- Beginner to advanced investors
- Users want quick stock analysis with AI insights
- Focus on usability and clean financial data presentation

### MVP Core Features

1. **Stock Search** - Search by ticker/company name
2. **Interactive Charts** - TradingView Lightweight Charts with candlesticks
3. **Real-time Data** - Live stock prices and basic info
4. **AI Analysis** - Gemini 2.5 Pro integration for stock insights
5. **Local Storage** - Save favorites and user preferences
6. **Responsive Design** - Works on desktop and mobile

---

## 🛠 Tech Stack

### Core Framework

- **Nx Monorepo** (workspace management)
- **Next.js 14+** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (styling)
- **Custom Design System** (based on shadcn/ui)

### Key Libraries

- **TradingView Lightweight Charts** (financial charts)
- **React Query/TanStack Query** (API state management)
- **Zustand** (client state)
- **Zod** (validation)
- **date-fns** (date utilities)

### External APIs

- **Alpha Vantage** (free tier - stock data)
- **Yahoo Finance API** (fallback/additional data)
- **Google Gemini 2.5 Pro** (AI analysis)

---

## 📁 Nx Monorepo Structure

```
investPal/
├── apps/
│   └── web/                    # Next.js frontend app
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   │   ├── (home)/    # Home page group
│       │   │   ├── stock/     # Stock detail pages
│       │   │   ├── globals.css
│       │   │   └── layout.tsx
│       │   ├── lib/           # App-specific utilities
│       │   │   ├── api/       # API clients
│       │   │   └── stores/    # Zustand stores
│       │   ├── components/    # App-specific components
│       │   └── hooks/         # App-specific hooks
│       ├── tailwind.config.js
│       └── next.config.js
├── libs/
│   ├── ui/                    # Custom Design System Library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/  # Core UI components
│   │   │   │   │   ├── button/
│   │   │   │   │   ├── card/
│   │   │   │   │   ├── input/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── charts/      # Financial chart components
│   │   │   │   │   ├── stock-chart/
│   │   │   │   │   ├── price-display/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── financial/   # Finance-specific components
│   │   │   │   │   ├── stock-card/
│   │   │   │   │   ├── metrics-grid/
│   │   │   │   │   └── index.ts
│   │   │   │   └── utils/       # Design system utilities
│   │   │   │       ├── cn.ts
│   │   │   │       ├── variants.ts
│   │   │   │       └── colors.ts
│   │   │   └── index.ts
│   │   ├── tailwind.config.js   # Design system config
│   │   └── package.json
│   ├── shared-types/          # TypeScript interfaces
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── stock.ts
│   │   │   │   ├── api.ts
│   │   │   │   └── user.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── data-access/           # API and data utilities
│       ├── src/
│       │   ├── lib/
│       │   │   ├── clients/   # API clients
│       │   │   ├── hooks/     # Shared hooks
│       │   │   └── utils/     # Data utilities
│       │   └── index.ts
│       └── package.json
├── nx.json
├── package.json
└── tsconfig.base.json
``` 

## 1) Problem & Objectives
- Let users search stocks/ETFs and see: price history, candlesticks, technical indicators, key fundamentals, and AI‑generated insights.
- Multi‑agent analysis: separate agents for fundamentals, technicals, risk; one master agent aggregates conclusions and visuals.
- Ship a **usable MVP** quickly, then iterate with data coverage, performance, and reliability.

## 2) Core User Flows (MVP)
1. Search a ticker → resolve instrument → land on Overview.
2. Overview shows: price chart, quick metrics, latest filings/financials summary, and AI Insight Block.
3. Drilldowns: **Chart**, **Fundamentals**, **Indicators**, **AI Analysis**, **Watchlist**.
4. Persist watchlist and basic settings locally; later: user accounts.

## 3) High‑Level Architecture
- **Frontend**: React/Next.js (app router ok), TypeScript, shadcn/ui + Tailwind, Nx monorepo with `ui` lib.
- **Backend API**: Node/TypeScript w/ Fastify or NestJS; REST (MVP) + later GraphQL gateway.
- **Data Layer**: External market/fundamentals providers (abstract via adapters); Postgres for caching + user data.
- **AI Layer**: Tool‑driven agents with a coordinator; tasks: summarise filings, compute indicator narratives, risk factors.
- **Infra**: Vercel (web) + Fly.io/Render (API) for MVP; Postgres (neon/supabase).

## 4) Repo & Packages (Nx)
- `apps/web` — Next.js app (public site).
- `apps/api` — HTTP API.
- `libs/ui` — shadcn‑based design system (re‑exported components, tokens).
- `libs/shared` — types, Zod schemas, utils.
- `libs/agents` — agent tools, prompts, orchestrator client.
- `libs/data` — SDK for market/fundamental providers; caching helpers.
- `libs/testing` — test utils/mocks.

## 5) Conventions
- TypeScript strict mode; ESLint + Prettier.
- UI: shadcn/ui patterns; accessibility first; server components where useful.
- Data contracts via Zod; IO boundary validated at API edges.
- Commit messages Conventional Commits; trunk‑based w/ short‑lived branches; CI required for merge.

### Conventions (extracted)

## 🎯 Project Overview

You are helping build a **Stock/ETF Analysis Web Application** MVP called InvestPal using modern React/Next.js stack. This is a financial data visualization and AI analysis tool for investors.

### Target Users

- Beginner to advanced investors
- Users want quick stock analysis with AI insights
- Focus on usability and clean financial data presentation

### MVP Core Features

1. **Stock Search** - Search by ticker/company name
2. **Interactive Charts** - TradingView Lightweight Charts with candlesticks
3. **Real-time Data** - Live stock prices and basic info
4. **AI Analysis** - Gemini 2.5 Pro integration for stock insights
5. **Local Storage** - Save favorites and user preferences
6. **Responsive Design** - Works on desktop and mobile

---

## 6) Step‑by‑Step Implementation Plan

### Sprint 0 — Foundations (1 week)
- Bootstrap Nx monorepo; add `apps/web`, `libs/ui`, `libs/shared`.
- Configure Tailwind + shadcn/ui; add base tokens (spacing, radius, color scale).
- Set ESLint/Prettier/husky; configure tsconfig path aliases.
- Scaffold minimal Next 14 app router layout and health page.

### Sprint 1 — Design System + Shell
- Build `Header`, `Sidebar`, `PageHeader`, `Card`, `Table`, `Tabs`, `Badge`, `Skeleton`, `Toast` in `libs/ui`.
- Establish routing skeleton for pages: `/`, `/symbol/[ticker]` with tabs.
- Add dark/light theme toggle and responsive layout.

### Sprint 2 — Data Adapter & API (MVP)
- Create `libs/data` with provider interfaces: `PriceProvider`, `FundamentalsProvider`, `NewsProvider`.
- Implement one provider (free/low‑cost) and an in‑memory cache; add rate‑limit guard.
- Stand up `apps/api` with endpoints:
  - `GET /symbols/search?q=`
  - `GET /prices/:ticker?range=...&interval=...`
  - `GET /fundamentals/:ticker`
  - `GET /news/:ticker`
- Add E2E contract tests using Pact or supertest.

### Sprint 3 — Charts & Overview
- Price chart (candles/ohlc + volume) with zoom & range presets.
- Overview metrics: market cap, PE, dividend yield (if available), YTD/1Y performance.
- AI Insight Block (placeholder) reading from mocked agent output.

### Sprint 4 — Agents (MVP)
- `libs/agents`: define tools (fetch fundamentals, indicators, recent news).
- Coordinator prompts: assemble a concise investment brief; include “assumptions” and “data freshness” notes.
- Expose `POST /ai/insight/:ticker` endpoint that calls orchestrator.

### Sprint 5 — Indicators & Fundamentals
- Indicators: SMA, EMA, RSI, MACD; render with toggles and guardrails for empty data.
- Fundamentals page: income/BS/CF key lines + ratios; download CSV.

### Sprint 6 — Persistence & Watchlist
- Local first: watchlist in localStorage + URL state.
- Optional: lightweight auth (email magic link) and a `/watchlist` server page.

### Sprint 7 — Hardening & Observability
- Add logging (pino), metrics (OpenTelemetry to OTLP), error boundaries.
- Rate‑limit and cache headers on API; stale‑while‑revalidate.
- Lighthouse budget & Web Vitals in CI.

## 7) Testing Strategy
- Unit: vitest/jest for libs; React Testing Library for components.
- Integration: supertest against API; contract tests for providers.
- E2E: Playwright for top flows (search → overview → indicators).
- Visual diffs for charts/components (Chromatic optional).

### Local Testing Commands
```bash
# Build design system
npx nx build designSystem

# Run development server
npx nx dev web

# Type checking
npx nx typecheck designSystem
npx nx typecheck web
```

### ThemeProvider Component Testing
The ThemeProvider component has been fixed and tested for:
- **SSR Compatibility** - Prevents hydration mismatches with Next.js
- **LocalStorage Integration** - Persists theme preferences across sessions
- **System Theme Detection** - Automatically detects OS dark/light preference
- **Theme Transitions** - Smooth transitions when switching themes

**Location**: `investPal/designSystem/src/lib/components/ui/ThemeProvider/themeProvider.tsx`

**Usage**:
```tsx
import { ThemeProvider } from '@investpal/designSystem'

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
```

**Testing**:
- Component mounts without errors ✅
- Theme persistence works correctly ✅ 
- System theme detection functional ✅
- No TypeScript errors ✅

## 8) CI/CD
- GitHub Actions: lint, typecheck, test, build, preview deploy.
- Preview environments per PR (Vercel for web; Fly/Render preview for API).
- Tag releases; generate changelog automatically.

## 9) Security & Privacy (MVP)
- No PII stored without explicit auth; environment secrets via GitHub OIDC.
- Input validation at all edges (Zod); deny‑by‑default CORS on API.
- Document data provider ToS; backfill attribution where required.

## 10) Risks & Mitigations
- **Data limits** → use caching, fallback providers, avoid heavy ranges by default.
- **Chart perf** → virtualize series; throttle crosshairs; lazy‑load heavy libs.
- **AI drift** → ground on retrieved data; include citations; show model + timestamp.

## 11) Future (Post‑MVP)
- GraphQL gateway; more indicators; portfolio backtesting.
- User accounts, alerts, notes; mobile app shell (Expo/React Native).
- Paid tiers with higher‑rate providers and longer history windows.
