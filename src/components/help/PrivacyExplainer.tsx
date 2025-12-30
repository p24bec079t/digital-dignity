import { Lock, Eye, Database, Shield, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const privacyPoints = [
  {
    icon: Database,
    title: "No Data Storage",
    description: "We don't save anything you type or upload. When you leave, it's gone."
  },
  {
    icon: Eye,
    title: "No Tracking",
    description: "No cookies, no analytics, no fingerprinting. We don't know who you are."
  },
  {
    icon: Lock,
    title: "No Accounts Required",
    description: "You don't need to sign up or log in. No email, no phone number."
  },
  {
    icon: Shield,
    title: "No Third-Party Sharing",
    description: "Your visit here stays between you and your browser. Period."
  }
];

const PrivacyExplainer = () => {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Your Privacy
          </h2>
          <p className="text-sm text-muted-foreground">How we protect you</p>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20 p-6 mb-6">
        <p className="text-foreground text-center font-medium">
          "We built this for people who might be scared to ask for help. 
          That means privacy isn't optional — it's the foundation."
        </p>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {privacyPoints.map((point, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-secondary/50 border border-border/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <point.icon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{point.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-8">{point.description}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          What this means for you
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground ml-6">
          <li>• No one can trace your visit back to you</li>
          <li>• Your parents, school, or anyone else can't see you used this site through us</li>
          <li>• If you use private/incognito mode, there's no record on your device either</li>
          <li>• You can close this tab at any time and everything disappears</li>
        </ul>
      </div>
    </section>
  );
};

export default PrivacyExplainer;
