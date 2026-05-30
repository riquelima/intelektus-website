
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, TrendingUp, ArrowRight, Award } from 'lucide-react';

const cases = [
  {
    client: 'Apex Estética Automotiva',
    category: 'Sistema de Gestão',
    segment: 'Estética Automotiva',
    problem: 'Agendamentos manuais em papel, sem histórico de clientes e sem controle financeiro.',
    solution: 'Sistema completo de agendamento, CRM de clientes, controle financeiro e painel de metas.',
    results: [
      { metric: '70%', label: 'menos trabalho manual' },
      { metric: '3x', label: 'mais clientes retornando' },
      { metric: '24/7', label: 'atendimento automático' },
    ],
    color: '#6C63FF',
    gradient: 'linear-gradient(135deg, #6C63FF, #A855F7)',
  },
  {
    client: 'Sandy Pet Shop',
    category: 'Automação + Gestão',
    segment: 'Pet Shop',
    problem: 'Agenda de banho e tosa feita por telefone, estoques sem controle e alta taxa de no-show.',
    solution: 'Sistema de agendamento online, lembretes automáticos, controle de estoque e histórico do pet.',
    results: [
      { metric: '80%', label: 'redução nos no-shows' },
      { metric: '100+', label: 'pets gerenciados' },
      { metric: '0h', label: 'de ligação por agendamento' },
    ],
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #3B82F6)',
  },
  {
    client: 'IntelekBot',
    category: 'Robô de Atendimento IA',
    segment: 'Múltiplos Setores',
    problem: 'Equipe sobrecarregada respondendo as mesmas perguntas manualmente 24h por dia.',
    solution: 'Agente virtual com IA treinado para o negócio, integrado ao WhatsApp e CRM do cliente.',
    results: [
      { metric: '85%', label: 'dúvidas resolvidas pelo robô' },
      { metric: '24/7', label: 'sem custo adicional' },
      { metric: '94%', label: 'satisfação dos clientes' },
    ],
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #EC4899)',
  },
  {
    client: 'FinanceFlow AI',
    category: 'Plataforma SaaS',
    segment: 'Financeiro',
    problem: 'Gestão financeira fragmentada em planilhas, sem visibilidade de fluxo de caixa em tempo real.',
    solution: 'Plataforma financeira com IA, dashboards de fluxo de caixa, DRE automático e alertas inteligentes.',
    results: [
      { metric: '3x', label: 'decisões mais rápidas' },
      { metric: '60%', label: 'menos tempo no fechamento' },
      { metric: '100%', label: 'dados em tempo real' },
    ],
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #3B82F6)',
  },
];

/* Contador animado */
const AnimatedMetric = ({ value, label, color }: { value: string; label: string; color: string }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center p-4 rounded-xl"
      style={{
        background: `${color}0D`,
        border: `1px solid ${color}25`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <p
        className="font-bold text-2xl mb-0.5"
        style={{ fontFamily: 'Syne, sans-serif', color }}
      >
        {value}
      </p>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</p>
    </div>
  );
};

const CasesSection = () => {
  const WHATSAPP = 'https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Quero+resultados+como+esses+para+minha+empresa.&type=phone_number&app_absent=0';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="badge-chip mb-5 mx-auto inline-flex">
            <TrendingUp size={12} style={{ color: '#6C63FF' }} />
            Cases de Sucesso
          </div>
          <h2
            className="font-bold text-4xl md:text-5xl mb-5"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Resultados que{' '}
            <span className="gradient-text">falam por si só</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Empresas reais que transformaram sua operação com sistemas da Intelektus.
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {cases.map((c, i) => (
            <div
              key={i}
              className="card-glass rounded-2xl flex flex-col gap-5 relative overflow-hidden group reveal cursor-default"
              style={{ padding: 0 }}
            >
              {/* Gradient header */}
              <div
                className="px-7 pt-7 pb-5 relative"
                style={{
                  background: `linear-gradient(135deg, ${c.color}10 0%, transparent 60%)`,
                  borderBottom: `1px solid rgba(108,99,255,0.1)`,
                }}
              >
                {/* Top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: c.gradient }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg mb-3 inline-block"
                      style={{ background: `${c.color}18`, color: c.color }}
                    >
                      {c.category}
                    </span>
                    <h3
                      className="font-bold text-xl"
                      style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                    >
                      {c.client}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      Segmento: {c.segment}
                    </p>
                  </div>
                  <Award size={22} style={{ color: c.color, flexShrink: 0, marginTop: '2px', opacity: 0.7 }} />
                </div>
              </div>

              {/* Problem + Solution */}
              <div className="px-7 flex flex-col gap-3">
                <div
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}
                >
                  <p className="text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#F87171' }}>
                    Desafio
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{c.problem}</p>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}
                >
                  <p className="text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: c.color }}>
                    Solução
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{c.solution}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="px-7 pb-7">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                  Resultados obtidos
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {c.results.map((r, j) => (
                    <AnimatedMetric key={j} value={r.metric} label={r.label} color={c.color} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <p className="mb-5 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Seu negócio pode ser o próximo case de sucesso.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Quero um projeto assim
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
