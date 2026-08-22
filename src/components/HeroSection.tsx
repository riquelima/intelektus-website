
import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Star, 
  MessageSquare, 
  CheckCheck, 
  Bot, 
  Phone, 
  Video, 
  Send, 
  RotateCcw, 
  Sparkles,
  Paperclip,
  Smile,
  Mic,
  ShieldCheck,
  Cpu,
  Layers,
  TrendingUp
} from 'lucide-react';

/* ═══════════════════════════════════════════
   WHATSAPP CONVERSATION MOCKUP ANIMADO HERO
═══════════════════════════════════════════ */
const WhatsAppChatHeroMockup = () => {
  const [step, setStep] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1+Henrique%21+Vi+a+conversa+no+site+e+gostaria+de+desenvolver+um+projeto+com+a+Intelektus.&type=phone_number&app_absent=0';

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#projects');
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
  };

  // Timeline da animação da conversa
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    const runSequence = () => {
      setStep(0); // Início
      timers.push(setTimeout(() => setStep(1), 700));   // Msg 1 (Cliente)
      timers.push(setTimeout(() => setStep(2), 2000));  // Intelektus Digitando...
      timers.push(setTimeout(() => setStep(3), 3600));  // Msg 2 (Intelektus - Sistemas e Soluções)
      timers.push(setTimeout(() => setStep(4), 6200));  // Msg 3 (Cliente pergunta sobre QA/integrações)
      timers.push(setTimeout(() => setStep(5), 7500));  // Intelektus Digitando...
      timers.push(setTimeout(() => setStep(6), 9000));  // Msg 4 (Intelektus - Diferenciais e CTA)
    };

    runSequence();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStep(0);
    setTimeout(() => setStep(1), 400);
    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 2900);
    setTimeout(() => setStep(4), 5200);
    setTimeout(() => setStep(5), 6500);
    setTimeout(() => setStep(6), 7800);
  };

  // Auto-scroll para acompanhar as mensagens novas
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [step]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * -8,
      y: ((e.clientX - cx) / rect.width) * 8,
    });
  }, []);

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Aura de luz de fundo */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(108,99,255,0.28) 0%, rgba(0,212,255,0.12) 40%, rgba(255,60,172,0.1) 70%, transparent 80%)',
          filter: 'blur(35px)',
        }}
      />

      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[rgba(108,99,255,0.35)] shadow-2xl transition-all duration-300"
        style={{
          background: 'rgba(7, 7, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.8), 0 0 45px rgba(108,99,255,0.22)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Top Header estilo WhatsApp Cyber */}
        <div 
          className="px-4 py-3.5 flex items-center justify-between border-b border-white/10 relative z-20"
          style={{ background: 'linear-gradient(180deg, rgba(16,16,38,0.98) 0%, rgba(10,10,25,0.95) 100%)' }}
        >
          <div className="flex items-center gap-3">
            {/* Avatar Intelektus com status online */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF]">
                <img 
                  src="/finalogo.png" 
                  alt="Intelektus" 
                  className="w-full h-full rounded-full object-cover bg-[#04040D]" 
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A0A19] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white tracking-tight">Intelektus</h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#6C63FF]/20 text-[#A899FF] border border-[#6C63FF]/30">
                  OFICIAL
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                online
              </p>
            </div>
          </div>

          {/* Action buttons do header */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <button 
              onClick={handleRestart}
              title="Reiniciar animação"
              className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-gray-400"
            >
              <RotateCcw size={15} />
            </button>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 hover:text-[#00D4FF] transition-colors"
            >
              <Phone size={15} />
            </a>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 hover:text-[#6C63FF] transition-colors"
            >
              <Video size={16} />
            </a>
          </div>
        </div>

        {/* Chat Area com background estilo WhatsApp Cyber */}
        <div 
          ref={chatScrollRef}
          className="p-3.5 sm:p-5 flex flex-col gap-3 sm:gap-3.5 overflow-y-auto max-h-[330px] sm:max-h-[390px] min-h-[290px] sm:min-h-[370px] relative scroll-smooth"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(20,18,45,0.6) 0%, rgba(6,6,15,0.98) 100%)',
          }}
        >
          {/* Tag de Data centralizada */}
          <div className="flex justify-center my-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
              Hoje · Atendimento Comercial
            </span>
          </div>

          {/* MENSAGEM 1: Cliente pergunta (Step >= 1) */}
          {step >= 1 && (
            <div className="flex justify-end animate-scale-in">
              <div 
                className="max-w-[85%] sm:max-w-[80%] rounded-2xl rounded-tr-sm p-3.5 text-sm shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #1E1B4B 0%, #2E1065 100%)',
                  border: '1px solid rgba(108,99,255,0.4)',
                  color: '#F3F4F6',
                }}
              >
                <p className="leading-relaxed text-[13px]">
                  Olá Henrique! Preciso digitalizar os processos da minha empresa. 
                  <strong> Quais tipos de sistemas e automações a Intelektus desenvolve?</strong>
                </p>
                <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] text-gray-400">
                  <span>10:42</span>
                  <CheckCheck size={14} className="text-[#00D4FF]" />
                </div>
              </div>
            </div>
          )}

          {/* INDICADOR: Intelektus digitando (Step === 2) */}
          {step === 2 && (
            <div className="flex items-center gap-2 text-xs text-gray-400 animate-fade-in pl-1">
              <div className="w-6 h-6 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/40 flex items-center justify-center">
                <Bot size={13} className="text-[#A899FF]" />
              </div>
              <span className="text-[11px] text-[#A899FF]">Intelektus está digitando</span>
              <div className="flex items-center gap-1 py-1 px-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B59FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* MENSAGEM 2: Intelektus Responde com portfólio (Step >= 3) */}
          {step >= 3 && (
            <div className="flex justify-start items-start gap-2.5 animate-scale-in">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#FF3CAC] p-0.5 flex-shrink-0 mt-1">
                <img src="/finalogo.png" alt="Intelektus" className="w-full h-full rounded-full object-cover bg-[#070712]" />
              </div>

              <div 
                className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-sm shadow-xl"
                style={{
                  background: 'rgba(15, 15, 34, 0.95)',
                  border: '1px solid rgba(108,99,255,0.3)',
                  color: '#E5E7EB',
                }}
              >
                <p className="font-semibold text-white text-[13px] mb-2 leading-relaxed">
                  Olá! 👋 Desenvolvemos tecnologia sob medida e de alta escala. Veja o que criamos:
                </p>

                <div className="space-y-1.5 text-[11px] sm:text-[12px] my-2">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-[#00D4FF]">🤖</span>
                    <div>
                      <strong className="text-white">Robôs & Agentes de IA 24/7</strong>
                      <p className="text-gray-400 text-[10px]">WhatsApp Cloud API, Typebot, OpenAI, n8n</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-[#FF3CAC]">⚡</span>
                    <div>
                      <strong className="text-white">Automação de Processos & APIs</strong>
                      <p className="text-gray-400 text-[10px]">Integrações n8n, Make, Webhooks, CRMs e ERPs</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-[#6C63FF]">📊</span>
                    <div>
                      <strong className="text-white">Sistemas Web, SaaS & Dashboards</strong>
                      <p className="text-gray-400 text-[10px]">Painéis sob medida, React, Node, Supabase, SQL</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-emerald-400">🎯</span>
                    <div>
                      <strong className="text-white">Disparos & Recuperação de Vendas</strong>
                      <p className="text-gray-400 text-[10px]">Marketing segmentado e réguas de cobrança</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end text-[10px] text-gray-500 mt-1">
                  <span>10:43</span>
                </div>
              </div>
            </div>
          )}

          {/* MENSAGEM 3: Cliente Pergunta sobre QA e Engenharia (Step >= 4) */}
          {step >= 4 && (
            <div className="flex justify-end animate-scale-in">
              <div 
                className="max-w-[85%] sm:max-w-[80%] rounded-2xl rounded-tr-sm p-3 text-sm shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #1E1B4B 0%, #2E1065 100%)',
                  border: '1px solid rgba(108,99,255,0.4)',
                  color: '#F3F4F6',
                }}
              >
                <p className="leading-relaxed text-[12px]">
                  Sensacional! Vocês conectam com meu sistema atual e garantem segurança, testes e suporte?
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                  <span>10:44</span>
                  <CheckCheck size={14} className="text-[#00D4FF]" />
                </div>
              </div>
            </div>
          )}

          {/* INDICADOR: Intelektus digitando (Step === 5) */}
          {step === 5 && (
            <div className="flex items-center gap-2 text-xs text-gray-400 animate-fade-in pl-1">
              <div className="w-6 h-6 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/40 flex items-center justify-center">
                <Bot size={13} className="text-[#A899FF]" />
              </div>
              <span className="text-[11px] text-[#A899FF]">Intelektus está digitando</span>
              <div className="flex items-center gap-1 py-1 px-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B59FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* MENSAGEM 4: Resposta Final com Diferenciais & CTAs (Step >= 6) */}
          {step >= 6 && (
            <div className="flex justify-start items-start gap-2.5 animate-scale-in">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#FF3CAC] p-0.5 flex-shrink-0 mt-1">
                <img src="/finalogo.png" alt="Intelektus" className="w-full h-full rounded-full object-cover bg-[#070712]" />
              </div>

              <div 
                className="max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-sm shadow-xl"
                style={{
                  background: 'rgba(15, 15, 34, 0.95)',
                  border: '1px solid rgba(108,99,255,0.35)',
                  color: '#E5E7EB',
                }}
              >
                <p className="leading-relaxed text-[12px] mb-2.5">
                  <strong>Sim, 100%! 🚀</strong> Aplicamos padrão corporativo de engenharia e alta escala, 
                  testes automatizados (QA) com <strong>zero falhas</strong> e foco total em <strong>retorno sobre investimento (ROI)</strong>.
                </p>

                {/* Botões de Ação Imediata dentro do Chat */}
                <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-transform hover:scale-[1.02]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-yellow-300" />
                      Conversar no WhatsApp Oficial
                    </span>
                    <ArrowRight size={13} />
                  </a>

                  <button
                    onClick={scrollToProjects}
                    className="py-2 px-3.5 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <span>Ver Projetos em Vídeo</span>
                    <ArrowRight size={13} className="text-[#6C63FF]" />
                  </button>
                </div>

                <div className="flex items-center justify-end text-[10px] text-gray-500 mt-2">
                  <span>10:44</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar na base estilo WhatsApp */}
        <div 
          className="p-3 bg-[#080816] border-t border-white/10 flex items-center gap-2 relative z-20"
        >
          <div className="flex items-center gap-1 text-gray-400">
            <button className="p-1.5 hover:text-white transition-colors cursor-pointer">
              <Smile size={18} />
            </button>
            <button className="p-1.5 hover:text-white transition-colors cursor-pointer">
              <Paperclip size={18} />
            </button>
          </div>

          <div className="flex-1 bg-white/5 rounded-full px-3.5 py-2 border border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-400 select-none">
              {step >= 6 ? "Digite sua mensagem..." : "Conversa automatizada em tempo real..."}
            </span>
            <Mic size={15} className="text-gray-500" />
          </div>

          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0"
          >
            <Send size={15} className="ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   HERO SECTION PRINCIPAL
═══════════════════════════════════════════ */
const HeroSection = () => {
  const WHATSAPP = 'https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento.&type=phone_number&app_absent=0';

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#projects');
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
  };

  const socialProof = [
    { icon: <CheckCircle2 size={14} />, text: '500+ empresas atendidas' },
    { icon: <Star size={14} />, text: 'Petshops, Restaurantes, Clínicas' },
    { icon: <MessageSquare size={14} />, text: 'Robôs de atendimento 24/7' },
  ];

  const floatingChips = [
    { label: '🤖 Agentes de IA & n8n',    color: '#00D4FF', top: '-4%',  left: '-4%',  delay: '0s' },
    { label: '⚡ Sistemas Web & SaaS',    color: '#6C63FF', top: '20%',  right: '-6%', delay: '0.4s' },
    { label: '🛡️ Padrão QA Zero Falhas',  color: '#34D399', bottom: '18%', left: '-8%', delay: '0.8s' },
    { label: '📈 Foco em ROI & Vendas',   color: '#FF3CAC', bottom: '-2%', right: '-4%', delay: '1.2s' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 pb-8 sm:pt-28 sm:pb-16 overflow-hidden"
      style={{ background: 'transparent' }}
    >

      {/* Mesh gradient de fundo */}
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />

      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

      {/* Orbs de luz ambiente */}
      <div
        className="glow-orb w-[600px] h-[600px]"
        style={{
          top: '-10%', left: '-10%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="glow-orb w-[400px] h-[400px]"
        style={{
          bottom: '0%', right: '-5%',
          background: 'radial-gradient(circle, rgba(255,60,172,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT — Copy */}
          <div className="max-w-xl">
            {/* Headline */}
            <h1
              className="font-bold mb-3 sm:mb-6 animate-fade-up text-3xl sm:text-5xl lg:text-6xl"
              style={{
                lineHeight: '1.18',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                animationDelay: '0.2s',
                opacity: 0,
              }}
            >
              Sistemas{' '}
              <span className="gradient-text">Personalizados</span>
              {' '}que Transformam e{' '}
              <span style={{ color: 'rgba(242,240,255,0.4)' }}>Aceleram sua Empresa</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-sm sm:text-lg leading-relaxed mb-6 sm:mb-9 animate-fade-up font-normal text-gray-300"
              style={{ animationDelay: '0.35s', opacity: 0 }}
            >
              Chega de planilhas complexas ou programas genéricos que não resolvem seus gargalos. Desenvolvemos aplicativos de agendamento, robôs de WhatsApp e painéis de gestão sob medida para o seu petshop, lanchonete, clínica ou negócio local.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10 animate-fade-up"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow text-white font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2"
              >
                Quero meu sistema
                <ArrowRight size={18} />
              </a>
              <button
                onClick={scrollToProjects}
                className="btn-outline-glow font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base cursor-pointer"
              >
                Ver projetos
              </button>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 animate-fade-up"
              style={{ animationDelay: '0.65s', opacity: 0 }}
            >
              {socialProof.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: '#34D399' }}>{item.icon}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — WhatsApp Conversation Mockup */}
          <div
            className="relative animate-fade-up w-full"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            {/* Floating chips visíveis em telas grandes */}
            <div className="hidden lg:block">
              {floatingChips.map((chip, i) => (
                <div
                  key={i}
                  className="absolute z-30 px-3.5 py-2 rounded-xl text-xs font-bold animate-pulse-subtle shadow-xl backdrop-blur-md"
                  style={{
                    top: chip.top,
                    bottom: (chip as any).bottom,
                    left: (chip as any).left,
                    right: (chip as any).right,
                    background: `rgba(8,8,21,0.92)`,
                    border: `1px solid ${chip.color}60`,
                    color: '#FFFFFF',
                    boxShadow: `0 0 20px ${chip.color}35`,
                    animationDelay: chip.delay,
                  }}
                >
                  <span style={{ color: chip.color, marginRight: '6px' }}>●</span>
                  {chip.label}
                </div>
              ))}
            </div>

            <WhatsAppChatHeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
