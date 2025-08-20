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

---

## 🚀 Development Phases

## Phase 1: Nx Monorepo & Design System Setup (Week 1)

### Step 1.1: Initialize Nx Workspace

```bash
# Create Nx workspace with Next.js
npx create-nx-workspace@latest investPal \
  --preset=next \
  --nextAppDir=true \
  --style=tailwind \
  --packageManager=npm

cd investPal

# Generate additional libraries
nx g @nx/react:lib ui \
  --publishable \
  --bundler=rollup \
  --importPath=@investPal/ui

nx g @nx/js:lib shared-types \
  --publishable \
  --bundler=tsc \
  --importPath=@investPal/shared-types

nx g @nx/js:lib data-access \
  --publishable \
  --bundler=rollup \
  --importPath=@investPal/data-access
```

### Step 1.2: Install Core Dependencies

```bash
# Install in workspace root
npm install @tanstack/react-query zustand zod date-fns lightweight-charts

# Install design system dependencies
npm install @radix-ui/react-slot @radix-ui/react-separator @radix-ui/react-dialog
npm install class-variance-authority clsx tailwind-merge lucide-react

# Development dependencies
npm install -D @types/node tailwindcss-animate
```

### Step 1.3: Setup Custom Design System Foundation

Create the foundation for your custom design system in `libs/ui/`:

#### Design System Tailwind Config (`libs/ui/tailwind.config.js`):

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Financial colors
        bullish: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        bearish: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        // Custom brand colors
        brand: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"], // For financial data
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### Step 1.4: Create Base Design System Utilities

```typescript
// libs/ui/src/lib/utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// libs/ui/src/lib/utils/financial-colors.ts
export const financialColors = {
  bullish: {
    primary: "#22c55e",
    hover: "#16a34a",
    light: "#f0fdf4",
  },
  bearish: {
    primary: "#ef4444",
    hover: "#dc2626",
    light: "#fef2f2",
  },
} as const;
```

### Step 1.5: Create Environment Configuration

```bash
# Create .env.local in apps/web/
touch apps/web/.env.local
```

Add to `apps/web/.env.local`:

```env
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

**Deliverables:**

- [ ] Nx workspace with proper structure
- [ ] Custom design system library setup
- [ ] Tailwind configured for financial theming
- [ ] Environment variables configured
- [ ] Base utilities created

---

## Phase 2: Design System Core Components (Week 1)

### Step 2.1: Create Base UI Components

Build foundational components in `libs/ui/src/lib/components/`:

#### Button Component (`libs/ui/src/lib/components/button/button.tsx`):

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-600 text-white hover:bg-brand-700",
        destructive: "bg-bearish-600 text-white hover:bg-bearish-700",
        outline: "border border-gray-200 bg-white hover:bg-gray-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100",
        bullish: "bg-bullish-600 text-white hover:bg-bullish-700",
        bearish: "bg-bearish-600 text-white hover:bg-bearish-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

#### Card Component (`libs/ui/src/lib/components/card/card.tsx`):

```typescript
import * as React from "react";
import { cn } from "../../utils/cn";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
```

### Step 2.2: Create Financial-Specific Components

#### Price Change Component (`libs/ui/src/lib/financial/price-change/price-change.tsx`):

```typescript
import { cn } from "../../utils/cn";

interface PriceChangeProps {
  value: number;
  percentage?: number;
  showSign?: boolean;
  className?: string;
}

export function PriceChange({
  value,
  percentage,
  showSign = true,
  className,
}: PriceChangeProps) {
  const isPositive = value >= 0;
  const isNeutral = value === 0;

  return (
    <div
      className={cn(
        "flex items-center space-x-1 text-sm font-medium",
        isNeutral
          ? "text-gray-600"
          : isPositive
          ? "text-bullish-600"
          : "text-bearish-600",
        className
      )}
    >
      <span>
        {showSign && !isNeutral && (isPositive ? "+" : "")}$
        {Math.abs(value).toFixed(2)}
      </span>
      {percentage !== undefined && (
        <span className="text-xs">
          ({showSign && !isNeutral && (isPositive ? "+" : "")}
          {percentage.toFixed(2)}%)
        </span>
      )}
    </div>
  );
}
```

#### Price Display Component (`libs/ui/src/lib/financial/price-display/price-display.tsx`):

```typescript
import { cn } from "../../utils/cn";

