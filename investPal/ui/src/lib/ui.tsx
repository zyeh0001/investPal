import { Button } from "./components/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
import { PriceChange } from "./financial/priceChange";
import { PriceDisplay } from "./financial/priceDisplay";

export function InvestPalUi() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to InvestPal! 📈</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Your AI-powered stock analysis platform with professional financial
            components
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">
                Financial Price Components:
              </h4>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">AAPL</span>
                  <PriceDisplay
                    price={175.43}
                    change={2.34}
                    changePercent={1.35}
                    size="small"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">TSLA</span>
                  <PriceDisplay
                    price={248.87}
                    change={-5.21}
                    changePercent={-2.05}
                    size="small"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">SPY</span>
                  <PriceDisplay
                    price={445.67}
                    change={0.0}
                    changePercent={0.0}
                    size="small"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">
                Price Change Variations:
              </h4>
              <div className="flex gap-4 flex-wrap">
                <PriceChange value={12.45} percentage={2.1} />
                <PriceChange value={-8.33} percentage={-1.5} />
                <PriceChange value={0.0} percentage={0.0} />
                <PriceChange value={25.67} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">
                Financial Button Variants:
              </h4>
              <div className="flex gap-2 flex-wrap">
                <Button variant="default">Default</Button>
                <Button variant="bullish">Bullish 🚀</Button>
                <Button variant="bearish">Bearish 📉</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-bullish-600 flex items-center justify-between">
              AAPL
              <PriceChange value={2.34} percentage={1.35} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PriceDisplay
              price={175.43}
              change={2.34}
              changePercent={1.35}
              size="medium"
              className="mb-3"
            />
            <p className="text-sm text-gray-600 mb-3">
              Apple Inc. showing strong bullish momentum with positive earnings.
            </p>
            <Button variant="bullish" size="sm" className="w-full">
              Buy Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-bearish-600 flex items-center justify-between">
              TSLA
              <PriceChange value={-5.21} percentage={-2.05} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PriceDisplay
              price={248.87}
              change={-5.21}
              changePercent={-2.05}
              size="medium"
              className="mb-3"
            />
            <p className="text-sm text-gray-600 mb-3">
              Tesla experiencing bearish pressure due to market conditions.
            </p>
            <Button variant="bearish" size="sm" className="w-full">
              Sell Position
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-600 flex items-center justify-between">
              SPY
              <PriceChange value={0.0} percentage={0.0} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PriceDisplay
              price={445.67}
              change={0.0}
              changePercent={0.0}
              size="medium"
              className="mb-3"
            />
            <p className="text-sm text-gray-600 mb-3">
              S&P 500 ETF holding steady with neutral market sentiment.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Monitor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default InvestPalUi;
