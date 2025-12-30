import { Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="py-12 border-t border-border/50 bg-secondary/20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
            <span className="font-display font-medium text-foreground">

            </span>
            </div>




            <div className="flex items-center gap-2 text-sm text-muted-foreground">

            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/30 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl mx-auto">
              This toolkit provides guidance only. In emergencies, contact local authorities.
              If you're in immediate danger, please call emergency services.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;