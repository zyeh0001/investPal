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