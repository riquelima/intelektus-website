import React, { useEffect } from 'react';
import { 
  X, 
  Layers, 
  Sparkles, 
  Building2, 
  GitFork, 
  TrendingUp, 
  User, 
  MessageSquare, 
  ArrowRight, 
  Phone, 
  Mail, 
  Instagram, 
  Linkedin,
  Zap
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const menuItems = [
  { label: 'Soluções',         href: '#solucoes',        icon: Layers,        num: '01', color: '#6C63FF' },
  { label: 'Projetos',         href: '#projects',        icon: Sparkles,      num: '02', color: '#00D4FF' },
  { label: 'Segmentos',        href: '#segments',        icon: Building2,     num: '03', color: '#A855F7' },
  { label: 'Como Trabalhamos', href: '#como-trabalhamos',icon: GitFork,       num: '04', color: '#FF3CAC' },
  { label: 'Cases de Sucesso', href: '#cases',           icon: TrendingUp,    num: '05', color: '#10B981' },
  { label: 'Quem Somos',       href: '#quem-somos',      icon: User,          num: '06', color: '#F59E0B' },
  { label: 'Contato',          href: '#contato',         icon: MessageSquare, num: '07', color: '#EC4899' },
];

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  // Bloquear scroll de fundo quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop transparente / escurecedor clicável que fecha o menu */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 transition-opacity duration-500 md:hidden ${
          isOpen
            ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Gaveta Lateral (Drawer) que desliza da direita */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[290px] sm:w-[350px] z-50 md:hidden flex flex-col justify-between p-5 overflow-y-auto no-scrollbar transition-transform duration-500 border-l border-[#6C63FF]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #09091A 0%, #05050F 100%)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Glow de fundo interno */}
        <div 
          className="absolute top-0 right-0 w-60 h-60 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Topo do Menu: Logo + Botão Fechar */}
        <div className="relative z-10">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <img
                src="/finalogo.png"
                alt="Intelektus"
                className="h-8 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-white">
                  Intelektus
                </span>
                <span className="text-[9px] text-gray-400 font-medium">
                  Menu de Navegação
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-white/10 hover:bg-white/20 border border-white/15 text-white cursor-pointer active:scale-95 shadow-md"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links de Navegação com Staggering */}
          <nav className="flex flex-col gap-1.5 mt-4">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    onNavigate(e, item.href);
                    onClose();
                  }}
                  className="group flex items-center justify-between p-2.5 px-3 rounded-xl transition-all duration-200 border border-transparent hover:border-[#6C63FF]/30 hover:bg-[#6C63FF]/10 active:scale-[0.98]"
                  style={{
                    transitionDelay: isOpen ? `${idx * 30}ms` : '0ms',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        background: `${item.color}18`,
                        border: `1px solid ${item.color}35`,
                      }}
                    >
                      <Icon size={14} style={{ color: item.color }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>

                  <span 
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-gray-500 group-hover:text-[#A899FF] transition-colors"
                  >
                    {item.num}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Gaveta: CTA WhatsApp + Contatos */}
        <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex flex-col gap-3">
          {/* Botão de Ação Direta */}
          <a
            href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+de+sistema.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-transform"
          >
            <Zap size={14} className="text-yellow-300 fill-yellow-300" />
            Solicitar Orçamento
            <ArrowRight size={13} />
          </a>

          {/* Mini Contatos */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <Phone size={11} className="text-[#6C63FF]" /> (71) 99908-8651
            </span>
            
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/intelektus.solucoes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 transition-colors"
              >
                <Instagram size={11} />
              </a>
              <a
                href="https://www.linkedin.com/in/limahenrique/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 transition-colors"
              >
                <Linkedin size={11} />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileDrawer;
