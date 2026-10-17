import React, { useState, useEffect } from 'react';
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
import MobileFloatingHub from '@/components/MobileFloatingHub';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitorar progresso da rolagem para a barra superior e efeitos cinéticos
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    setTimeout(() => {
      const section = document.querySelector(sectionId);
      if (section) {
        window.scrollTo({ top: (section as HTMLElement).offsetTop - 80, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#04040D]">
      {/* Barra de Progresso Cinética de Rolagem Padrão Mobile (Fixa no topo) */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div
          className="h-full relative transition-all duration-75"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #00F5D4 0%, #6C63FF 60%, #FF3CAC 100%)',
            boxShadow: '0 0 12px rgba(0, 245, 212, 0.8), 0 0 20px rgba(108, 99, 255, 0.6)',
          }}
        >
          {/* Gotícula brilhante na ponta do indicador */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]" />
        </div>
      </div>

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

        {/* Hero Section com Núcleo 3D WebGL Interativo */}
        <HeroSection />

        {/* Soluções — Cards de serviços */}
        <div id="solucoes">
          <FeaturesSection />
        </div>

        {/* Benefícios — por que investir em sistema personalizado */}
        <BenefitsSection />

        {/* Portfólio de projetos com integração Supabase e Vídeos */}
        <div id="projects">
          <ProjectsSection />
        </div>

        {/* Cases de sucesso com resultados reais */}
        <div id="cases">
          <CasesSection />
        </div>

        {/* Segmentos — 13 tipos de empresas */}
        <div id="segments">
          <SegmentsSection />
        </div>

        {/* Como trabalhamos — 6 etapas */}
        <div id="como-trabalhamos">
          <HowItWorksSection />
        </div>

        {/* Stack tecnológica */}
        <TechStackSection />

        {/* Depoimentos */}
        <TestimonialsSection />

        {/* Contato */}
        <div id="contato">
          <ContactSection />
        </div>

        {/* Quem somos */}
        <div id="quem-somos">
          <AboutSection />
        </div>

        <Footer />
      </div>

      {/* Hub Flutuante Mobile Ergonômico (Zona do Polegar) */}
      <MobileFloatingHub hide={isMenuOpen} />

      {/* Botão Flutuante do WhatsApp para Desktop */}
      <WhatsAppButton hide={isMenuOpen} />
    </div>
  );
};

export default Index;