interface PriceDisplayProps {
  price: number;
  change: number;
  changePercent: number;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function PriceDisplay({
  price,
  change,
  changePercent,
  size = "medium",
  className,
}: PriceDisplayProps) {
  const isPositive = change >= 0;
  const isNeutral = change === 0;

  const sizeClasses = {
    small: "text-lg",
    medium: "text-2xl",
    large: "text-4xl",
  };

  const changeSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div className={cn("text-right", className)}>
      <div className={cn("font-bold text-gray-900", sizeClasses[size])}>
        ${price.toFixed(2)}
      </div>

      <div
        className={cn(
          "flex items-center justify-end space-x-1 font-medium",
          changeSizeClasses[size],
          isNeutral
            ? "text-gray-600"
            : isPositive
            ? "text-bullish-600"
            : "text-bearish-600"
        )}
      >
        <span>
          {!isNeutral && (isPositive ? "+" : "")}${Math.abs(change).toFixed(2)}
        </span>
        <span>
          ({!isNeutral && (isPositive ? "+" : "")}
          {changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
}
```

### Step 2.3: Setup Design System Exports

Configure `libs/ui/src/index.ts`:

```typescript
// Core components
export * from "./lib/components/button";
export * from "./lib/components/card";

// Financial components
export * from "./lib/financial/price-change";
export * from "./lib/financial/price-display";

// Utils
export * from "./lib/utils/cn";
export * from "./lib/utils/financial-colors";
```

**Deliverables:**

- [ ] Complete base UI components (Button, Card, Input)
- [ ] Financial-specific components (PriceChange, PriceDisplay)
- [ ] Design system properly exported and importable
- [ ] Financial color scheme implemented

---

## Phase 3: Shared Types & Data Layer (Week 2)

### Step 3.1: Setup Shared Types Library

Create comprehensive TypeScript interfaces in `libs/shared-types/`:

```typescript
// libs/shared-types/src/lib/stock.ts
export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  pe?: number;
  eps?: number;
}

export interface StockHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CompanyInfo {
  symbol: string;
  name: string;
  description: string;
  sector: string;
  industry: string;
  website?: string;
  employees?: number;
}

export interface StockAnalysis {
  symbol: string;
  analysis: string;
  confidence: number;
  recommendation: "BUY" | "SELL" | "HOLD";
  targetPrice?: number;
  timestamp: string;
}

// libs/shared-types/src/lib/api.ts
export interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: "stock" | "etf";
  exchange: string;
}
```

### Step 3.2: Create Data Access Library

Build API clients in `libs/data-access/`:

```typescript
// libs/data-access/src/lib/clients/alpha-vantage.ts
import { StockQuote, StockHistory, CompanyInfo } from "@investPal/shared-types";

export class AlphaVantageClient {
  private apiKey: string;
  private baseUrl = "https://www.alphavantage.co/query";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    try {
      const response = await fetch(
        `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data["Error Message"]) {
        throw new Error(data["Error Message"]);
      }

      const quote = data["Global Quote"];

      return {
        symbol: quote["01. symbol"],
        name: symbol, // Will be enhanced with company overview
        price: parseFloat(quote["05. price"]),
        change: parseFloat(quote["09. change"]),
        changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
        volume: parseInt(quote["06. volume"]),
        previousClose: parseFloat(quote["08. previous close"]),
        dayHigh: parseFloat(quote["03. high"]),
        dayLow: parseFloat(quote["04. low"]),
      };
    } catch (error) {
      console.error("Failed to fetch stock quote:", error);
      throw error;
    }
  }

  async getIntradayData(
    symbol: string,
    interval: string = "5min"
  ): Promise<StockHistory[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.apiKey}`
      );

      const data = await response.json();

      if (data["Error Message"]) {
        throw new Error(data["Error Message"]);
      }

      const timeSeries = data[`Time Series (${interval})`];

      return Object.entries(timeSeries)
        .map(([date, values]: [string, any]) => ({
          date,
          open: parseFloat(values["1. open"]),
          high: parseFloat(values["2. high"]),
          low: parseFloat(values["3. low"]),
          close: parseFloat(values["4. close"]),
          volume: parseInt(values["5. volume"]),
        }))
        .reverse(); // Reverse to get chronological order
    } catch (error) {
      console.error("Failed to fetch intraday data:", error);
      throw error;
    }
  }

  async getCompanyOverview(symbol: string): Promise<CompanyInfo> {
    try {
      const response = await fetch(
        `${this.baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`
      );

      const data = await response.json();

      return {
        symbol: data.Symbol,
        name: data.Name,
        description: data.Description,
        sector: data.Sector,
        industry: data.Industry,
        website: data.OfficialSite,
        employees: parseInt(data.FullTimeEmployees) || undefined,
      };
    } catch (error) {
      console.error("Failed to fetch company overview:", error);
      throw error;
    }
  }
}

// libs/data-access/src/lib/clients/gemini.ts
import { StockAnalysis } from "@investPal/shared-types";

