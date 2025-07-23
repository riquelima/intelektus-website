
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SegmentsSection from "@/components/SegmentsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SegmentsSection />
      <HowItWorksSection />
      <div id="projects">
        <ProjectsSection />
      </div>
      <TestimonialsSection />
      <ContactSection />
      <AboutSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
