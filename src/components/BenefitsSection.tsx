import { useEffect, useRef, useState } from 'react';
import MaterialIcon from '@/components/ui/MaterialIcon';

const benefits = [
  {
    icon: 'trending_up',
    badge: '+80% Eficiência',
    title: 'Mais Produtividade',
    description: 'Automatize tarefas repetitivas e libere sua equipe para focar em vendas e atendimento.',
    color: '#6C63FF',
    gradient: 'linear-gradient(135deg, #6C63FF, #A855F7)',
  },
  {
    icon: 'database',
    badge: 'Visão 360°',
    title: 'Controle Total',
    description: 'Centralize dados de clientes, financeiro e estoque em um único painel em tempo real.',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
  },
  {
    icon: 'attach_money',
    badge: 'Redução de Custos',
    title: 'Zero Desperdício',
    description: 'Elimine erros humanos e pare de pagar mensalidades caras por ferramentas que não atendem sua rotina.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #00D4FF)',
  },
  {
    icon: 'rocket_launch',
    badge: 'Sem Limites',
    title: 'Escala com Você',
    description: 'Seu sistema evolui no ritmo da sua empresa sem precisar migrar ou trocar de software no futuro.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #FF3CAC)',
  },
  {
    icon: 'pie_chart',
    badge: 'Decisões Rápidas',
    title: 'Dashboards com IA',
    description: 'Relatórios claros e automáticos que mostram exatamente onde lucrar mais.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6, #6C63FF)',
  },
  {
    icon: 'emoji_events',
    badge: '100% Exclusivo',
    title: 'Vantagem Competitiva',
    description: 'Tenha uma solução com a sua marca e processos — seus concorrentes não terão igual.',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899, #FF3CAC)',
  },
];

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 60);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="beneficios"
      ref={sectionRef}
      className="py-10 sm:py-16 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(168,85,247,0.08) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(255,60,172,0.06) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Compacto & Impactante */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 reveal">
          <div className="badge-chip mb-2.5 mx-auto inline-flex items-center gap-1.5">
            <MaterialIcon name="emoji_events" size={13} color="#6C63FF" />
            <span>Vantagens do Sob Medida</span>
          </div>
          <h2
            className="font-bold text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            Por que um sistema{' '}
            <span className="gradient-text">personalizado?</span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed">
            Esqueça softwares genéricos engessados. Criamos tecnologia que se adapta 100% à sua operação.
          </p>
        </div>

        {/* Comparativo Rápido de 1 Linha (Alto Impacto UX no Mobile) */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 reveal">
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-red-500/[0.06] border border-red-500/20 text-gray-300 text-xs">
            <MaterialIcon name="cancel" size={16} className="text-red-400 flex-shrink-0" />
            <span><strong>Software Genérico:</strong> Engessado, complexo e com mensalidades infinitas.</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#6C63FF]/[0.08] border border-[#6C63FF]/30 text-white text-xs">
            <MaterialIcon name="check_circle" size={16} className="text-emerald-400 flex-shrink-0" />
            <span><strong>Intelektus Sob Medida:</strong> 100% moldado aos seus processos e sem limites.</span>
          </div>
        </div>

        {/* Grid Compacto 2 Colunas Mobile / 3 Colunas Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-10">
          {benefits.map((b, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="card-glass rounded-2xl p-3 sm:p-5 group cursor-default flex flex-col justify-between reveal relative overflow-hidden transition-all duration-300 hover:border-[#6C63FF]/50"
              >
                {/* Glow de hover suave */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${b.color}15 0%, transparent 60%)` }}
                />

                <div className="relative z-10">
                  {/* Topo do Card: Ícone + Badge de Impacto */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                    <div
                      className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `${b.color}18`,
                        border: `1px solid ${b.color}40`,
                        boxShadow: isHovered ? `0 0 20px ${b.color}35` : 'none',
                      }}
                    >
                      <MaterialIcon name={b.icon} size={18} color={b.color} />
                    </div>

                    <span 
                      className="self-start sm:self-auto text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md"
                      style={{
                        background: `${b.color}15`,
                        color: b.color,
                        border: `1px solid ${b.color}30`,
                      }}
                    >
                      {b.badge}
                    </span>
                  </div>

                  {/* Título & Descrição Concisa */}
                  <h3 className="font-bold text-xs sm:text-base text-white mb-1 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {b.description}
                  </p>
                </div>

                {/* Linha gradiente decorativa inferior */}
                <div
                  className="h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500 mt-2 sm:mt-3"
                  style={{ background: `linear-gradient(to right, ${b.color}, transparent)` }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA Banner Compacto */}
        <div
          className="rounded-2xl p-4 sm:p-7 text-center relative overflow-hidden reveal max-w-3xl mx-auto"
          style={{
            background: 'rgba(13,13,30,0.85)',
            border: '1px solid rgba(108,99,255,0.25)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.12) 0%, transparent 60%)' }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.8), rgba(255,60,172,0.6), transparent)' }}
          />

          <h3
            className="font-bold text-lg sm:text-2xl mb-1.5 sm:mb-2 text-white relative z-10"
            style={{ letterSpacing: '-0.02em' }}
          >
            Pronto para transformar sua empresa?
          </h3>
          <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-300 max-w-lg mx-auto relative z-10 leading-relaxed">
            Agende um diagnóstico gratuito e descubra a solução ideal para o seu modelo de negócio.
          </p>

          <a
            href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+um+diagn%C3%B3stico+gratuito+para+minha+empresa.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex btn-glow text-white font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl text-xs sm:text-sm items-center gap-2 shadow-xl hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <MaterialIcon name="auto_awesome" size={16} className="text-yellow-300" />
            Quero um diagnóstico gratuito
            <MaterialIcon name="arrow_forward" size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
