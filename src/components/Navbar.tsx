
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const section = document.querySelector(sectionId);
    if (section) {
      window.scrollTo({ top: (section as HTMLElement).offsetTop - 80, behavior: 'smooth' });
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
    <nav
      className={`fixed w-full z-50 transition-all duration-400`}
      style={{
        padding: scrolled ? '8px 0' : '16px 0',
        background: scrolled
          ? 'rgba(4, 4, 13, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(108,99,255,0.15)' : 'none',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3.5 group select-none">
            <img
              src="/finalogo.png"
              alt="Intelektus"
              className="h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
            {/* Texto animado com efeito digitando e fonte Anta */}
            <div className="hidden sm:flex items-center border-l border-white/10 pl-3.5 h-6">
              <span
                className="text-[13px] font-bold tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 animate-typewriter"
                style={{
                  fontFamily: "'Anta', sans-serif",
                }}
              >
                Intelektus - Onde as ideias decolam
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium transition-all duration-200 relative group/link"
                style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}
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

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              onClick={(e) => scrollToSection(e, '#contato')}
              className="hidden md:inline-flex items-center gap-2 btn-glow text-white text-sm font-bold px-5 py-2.5 rounded-xl"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <Zap size={14} />
              Solicitar Orçamento
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{
                color: 'var(--text-primary)',
                background: 'rgba(13,13,30,0.8)',
                border: '1px solid rgba(108,99,255,0.25)',
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden mt-3 pb-4 rounded-2xl border border-[rgba(108,99,255,0.2)] animate-scale-in"
            style={{
              background: 'rgba(4,4,13,0.98)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Gradient top border */}
            <div
              className="h-0.5 rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, #6C63FF, #FF3CAC)' }}
            />
            <div className="flex flex-col p-4 gap-1 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'rgba(108,99,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-1" style={{ borderTop: '1px solid rgba(108,99,255,0.15)' }}>
                <a
                  href="#contato"
                  onClick={(e) => scrollToSection(e, '#contato')}
                  className="flex items-center justify-center gap-2 btn-glow text-white text-sm font-bold px-5 py-3.5 rounded-xl"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  <Zap size={14} />
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
