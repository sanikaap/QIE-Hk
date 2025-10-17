import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface CryptoSelectorProps {
  selectedCrypto: string;
  onCryptoChange: (value: string) => void;
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

const cryptoOptions = [
  { value: "bitcoin", label: "Bitcoin (BTC)", symbol: "₿" },
  { value: "ethereum", label: "Ethereum (ETH)", symbol: "Ξ" },
  { value: "solana", label: "Solana (SOL)", symbol: "◎" },
  { value: "cardano", label: "Cardano (ADA)", symbol: "₳" },
  { value: "ripple", label: "Ripple (XRP)", symbol: "✕" },
];

const timeRanges = [
  { value: "7", label: "7 Days" },
  { value: "30", label: "30 Days" },
  { value: "90", label: "90 Days" },
];

const CryptoSelector = ({
  selectedCrypto,
  onCryptoChange,
  timeRange,
  onTimeRangeChange,
  onRefresh,
  isLoading
}: CryptoSelectorProps) => {
  return (
    <div className="card-gradient border border-border rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span className="gradient-text">Market Selection</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Cryptocurrency</label>
          <Select value={selectedCrypto} onValueChange={onCryptoChange}>
            <SelectTrigger className="bg-background/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cryptoOptions.map((crypto) => (
                <SelectItem key={crypto.value} value={crypto.value}>
                  <span className="flex items-center gap-2">
                    <span className="text-primary">{crypto.symbol}</span>
                    {crypto.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Time Range</label>
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="bg-background/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Actions</label>
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoSelector;
