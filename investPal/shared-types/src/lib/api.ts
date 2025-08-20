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

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface ApiRequestOptions {
  timeout?: number;
  retries?: number;
  cache?: boolean;
}