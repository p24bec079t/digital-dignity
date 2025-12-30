import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, Bot, Shield, FileCheck, Lock, AlertCircle, Heart, Phone, ChevronRight, Info } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Step {
  id: string;
  title: string;
  content: string;
  action?: string;
}

const scenarioData: Record<string, { title: string; steps: Step[] }> = {
  "screenshot-blackmail": {
    title: "Screenshot Blackmail Response",
    steps: [
      {
        id: "pause",
        title: "Pause and Breathe",
        content: "I'm here. Let's slow this down. First, do not reply to the person threatening you, and do not delete anything. I'll guide you step by step through the next 10 minutes.",
        action: "I understand, let's continue"
      },
      {
        id: "preserve",
        title: "Preserve Evidence",
        content: "Take screenshots of all threats, messages, and the person's profile. Include timestamps if visible. Save these somewhere safe that only you can access — like a folder on your phone or a private email to yourself.",
        action: "I've saved the evidence"
      },
      {
        id: "secure",
        title: "Secure Your Accounts",
        content: "Change passwords on your most important accounts: email first, then social media. Enable two-factor authentication if you haven't already. This prevents them from gaining more access.",
        action: "My accounts are secured"
      },
      {
        id: "donts",
        title: "What NOT to Do",
        content: "Do NOT pay any money — this rarely stops them and often leads to more demands. Do NOT engage emotionally or argue with them. Do NOT delete evidence. Do NOT share this widely yet — you control who knows.",
        action: "I understand"
      },
      {
        id: "support",
        title: "Get Trusted Support",
        content: "You don't have to handle this alone. Consider telling a trusted adult — a parent, teacher, school counselor, or older sibling. They can help you report this properly and provide emotional support.",
        action: "I'll reach out to someone"
      },
      {
        id: "report",
        title: "Report the Threat",
        content: "Report the account to the platform where the threats are happening. Most platforms take this very seriously. You can also file a report with cybertip.org if you're in the US, or your local authorities for serious threats.",
        action: "Complete — What's next?"
      }
    ]
  },
  "deepfake": {
    title: "Fake Content Response",
    steps: [
      {
        id: "pause",
        title: "Take a Moment",
        content: "Finding fake content of yourself is deeply upsetting. Take a breath. This is not your fault, and there are steps we can take to address it.",
        action: "I'm ready to continue"
      },
      {
        id: "document",
        title: "Document Everything",
        content: "Screenshot where the content appears — the URL, the profile sharing it, any comments. Note the date and time you discovered it. This documentation is important for reporting.",
        action: "I've documented it"
      },
      {
        id: "verify",
        title: "Check the Spread",
        content: "Search for the content using reverse image search (Google Images, TinEye) to see if it appears elsewhere. This helps you understand the scope and where to focus reporting efforts.",
        action: "I've checked"
      },
      {
        id: "report",
        title: "Report to Platforms",
        content: "Report the content to every platform where it appears. Use their \"fake/manipulated media\" or \"non-consensual imagery\" reporting options. Most platforms prioritize removing this content.",
        action: "I'm reporting it"
      },
      {
        id: "support",
        title: "Get Support",
        content: "Tell a trusted adult what's happening. This is serious, and you deserve support. School counselors, parents, or organizations like the Cyber Civil Rights Initiative can help.",
        action: "I'll reach out"
      }
    ]
  },
  "account-takeover": {
    title: "Account Recovery Guide",
    steps: [
      {
        id: "assess",
        title: "Assess the Situation",
        content: "Let's figure out what happened. Can you still log into your account? Have you received any password reset emails you didn't request? Knowing this helps us take the right steps.",
        action: "Let me check"
      },
      {
        id: "email",
        title: "Secure Your Email First",
        content: "Your email is the key to everything. If it's compromised, change that password first and enable two-factor authentication. Check for any forwarding rules someone may have added.",
        action: "Email is secured"
      },
      {
        id: "recover",
        title: "Start Account Recovery",
        content: "Go to the platform's official account recovery page. Use the \"hacked account\" or \"can't access my account\" options. They'll verify your identity through backup email or phone.",
        action: "I'm on the recovery page"
      },
      {
        id: "notify",
        title: "Notify Your Contacts",
        content: "If the hacker is posting as you, let your friends and followers know through another channel. A quick message saying \"my account was hacked, ignore any strange messages\" helps prevent further harm.",
        action: "I've let people know"
      },
      {
        id: "secure-all",
        title: "Secure Other Accounts",
        content: "Change passwords on any accounts that shared the same password. Use a password manager to create unique passwords. Enable two-factor authentication everywhere possible.",
        action: "All accounts secured"
      }
    ]
  }
};

const Guide = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const scenario = scenarioId ? scenarioData[scenarioId] : null;

  useEffect(() => {
    if (!scenario) {
      navigate('/scenarios');
    }
  }, [scenario, navigate]);

  if (!scenario) return null;

  const step = scenario.steps[currentStep];
  const isLastStep = currentStep === scenario.steps.length - 1;

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>{scenario.title} - Digital Dignity Toolkit</title>
        <meta name="description" content={`Step-by-step guidance for ${scenario.title.toLowerCase()}. Calm, clear instructions to help you regain control.`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container max-w-2xl">
            {/* Back button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/scenarios')}
              className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Choose different scenario
            </Button>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {scenario.steps.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(((currentStep + 1) / scenario.steps.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${((currentStep + 1) / scenario.steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* AI Disclosure */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50 mb-6">
              <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Dignity Bot</strong> uses AI to guide you through pre-designed safety steps. 
                  It does not make decisions for you or store your information.
                </p>
              </div>
            </div>

            {/* Current step */}
            <Card variant="elevated" className="mb-6 slide-in-right" key={step.id}>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold text-foreground">
                    {step.title}
                  </h2>
                </div>
                
                <p className="text-foreground leading-relaxed mb-8 text-base">
                  {step.content}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="order-2 sm:order-1"
                    >
                      Previous step
                    </Button>
                  )}
                  
                  {!isLastStep ? (
                    <Button
                      variant="hero"
                      onClick={handleNext}
                      className="flex-1 order-1 sm:order-2"
                    >
                      {step.action || "Next step"}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      onClick={() => navigate('/scenarios')}
                      className="flex-1 order-1 sm:order-2"
                    >
                      Return to toolkit
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {scenario.steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-primary w-6' 
                      : completedSteps.has(index)
                        ? 'bg-primary/50'
                        : 'bg-border'
                  }`}
                />
              ))}
            </div>

            {/* Quick actions */}
            {isLastStep && (
              <div className="space-y-3 fade-in-up">
                <h3 className="font-display font-semibold text-foreground text-center mb-4">
                  Need more support?
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button variant="calm" className="justify-start h-auto py-4">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Crisis Hotline</div>
                      <div className="text-xs text-muted-foreground">Talk to someone now</div>
                    </div>
                  </Button>
                  <Button variant="calm" className="justify-start h-auto py-4">
                    <Heart className="w-5 h-5 mr-3 text-accent" />
                    <div className="text-left">
                      <div className="font-medium">Find a Counselor</div>
                      <div className="text-xs text-muted-foreground">In-person support</div>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Guide;
