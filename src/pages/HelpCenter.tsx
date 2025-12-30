import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";
import { 
  ArrowLeft, Shield, Clock, AlertOctagon, FileCheck, Heart, Lock, AlertTriangle,
  ChevronRight, Users, Camera, Bot, KeyRound, ExternalLink, Phone, Ban, Save,
  MessageSquareOff, CheckCircle, Eye, Database, Globe, Fingerprint
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Complete Help Guide - Digital Dignity Toolkit</title>
        <meta name="description" content="Your comprehensive guide to digital safety. Step-by-step protocols for crisis response, evidence preservation, and getting support." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container max-w-5xl">
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

            {/* Hero Section */}
            <div className="relative rounded-[2rem] overflow-hidden mb-16">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }} />
              
              <div className="relative p-8 sm:p-12 lg:p-16">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border/50 mb-6">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Complete Resource Guide</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
                      Everything You Need,{" "}
                      <span className="text-gradient">In One Place</span>
                    </h1>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                      From urgent crisis response to long-term support resources. 
                      Navigate digital harm with clear, actionable guidance.
                    </p>
                  </div>
                  
                  <div className="lg:w-64 flex flex-col gap-3">
                    <Button variant="hero" size="lg" onClick={() => navigate('/scenarios')} className="justify-between">
                      Get Step-by-Step Help
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="calm" size="lg" onClick={() => navigate('/chat')} className="justify-between">
                      Talk with AI Support
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* First 10 Minutes - Critical Section */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-destructive" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wider">CRITICAL</span>
                  <h2 className="text-3xl font-display font-semibold text-foreground">First 10 Minutes</h2>
                </div>
              </div>

              {/* Emergency callout */}
              <div className="mb-8 p-6 rounded-2xl bg-destructive/5 border-2 border-destructive/20">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">In immediate physical danger?</h3>
                    <p className="text-muted-foreground">Stop reading and call 911 or your local emergency number.</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Ban, title: "DO NOT respond or engage", desc: "Any response tells them you're vulnerable. Silence is protection.", critical: true },
                  { icon: MessageSquareOff, title: "DO NOT delete anything", desc: "Evidence you delete now cannot be recovered later.", critical: true },
                  { icon: AlertTriangle, title: "DO NOT pay money", desc: "Paying never stops them. It proves you'll pay and invites more demands.", critical: true },
                  { icon: Save, title: "Screenshot EVERYTHING", desc: "Capture threats, profiles, usernames, timestamps. Save to a private folder.", critical: false },
                  { icon: Shield, title: "Lock your accounts", desc: "Change passwords immediately. Start with email — it's the master key.", critical: false },
                  { icon: Users, title: "Tell a trusted adult", desc: "You don't have to handle this alone. A parent, teacher, or counselor can help.", critical: false },
                ].map((action, index) => (
                  <div
                    key={index}
                    className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-card ${
                      action.critical
                        ? "bg-destructive/5 border-destructive/20"
                        : "bg-card border-border/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        action.critical ? "bg-destructive/10" : "bg-primary/10"
                      }`}>
                        <action.icon className={`w-6 h-6 ${action.critical ? "text-destructive" : "text-primary"}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg mb-1 ${action.critical ? "text-destructive" : "text-foreground"}`}>
                          {action.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{action.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Scenario Quick Links */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-semibold text-foreground">Situation Guides</h2>
                  <p className="text-muted-foreground">Step-by-step response for your specific situation</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    id: "screenshot-blackmail",
                    icon: Camera, 
                    title: "Screenshot Blackmail", 
                    desc: "Someone is threatening to share intimate images or private conversations",
                    color: "from-destructive/10 to-destructive/5",
                    iconColor: "text-destructive"
                  },
                  { 
                    id: "deepfake",
                    icon: Bot, 
                    title: "Fake Content", 
                    desc: "AI-generated or edited images/videos of you are spreading online",
                    color: "from-warning/10 to-warning/5",
                    iconColor: "text-warning"
                  },
                  { 
                    id: "account-takeover",
                    icon: KeyRound, 
                    title: "Account Takeover", 
                    desc: "You've lost access to your accounts or someone is posting as you",
                    color: "from-accent/10 to-accent/5",
                    iconColor: "text-accent"
                  },
                ].map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => navigate(`/guide/${scenario.id}`)}
                    className="group relative text-left p-8 rounded-3xl border border-border/50 bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${scenario.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 ${scenario.iconColor}`}>
                        <scenario.icon className="w-7 h-7" />
                      </div>
                      
                      <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {scenario.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {scenario.desc}
                      </p>
                      
                      <div className="flex items-center gap-2 text-primary font-medium">
                        Get Help
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Evidence Preservation */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <FileCheck className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-semibold text-foreground">Evidence Preservation</h2>
                  <p className="text-muted-foreground">Document everything properly for maximum protection</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/20">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-accent" />
                      What to Capture
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Full screenshots of all threatening messages",
                        "The person's profile, username, and display picture",
                        "Any URLs where content appears",
                        "Timestamps visible in the screenshots",
                        "Your screen recording if messages are disappearing"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                      <Save className="w-5 h-5 text-accent" />
                      Where to Store
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "A private email to yourself (creates timestamp)",
                        "A hidden folder on your device",
                        "Cloud storage only you can access",
                        "Multiple locations for backup",
                        "NOT in a shared family photo library"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Under 18 Section */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-warning" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-semibold text-foreground">If You're Under 18</h2>
                  <p className="text-muted-foreground">Special protections and resources for minors</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-warning/5 border border-warning/20">
                <div className="flex items-start gap-4 mb-6">
                  <Shield className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">You have extra legal protections</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      If someone is sharing or threatening to share intimate images of a minor, 
                      this is a serious crime in most places — regardless of who originally took the images.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href="https://cybertipline.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-warning/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-warning" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-warning transition-colors">CyberTipline</div>
                      <div className="text-sm text-muted-foreground">Report exploitation (NCMEC)</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>

                  <a
                    href="https://stopncii.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-warning/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                      <Ban className="w-6 h-6 text-warning" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-warning transition-colors">StopNCII.org</div>
                      <div className="text-sm text-muted-foreground">Remove images from platforms</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </section>

            {/* Quick Links to Other Pages */}
            <section className="grid sm:grid-cols-2 gap-6">
              <button
                onClick={() => navigate('/privacy')}
                className="group text-left p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all"
              >
                <Lock className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  Privacy Explained
                </h3>
                <p className="text-muted-foreground mb-4">
                  Learn how we protect your information and why no data is stored.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Learn more
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => navigate('/helplines')}
                className="group text-left p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all"
              >
                <Heart className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  Help & Hotlines
                </h3>
                <p className="text-muted-foreground mb-4">
                  Crisis hotlines, support organizations, and people ready to help.
                </p>
                <div className="flex items-center gap-2 text-accent font-medium">
                  View resources
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HelpCenter;