export class GeminiClient {
  private apiKey: string;
  private baseUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeStock(stockData: {
    symbol: string;
    quote: any;
    history: any[];
    company: any;
  }): Promise<StockAnalysis> {
    try {
      const prompt = `
        Analyze the following stock data for ${stockData.symbol}:
        
        Current Price: $${stockData.quote.price}
        Change: ${stockData.quote.change} (${stockData.quote.changePercent}%)
        Volume: ${stockData.quote.volume}
        Company: ${stockData.company.name}
        Sector: ${stockData.company.sector}
        
        Provide a concise analysis covering:
        1. Technical outlook based on recent price action
        2. Fundamental strength
        3. Key risks
        4. Recommendation (BUY/SELL/HOLD)
        
        Keep analysis under 200 words and provide a confidence score (0-100).
      `;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const analysisText = data.candidates[0].content.parts[0].text;

      return {
        symbol: stockData.symbol,
        analysis: analysisText,
        confidence: 75, // Default confidence, could be extracted from AI response
        recommendation: "HOLD", // Default, could be extracted from AI response
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Failed to generate AI analysis:", error);
      throw error;
    }
  }
}
```

### Step 3.3: Create Shared React Query Hooks

Build reusable hooks in `libs/data-access/`:

```typescript
// libs/data-access/src/lib/hooks/useStockData.ts
import { useQuery } from "@tanstack/react-query";
import { StockQuote, StockHistory, CompanyInfo } from "@investPal/shared-types";

// These will be initialized in the app
let alphaVantageClient: any;
let geminiClient: any;

export function initializeClients(av: any, gc: any) {
  alphaVantageClient = av;
  geminiClient = gc;
}

export function useStockQuote(symbol: string) {
  return useQuery({
    queryKey: ["stock-quote", symbol],
    queryFn: () => alphaVantageClient.getStockQuote(symbol),
    enabled: !!symbol && !!alphaVantageClient,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  });
}

export function useStockHistory(symbol: string, interval: string = "5min") {
  return useQuery({
    queryKey: ["stock-history", symbol, interval],
    queryFn: () => alphaVantageClient.getIntradayData(symbol, interval),
    enabled: !!symbol && !!alphaVantageClient,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCompanyInfo(symbol: string) {
  return useQuery({
    queryKey: ["company-info", symbol],
    queryFn: () => alphaVantageClient.getCompanyOverview(symbol),
    enabled: !!symbol && !!alphaVantageClient,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useAIAnalysis(symbol: string, stockData: any) {
  return useQuery({
    queryKey: ["ai-analysis", symbol],
    queryFn: () => geminiClient.analyzeStock(stockData),
    enabled: !!symbol && !!stockData && !!geminiClient,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
```

### Step 3.4: Setup App-Level Integration

Configure the Next.js app to use the data access library:

```typescript
// apps/web/src/lib/api/clients.ts
import { AlphaVantageClient, GeminiClient } from "@investPal/data-access";

export const alphaVantageClient = new AlphaVantageClient(
  process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY!
);

export const geminiClient = new GeminiClient(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY!
);

// apps/web/src/app/providers.tsx
("use client");

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import { initializeClients } from "@investPal/data-access";
import { alphaVantageClient, geminiClient } from "../lib/api/clients";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 2,
          },
        },
      })
  );

  useEffect(() => {
    initializeClients(alphaVantageClient, geminiClient);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

**Deliverables:**

- [ ] Shared types library with all interfaces
- [ ] Data access library with API clients
- [ ] React Query hooks for stock data
- [ ] Type-safe data fetching across the app
- [ ] Error handling for API failures

---

## Phase 4: TradingView Charts Integration (Week 2)

### Step 4.1: Create Chart Component Library

Build comprehensive chart components in `libs/ui/src/lib/charts/`:

```typescript
// libs/ui/src/lib/charts/stock-chart/stock-chart.tsx
import { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { StockHistory } from "@investPal/shared-types";

interface StockChartProps {
  data: StockHistory[];
  symbol: string;
  height?: number;
  theme?: "light" | "dark";
}

export function StockChart({
  data,
  symbol,
  height = 400,
  theme = "light",
}: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart with financial-focused styling
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: height,
      layout: {
        background: { color: theme === "dark" ? "#1f2937" : "#ffffff" },
        textColor: theme === "dark" ? "#f9fafb" : "#374151",
      },
      grid: {
        vertLines: { color: theme === "dark" ? "#374151" : "#e5e7eb" },
        horzLines: { color: theme === "dark" ? "#374151" : "#e5e7eb" },
      },
      priceScale: {
        borderColor: theme === "dark" ? "#4b5563" : "#d1d5db",
      },
      timeScale: {
        borderColor: theme === "dark" ? "#4b5563" : "#d1d5db",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#22c55e", // bullish green
      downColor: "#ef4444", // bearish red
      borderDownColor: "#dc2626",
      borderUpColor: "#16a34a",
      wickDownColor: "#dc2626",
      wickUpColor: "#16a34a",
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [height, theme]);

  // Update chart data
  useEffect(() => {
    if (candlestickSeriesRef.current && data.length > 0) {
      const formattedData = data.map((item) => ({
        time: Math.floor(new Date(item.date).getTime() / 1000),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));

      candlestickSeriesRef.current.setData(formattedData);
    }
  }, [data]);

  return (
    <div className="w-full">
      <div
        ref={chartContainerRef}
        className="relative w-full border border-gray-200 rounded-lg overflow-hidden"
      />
    </div>
  );
}
```

### Step 4.2: Create Chart Controls Component

```typescript
// libs/ui/src/lib/charts/chart-controls/chart-controls.tsx
import { Button } from "../../components/button";

interface ChartControlsProps {
  selectedInterval: string;
  onIntervalChange: (interval: string) => void;
  intervals?: Array<{ value: string; label: string }>;
}

export function ChartControls({
  selectedInterval,
  onIntervalChange,
  intervals = [
    { value: "1min", label: "1m" },
    { value: "5min", label: "5m" },
    { value: "15min", label: "15m" },
    { value: "30min", label: "30m" },
    { value: "60min", label: "1h" },
    { value: "daily", label: "1D" },
  ],
}: ChartControlsProps) {
  return (
    <div className="flex space-x-1 mb-4">
      {intervals.map((interval) => (
        <Button
          key={interval.value}
          variant={selectedInterval === interval.value ? "default" : "outline"}
          size="sm"
          onClick={() => onIntervalChange(interval.value)}
        >
          {interval.label}
        </Button>
      ))}
    </div>
  );
}
```

### Step 4.3: Create Technical Indicators Component

```typescript
// libs/ui/src/lib/charts/technical-indicators/technical-indicators.tsx
import { useEffect, useState } from "react";
import { StockHistory } from "@investPal/shared-types";
import { Button } from "../../components/button";

interface TechnicalIndicatorsProps {
  data: StockHistory[];
  chart: any; // TradingView chart instance
}

export function TechnicalIndicators({ data, chart }: TechnicalIndicatorsProps) {
  const [showMA, setShowMA] = useState(false);
  const [showRSI, setShowRSI] = useState(false);

  // Calculate Simple Moving Average
  const calculateSMA = (data: StockHistory[], period: number = 20) => {
    return data
      .map((item, index) => {
        if (index < period - 1) return null;

        const slice = data.slice(index - period + 1, index + 1);
        const sum = slice.reduce((acc, curr) => acc + curr.close, 0);
        const average = sum / period;

        return {
          time: Math.floor(new Date(item.date).getTime() / 1000),
          value: average,
        };
      })
      .filter(Boolean);
  };

  // Calculate RSI
  const calculateRSI = (data: StockHistory[], period: number = 14) => {
    const changes = data
      .slice(1)
      .map((item, index) => item.close - data[index].close);

    return changes
      .map((_, index) => {
        if (index < period - 1) return null;

        const slice = changes.slice(index - period + 1, index + 1);
        const gains = slice.filter((change) => change > 0);
        const losses = slice.filter((change) => change < 0).map(Math.abs);

        const avgGain =
          gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / period : 0;
        const avgLoss =
          losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / period : 0;

        if (avgLoss === 0)
          return {
            time: Math.floor(new Date(data[index + 1].date).getTime() / 1000),
            value: 100,
          };

        const rs = avgGain / avgLoss;
        const rsi = 100 - 100 / (1 + rs);

        return {
          time: Math.floor(new Date(data[index + 1].date).getTime() / 1000),
          value: rsi,
        };
      })
      .filter(Boolean);
  };

  useEffect(() => {
    if (!chart || data.length === 0) return;

    if (showMA) {
      const smaData = calculateSMA(data);
      const lineSeries = chart.addLineSeries({
        color: "#2563eb",
        lineWidth: 2,
        title: "SMA (20)",
      });
      lineSeries.setData(smaData);
    }

    // Cleanup function would remove series when toggled off
  }, [showMA, data, chart]);

  return (
    <div className="flex space-x-2 mb-4">
      <Button
        variant={showMA ? "default" : "outline"}
        size="sm"
        onClick={() => setShowMA(!showMA)}
      >
        MA(20)
      </Button>
      <Button
        variant={showRSI ? "default" : "outline"}
        size="sm"
        onClick={() => setShowRSI(!showRSI)}
      >
        RSI(14)
      </Button>
    </div>
  );
}
```

### Step 4.4: Create Complete Chart Container

```typescript
// apps/web/src/components/charts/ChartContainer.tsx
"use client";

import { useState } from "react";
import { useStockHistory } from "@investPal/data-access";
import { StockChart, ChartControls, TechnicalIndicators } from "@investPal/ui";

interface ChartContainerProps {
  symbol: string;
}

export function ChartContainer({ symbol }: ChartContainerProps) {
  const [interval, setInterval] = useState("5min");

  const {
    data: historyData,
    isLoading,
    error,
  } = useStockHistory(symbol, interval);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center border border-gray-200 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center border border-gray-200 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-red-600">Failed to load chart data</p>
          <p className="text-xs text-gray-500 mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ChartControls
        selectedInterval={interval}
        onIntervalChange={setInterval}
      />

      {historyData && historyData.length > 0 ? (
        <>
          <StockChart data={historyData} symbol={symbol} height={400} />

          <div className="mt-4">
            <TechnicalIndicators
              data={historyData}
              chart={null} // Will be passed from StockChart component
            />
          </div>
        </>
      ) : (
        <div className="w-full h-96 flex items-center justify-center border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">No chart data available</p>
        </div>
      )}
    </div>
  );
}
```

**Key Components:**

- `libs/ui/src/lib/charts/stock-chart/` - Main TradingView chart component
- `libs/ui/src/lib/charts/chart-controls/` - Time interval controls
- `libs/ui/src/lib/charts/technical-indicators/` - MA, RSI indicators
- `apps/web/src/components/charts/ChartContainer.tsx` - Complete chart implementation

**Deliverables:**

- [ ] Working TradingView Lightweight Charts integration
- [ ] Time interval controls (1m, 5m, 15m, 30m, 1h, 1D)
- [ ] Technical indicators (Moving Average, RSI)
- [ ] Responsive chart display with proper loading states
- [ ] Financial-themed chart styling (bull/bear colors)

---

## Phase 5: Stock Detail Pages & Layout (Week 3)

### Step 5.1: Create Stock Page Layout

```typescript
// apps/web/src/app/stock/[symbol]/page.tsx
import { Metadata } from "next";
import { StockHeader } from "../../../components/stock/StockHeader";
import { ChartContainer } from "../../../components/charts/ChartContainer";
import { StockMetrics } from "../../../components/stock/StockMetrics";
import { StockInfo } from "../../../components/stock/StockInfo";

interface PageProps {
  params: { symbol: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const symbol = params.symbol.toUpperCase();

  return {
    title: `${symbol} Stock Analysis | Stock Analyzer`,
    description: `Real-time ${symbol} stock price, charts, and AI-powered analysis`,
  };
}

export default function StockPage({ params }: PageProps) {
  const symbol = params.symbol.toUpperCase();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Stock Header with price and basic info */}
      <StockHeader symbol={symbol} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Chart Section - Takes up 2/3 on large screens */}
        <div className="lg:col-span-2">
          <ChartContainer symbol={symbol} />
        </div>

        {/* Sidebar with metrics and info */}
        <div className="space-y-6">
          <StockMetrics symbol={symbol} />
          <StockInfo symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
```

### Step 5.2: Create Stock Header Component

```typescript
// apps/web/src/components/stock/StockHeader.tsx
"use client";

import { useStockQuote } from "@investPal/data-access";
import { PriceDisplay, Card } from "@investPal/ui";

interface StockHeaderProps {
  symbol: string;
}

export function StockHeader({ symbol }: StockHeaderProps) {
  const { data: quote, isLoading, error } = useStockQuote(symbol);

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading {symbol}
          </h1>
          <p className="text-red-600">
            Unable to fetch stock data. Please check the symbol and try again.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {quote?.name || symbol}
              </h1>
              <p className="text-lg text-gray-600">{symbol}</p>
            </div>
          )}
        </div>

        <div className="text-right">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse ml-auto" />
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
            </div>
          ) : quote ? (
            <PriceDisplay
              price={quote.price}
              change={quote.change}
              changePercent={quote.changePercent}
              size="large"
            />
          ) : null}
        </div>
      </div>

      {/* Market Status Indicator */}
      {!isLoading && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Previous Close: ${quote?.previousClose?.toFixed(2) || "N/A"}
            </span>
            <span>Volume: {quote?.volume?.toLocaleString() || "N/A"}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
```

### Step 5.3: Create Stock Metrics Component

```typescript
// apps/web/src/components/stock/StockMetrics.tsx
"use client";

import { useStockQuote } from "@investPal/data-access";
import { Card } from "@investPal/ui";

interface StockMetricsProps {
  symbol: string;
}

export function StockMetrics({ symbol }: StockMetricsProps) {
  const { data: quote, isLoading } = useStockQuote(symbol);

  const metrics = [
    { label: "Day High", value: quote?.dayHigh, format: "currency" },
    { label: "Day Low", value: quote?.dayLow, format: "currency" },
    { label: "52W High", value: quote?.fiftyTwoWeekHigh, format: "currency" },
    { label: "52W Low", value: quote?.fiftyTwoWeekLow, format: "currency" },
    { label: "Market Cap", value: quote?.marketCap, format: "large_number" },
    { label: "P/E Ratio", value: quote?.pe, format: "ratio" },
    { label: "EPS", value: quote?.eps, format: "currency" },
    { label: "Volume", value: quote?.volume, format: "number" },
  ];

  const formatValue = (value: number | undefined, format: string) => {
    if (value === undefined || value === null) return "N/A";

    switch (format) {
      case "currency":
        return `${value.toFixed(2)}`;
      case "large_number":
        if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
        return `${value.toFixed(2)}`;
      case "ratio":
        return value.toFixed(2);
      case "number":
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>

      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex justify-between">
            <span className="text-sm text-gray-600">{metric.label}</span>
            {isLoading ? (
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            ) : (
              <span className="text-sm font-medium">
                {formatValue(metric.value, metric.format)}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
```

### Step 5.4: Create Stock Info Component

```typescript
// apps/web/src/components/stock/StockInfo.tsx
"use client";

import { useCompanyInfo } from "@investPal/data-access";
import { Card } from "@investPal/ui";

interface StockInfoProps {
  symbol: string;
}

export function StockInfo({ symbol }: StockInfoProps) {
  const { data: company, isLoading } = useCompanyInfo(symbol);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Company Info</h3>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
        </div>
      ) : company ? (
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-600">Sector:</span>
            <span className="text-sm font-medium ml-2">{company.sector}</span>
          </div>

          <div>
            <span className="text-sm text-gray-600">Industry:</span>
            <span className="text-sm font-medium ml-2">{company.industry}</span>
          </div>

          {company.employees && (
            <div>
              <span className="text-sm text-gray-600">Employees:</span>
              <span className="text-sm font-medium ml-2">
                {company.employees.toLocaleString()}
              </span>
            </div>
          )}

          {company.website && (
            <div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Company Website →
              </a>
            </div>
          )}

          {company.description && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Description
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {company.description.slice(0, 300)}
                {company.description.length > 300 && "..."}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          No company information available
        </p>
      )}
    </Card>
  );
}
```

### Step 5.5: Create App Layout with Navigation

```typescript
// apps/web/src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "../components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Analyzer - AI-Powered Stock Analysis",
  description:
    "Real-time stock analysis with TradingView charts and AI insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

// apps/web/src/components/layout/Header.tsx
("use client");

import Link from "next/link";
import { useState } from "react";
import { Button } from "@investPal/ui";
import { StockSearch } from "../search/StockSearch";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              Stock Analyzer
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <StockSearch />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link href="/favorites">
              <Button variant="ghost" size="sm">
                Favorites
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
```

**Deliverables:**

- [ ] Dynamic stock pages (/stock/AAPL, /stock/TSLA, etc.)
- [ ] Real-time price display with change indicators
- [ ] Key financial metrics grid
- [ ] Company information sidebar
- [ ] SEO-optimized pages with proper metadata
- [ ] Responsive layout that works on mobile
- [ ] Navigation header with search functionality

---

## Phase 6: AI Analysis Integration (Week 3)

### Step 6.1: Create AI Analysis Component

```typescript
// apps/web/src/components/ai/AIAnalysis.tsx
"use client";

import { useState } from "react";
import {
  useStockQuote,
  useCompanyInfo,
  useStockHistory,
  useAIAnalysis,
} from "@investPal/data-access";
import { Button, Card } from "@investPal/ui";

interface AIAnalysisProps {
  symbol: string;
}

export function AIAnalysis({ symbol }: AIAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { data: quote } = useStockQuote(symbol);
  const { data: company } = useCompanyInfo(symbol);
  const { data: history } = useStockHistory(symbol);

  const stockData =
    quote && company && history
      ? {
          symbol,
          quote,
          history,
          company,
        }
      : null;

  const {
    data: analysis,
    isLoading,
    refetch,
    error,
  } = useAIAnalysis(symbol, stockData);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      await refetch();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Analysis</h3>
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || isLoading || !stockData}
          size="sm"
        >
          {isAnalyzing || isLoading ? "Analyzing..." : "Generate Analysis"}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-600">
            Failed to generate analysis. Please try again.
          </p>
        </div>
      )}

      {analysis ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Recommendation:</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  analysis.recommendation === "BUY"
                    ? "bg-bullish-100 text-bullish-700"
                    : analysis.recommendation === "SELL"
                    ? "bg-bearish-100 text-bearish-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {analysis.recommendation}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Confidence: {analysis.confidence}%
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {analysis.analysis}
            </div>
          </div>

          <div className="text-xs text-gray-500 border-t pt-2">
            Generated: {new Date(analysis.timestamp).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">
            Click "Generate Analysis" to get AI-powered insights
          </p>
          <p className="text-xs mt-1">
            Analysis includes technical outlook, fundamentals, and risk
            assessment
          </p>
        </div>
      )}
    </Card>
  );
}
```

### Step 6.2: Create Search Component

```typescript
// apps/web/src/components/search/StockSearch.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function StockSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular stocks for suggestions
  const popularStocks = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "TSLA",
    "META",
    "NVDA",
    "SPY",
    "QQQ",
    "BRK.B",
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = popularStocks.filter((stock) =>
        stock.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (symbol: string) => {
    const cleanSymbol = symbol.toUpperCase().trim();
    if (cleanSymbol) {
      router.push(`/stock/${cleanSymbol}`);
      setQuery("");
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSearch(suggestions[0]);
      } else {
        handleSearch(query);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search stocks (e.g., AAPL, TSLA)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {suggestions.slice(0, 5).map((symbol) => (
            <button
              key={symbol}
              onClick={() => handleSearch(symbol)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="font-medium">{symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

        <div className="lg:col-span-2 space-y-6">
          <ChartContainer symbol={symbol} />
          <AIAnalysis symbol={symbol} />
        </div>

        <div className="space-y-6">
          <StockMetrics symbol={symbol} />
          <StockInfo symbol={symbol} />
        </div>
      </div>
    </div>

);
}

````

**Deliverables:**
- [ ] Working AI analysis integration with Gemini
- [ ] Analysis display with recommendation and confidence
- [ ] Stock search functionality
- [ ] Error handling for AI API failures
- [ ] Analysis caching to prevent unnecessary API calls

---

## Phase 7: Local Storage & Favorites (Week 4)

### Step 7.1: Create User Store with Zustand
```typescript
// apps/web/src/lib/stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  favorites: string[];
  recentSearches: string[];
  theme: 'light' | 'dark';
  addFavorite: (symbol: string) => void;
  removeFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
  addRecentSearch: (symbol: string) => void;
  clearRecentSearches: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentSearches: [],
      theme: 'light',

      addFavorite: (symbol) => {
        const { favorites } = get();
        if (!favorites.includes(symbol)) {
          set({ favorites: [...favorites, symbol] });
        }
      },

      removeFavorite: (symbol) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav !== symbol) });
      },

      isFavorite: (symbol) => {
        return get().favorites.includes(symbol);
      },

      addRecentSearch: (symbol) => {
        const { recentSearches } = get();
        const updated = [symbol, ...recentSearches.filter(s => s !== symbol)];
        set({ recentSearches: updated.slice(0, 10) }); // Keep only last 10
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },

      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: 'investPal-user-store',
    }
  )
);
````

