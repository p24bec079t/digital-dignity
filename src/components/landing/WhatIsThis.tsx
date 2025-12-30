import { Heart, Shield, AlertTriangle, Users, ArrowRight, Sparkles, Lock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Clock,
    title: "Crisis Response",
    description: "Step-by-step guidance when every minute matters. Clear actions, not overwhelming advice.",
    gradient: "from-destructive/10 to-destructive/5"
  },
  {
    icon: Shield,
    title: "Evidence Tools",
    description: "Learn exactly what to document, how to save it, and where to keep it safe.",
    gradient: "from-primary/10 to-primary/5"
  },
  {
    icon: Lock,
    title: "Total Privacy",
    description: "Nothing stored. Nothing tracked. Your visit here is completely invisible.",
    gradient: "from-accent/10 to-accent/5"
  },
  {
    icon: Heart,
    title: "Human Connection",
    description: "Direct links to real people who understand and are ready to help you.",
    gradient: "from-warning/10 to-warning/5"
  }
];

const WhatIsThis = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 mb-6 fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Digital First Aid</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
            What is this <span className="text-gradient">toolkit</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
            Think of it as an emergency kit for digital harm. When something threatening happens online, 
            this toolkit helps you stay calm, preserve evidence, and take the right steps — fast.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 3)}s` }}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative h-full p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative rounded-[2rem] overflow-hidden fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
          
          <div className="relative p-8 sm:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-6" />
              
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                Important to understand
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                This tool supports your decision-making. It does not replace trusted adults, counselors, or authorities. 
                When in doubt, reach out to someone you trust. You're not meant to handle this alone.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" onClick={() => navigate('/help-center')}>
                  Explore the Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="calm" size="lg" onClick={() => navigate('/helplines')}>
                  Talk to Someone Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsThis;
