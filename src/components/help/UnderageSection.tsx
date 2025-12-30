import { AlertTriangle, Scale, MessageSquare, Shield, ChevronRight, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const underageInfo = {
  general: {
    title: "Important: You Have Extra Protections",
    content: "If you're under 18, the law treats your situation differently. Intimate images of minors are illegal to create, share, or possess — even if you took them yourself. This means:",
    points: [
      "The person threatening you is committing a serious crime",
      "Platforms are legally required to remove this content quickly",
      "Reporting mechanisms are more aggressive for minors",
      "You cannot get in legal trouble for being a victim"
    ]
  },
  scenarios: [
    {
      id: "sextortion",
      title: "If someone is blackmailing you with images",
      icon: MessageSquare,
      content: [
        {
          heading: "This is a federal crime",
          text: "Sextortion of a minor is one of the most aggressively prosecuted cybercrimes. The FBI has dedicated units for this."
        },
        {
          heading: "You are NOT in trouble",
          text: "Even if you sent images yourself, you are the victim. Law enforcement knows predators manipulate teens — that's why they target you."
        },
        {
          heading: "Report immediately",
          text: "Use CyberTipline.org — it goes directly to the National Center for Missing & Exploited Children, who coordinate with the FBI."
        }
      ],
      reportLink: "https://report.cybertip.org"
    },
    {
      id: "deepfakes",
      title: "If someone made fake images/videos of you",
      icon: Shield,
      content: [
        {
          heading: "AI-generated CSAM is still illegal",
          text: "Deepfakes depicting minors sexually are treated the same as real abuse material under federal law."
        },
        {
          heading: "Platforms must remove immediately",
          text: "Major platforms are legally required to report and remove this content. They take minor deepfakes extremely seriously."
        },
        {
          heading: "You can request takedowns",
          text: "Organizations like NCMEC can issue takedown requests to platforms on your behalf without revealing your identity."
        }
      ],
      reportLink: "https://takeitdown.ncmec.org"
    },
    {
      id: "leaked",
      title: "If real images of you were shared",
      icon: Scale,
      content: [
        {
          heading: "This is distribution of CSAM",
          text: "Anyone who shares intimate images of a minor is committing a felony — even other teens."
        },
        {
          heading: "Get images hashed and blocked",
          text: "NCMEC's Take It Down program can create a digital \"fingerprint\" of images so platforms automatically block them."
        },
        {
          heading: "Tell a trusted adult",
          text: "This is serious enough that you need adult support. A school counselor or parent can help navigate reporting."
        }
      ],
      reportLink: "https://takeitdown.ncmec.org"
    }
  ]
};

const UnderageSection = () => {
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Are You Under 18?
          </h2>
          <p className="text-sm text-muted-foreground">Special protections for minors</p>
        </div>
      </div>

      <Card className="bg-warning/5 border-warning/20 p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-3">{underageInfo.general.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{underageInfo.general.content}</p>
        <ul className="space-y-2">
          {underageInfo.general.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
              <Shield className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="space-y-3">
        {underageInfo.scenarios.map((scenario) => (
          <div key={scenario.id} className="rounded-xl border border-border/50 overflow-hidden">
            <button
              onClick={() => setExpandedScenario(
                expandedScenario === scenario.id ? null : scenario.id
              )}
              className="w-full p-4 bg-secondary/50 flex items-center justify-between hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <scenario.icon className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground text-left">{scenario.title}</span>
              </div>
              <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                expandedScenario === scenario.id ? "rotate-90" : ""
              }`} />
            </button>
            
            {expandedScenario === scenario.id && (
              <div className="p-4 bg-background space-y-4">
                {scenario.content.map((item, idx) => (
                  <div key={idx}>
                    <h4 className="font-medium text-foreground mb-1">{item.heading}</h4>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
                <Button variant="hero" size="sm" className="mt-4" asChild>
                  <a href={scenario.reportLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Report Now
                  </a>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/30">
        <p className="text-sm text-muted-foreground text-center">
          <strong className="text-foreground">Remember:</strong> You are not in trouble. 
          The adults in your life want to help you — not punish you. 
          Predators count on your fear to keep you silent.
        </p>
      </div>
    </section>
  );
};

export default UnderageSection;