### Step 7.2: Create Favorite Button Component

```typescript
// libs/ui/src/lib/financial/favorite-button/favorite-button.tsx
import { Heart } from "lucide-react";
import { Button } from "../../components/button";
import { cn } from "../../utils/cn";

interface FavoriteButtonProps {
  symbol: string;
  isFavorite: boolean;
  onToggle: (symbol: string) => void;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function FavoriteButton({
  symbol,
  isFavorite,
  onToggle,
  size = "default",
  className,
}: FavoriteButtonProps) {
  return (
    <Button
      variant="outline"
      size={size}
      onClick={() => onToggle(symbol)}
      className={cn(
        "transition-colors",
        isFavorite
          ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-gray-300 text-gray-600 hover:border-red-300",
        className
      )}
    >
      <Heart className={cn("w-4 h-4", isFavorite ? "fill-current" : "")} />
      {size !== "sm" && (
        <span className="ml-2">
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </span>
      )}
    </Button>
  );
}
```

### Step 7.3: Create Favorites Page

```typescript
// apps/web/src/app/favorites/page.tsx
"use client";

import { useUserStore } from "../../lib/stores/userStore";
import { useStockQuote } from "@investPal/data-access";
import { Card, PriceDisplay } from "@investPal/ui";
import Link from "next/link";

function FavoriteStockCard({ symbol }: { symbol: string }) {
  const { data: quote, isLoading } = useStockQuote(symbol);
  const removeFavorite = useUserStore((state) => state.removeFavorite);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <Link href={`/stock/${symbol}`} className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{symbol}</h3>
              <p className="text-sm text-gray-600">
                {quote?.name || "Loading..."}
              </p>
            </div>

            {isLoading ? (
              <div className="text-right">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : quote ? (
              <PriceDisplay
                price={quote.price}
                change={quote.change}
                changePercent={quote.changePercent}
                size="small"
              />
            ) : null}
          </div>
        </Link>

        <button
          onClick={() => removeFavorite(symbol)}
          className="ml-4 text-red-600 hover:text-red-800 text-sm"
        >
          Remove
        </button>
      </div>
    </Card>
  );
}

export default function FavoritesPage() {
  const favorites = useUserStore((state) => state.favorites);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
        <p className="text-gray-600 mt-2">
          Quick access to your favorite stocks
        </p>
      </div>

      {favorites.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600 mb-4">
            Add stocks to your favorites to quickly access them here
          </p>
          <Link
            href="/"
            className="text-brand-600 hover:text-brand-700 font-medium"
          >
            Search for stocks →
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((symbol) => (
            <FavoriteStockCard key={symbol} symbol={symbol} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Step 7.4: Update Stock Header with Favorite Button

```typescript
// Update apps/web/src/components/stock/StockHeader.tsx
import { useUserStore } from "../../lib/stores/userStore";
import { FavoriteButton } from "@investPal/ui";

