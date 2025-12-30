import { Phone, MessageCircle, Globe, ExternalLink, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const helplines = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 crisis support for anyone in emotional distress",
    type: "crisis"
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free 24/7 support via text message",
    type: "text"
  },
  {
    name: "NCMEC CyberTipline",
    phone: "1-800-843-5678",
    website: "cybertipline.org",
    description: "Report child exploitation and get help",
    type: "report"
  },
  {
    name: "Childhelp National Hotline",
    phone: "1-800-422-4453",
    description: "24/7 support for child abuse and crisis intervention",
    type: "crisis"
  },
  {
    name: "Cyber Civil Rights Initiative",
    website: "cybercivilrights.org",
    description: "Support for victims of non-consensual intimate images",
    type: "support"
  },
  {
    name: "StopNCII.org",
    website: "stopncii.org",
    description: "Remove intimate images from major platforms",
    type: "support"
  }
];

const organizations = [
  {
    name: "RAINN",
    website: "rainn.org",
    description: "Anti-sexual violence organization with 24/7 hotline"
  },
  {
    name: "Thorn",
    website: "thorn.org",
    description: "Technology to defend children from sexual abuse"
  },
  {
    name: "Internet Watch Foundation",
    website: "iwf.org.uk",
    description: "Report and remove child sexual abuse content"
  }
];

const Helplines = () => {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Heart className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Help & Support Resources
          </h2>
          <p className="text-sm text-muted-foreground">You're not alone</p>
        </div>
      </div>

      <Card className="bg-accent/5 border-accent/20 p-4 mb-6">
        <p className="text-sm text-foreground text-center">
          <strong>These are real people ready to help.</strong> All resources listed are free, 
          confidential, and available in the US. International resources at bottom.
        </p>
      </Card>

      {/* Crisis Hotlines */}
      <div className="space-y-3 mb-8">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <Phone className="w-4 h-4 text-primary" />
          Crisis & Support Hotlines
        </h3>
        {helplines.map((line, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-secondary/50 border border-border/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h4 className="font-semibold text-foreground">{line.name}</h4>
                <p className="text-sm text-muted-foreground">{line.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {line.phone && (
                  <Button variant="calm" size="sm" className="h-8 text-xs" asChild>
                    <a href={`tel:${line.phone.replace(/\D/g, '')}`}>
                      {line.type === "text" ? (
                        <MessageCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Phone className="w-3 h-3 mr-1" />
                      )}
                      {line.phone}
                    </a>
                  </Button>
                )}
                {line.website && (
                  <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
                    <a href={`https://${line.website}`} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-3 h-3 mr-1" />
                      {line.website}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Organizations */}
      <div>
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-primary" />
          Organizations That Can Help
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {organizations.map((org, index) => (
            <a
              key={index}
              href={`https://${org.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {org.name}
                </h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">{org.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Helplines;
