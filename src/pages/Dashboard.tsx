import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import CryptoSelector from "@/components/CryptoSelector";
import PriceChart from "@/components/PriceChart";
import RiskSignals from "@/components/RiskSignals";
import ArbitrageMonitor from "@/components/ArbitrageMonitor";
import GlobalRiskDashboard from "@/components/GlobalRiskDashboard";
import MetricCard from "@/components/MetricCard";
import { fetchCoinHistory, fetchCoinData, CoinPrice } from "@/lib/coingecko";
import { generatePredictions, assessRisk, PredictionData, RiskAssessment } from "@/lib/aiPredictor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Activity, BarChart3 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [timeRange, setTimeRange] = useState("30");
  const [isLoading, setIsLoading] = useState(false);
  
  const [historicalData, setHistoricalData] = useState<CoinPrice[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment>({
    signal: "neutral",
    confidence: 0,
    priceChange: 0,
  });
  const [currentPrice, setCurrentPrice] = useState(0);
  const [secondaryCryptoPrice, setSecondaryCryptoPrice] = useState(0);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch historical data
      const history = await fetchCoinHistory(selectedCrypto, parseInt(timeRange));
      setHistoricalData(history);

      // Fetch current price
      const coinData = await fetchCoinData(selectedCrypto);
      let currentPriceValue = 0;
      
      if (coinData) {
        currentPriceValue = coinData.current_price;
        setCurrentPrice(currentPriceValue);
      } else if (history.length > 0) {
        // Use last historical price if current price fetch fails
        currentPriceValue = history[history.length - 1].price;
        setCurrentPrice(currentPriceValue);
      }

      // Fetch secondary crypto for arbitrage (ETH if BTC selected, BTC otherwise)
      const secondaryCrypto = selectedCrypto === "bitcoin" ? "ethereum" : "bitcoin";
      const secondaryData = await fetchCoinData(secondaryCrypto);
      if (secondaryData) {
        setSecondaryCryptoPrice(secondaryData.current_price);
      }

      // Generate AI predictions - always generate even if history is empty
      const prices = history.length > 0 ? history.map(d => d.price) : [currentPriceValue || 100];
      const aiPredictions = await generatePredictions(prices, 7);
      setPredictions(aiPredictions);

      // Assess risk
      if (aiPredictions.length > 0 && prices.length > 0) {
        const lastPrice = prices[prices.length - 1];
        const predictedPrice = aiPredictions[aiPredictions.length - 1].price;
        const risk = await assessRisk(lastPrice, predictedPrice);
        setRiskAssessment(risk);
      }

      // Only show success toast if we got some data
      if (history.length > 0 || coinData) {
        toast({
          title: "Data Updated",
          description: `Successfully loaded data for ${selectedCrypto}`,
        });
      } else {
        toast({
          title: "Limited Data",
          description: `Some data may be unavailable for ${selectedCrypto}. Showing predictions based on available information.`,
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error('Data loading error:', error);
      
      // Don't clear existing data, just show a warning
      toast({
        title: "Data Load Warning",
        description: `Some data may be incomplete for ${selectedCrypto}`,
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCrypto, timeRange]);

  // Calculate metrics
  const volatility = historicalData.length > 0 
    ? Math.round(((Math.max(...historicalData.map(d => d.price)) - Math.min(...historicalData.map(d => d.price))) / currentPrice) * 100 * 10) / 10
    : 0;
  
  const avgPrice = historicalData.length > 0
    ? Math.round(historicalData.reduce((sum, d) => sum + d.price, 0) / historicalData.length * 100) / 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <CryptoSelector
          selectedCrypto={selectedCrypto}
          onCryptoChange={setSelectedCrypto}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onRefresh={loadData}
          isLoading={isLoading}
        />

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Current Price"
            value={`$${currentPrice.toLocaleString()}`}
            icon={DollarSign}
            trend={{
              value: riskAssessment.priceChange,
              isPositive: riskAssessment.priceChange > 0
            }}
          />
          <MetricCard
            title="Predicted (7d)"
            value={predictions.length > 0 ? `$${predictions[predictions.length - 1].price.toLocaleString()}` : "$0"}
            subtitle="AI Forecast"
            icon={TrendingUp}
          />
          <MetricCard
            title="Volatility"
            value={`${volatility}%`}
            subtitle={`${timeRange} days`}
            icon={Activity}
          />
          <MetricCard
            title="Avg Price"
            value={`$${avgPrice.toLocaleString()}`}
            subtitle={`${timeRange} days`}
            icon={BarChart3}
          />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary/20">
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="arbitrage" className="data-[state=active]:bg-primary/20">
              Arbitrage
            </TabsTrigger>
            <TabsTrigger value="global" className="data-[state=active]:bg-primary/20">
              Global Risk
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PriceChart
                data={historicalData}
                title="📊 Historical Price Data"
                color="#FF7A00"
              />
              <PriceChart
                data={predictions}
                title="🤖 AI Price Predictions (Advanced Analytics)"
                color="#C77DFF"
              />
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskSignals
                signal={riskAssessment.signal}
                confidence={riskAssessment.confidence}
                priceChange={riskAssessment.priceChange}
              />
              <PriceChart
                data={predictions}
                title="🔮 Predicted Trend (7 Days)"
                color="#C77DFF"
              />
            </div>
          </TabsContent>

          <TabsContent value="arbitrage" className="space-y-6 mt-6">
            <ArbitrageMonitor
              crypto1={selectedCrypto === "bitcoin" ? "BTC" : "ETH"}
              crypto2={selectedCrypto === "bitcoin" ? "ETH" : "BTC"}
              price1={currentPrice}
              price2={secondaryCryptoPrice}
            />
          </TabsContent>

          <TabsContent value="global" className="space-y-6 mt-6">
            <GlobalRiskDashboard />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border mt-12">
          <p className="text-sm text-muted-foreground">
            Built for Hackathon 2025 | Powered by React, Gemini AI, and CoinGecko
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            QIE - AI-Powered Crypto Foresight for a Borderless DeFi Future
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
