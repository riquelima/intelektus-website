import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(e, sectionId);
    } else {
      const section = document.querySelector(sectionId);
      if (section) {
        window.scrollTo({ top: (section as HTMLElement).offsetTop - 80, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Soluções',         href: '#solucoes' },
    { label: 'Projetos',         href: '#projects' },
    { label: 'Segmentos',        href: '#segments' },
    { label: 'Como Trabalhamos', href: '#como-trabalhamos' },
    { label: 'Cases',            href: '#cases' },
    { label: 'Quem Somos',       href: '#quem-somos' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? '10px 0' : '14px 0',
        background: scrolled
          ? 'rgba(4, 4, 13, 0.95)'
          : 'rgba(4, 4, 13, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(108,99,255,0.2)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 10px 35px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo & Brand */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 group select-none cursor-pointer">
            <img
              src="/finalogo.png"
              alt="Intelektus"
              className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                Intelektus
              </span>
              <span className="text-[10px] text-gray-400 font-medium hidden sm:block">
                Onde as ideias decolam
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium transition-all duration-200 relative group/link"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
                {/* Underline animado */}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover/link:w-full transition-all duration-300 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6C63FF, #FF3CAC)' }}
                />
              </a>
            ))}
          </div>

          {/* CTA Desktop + Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              onClick={(e) => handleLinkClick(e, '#contato')}
              className="hidden md:inline-flex items-center gap-2 btn-glow text-white text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer"
            >
              <Zap size={14} />
              Solicitar Orçamento
            </a>

            {/* Mobile Animated Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-lg active:scale-90 flex items-center justify-center"
              style={{
                color: '#FFFFFF',
                background: isMenuOpen ? 'rgba(108,99,255,0.25)' : 'rgba(13,13,30,0.85)',
                border: isMenuOpen ? '1px solid rgba(108,99,255,0.6)' : '1px solid rgba(108,99,255,0.25)',
                boxShadow: isMenuOpen ? '0 0 20px rgba(108,99,255,0.4)' : 'none',
              }}
              aria-label="Abrir menu de navegação"
            >
              {isMenuOpen ? <X size={20} className="text-[#FF3CAC]" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
