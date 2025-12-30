import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import WhatIsThis from "@/components/landing/WhatIsThis";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Digital Dignity Toolkit - First Aid for Digital Harm</title>
        <meta name="description" content="A calm, step-by-step crisis response guide for teens facing online threats like screenshot blackmail, deepfakes, or account takeovers. No data stored. No tracking." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <WhatIsThis />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
