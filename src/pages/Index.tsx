import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MobileDrawer from '@/components/MobileDrawer';
import HeroSection from '@/components/HeroSection';
import ParticleCanvas from '@/components/ParticleCanvas';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Pequeno delay para esperar a página voltar ao lugar antes do scroll
    setTimeout(() => {
      const section = document.querySelector(sectionId);
      if (section) {
        window.scrollTo({ top: (section as HTMLElement).offsetTop - 80, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#04040D]">
      {/* Particle Canvas de Fundo */}
      <ParticleCanvas />

      {/* Header Fixo Global */}
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        onNavigate={scrollToSection} 
      />

      {/* Drawer Lateral Mobile com Animação da Direita */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />

      {/* Container do Conteúdo do Site que se Move para a Esquerda em Efeito 3D */}
      <div
        className={`min-h-screen relative transition-all duration-500 origin-left ${
          isMenuOpen
            ? '-translate-x-[260px] sm:-translate-x-[320px] scale-[0.91] sm:scale-[0.94] rounded-[2.5rem] overflow-hidden shadow-[-30px_0_80px_rgba(0,0,0,0.95)] ring-2 ring-[#6C63FF]/30 select-none'
            : 'translate-x-0 scale-100 rounded-none'
        }`}
        style={{
          background: 'var(--bg-primary)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={() => {
          if (isMenuOpen) setIsMenuOpen(false);
        }}
      >
        {/* Overlay translúcido de toque para fechar quando a tela estiver deslocada */}
        {isMenuOpen && (
          <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px] cursor-pointer" />
        )}

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
      </div>

      {/* Botão Flutuante do WhatsApp Único com Ocultação ao Abrir o Menu */}
      <WhatsAppButton hide={isMenuOpen} />
    </div>
  );
};

export default Index;
