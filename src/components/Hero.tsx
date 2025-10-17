import { Sparkles, TrendingUp, Shield } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden border-b border-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background" />
      
      <div className="container relative mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/20 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI × Blockchain | Hackathon 2025</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-slide-up">
            <span className="gradient-text">QIE</span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-foreground/90 max-w-3xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Quantum Intelligence for Exchanges
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
            AI-Powered Crypto Foresight for a Borderless DeFi Future
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/30 border border-border">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">AI Predictions</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/30 border border-border">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Risk Analysis</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/30 border border-border">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">Arbitrage Detection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
