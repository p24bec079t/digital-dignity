import { useState } from "react";
import { Shield, Heart, ChevronDown, BookOpen, Lock, Phone, Sparkles, ListChecks } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">

          </div>
          <span className="font-display font-semibold text-lg text-foreground">
            Digital Dignity
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {/* Get Help Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground gap-1.5">
                Get Help
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/scenarios')} className="cursor-pointer py-3">
                <ListChecks className="w-4 h-4 mr-3 text-primary" />
                <div>
                  <div className="font-medium">Step-by-Step Guide</div>
                  <div className="text-xs text-muted-foreground">Guided crisis response</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/chat')} className="cursor-pointer py-3">
                <Sparkles className="w-4 h-4 mr-3 text-accent" />
                <div>
                  <div className="font-medium">Talk with AI</div>
                  <div className="text-xs text-muted-foreground">Get personalized support</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/help-center">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground gap-1.5">
              <BookOpen className="w-4 h-4" />
              Help Guide
            </Button>
          </Link>
          
          <Link to="/privacy">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground gap-1.5">
              <Lock className="w-4 h-4" />
              Privacy
            </Button>
          </Link>
          
          <Link to="/helplines">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground gap-1.5">
              <Phone className="w-4 h-4" />
              Help
            </Button>
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;
