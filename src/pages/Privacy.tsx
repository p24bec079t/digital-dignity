import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, Lock, Eye, Database, Shield, CheckCircle, Server, Globe, Fingerprint } from "lucide-react";
import { Helmet } from "react-helmet-async";

const privacyFeatures = [
  {
    icon: Database,
    title: "Zero Data Storage",
    description: "Nothing you type, upload, or view is ever saved. When you close this tab, everything vanishes.",
    color: "text-primary"
  },
  {
    icon: Eye,
    title: "No Tracking",
    description: "No cookies. No analytics. No fingerprinting. We genuinely don't know who you are.",
    color: "text-accent"
  },
  {
    icon: Lock,
    title: "No Account Required",
    description: "No sign-ups. No emails. No phone numbers. Just help, instantly available.",
    color: "text-primary"
  },
  {
    icon: Server,
    title: "No Third Parties",
    description: "Your visit stays between you and your browser. We don't share anything with anyone.",
    color: "text-accent"
  }
];

const whatThisMeans = [
  "No one can trace your visit back to you",
  "Your parents, school, or anyone else can't see you used this site through us",
  "Use private/incognito mode for zero device records too",
  "Close this tab anytime — everything disappears instantly"
];

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Privacy - Digital Dignity Toolkit</title>
        <meta name="description" content="Your privacy is sacred. No data stored, no tracking, no accounts required. Learn how we protect you." />
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

            {/* Hero section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 mb-8">
                <Lock className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">
                Your Privacy is <span className="text-gradient">Sacred</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We built this for people who might be scared to ask for help. 
                That means privacy isn't optional — it's the foundation.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              {privacyFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 ${feature.color}`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* What this means */}
            <div className="relative rounded-3xl overflow-hidden mb-16">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
              
              <div className="relative p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-display font-semibold text-foreground">
                    What this means for you
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatThisMeans.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-card/80 border border-border/30"
                    >
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <p className="text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical details */}
            <div className="p-8 rounded-3xl bg-secondary/30 border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <Fingerprint className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Technical Details</h3>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  • <strong className="text-foreground">Client-side only:</strong> All processing happens in your browser. Nothing is sent to our servers.
                </p>
                <p>
                  • <strong className="text-foreground">No cookies:</strong> We don't set any cookies, local storage, or session storage.
                </p>
                <p>
                  • <strong className="text-foreground">No external requests:</strong> We don't load third-party scripts, fonts, or analytics.
                </p>
                <p>
                  • <strong className="text-foreground">Open design:</strong> The architecture is designed so that privacy is guaranteed by the code, not just by policy.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