export function StockHeader({ symbol }: StockHeaderProps) {
  const { data: quote, isLoading, error } = useStockQuote(symbol);
  const { isFavorite, addFavorite, removeFavorite } = useUserStore();

  const handleToggleFavorite = () => {
    if (isFavorite(symbol)) {
      removeFavorite(symbol);
    } else {
      addFavorite(symbol);
    }
  };

  // ... existing code ...

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0 flex-1">
          {/* ... existing title code ... */}
        </div>

        <div className="flex items-center space-x-4">
          <FavoriteButton
            symbol={symbol}
            isFavorite={isFavorite(symbol)}
            onToggle={handleToggleFavorite}
          />

          {/* ... existing price display ... */}
        </div>
      </div>

      {/* ... rest of component ... */}
    </Card>
  );
}
```

### Step 7.5: Create Home Page with Recent Searches

```typescript
// apps/web/src/app/page.tsx
"use client";

import { useUserStore } from "../lib/stores/userStore";
import { Card } from "@investPal/ui";
import Link from "next/link";
import { StockSearch } from "../components/search/StockSearch";

export default function HomePage() {
  const { recentSearches, favorites } = useUserStore();

  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "META", name: "Meta Platforms Inc." },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Stock Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get real-time stock data, interactive charts, and AI-driven insights
        </p>

        <div className="max-w-lg mx-auto">
          <StockSearch />
        </div>
      </div>

      {/* Quick Access Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Popular Stocks */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Stocks</h3>
          <div className="space-y-2">
            {popularStocks.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/stock/${stock.symbol}`}
                className="block p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-sm text-gray-600">{stock.name}</div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
            <div className="space-y-2">
              {recentSearches.slice(0, 6).map((symbol) => (
                <Link
                  key={symbol}
                  href={`/stock/${symbol}`}
                  className="block p-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{symbol}</div>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Favorites */}
        {favorites.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Favorites</h3>
            <div className="space-y-2">
              {favorites.slice(0, 6).map((symbol) => (
                <Link
                  key={symbol}
                  href={`/stock/${symbol}`}
                  className="block p-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{symbol}</div>
                </Link>
              ))}
            </div>
            {favorites.length > 6 && (
              <Link
                href="/favorites"
                className="text-sm text-brand-600 hover:text-brand-700 mt-2 block"
              >
                View all favorites →
              </Link>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
```

**Deliverables:**

- [ ] Working favorites system with local storage
- [ ] Favorite button on stock pages
- [ ] Favorites page with stock cards
- [ ] Recent searches functionality
- [ ] Enhanced home page with quick access
- [ ] User preferences persistence

---

## Phase 8: Polish & Testing (Week 4)

### Step 8.1: Create Loading Skeletons

```typescript
// libs/ui/src/lib/components/skeleton/skeleton.tsx
import { cn } from "../../utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
```

### Step 8.2: Create Error Boundary

```typescript
// apps/web/src/components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";
import { Card, Button } from "@investPal/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Card className="p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We encountered an error while loading this content.
            </p>
            <Button
              onClick={() => this.setState({ hasError: false })}
              variant="outline"
            >
              Try again
            </Button>
          </Card>
        )
      );
    }

    return this.props.children;
  }
}
```

### Step 8.3: Add Toast Notifications

```typescript
// libs/ui/src/lib/components/toast/toast.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast["type"]) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "p-4 rounded-lg shadow-lg max-w-sm",
              "transform transition-transform duration-300 ease-in-out",
              toast.type === "success" &&
                "bg-bullish-50 border border-bullish-200 text-bullish-800",
              toast.type === "error" &&
                "bg-bearish-50 border border-bearish-200 text-bearish-800",
              toast.type === "info" &&
                "bg-blue-50 border border-blue-200 text-blue-800"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
```

### Step 8.4: Add Performance Optimizations

```typescript
// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Step 8.5: Update Providers with Error Boundary and Toast

```typescript
// Update apps/web/src/app/providers.tsx
import { ToastProvider } from "@investPal/ui";
import { ErrorBoundary } from "../components/ErrorBoundary";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    initializeClients(alphaVantageClient, geminiClient);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
```

### Step 8.6: Add Basic Testing Setup

```typescript
// Create jest.config.js in workspace root
const { getJestProjects } = require('@nx/jest');

export default {
  projects: getJestProjects(),
};

// Create apps/web/jest.config.ts
export default {
  displayName: 'web',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?: ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};

// Create apps/web/src/test-setup.ts
import '@testing-library/jest-dom';
```

### Step 8.7: Create Basic Component Tests

```typescript
// apps/web/src/components/search/__tests__/StockSearch.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { StockSearch } from "../StockSearch";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("StockSearch", () => {
  it("renders search input", () => {
    render(<StockSearch />);
    expect(screen.getByPlaceholderText(/search stocks/i)).toBeInTheDocument();
  });

  it("shows suggestions when typing", () => {
    render(<StockSearch />);
    const input = screen.getByPlaceholderText(/search stocks/i);

    fireEvent.change(input, { target: { value: "AAP" } });
    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });
});
```

**Deliverables:**

- [ ] Error boundaries for graceful error handling
- [ ] Loading skeletons for better UX
- [ ] Toast notifications for user feedback
- [ ] Performance optimizations (bundle analysis, caching)
- [ ] Basic test setup and component tests
- [ ] Production-ready error handling
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)

---

## 🔧 Implementation Guidelines

### Code Quality Standards

- Use TypeScript strict mode across all libraries
- Follow React best practices and hooks patterns
- Implement proper error boundaries and loading states
- Use semantic HTML and proper ARIA labels for accessibility
- Maintain consistent component API design across the design system

### Performance Requirements

- Initial page load: <3s on 3G connection
- Chart rendering: <1s for 1000 data points
- API response caching: 30s for quotes, 5min for historical data
- AI analysis generation: <15s
- Stock search results: <500ms

### API Usage Guidelines

- Implement exponential backoff for failed requests
- Cache API responses appropriately based on data freshness needs
- Handle rate limiting gracefully with user feedback
- Validate all API responses against TypeScript schemas
- Use loading states for all async operations

### Security Considerations

- Store API keys in environment variables only
- Validate and sanitize all user inputs
- Implement basic CSRF protection for forms
- Use HTTPS for all external API calls
- Add rate limiting for search functionality

---

## 📚 External Resources

### APIs Documentation

- [Alpha Vantage API](https://www.alphavantage.co/documentation/)
- [Google Gemini API](https://ai.google.dev/docs)
- [Yahoo Finance API](https://rapidapi.com/apidojo/api/yahoo-finance1/)

### Libraries Documentation

- [TradingView Lightweight Charts](https://tradingview.github.io/lightweight-charts/)
- [Nx Monorepo](https://nx.dev/getting-started/intro)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Design System Resources

- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Class Variance Authority](https://cva.style/docs)
- [Tailwind Merge](https://github.com/dcastil/tailwind-merge)

---

## 🎯 Success Criteria

### MVP Definition of Done

- [ ] Users can search for stocks by symbol
- [ ] Stock pages display real-time price data and charts
- [ ] Interactive TradingView charts show historical data with multiple timeframes
- [ ] AI analysis provides meaningful stock insights using Gemini API
- [ ] Users can save favorite stocks locally
- [ ] App is responsive and works on mobile devices
- [ ] All core user flows work without errors
- [ ] Design system is consistent and reusable across components

### Performance Metrics

- Lighthouse score: >90 for Performance, Accessibility, Best Practices
- Core Web Vitals: All metrics in "Good" range
- Error rate: <1% for core user flows
- API success rate: >99% for stock data fetching
- User task completion rate: >95% for primary flows

### Technical Quality

- TypeScript strict mode with no `any` types in core logic
- Component test coverage: >80% for critical components
- No console errors in production build
- Proper error handling for all async operations
- Accessible design with keyboard navigation support

Remember to focus on user experience and financial data accuracy. This tool will help investors make important decisions, so reliability and clarity are paramount.
