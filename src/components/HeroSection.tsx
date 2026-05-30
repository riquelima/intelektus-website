
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, CheckCircle2, Zap, Star, MessageSquare } from 'lucide-react';

// ParticleCanvas movido para o componente global src/components/ParticleCanvas.tsx

/* ═══════════════════════════════════════════
   DASHBOARD MOCKUP 3D PREMIUM
═══════════════════════════════════════════ */
const DashboardMockup3D = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { label: 'Receita Mensal',  value: 'R$ 284k', change: '+18%', up: true  },
    { label: 'Clientes Ativos', value: '1.432',   change: '+24%', up: true  },
    { label: 'Automações',      value: '3.891',   change: '+42%', up: true  },
    { label: 'NPS Score',       value: '94',      change: '+12%', up: true  },
  ];

  const barData = [38, 52, 47, 70, 65, 85, 76, 92, 71, 84, 90, 100];
  const months  = ['J','F','M','A','M','J','J','A','S','O','N','D'];

  useEffect(() => {
    const id = setInterval(() => setActiveCard(a => (a + 1) % metrics.length), 2000);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * -10,
      y: ((e.clientX - cx) / rect.width) * 10,
    });
  }, []);

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Aura de luz atrás */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(108,99,255,0.25) 0%, rgba(255,60,172,0.1) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden border border-[rgba(108,99,255,0.25)] animate-float"
        style={{
          background: 'rgba(8,8,21,0.95)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 50px rgba(108,99,255,0.18)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Scanning line */}
        <div
          className="absolute left-0 right-0 h-0.5 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.6), rgba(255,60,172,0.4), transparent)',
            animation: 'scanning 4s ease-in-out infinite',
          }}
        />

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(108,99,255,0.15)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold" style={{ color: '#A899FF', fontFamily: 'Syne, sans-serif' }}>
              Intelektus Dashboard
            </span>
          </div>
          <Zap size={13} style={{ color: '#6C63FF' }} />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-xl p-3 transition-all duration-500"
              style={{
                background: activeCard === i ? 'rgba(108,99,255,0.14)' : 'rgba(13,13,30,0.8)',
                border: `1px solid ${activeCard === i ? 'rgba(108,99,255,0.5)' : 'rgba(108,99,255,0.1)'}`,
                boxShadow: activeCard === i ? '0 0 20px rgba(108,99,255,0.2)' : 'none',
              }}
            >
              <p className="text-xs mb-1" style={{ color: '#4A4A7E', fontFamily: 'DM Sans' }}>{m.label}</p>
              <p className="font-bold text-base" style={{ color: '#F2F0FF', fontFamily: 'Syne, sans-serif' }}>{m.value}</p>
              <span className="text-xs font-semibold" style={{ color: m.up ? '#34D399' : '#F87171' }}>
                ▲ {m.change}
              </span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="px-4 pb-1">
          <p className="text-xs font-semibold mb-2" style={{ color: '#4A4A7E', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'DM Sans' }}>
            Receita 2025
          </p>
          <div className="flex items-end gap-1 h-20">
            {barData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm transition-all duration-700"
                  style={{
                    height: `${h}%`,
                    background: i === 11
                      ? 'linear-gradient(to top, #6C63FF, #FF3CAC)'
                      : i >= 9
                      ? 'rgba(108,99,255,0.4)'
                      : 'rgba(108,99,255,0.18)',
                    boxShadow: i === 11 ? '0 0 12px rgba(255,60,172,0.5)' : 'none',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {months.map((m, i) => (
              <div key={i} className="flex-1 text-center" style={{ fontSize: '7px', color: '#3A3A5C' }}>{m}</div>
            ))}
          </div>
        </div>

        {/* Notification strip */}
        <div className="mx-4 mb-4 mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(13,13,30,0.9)', border: '1px solid rgba(108,99,255,0.15)' }}>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs" style={{ color: '#7B7A9E' }}>
            Robô disparou <strong style={{ color: '#A899FF' }}>47 mensagens</strong> · 12 novos leads
          </span>
          <Zap size={10} className="ml-auto flex-shrink-0" style={{ color: '#FF3CAC' }} />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.05) 0%, transparent 60%)' }}
        />
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
    { label: 'Sistema Petshop',     color: '#6C63FF', top: '10%',  left: '-5%',  delay: '0s' },
    { label: 'Robô WhatsApp',       color: '#FF3CAC', top: '48%',  left: '-8%',  delay: '0.8s' },
    { label: 'Captura de Leads',    color: '#00D4FF', top: '15%',  right: '-4%', delay: '0.4s' },
    { label: 'Disparo Marketing',   color: '#A855F7', top: '60%',  right: '-6%', delay: '1.2s' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
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
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Copy */}
          <div className="max-w-xl">
            {/* Badge */}
            <div
              className="badge-chip mb-7 animate-fade-up"
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              <Zap size={12} style={{ color: '#FF3CAC' }} />
              Software House · Sistemas Sob Medida · IA
            </div>

            {/* Headline */}
            <h1
              className="font-bold mb-6 animate-fade-up"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                animationDelay: '0.2s',
                opacity: 0,
              }}
            >
              Sistemas{' '}
              <span className="gradient-text">Inteligentes</span>
              {' '}para Pequenos Negócios{' '}
              <span style={{ color: 'rgba(242,240,255,0.4)' }}>que Querem Crescer</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl leading-relaxed mb-9 animate-fade-up"
              style={{ color: 'var(--text-secondary)', animationDelay: '0.35s', opacity: 0 }}
            >
              Petshop, restaurante, pizzaria, anchonete, clínica — criamos o sistema certo para o seu negócio.
              Com <strong style={{ color: 'var(--text-primary)' }}>automações, robôs de atendimento, captura de leads</strong> e disparos de marketing.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow text-white font-bold px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Quero meu sistema
                <ArrowRight size={18} />
              </a>
              <button
                onClick={scrollToProjects}
                className="btn-outline-glow font-semibold px-8 py-4 rounded-xl text-base"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Ver projetos
              </button>
            </div>

            {/* Social proof */}
            <div
              className="flex flex-col sm:flex-row flex-wrap gap-4 animate-fade-up"
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

          {/* RIGHT — Dashboard 3D */}
          <div
            className="relative animate-fade-up hidden md:block"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            {/* Floating chips */}
            {floatingChips.map((chip, i) => (
              <div
                key={i}
                className="absolute z-20 px-3 py-2 rounded-xl text-xs font-bold animate-pulse-subtle"
                style={{
                  top: chip.top,
                  left: (chip as any).left,
                  right: (chip as any).right,
                  background: `rgba(8,8,21,0.9)`,
                  border: `1px solid ${chip.color}55`,
                  color: chip.color,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 0 16px ${chip.color}30`,
                  animationDelay: chip.delay,
                  fontFamily: 'Syne, sans-serif',
                  letterSpacing: '0.02em',
                }}
              >
                <span style={{ marginRight: '6px' }}>●</span>
                {chip.label}
              </div>
            ))}

            <DashboardMockup3D />
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          {[
            { val: '500+',  label: 'Empresas Atendidas' },
            { val: '7+',    label: 'Anos de Experiência' },
            { val: '98%',   label: 'Clientes Satisfeitos' },
            { val: '24/7',  label: 'Suporte Ativo' },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center py-5 px-4 rounded-2xl"
              style={{ background: 'rgba(13,13,30,0.7)', border: '1px solid rgba(108,99,255,0.12)' }}
            >
              <p
                className="font-bold gradient-text mb-1"
                style={{ fontSize: '2rem', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}
              >
                {s.val}
              </p>
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
