import React, { useState, useEffect } from 'react';
import { MessageSquare, Calculator, Sparkles, ChevronUp, Layers, Zap } from 'lucide-react';

interface MobileFloatingHubProps {
  hide?: boolean;
}

const MobileFloatingHub: React.FC<MobileFloatingHubProps> = ({ hide = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Aparece após rolar 150px
      const currentScroll = window.scrollY;
      setIsVisible(currentScroll > 150);

      // Detecta seção aproximada
      const sections = ['solucoes', 'projects', 'simulador-roi', 'como-trabalhamos', 'contato'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const WHATSAPP_URL =
    'https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1+Henrique%21+Estou+no+site+e+gostaria+de+conversar+sobre+um+projeto.&type=phone_number&app_absent=0';

  if (hide || !isVisible) return null;

  return (
    <aside 
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex items-center justify-between transition-all duration-300 pointer-events-auto"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Pill Flutuante de Navegação do Polegar */}
      <div 
        className="flex items-center gap-1 p-1.5 rounded-full border border-[#6C63FF]/30 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
        style={{
          background: 'rgba(9, 9, 22, 0.92)',
        }}
      >
        {/* Status Online */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] font-semibold text-gray-300">Online</span>
        </div>

        {/* Botão rápido: Soluções */}
        <button
          onClick={() => scrollTo('solucoes')}
          className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all active:scale-95 ${
            activeSection === 'solucoes'
              ? 'bg-[#6C63FF] text-white font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Soluções
        </button>

        {/* Botão rápido: Projetos */}
        <button
          onClick={() => scrollTo('projects')}
          className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all active:scale-95 ${
            activeSection === 'projects'
              ? 'bg-[#6C63FF] text-white font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Projetos
        </button>

        {/* Botão rápido: Simulador ROI */}
        <button
          onClick={() => scrollTo('simulador-roi')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all active:scale-95 ${
            activeSection === 'simulador-roi'
              ? 'bg-[#00F5D4] text-[#04040D] font-bold'
              : 'text-[#00F5D4] bg-[#00F5D4]/10 hover:bg-[#00F5D4]/20'
          }`}
        >
          <Calculator size={11} />
          ROI
        </button>
      </div>

      {/* Botão Flutuante de WhatsApp Direto (Padrão 48x48px ergonômico) */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com Henrique"
        className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_25px_rgba(37,211,102,0.5)] active:scale-90 transition-transform cursor-pointer border border-white/20"
      >
        {/* Halo de pulso */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
        <MessageSquare size={22} className="relative z-10 fill-current" />
      </a>
    </aside>
  );
};

export default MobileFloatingHub;
