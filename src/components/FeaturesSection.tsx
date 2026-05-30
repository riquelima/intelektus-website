
import { useEffect, useRef } from 'react';
import {
  Globe, Settings2, Zap, Brain, Link2, BarChart2,
  Users2, Smartphone, Bot, Megaphone, Mail, Target
} from 'lucide-react';

const solutions = [
  {
    icon: Settings2,
    title: 'Sistemas Sob Medida',
    description: 'Software desenvolvido especialmente para a sua operação — do zero ao deploy, com total personalização.',
    color: '#6C63FF',
    size: 'lg', // card maior
  },
  {
    icon: Bot,
    title: 'Robôs de Atendimento',
    description: 'Chatbots com IA que respondem clientes 24/7 pelo WhatsApp, Instagram e site.',
    color: '#FF3CAC',
    size: 'lg',
  },
  {
    icon: Zap,
    title: 'Automações',
    description: 'Elimine tarefas repetitivas e ganhe produtividade com fluxos inteligentes.',
    color: '#F59E0B',
    size: 'sm',
  },
  {
    icon: Target,
    title: 'Captura de Leads',
    description: 'Páginas e funis de captura que convertem visitantes em clientes.',
    color: '#10B981',
    size: 'sm',
  },
  {
    icon: Megaphone,
    title: 'Disparos de Marketing',
    description: 'Envio em massa de mensagens personalizadas no WhatsApp e e-mail.',
    color: '#00D4FF',
    size: 'sm',
  },
  {
    icon: Brain,
    title: 'Inteligência Artificial',
    description: 'Agentes inteligentes treinados com dados do seu negócio.',
    color: '#A855F7',
    size: 'sm',
  },
  {
    icon: BarChart2,
    title: 'Dashboards',
    description: 'Visualize métricas e KPIs em tempo real em uma tela só.',
    color: '#EC4899',
    size: 'sm',
  },
  {
    icon: Globe,
    title: 'Sistemas Web',
    description: 'Plataformas completas para gestão empresarial com interfaces modernas.',
    color: '#3B82F6',
    size: 'sm',
  },
  {
    icon: Users2,
    title: 'CRM Personalizado',
    description: 'Controle vendas, clientes e pipeline de forma estruturada.',
    color: '#14B8A6',
    size: 'sm',
  },
  {
    icon: Smartphone,
    title: 'Apps Corporativos',
    description: 'Soluções modernas acessíveis pelo navegador em qualquer dispositivo.',
    color: '#8B5CF6',
    size: 'sm',
  },
  {
    icon: Link2,
    title: 'Integrações',
    description: 'Conectamos seus sistemas, APIs e ferramentas em uma operação unificada.',
    color: '#F97316',
    size: 'sm',
  },
  {
    icon: Mail,
    title: 'E-mail Marketing',
    description: 'Campanhas segmentadas que chegam no momento certo para o cliente certo.',
    color: '#06B6D4',
    size: 'sm',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bigCards = solutions.filter(s => s.size === 'lg');
  const smallCards = solutions.filter(s => s.size === 'sm');

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
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
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="badge-chip mb-5 mx-auto inline-flex">
            <Settings2 size={12} style={{ color: '#FF3CAC' }} />
            Nossas Soluções
          </div>
          <h2
            className="font-bold text-4xl md:text-5xl mb-5"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Tudo que seu negócio precisa
            <span className="gradient-text"> em um só lugar</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Do levantamento ao suporte — desenvolvemos a solução certa para o seu segmento e momento.
          </p>
        </div>

        {/* BENTO GRID — 2 grandes + 10 pequenos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {/* Cards grandes (col-span-2) */}
          {bigCards.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div
                key={i}
                className="col-span-2 card-glass rounded-2xl p-8 group cursor-default flex flex-col gap-5 reveal relative overflow-hidden"
                style={{ minHeight: '200px' }}
              >
                {/* Glow de fundo no card */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${sol.color}12 0%, transparent 60%)` }}
                />

                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: `${sol.color}18`,
                      border: `1px solid ${sol.color}40`,
                      boxShadow: `0 0 24px ${sol.color}25`,
                    }}
                  >
                    <Icon size={26} style={{ color: sol.color }} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold text-xl mb-2"
                      style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                    >
                      {sol.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {sol.description}
                    </p>
                  </div>
                </div>

                {/* Animated bottom line */}
                <div
                  className="h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(to right, ${sol.color}, transparent)` }}
                />
              </div>
            );
          })}

          {/* Cards pequenos */}
          {smallCards.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div
                key={i}
                className="card-holo rounded-2xl p-5 group cursor-default flex flex-col gap-3 reveal"
                style={{ '--holo-color': sol.color } as any}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${sol.color}15`,
                    border: `1px solid ${sol.color}30`,
                  }}
                >
                  <Icon size={18} style={{ color: sol.color }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-sm mb-1.5"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {sol.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {sol.description}
                  </p>
                </div>
                <div
                  className="mt-auto h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
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
