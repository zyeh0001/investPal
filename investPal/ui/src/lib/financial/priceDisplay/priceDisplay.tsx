import { cn } from "../../utils/cn";

export interface PriceDisplayProps {
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