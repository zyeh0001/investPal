// Demo file to test shared types integration
import type { StockQuote, StockHistory, CompanyInfo, ApiResponse } from '@investPal/shared-types';

// Sample data using the shared types
export const sampleStockQuote: StockQuote = {
  symbol: "AAPL",
  name: "Apple Inc.",
  price: 175.43,
  change: 2.34,
  changePercent: 1.35,
  volume: 45678900,
  previousClose: 173.09,
  dayHigh: 176.80,
  dayLow: 173.12,
  fiftyTwoWeekHigh: 198.23,
  fiftyTwoWeekLow: 124.17,
  pe: 28.5,
  eps: 6.16
};

export const sampleStockHistory: StockHistory[] = [
  {
    date: "2024-01-20T09:30:00Z",
    open: 173.50,
    high: 176.80,
    low: 173.12,
    close: 175.43,
    volume: 45678900
  }
];

export const sampleCompanyInfo: CompanyInfo = {
  symbol: "AAPL",
  name: "Apple Inc.",
  description: "Apple Inc. designs, manufactures, and markets consumer electronics, computer software, and online services.",
  sector: "Technology",
  industry: "Consumer Electronics",
  website: "https://www.apple.com",
  employees: 164000
};

export const sampleApiResponse: ApiResponse<StockQuote> = {
  data: sampleStockQuote,
  timestamp: new Date().toISOString()
};