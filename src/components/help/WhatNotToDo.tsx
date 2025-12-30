import { XCircle, AlertOctagon } from "lucide-react";

const mistakes = [
  {
    action: "Don't panic-delete messages or posts",
    reason: "You'll lose evidence needed for reporting",
    tip: "Screenshot first, then consider hiding (not deleting)"
  },
  {
    action: "Don't confront the person publicly",
    reason: "This often escalates the situation and gives them more power",
    tip: "Let authorities and platforms handle confrontation"
  },
  {
    action: "Don't share your situation on social media",
    reason: "This can spread the content further and invite more attackers",
    tip: "Share only with trusted adults who can help privately"
  },
  {
    action: "Don't send money, gift cards, or crypto",
    reason: "Payment never stops blackmail — it invites more demands",
    tip: "Block, report, and document instead"
  },
  {
    action: "Don't click links they send you",
    reason: "These may install malware or hack more of your accounts",
    tip: "Report the links to the platform as phishing"
  },
  {
    action: "Don't create a new account to confront them",
    reason: "This breaks the no-contact rule and may be seen as harassment",
    tip: "Document their new accounts and report them instead"
  },
  {
    action: "Don't assume it's your fault",
    reason: "Predators are skilled manipulators — being tricked doesn't make you guilty",
    tip: "This is not about what you did. It's about what they're doing."
  }
];

const WhatNotToDo = () => {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
          <AlertOctagon className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            What NOT to Do
          </h2>
          <p className="text-sm text-muted-foreground">Common mistakes to avoid</p>
        </div>
      </div>

      <div className="space-y-4">
        {mistakes.map((mistake, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-secondary/50 border border-border/50"
          >
            <div className="flex items-start gap-3 mb-2">
              <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <h3 className="font-semibold text-foreground">{mistake.action}</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-8 mb-2">
              <span className="text-warning font-medium">Why: </span>
              {mistake.reason}
            </p>
            <p className="text-sm text-muted-foreground ml-8">
              <span className="text-primary font-medium">Instead: </span>
              {mistake.tip}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatNotToDo;
