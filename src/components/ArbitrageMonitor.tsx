import { Card } from "@/components/ui/card";
import { ArrowRightLeft, Percent } from "lucide-react";

interface ArbitrageMonitorProps {
  crypto1: string;
  crypto2: string;
  price1: number;
  price2: number;
}

const ArbitrageMonitor = ({ crypto1, crypto2, price1, price2 }: ArbitrageMonitorProps) => {
  const priceDiff = Math.abs(price1 - price2);
  const percentageDiff = ((priceDiff / Math.min(price1, price2)) * 100).toFixed(2);
  const isOpportunity = parseFloat(percentageDiff) > 2;

  return (
    <Card className="card-gradient border border-border p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold gradient-text">Arbitrage Monitor</h3>
          <ArrowRightLeft className="w-5 h-5 text-primary" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground uppercase">{crypto1}</p>
            <p className="text-2xl font-bold mt-1">${price1.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground uppercase">{crypto2}</p>
            <p className="text-2xl font-bold mt-1">${price2.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Price Difference</p>
              <p className="text-xl font-bold mt-1">${priceDiff.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Opportunity</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <Percent className="w-4 h-4" />
                <p className={`text-xl font-bold ${isOpportunity ? 'text-success' : 'text-muted-foreground'}`}>
                  {percentageDiff}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {isOpportunity && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/30">
            <p className="text-sm font-medium text-success">
              ✓ Arbitrage opportunity detected! Price difference exceeds 2% threshold.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ArbitrageMonitor;
