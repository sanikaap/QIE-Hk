import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import CryptoSelector from "@/components/CryptoSelector";
import PriceChart from "@/components/PriceChart";
import RiskSignals from "@/components/RiskSignals";
import ArbitrageMonitor from "@/components/ArbitrageMonitor";
import GlobalRiskDashboard from "@/components/GlobalRiskDashboard";
import { fetchCoinHistory, fetchCoinData, CoinPrice } from "@/lib/coingecko";
import { generatePredictions, assessRisk, PredictionData, RiskAssessment } from "@/lib/aiPredictor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      if (coinData) {
        setCurrentPrice(coinData.current_price);
      }

      // Fetch secondary crypto for arbitrage (ETH if BTC selected, BTC otherwise)
      const secondaryCrypto = selectedCrypto === "bitcoin" ? "ethereum" : "bitcoin";
      const secondaryData = await fetchCoinData(secondaryCrypto);
      if (secondaryData) {
        setSecondaryCryptoPrice(secondaryData.current_price);
      }

      // Generate AI predictions
      const prices = history.map(d => d.price);
      const aiPredictions = await generatePredictions(prices, 7);
      setPredictions(aiPredictions);

      // Assess risk
      if (aiPredictions.length > 0) {
        const risk = await assessRisk(prices[prices.length - 1], aiPredictions[aiPredictions.length - 1].price);
        setRiskAssessment(risk);
      }

      toast({
        title: "Data Updated",
        description: `Successfully loaded data for ${selectedCrypto}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load cryptocurrency data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCrypto, timeRange]);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <CryptoSelector
          selectedCrypto={selectedCrypto}
          onCryptoChange={setSelectedCrypto}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onRefresh={loadData}
          isLoading={isLoading}
        />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="arbitrage">Arbitrage</TabsTrigger>
            <TabsTrigger value="global">Global Risk</TabsTrigger>
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
                title="🤖 AI Price Predictions"
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
            Built for Hackathon 2025 | Powered by React, Hugging Face, and CoinGecko
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
