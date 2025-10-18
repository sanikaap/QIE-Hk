import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* ... (Your existing hero content) ... */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium gradient-text">AI x Blockchain | QIExplorer</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold">
            <span className="gradient-text">QIExplorer</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90">
            Quantum Intelligence for Exchanges
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Decentralised AI Agent for Financial Risk & Arbitrage
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto italic">
            "AI-Powered Crypto Foresight for a Borderless DeFi Future"
          </p>
          <div className="pt-8 flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group"
              onClick={() => navigate("/dashboard")}
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <a href="#demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Or, see it in action
            </a>
          </div>
        </div>
      </div>

      
      <div id="demo" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">See QIExplorer in Action</h2>
            <p className="text-lg text-muted-foreground">
                Watch a quick walkthrough of our core features and how they can benefit you.
            </p>
        </div>

        {/* Responsive video wrapper using Tailwind's aspect-video class */}
        <div className="max-w-4xl mx-auto aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-black border border-border">
          <iframe
            className="w-full h-full"
            src="https://player.vimeo.com/video/1128437225?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            title="QIExplorer Product Demo"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
         
          <div className="card-gradient p-6 rounded-xl border border-border space-y-4 hover-scale"> <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"> <Brain className="w-6 h-6 text-primary" /> </div> <h3 className="text-xl font-semibold">AI Forecasting</h3> <p className="text-muted-foreground"> Powered by IBM Granite time-series model from Hugging Face for accurate crypto predictions </p> </div>
          <div className="card-gradient p-6 rounded-xl border border-border space-y-4 hover-scale"> <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"> <Shield className="w-6 h-6 text-primary" /> </div> <h3 className="text-xl font-semibold">Risk Analysis</h3> <p className="text-muted-foreground"> Real-time risk signals with confidence scores to make informed trading decisions </p> </div>
          <div className="card-gradient p-6 rounded-xl border border-border space-y-4 hover-scale"> <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"> <Zap className="w-6 h-6 text-primary" /> </div> <h3 className="text-xl font-semibold">Arbitrage Detection</h3> <p className="text-muted-foreground"> Identify profit opportunities across different cryptocurrencies instantly </p> </div>
        </div>
        <div className="mt-24 text-center space-y-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide"> Powered By </h3> <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"> <span className="px-4 py-2 rounded-lg bg-card border border-border">React + TypeScript</span> <span className="px-4 py-2 rounded-lg bg-card border border-border">Hugging Face AI</span> <span className="px-4 py-2 rounded-lg bg-card border border-border">CoinGecko API</span> <span className="px-4 py-2 rounded-lg bg-card border border-border">Recharts</span> </div>
        </div>
      </div>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built for Hackathon 2025 | Powered by React, OpenRouter, and CoinGecko</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;