import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, ListChecks, Sparkles, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl breathing" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Digital Dignity Toolkit</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-6 fade-in-up leading-tight" style={{ animationDelay: '0.2s' }}>
            First Aid for{" "}
            <span className="text-gradient">Digital Harm</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
            A calm, step-by-step guide to help you regain control when facing online threats. 
            No judgment. No tracking. Just support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="hero" 
                  size="xl"
                  className="w-full sm:w-auto group"
                >
                  Get Help Now
                  <ChevronDown className="w-5 h-5 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64">
                <DropdownMenuItem onClick={() => navigate('/scenarios')} className="cursor-pointer py-4">
                  <ListChecks className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <div className="font-semibold">Step-by-Step Guide</div>
                    <div className="text-xs text-muted-foreground">Guided crisis response</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/chat')} className="cursor-pointer py-4">
                  <Sparkles className="w-5 h-5 mr-3 text-accent" />
                  <div>
                    <div className="font-semibold">Talk with AI</div>
                    <div className="text-xs text-muted-foreground">Get personalized support</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="calm" 
              size="lg"
              onClick={() => navigate('/deepfake-check')}
              className="w-full sm:w-auto"
            >
              Check for Deepfakes
            </Button>
          </div>

          {/* Privacy statement */}
          <div className="mt-12 flex items-center justify-center gap-3 text-sm text-muted-foreground fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Lock className="w-4 h-4 text-success" />
            <span>No data stored. No tracking. No judgment.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
