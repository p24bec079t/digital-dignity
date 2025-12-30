import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Scenarios from "./pages/Scenarios";
import Guide from "./pages/Guide";
import DeepfakeCheck from "./pages/DeepfakeCheck";
import HelpCenter from "./pages/HelpCenter";
import Chat from "./pages/Chat";
import Privacy from "./pages/Privacy";
import HelplinesPage from "./pages/HelplinesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/guide/:scenarioId" element={<Guide />} />
            <Route path="/deepfake-check" element={<DeepfakeCheck />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/helplines" element={<HelplinesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
