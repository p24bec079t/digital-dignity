import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";
import { Camera, Bot, KeyRound, ArrowLeft, Shield, Sparkles, ChevronRight, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const scenarios = [
  {
    id: "screenshot-blackmail",
    icon: Camera,
    title: "Someone is threatening me with screenshots",
    description: "You're being blackmailed or threatened with intimate images, screenshots of private conversations, or other sensitive content.",
    gradient: "from-destructive/10 to-destructive/5",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive"
  },
  {
    id: "deepfake",
    icon: Bot,
    title: "A fake image or video of me is spreading",
    description: "Someone has created or is sharing AI-generated, edited, or fake content that looks like you.",
    gradient: "from-warning/10 to-warning/5",
    iconBg: "bg-warning/10",
    iconColor: "text-warning"
  },
  {
    id: "account-takeover",
    icon: KeyRound,
    title: "My account has been hacked or taken over",
    description: "You've lost access to your social media, email, or other accounts, or someone is posting as you.",
    gradient: "from-accent/10 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent"
  }
];

const Scenarios = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Select Your Situation - Digital Dignity Toolkit</title>
        <meta name="description" content="Choose the scenario that best describes what you're experiencing. We'll guide you through the next steps." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container max-w-4xl">
            {/* Back button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-4">
                What's <span className="text-gradient">happening</span>?
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Select the scenario that best describes your situation. We'll guide you through the next steps.
              </p>
            </div>

            {/* Emergency notice */}
            <div className="mb-8 p-4 rounded-2xl bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-3 text-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-foreground">
                  <strong>In immediate physical danger?</strong> Call 911 or your local emergency number first.
                </p>
              </div>
            </div>

            {/* Scenario cards */}
            <div className="space-y-4 mb-12">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  onClick={() => navigate(`/guide/${scenario.id}`)}
                  className="group relative w-full text-left fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${scenario.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative p-6 sm:p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${scenario.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <scenario.icon className={`w-7 h-7 ${scenario.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {scenario.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {scenario.description}
                        </p>
                      </div>
                      
                      <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Alternative option */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border/50 text-center">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                Not sure which one fits?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Talk with our AI support for personalized guidance based on your specific situation.
              </p>
              <Button variant="hero" size="lg" onClick={() => navigate('/chat')}>
                <Sparkles className="w-4 h-4 mr-2" />
                Talk with AI Support
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Scenarios;
