import { useEffect, useRef, useState } from 'react';
import {
  Globe, Settings2, Zap, Brain, Link2, BarChart2,
  Users2, Smartphone, Bot, Megaphone, Mail, Target,
  Sparkles, ArrowRight
} from 'lucide-react';

const solutions = [
  {
    icon: Settings2,
    title: 'Sistemas Sob Medida',
    description: 'Software desenvolvido especialmente para a sua operação — do zero ao deploy, com total personalização.',
    color: '#6C63FF',
    size: 'lg',
    tag: 'Core'
  },
  {
    icon: Bot,
    title: 'Robôs de Atendimento',
    description: 'Chatbots com IA que respondem clientes 24/7 pelo WhatsApp, Instagram e site sem filas.',
    color: '#FF3CAC',
    size: 'lg',
    tag: 'IA & Bots'
  },
  {
    icon: Zap,
    title: 'Automações & n8n',
    description: 'Elimine tarefas repetitivas e ganhe produtividade conectando fluxos inteligentes.',
    color: '#F59E0B',
    size: 'sm',
  },
  {
    icon: Target,
    title: 'Captura de Leads',
    description: 'Páginas e funis de captura de alta conversão para atrair novos clientes.',
    color: '#10B981',
    size: 'sm',
  },
  {
    icon: Megaphone,
    title: 'Disparos no WhatsApp',
    description: 'Envio de mensagens personalizadas em massa com segmentação inteligente.',
    color: '#00D4FF',
    size: 'sm',
  },
  {
    icon: Brain,
    title: 'Inteligência Artificial',
    description: 'Agentes inteligentes treinados com os dados e regras do seu negócio.',
    color: '#A855F7',
    size: 'sm',
  },
  {
    icon: BarChart2,
    title: 'Dashboards & KPIs',
    description: 'Visualize métricas e faturamento em tempo real em uma única tela.',
    color: '#EC4899',
    size: 'sm',
  },
  {
    icon: Globe,
    title: 'Sistemas Web & SaaS',
    description: 'Plataformas completas para gestão empresarial acessíveis de qualquer lugar.',
    color: '#3B82F6',
    size: 'sm',
  },
  {
    icon: Users2,
    title: 'CRM Personalizado',
    description: 'Controle de vendas, histórico de clientes e pipeline estruturado.',
    color: '#14B8A6',
    size: 'sm',
  },
  {
    icon: Smartphone,
    title: 'Apps Corporativos',
    description: 'Soluções modernas e responsivas para navegador e dispositivos móveis.',
    color: '#8B5CF6',
    size: 'sm',
  },
  {
    icon: Link2,
    title: 'Integrações & APIs',
    description: 'Conexão entre ERPs, CRMs, gateways de pagamento e planilhas.',
    color: '#F97316',
    size: 'sm',
  },
  {
    icon: Mail,
    title: 'E-mail Marketing',
    description: 'Campanhas segmentadas que chegam no momento certo para o cliente.',
    color: '#06B6D4',
    size: 'sm',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bigCards = solutions.filter(s => s.size === 'lg');
  const smallCards = solutions.filter(s => s.size === 'sm');

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
      id="solucoes"
      ref={sectionRef}
      className="py-10 sm:py-16 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background effects */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Compacto */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 reveal">
          <div className="badge-chip mb-3 mx-auto inline-flex">
            <Settings2 size={12} style={{ color: '#FF3CAC' }} />
            Nossas Soluções
          </div>
          <h2
            className="font-bold text-2xl sm:text-4xl md:text-5xl mb-2.5 sm:mb-4 text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            Tudo que seu negócio precisa
            <span className="gradient-text"> em um só lugar</span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto">
            Do levantamento ao suporte — desenvolvemos a solução certa para o seu segmento e momento.
          </p>
        </div>

        {/* BENTO GRID COMPACTO E RESPONSIVO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">

          {/* Cards grandes (col-span-2) */}
          {bigCards.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div
                key={i}
                className="col-span-2 card-glass rounded-2xl p-4 sm:p-6 group cursor-default flex flex-col justify-between reveal relative overflow-hidden transition-all duration-300 hover:border-[#6C63FF]/50"
              >
                {/* Glow de fundo no card */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${sol.color}15 0%, transparent 60%)` }}
                />

                <div className="flex items-start gap-3.5 sm:gap-4 relative z-10">
                  <div
                    className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `${sol.color}18`,
                      border: `1px solid ${sol.color}40`,
                      boxShadow: `0 0 20px ${sol.color}20`,
                    }}
                  >
                    <Icon size={20} className="sm:hidden" style={{ color: sol.color }} />
                    <Icon size={24} className="hidden sm:block" style={{ color: sol.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="font-bold text-sm sm:text-lg text-white truncate"
                      >
                        {sol.title}
                      </h3>
                      {sol.tag && (
                        <span 
                          className="text-[9px] font-bold px-2 py-0.5 rounded-md"
                          style={{ background: `${sol.color}20`, color: sol.color, border: `1px solid ${sol.color}40` }}
                        >
                          {sol.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-2 sm:line-clamp-none">
                      {sol.description}
                    </p>
                  </div>
                </div>

                {/* Animated bottom line */}
                <div
                  className="h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500 mt-3 sm:mt-4"
                  style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }}
                />
              </div>
            );
          })}

          {/* Cards menores em Grid de 2 colunas compactas */}
          {smallCards.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div
                key={i}
                className="col-span-1 card-holo rounded-2xl p-3 sm:p-4 group cursor-default flex flex-col justify-between gap-2 reveal transition-all duration-300 hover:scale-[1.02]"
                style={{ '--holo-color': sol.color } as any}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `${sol.color}15`,
                      border: `1px solid ${sol.color}30`,
                    }}
                  >
                    <Icon size={16} style={{ color: sol.color }} />
                  </div>
                  <h3
                    className="font-bold text-xs sm:text-sm text-white leading-tight"
                  >
                    {sol.title}
                  </h3>
                </div>

                <p className="text-[11px] sm:text-xs leading-relaxed text-gray-400 line-clamp-2 sm:line-clamp-none">
                  {sol.description}
                </p>

                <div
                  className="h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500 mt-1"
                  style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
