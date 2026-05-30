
import { Zap, Instagram, Linkedin, User, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Soluções',         href: '#solucoes' },
  { label: 'Projetos',         href: '#projects' },
  { label: 'Cases',            href: '#cases' },
  { label: 'Segmentos',        href: '#segments' },
  { label: 'Como Trabalhamos', href: '#como-trabalhamos' },
  { label: 'Quem Somos',       href: '#quem-somos' },
  { label: 'Contato',          href: '#contato' },
];

const solutions = [
  'Sistemas Sob Medida',
  'Robôs de Atendimento',
  'Automações',
  'Captura de Leads',
  'Disparos de Marketing',
  'Inteligência Artificial',
  'Dashboards',
  'CRM Personalizado',
];

const Footer = () => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Gradient divider topo */}
      <div className="section-divider" />

      {/* Mesh gradient de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(108,99,255,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 90% 80%, rgba(255,60,172,0.05) 0%, transparent 50%)
          `,
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      {/* CTA Banner no topo do footer */}
      <div className="container mx-auto px-4 pt-16 pb-12 relative z-10">
        <div
          className="rounded-2xl p-8 md:p-12 mb-14 text-center relative overflow-hidden"
          style={{
            background: 'rgba(13,13,30,0.8)',
            border: '1px solid rgba(108,99,255,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.08) 0%, transparent 60%)' }}
          />
          {/* Linha de borda gradiente topo */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, #6C63FF, #A855F7, #FF3CAC)' }}
          />

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', color: '#A899FF' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold" style={{ fontFamily: 'DM Sans' }}>Atendimento disponível agora</span>
          </div>

          <h2
            className="font-bold text-3xl md:text-4xl mb-4 relative z-10"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Pronto para transformar{' '}
            <span className="gradient-text">seu negócio?</span>
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto relative z-10" style={{ color: 'var(--text-secondary)' }}>
            Fale com um especialista agora e descubra como um sistema sob medida pode multiplicar seus resultados.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-2 relative z-10"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <MessageCircle size={18} />
            Conversar no WhatsApp
          </a>
        </div>

        {/* Grid de links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #FF3CAC)', boxShadow: '0 0 20px rgba(108,99,255,0.4)' }}
              >
                <Zap size={17} className="text-white" />
              </div>
              <span
                className="font-bold text-xl"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Intelektus
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Software House especializada em sistemas sob medida, automações, robôs de atendimento e IA
              para pequenos e médios negócios em todo o Brasil.
            </p>

            {/* Contatos rápidos */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5">
                <Phone size={13} style={{ color: '#6C63FF' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>(71) 99908-8651</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={13} style={{ color: '#6C63FF' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>contato@intelektus.com.br</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={13} style={{ color: '#6C63FF' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Salvador, Bahia — Brasil</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/intelektus.solucoes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-250 cursor-pointer"
                style={{ color: 'var(--text-muted)', background: 'rgba(13,13,30,0.8)', border: '1px solid rgba(108,99,255,0.2)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.6)';
                  (e.currentTarget as HTMLElement).style.color = '#A899FF';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(108,99,255,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.2)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.linkedin.com/in/limahenrique/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-250 cursor-pointer"
                style={{ color: 'var(--text-muted)', background: 'rgba(13,13,30,0.8)', border: '1px solid rgba(108,99,255,0.2)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.6)';
                  (e.currentTarget as HTMLElement).style.color = '#A899FF';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(108,99,255,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.2)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3
              className="font-bold text-xs uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              Navegação
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-sm transition-all duration-200 inline-flex items-center gap-1.5 group/fl cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span
                      className="w-1 h-1 rounded-full opacity-0 group-hover/fl:opacity-100 transition-all"
                      style={{ background: '#6C63FF', flexShrink: 0 }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3
              className="font-bold text-xs uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              Soluções
            </h3>
            <ul className="space-y-3">
              {solutions.map((s) => (
                <li key={s}>
                  <a
                    href="#solucoes"
                    onClick={(e) => scrollTo(e, '#solucoes')}
                    className="text-sm transition-all duration-200 inline-flex items-center gap-1.5 group/fl cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span
                      className="w-1 h-1 rounded-full opacity-0 group-hover/fl:opacity-100 transition-all"
                      style={{ background: '#FF3CAC', flexShrink: 0 }}
                    />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(108,99,255,0.1)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Intelektus. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Feito com ♥ em Salvador, Bahia
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 opacity-20 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
              title="Login Administrativo"
              onClick={() => window.location.href = '/login'}
            >
              <User size={13} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
