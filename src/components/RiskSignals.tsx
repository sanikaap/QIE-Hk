import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RiskSignalsProps {
  signal: "bullish" | "bearish" | "neutral";
  confidence: number;
  priceChange: number;
}

const RiskSignals = ({ signal, confidence, priceChange }: RiskSignalsProps) => {
  const getSignalConfig = () => {
    switch (signal) {
      case "bullish":
        return {
          icon: TrendingUp,
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/30",
          label: "Bullish Signal",
          emoji: "🟢",
          action: "Buy Opportunity"
        };
      case "bearish":
        return {
          icon: TrendingDown,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/30",
          label: "Bearish Signal",
          emoji: "🔴",
          action: "Sell Recommendation"
        };
      default:
        return {
          icon: Minus,
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/30",
          label: "Neutral Signal",
          emoji: "🟡",
          action: "Hold Position"
        };
    }
  };

  const config = getSignalConfig();
  const Icon = config.icon;

  return (
    <Card className={`card-gradient border ${config.borderColor} p-6`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI Risk Analysis</h3>
          <Badge variant="outline" className={`${config.bgColor} ${config.color} border-0`}>
            {config.emoji} {config.label}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${config.bgColor}`}>
            <Icon className={`w-8 h-8 ${config.color}`} />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold">{config.action}</p>
            <p className="text-sm text-muted-foreground">Based on AI prediction model</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Model Confidence</p>
            <p className="text-xl font-semibold mt-1">{confidence}%</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${config.bgColor}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Predicted Change</p>
            <p className={`text-xl font-semibold mt-1 ${priceChange >= 0 ? 'text-success' : 'text-destructive'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 border border-border">
          <AlertCircle className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs text-muted-foreground">
            AI predictions are based on historical data and time-series analysis. Always conduct your own research before making investment decisions.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RiskSignals;
