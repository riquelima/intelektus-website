
import { Instagram, Linkedin } from 'lucide-react';
import MaterialIcon from '@/components/ui/MaterialIcon';
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
      style={{ background: 'transparent' }}
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
      <div className="container mx-auto px-4 pt-10 sm:pt-16 pb-8 sm:pb-12 relative z-10">
        <div
          className="rounded-2xl p-5 sm:p-10 md:p-12 mb-8 sm:mb-14 text-center relative overflow-hidden"
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

          <h2
            className="font-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 relative z-10 text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            Pronto para transformar{' '}
            <span className="gradient-text">seu negócio?</span>
          </h2>
          <p className="text-xs sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto relative z-10 text-gray-300">
            Fale com um especialista agora e descubra como um sistema sob medida pode multiplicar seus resultados.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-white font-bold px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl text-sm sm:text-base inline-flex items-center gap-2 relative z-10"
          >
            <MaterialIcon name="chat" size={18} fill />
            Conversar no WhatsApp
          </a>
        </div>

        {/* Grid de links: 2 Colunas no Mobile / 4 Colunas no Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">

          {/* Brand — Ocupa as 2 colunas no Mobile */}
          <div className="col-span-2 lg:col-span-2">
            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm text-gray-300">
              Software House especializada em sistemas sob medida, automações, robôs de atendimento e IA
              para pequenos e médios negócios em todo o Brasil.
            </p>

            {/* Contatos rápidos */}
            <div className="space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <MaterialIcon name="phone" size={14} color="#6C63FF" />
                <span>(71) 99908-8651</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MaterialIcon name="mail" size={14} color="#6C63FF" />
                <span>henrique.souza.lima@outlook.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MaterialIcon name="location_on" size={14} color="#6C63FF" />
                <span>Salvador, Bahia — Brasil</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/intelektus.solucoes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-250 cursor-pointer text-gray-400 hover:text-white"
                style={{ background: 'rgba(13,13,30,0.8)', border: '1px solid rgba(108,99,255,0.2)' }}
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/limahenrique/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-250 cursor-pointer text-gray-400 hover:text-white"
                style={{ background: 'rgba(13,13,30,0.8)', border: '1px solid rgba(108,99,255,0.2)' }}
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Coluna 1: Navegação */}
          <div>
            <h3
              className="font-bold text-[11px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-5 text-gray-400"
            >
              Navegação
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-xs sm:text-sm transition-all duration-200 inline-flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <span
                      className="w-1 h-1 rounded-full opacity-60 mr-1"
                      style={{ background: '#6C63FF', flexShrink: 0 }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Soluções */}
          <div>
            <h3
              className="font-bold text-[11px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-5 text-gray-400"
            >
              Soluções
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {solutions.map((s) => (
                <li key={s}>
                  <a
                    href="#solucoes"
                    onClick={(e) => scrollTo(e, '#solucoes')}
                    className="text-xs sm:text-sm transition-all duration-200 inline-flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <span
                      className="w-1 h-1 rounded-full opacity-60 mr-1"
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
              <MaterialIcon name="person" size={15} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
