import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium gradient-text">AI x Blockchain | Hackathon 2025</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold">
            <span className="gradient-text">QIE</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90">
            Quantum Intelligence for Exchanges
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Decentralised AI Agent for Financial Risk & Arbitrage
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto italic">
            "AI-Powered Crypto Foresight for a Borderless DeFi Future"
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group"
              onClick={() => navigate("/dashboard")}
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
          <div className="card-gradient p-6 rounded-xl border border-border space-y-4 hover-scale">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI Forecasting</h3>
            <p className="text-muted-foreground">
              Powered by IBM Granite time-series model from Hugging Face for accurate crypto predictions
            </p>
          </div>

          <div className="card-gradient p-6 rounded-xl border border-border space-y-4 hover-scale">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Risk Analysis</h3>
            <p className="text-muted-foreground">
              Real-time risk signals with confidence scores to make informed trading decisions
            </p>
          </div>

          <div className="card-gradient p-6 rounded-xl border border-border space-y-4 hover-scale">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Arbitrage Detection</h3>
            <p className="text-muted-foreground">
              Identify profit opportunities across different cryptocurrencies instantly
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24 text-center space-y-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Powered By
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="px-4 py-2 rounded-lg bg-card border border-border">React + TypeScript</span>
            <span className="px-4 py-2 rounded-lg bg-card border border-border">Hugging Face AI</span>
            <span className="px-4 py-2 rounded-lg bg-card border border-border">CoinGecko API</span>
            <span className="px-4 py-2 rounded-lg bg-card border border-border">Recharts</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built for Hackathon 2025 | Powered by React, Hugging Face, and CoinGecko</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
