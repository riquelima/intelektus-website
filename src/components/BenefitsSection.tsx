
import { useEffect, useRef } from 'react';
import { TrendingUp, Database, DollarSign, Rocket, PieChart, Trophy, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Mais Produtividade',
    description: 'Automatize processos repetitivos, reduza o retrabalho e libere sua equipe para o que realmente importa.',
    color: '#6C63FF',
    size: 'main',
  },
  {
    icon: Database,
    title: 'Mais Controle',
    description: 'Centralize informações dispersas em um único sistema e tenha visibilidade total da sua operação.',
    color: '#A855F7',
    size: 'main',
  },
  {
    icon: DollarSign,
    title: 'Menos Custos Operacionais',
    description: 'Reduza despesas com operações manuais, erros humanos e ferramentas genéricas que não se encaixam no seu negócio.',
    color: '#10B981',
    size: 'small',
  },
  {
    icon: Rocket,
    title: 'Escala com Você',
    description: 'Seu sistema cresce junto com seu negócio — sem precisar trocar de ferramenta quando você evolui.',
    color: '#F59E0B',
    size: 'small',
  },
  {
    icon: PieChart,
    title: 'Decisões Inteligentes',
    description: 'Dashboards claros transformam dados em decisões estratégicas rápidas.',
    color: '#3B82F6',
    size: 'small',
  },
  {
    icon: Trophy,
    title: 'Vantagem Competitiva',
    description: 'Tenha uma solução única, construída para sua empresa — não um software genérico adaptado.',
    color: '#EC4899',
    size: 'small',
  },
];

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const mainBenefits = benefits.filter(b => b.size === 'main');
  const smallBenefits = benefits.filter(b => b.size === 'small');

  return (
    <section
      id="beneficios"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(168,85,247,0.1) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(255,60,172,0.07) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="badge-chip mb-5 mx-auto inline-flex">
            <Trophy size={12} style={{ color: '#6C63FF' }} />
            Por que investir
          </div>
          <h2
            className="font-bold text-4xl md:text-5xl mb-5"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Por que um sistema{' '}
            <span className="gradient-text">personalizado?</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Empresas com sistemas sob medida crescem mais rápido, erram menos e têm mais controle do que
            concorrentes usando ferramentas genéricas.
          </p>
        </div>

        {/* Layout assimétrico: 2 grandes + 4 pequenos */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">

          {/* Coluna esquerda — 2 cards grandes */}
          <div className="flex flex-col gap-4">
            {mainBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="card-glass rounded-2xl p-7 group cursor-default flex flex-col gap-5 reveal relative overflow-hidden"
                  style={{ flex: 1 }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 0%, ${b.color}10 0%, transparent 60%)` }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${b.color}18`,
                      border: `1px solid ${b.color}40`,
                      boxShadow: `0 0 24px ${b.color}20`,
                    }}
                  >
                    <Icon size={26} style={{ color: b.color }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-xl mb-3"
                      style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {b.description}
                    </p>
                  </div>
                  <div
                    className="h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-700 mt-auto"
                    style={{ background: `linear-gradient(to right, ${b.color}, transparent)` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Colunas 2 e 3 — 4 cards menores em grid 2x2 */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {smallBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="card-glass rounded-2xl p-6 group cursor-default flex flex-col gap-4 reveal"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${b.color}15`,
                      border: `1px solid ${b.color}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: b.color }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-base mb-2"
                      style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {b.description}
                    </p>
                  </div>
                  <div
                    className="h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500 mt-auto"
                    style={{ background: `linear-gradient(to right, ${b.color}, transparent)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA premium */}
        <div
          className="rounded-2xl p-10 text-center relative overflow-hidden reveal"
          style={{
            background: 'rgba(108,99,255,0.06)',
            border: '1px solid rgba(108,99,255,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.1) 0%, transparent 60%)' }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.6), rgba(255,60,172,0.5), transparent)' }}
          />
          <h3
            className="font-bold text-2xl md:text-3xl mb-3 relative z-10"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Pronto para digitalizar sua operação?
          </h3>
          <p className="mb-8 text-base relative z-10" style={{ color: 'var(--text-secondary)' }}>
            Diagnóstico gratuito e sem compromisso. Veja o que um sistema sob medida pode fazer pelo seu negócio.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+um+diagn%C3%B3stico+gratuito+para+minha+empresa.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex btn-glow text-white font-bold px-9 py-4 rounded-xl text-base items-center gap-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Quero um diagnóstico gratuito
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
