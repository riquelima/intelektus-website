
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import BenefitsSection from '@/components/BenefitsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CasesSection from '@/components/CasesSection';
import SegmentsSection from '@/components/SegmentsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TechStackSection from '@/components/TechStackSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <HeroSection />
      {/* Soluções — 8 cards de serviços */}
      <FeaturesSection />
      {/* Benefícios — por que investir em sistema personalizado */}
      <BenefitsSection />
      {/* Portfólio de projetos com integração Supabase */}
      <div id="projects">
        <ProjectsSection />
      </div>
      {/* Cases de sucesso com resultados reais */}
      <CasesSection />
      {/* Segmentos — 13 tipos de empresas */}
      <SegmentsSection />
      {/* Como trabalhamos — 6 etapas */}
      <HowItWorksSection />
      {/* Stack tecnológica */}
      <TechStackSection />
      {/* Depoimentos */}
      <TestimonialsSection />
      {/* Contato */}
      <div id="contato">
        <ContactSection />
      </div>
      {/* Quem somos */}
      <AboutSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
