import { FileCheck, Camera, FolderLock, Clock, CheckCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    step: 1,
    title: "Screenshot Everything",
    items: [
      "Capture the threat/content itself",
      "The sender's profile/username",
      "The URL or link (if visible)",
      "Date and time stamps",
      "Any previous messages for context"
    ]
  },
  {
    step: 2,
    title: "Save Multiple Copies",
    items: [
      "Email screenshots to yourself (use a private address)",
      "Save to cloud storage (Google Drive, iCloud)",
      "Keep copies on your device in a hidden folder",
      "If possible, ask a trusted adult to keep copies too"
    ]
  },
  {
    step: 3,
    title: "Document the Timeline",
    items: [
      "Write down when you first discovered the content",
      "Note any interactions you've had",
      "Record any threats or demands made",
      "Keep track of who you've told"
    ]
  }
];

const tips = [
  {
    icon: Camera,
    tip: "Use your phone's built-in screenshot (Power + Volume or Side button)"
  },
  {
    icon: Clock,
    tip: "Make sure date/time settings are accurate on your device"
  },
  {
    icon: FolderLock,
    tip: "Create a folder called something boring like 'School Backup'"
  }
];

const EvidencePreservation = () => {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Evidence Preservation Guide
          </h2>
          <p className="text-sm text-muted-foreground">Protect proof for reporting</p>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            <strong>Why this matters:</strong> Platforms and authorities need evidence to take action. 
            Content can be deleted by harassers at any time — capture it before it's gone.
          </p>
        </div>
      </Card>

      <div className="space-y-6">
        {steps.map((section) => (
          <div key={section.step} className="p-5 rounded-xl bg-secondary/50 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {section.step}
              </div>
              <h3 className="font-semibold text-foreground">{section.title}</h3>
            </div>
            <ul className="space-y-2 ml-11">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/30">
        <h4 className="font-medium text-foreground mb-3">Quick Tips</h4>
        <div className="space-y-2">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
              <tip.icon className="w-4 h-4 text-primary" />
              <span>{tip.tip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvidencePreservation;
