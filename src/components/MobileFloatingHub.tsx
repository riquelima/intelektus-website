import React, { useState, useEffect } from 'react';

interface MobileFloatingHubProps {
  hide?: boolean;
}

const MobileFloatingHub: React.FC<MobileFloatingHubProps> = ({ hide = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece após rolar 150px
      setIsVisible(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const WHATSAPP_URL =
    'https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1+Henrique%21+Estou+no+site+e+gostaria+de+conversar+sobre+um+projeto.&type=phone_number&app_absent=0';

  const WHATSAPP_ICON = 'https://cdn-icons-png.flaticon.com/512/733/733585.png';

  if (hide || !isVisible) return null;

  return (
    <aside
      className="fixed bottom-4 right-4 z-40 md:hidden transition-all duration-300 pointer-events-auto"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Botão Flutuante de WhatsApp Direto (Padrão 48x48px ergonômico) */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com Henrique"
        className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#25D366] to-[#128C7E] shadow-[0_4px_25px_rgba(37,211,102,0.5)] active:scale-90 transition-transform cursor-pointer border border-white/20"
      >
        {/* Halo de pulso */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
        <img
          src={WHATSAPP_ICON}
          alt="WhatsApp"
          width={26}
          height={26}
          className="relative z-10"
          loading="lazy"
        />
      </a>
    </aside>
  );
};

export default MobileFloatingHub;
