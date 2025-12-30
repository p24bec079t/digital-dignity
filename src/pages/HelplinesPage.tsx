import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";
import { ArrowLeft, Phone, MessageCircle, Globe, ExternalLink, Heart, Clock, Shield, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const crisisHotlines = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 crisis support for anyone in emotional distress",
    available: "24/7",
    type: "call"
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free 24/7 support via text message",
    available: "24/7",
    type: "text"
  },
  {
    name: "NCMEC CyberTipline",
    phone: "1-800-843-5678",
    website: "cybertipline.org",
    description: "Report child exploitation and get help",
    available: "24/7",
    type: "call"
  },
  {
    name: "Childhelp National Hotline",
    phone: "1-800-422-4453",
    description: "24/7 support for child abuse and crisis intervention",
    available: "24/7",
    type: "call"
  }
];

const supportOrganizations = [
  {
    name: "RAINN",
    website: "rainn.org",
    description: "Anti-sexual violence organization with 24/7 hotline",
    focus: "Sexual violence support"
  },
  {
    name: "Cyber Civil Rights Initiative",
    website: "cybercivilrights.org",
    description: "Support for victims of non-consensual intimate images",
    focus: "Image abuse support"
  },
  {
    name: "StopNCII.org",
    website: "stopncii.org",
    description: "Remove intimate images from major platforms",
    focus: "Image removal"
  },
  {
    name: "Thorn",
    website: "thorn.org",
    description: "Technology to defend children from sexual abuse",
    focus: "Child protection"
  },
  {
    name: "Internet Watch Foundation",
    website: "iwf.org.uk",
    description: "Report and remove child sexual abuse content",
    focus: "Content removal"
  },
  {
    name: "ConnectSafely",
    website: "connectsafely.org",
    description: "Online safety resources for teens and parents",
    focus: "Online safety"
  }
];

const HelplinesPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Help & Hotlines - Digital Dignity Toolkit</title>
        <meta name="description" content="Crisis hotlines and support organizations ready to help. You're not alone." />
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
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 mb-8">
                <Heart className="w-10 h-10 text-accent" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">
                You're <span className="text-gradient">Not Alone</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Real people are ready to help, right now. All resources are free, confidential, and staffed by trained professionals.
              </p>
            </div>

            {/* Emergency notice */}
            <div className="mb-12 p-6 rounded-3xl bg-destructive/5 border border-destructive/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-foreground mb-2">In Immediate Danger?</h2>
                  <p className="text-muted-foreground mb-4">
                    If you're in immediate physical danger or someone is threatening to hurt you, call emergency services immediately.
                  </p>
                  <Button variant="destructive" size="lg" asChild>
                    <a href="tel:911">
                      <Phone className="w-4 h-4 mr-2" />
                      Call 911
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Crisis Hotlines */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-semibold text-foreground">Crisis Hotlines</h2>
                  <p className="text-muted-foreground">Talk to someone right now</p>
                </div>
              </div>

              <div className="space-y-4">
                {crisisHotlines.map((hotline, index) => (
                  <div
                    key={index}
                    className="group relative p-6 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 fade-in-up"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-semibold text-foreground text-lg">
                            {hotline.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {hotline.available}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{hotline.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button variant="hero" size="lg" asChild>
                          <a href={`tel:${hotline.phone.replace(/\D/g, '')}`}>
                            {hotline.type === "text" ? (
                              <MessageCircle className="w-4 h-4 mr-2" />
                            ) : (
                              <Phone className="w-4 h-4 mr-2" />
                            )}
                            {hotline.phone}
                          </a>
                        </Button>
                        {hotline.website && (
                          <Button variant="outline" size="lg" asChild>
                            <a href={`https://${hotline.website}`} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-4 h-4 mr-2" />
                              Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Organizations */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-semibold text-foreground">Support Organizations</h2>
                  <p className="text-muted-foreground">Additional resources and help</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportOrganizations.map((org, index) => (
                  <a
                    key={index}
                    href={`https://${org.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-6 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 fade-in-up"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                        {org.focus}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                      {org.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {org.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HelplinesPage;
