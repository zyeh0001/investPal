import { cn } from "../../utils/cn";

export interface PriceChangeProps {
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