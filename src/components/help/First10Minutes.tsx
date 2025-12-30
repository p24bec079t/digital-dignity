import { Clock, AlertTriangle, Ban, Save, Shield, MessageSquareOff } from "lucide-react";
import { Card } from "@/components/ui/card";

const urgentActions = [
  {
    icon: Ban,
    title: "DO NOT respond or engage",
    description: "Any response tells them you're vulnerable. Silence is protection.",
    priority: "critical"
  },
  {
    icon: MessageSquareOff,
    title: "DO NOT delete anything",
    description: "Evidence you delete now cannot be recovered later.",
    priority: "critical"
  },
  {
    icon: Save,
    title: "Screenshot EVERYTHING",
    description: "Capture threats, profiles, usernames, timestamps. Save to a private folder.",
    priority: "high"
  },
  {
    icon: Shield,
    title: "Lock your accounts",
    description: "Change passwords immediately. Start with email — it's the master key.",
    priority: "high"
  },
  {
    icon: AlertTriangle,
    title: "DO NOT pay money",
    description: "Paying never stops them. It proves you'll pay and invites more demands.",
    priority: "critical"
  }
];

const First10Minutes = () => {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
          <Clock className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            First 10 Minutes
          </h2>
          <p className="text-sm text-destructive font-medium">URGENT ACTIONS</p>
        </div>
      </div>

      <Card className="border-destructive/30 bg-destructive/5 p-6 mb-6">
        <p className="text-foreground font-medium text-center">
          If you're in immediate danger, stop and call 911 or your local emergency number.
        </p>
      </Card>

      <div className="space-y-3">
        {urgentActions.map((action, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
              action.priority === "critical"
                ? "bg-destructive/5 border-destructive/20"
                : "bg-secondary/50 border-border/50"
            }`}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              action.priority === "critical" ? "bg-destructive/10" : "bg-primary/10"
            }`}>
              <action.icon className={`w-5 h-5 ${
                action.priority === "critical" ? "text-destructive" : "text-primary"
              }`} />
            </div>
            <div>
              <h3 className={`font-semibold mb-1 ${
                action.priority === "critical" ? "text-destructive" : "text-foreground"
              }`}>
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default First10Minutes;
