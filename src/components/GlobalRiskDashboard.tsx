import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface CryptoRisk {
  name: string;
  symbol: string;
  risk: "low" | "medium" | "high";
  volatility: number;
  trend: "up" | "down" | "stable";
}

const mockRisks: CryptoRisk[] = [
  { name: "Bitcoin", symbol: "BTC", risk: "low", volatility: 2.3, trend: "up" },
  { name: "Ethereum", symbol: "ETH", risk: "medium", volatility: 4.1, trend: "up" },
  { name: "Solana", symbol: "SOL", risk: "high", volatility: 7.2, trend: "down" },
  { name: "Cardano", symbol: "ADA", risk: "medium", volatility: 3.8, trend: "stable" },
];

const GlobalRiskDashboard = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case "low": return "bg-success/10";
      case "medium": return "bg-warning/10";
      case "high": return "bg-destructive/10";
      default: return "bg-muted/10";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-success" />;
      case "down": return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="card-gradient border border-border p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold gradient-text">🌍 Global Risk Dashboard</h3>

        <div className="space-y-3">
          {mockRisks.map((crypto) => (
            <div
              key={crypto.symbol}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{crypto.name}</span>
                  <span className="text-sm text-muted-foreground">{crypto.symbol}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Volatility</p>
                  <p className="text-sm font-semibold">{crypto.volatility}%</p>
                </div>

                <div className={`px-3 py-1 rounded-full ${getRiskBg(crypto.risk)}`}>
                  <span className={`text-xs font-medium uppercase ${getRiskColor(crypto.risk)}`}>
                    {crypto.risk}
                  </span>
                </div>

                {getTrendIcon(crypto.trend)}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">1</p>
            <p className="text-xs text-muted-foreground">Low Risk</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">2</p>
            <p className="text-xs text-muted-foreground">Medium Risk</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">1</p>
            <p className="text-xs text-muted-foreground">High Risk</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GlobalRiskDashboard;
