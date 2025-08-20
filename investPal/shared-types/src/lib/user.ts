export interface UserPreferences {
  theme: "light" | "dark" | "system";
  currency: "USD" | "EUR" | "GBP" | "JPY";
  timezone: string;
  notifications: {
    priceAlerts: boolean;
    newsUpdates: boolean;
    analysisReports: boolean;
  };
  displayOptions: {
    showChangeAsPercentage: boolean;
    compactView: boolean;
    autoRefresh: boolean;
    refreshInterval: number; // in seconds
  };
}

export interface Watchlist {
  id: string;
  name: string;
  symbols: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  condition: "above" | "below";
  targetPrice: number;
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
}

export interface UserSession {
  favorites: string[];
  recentSearches: string[];
  watchlists: Watchlist[];
  priceAlerts: PriceAlert[];
  preferences: UserPreferences;
}

export interface UserAnalysisHistory {
  symbol: string;
  requestedAt: string;
  analysisId: string;
}