
import { useEffect, useRef } from 'react';
import { Code2, Zap } from 'lucide-react';

// Stacks extraídas diretamente de https://www.henriquelima.social/ — Skills & Tools
const techCategories = [
  {
    label: 'Linguagens',
    color: '#6C63FF',
    items: [
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Python',     color: '#3776AB' },
      { name: 'SQL',        color: '#336791' },
      { name: 'JSON',       color: '#FFFFFF' },
    ],
  },
  {
    label: 'Frontend & Frameworks',
    color: '#FF3CAC',
    items: [
      { name: 'React',          color: '#61DAFB' },
      { name: 'Next.js',        color: '#FFFFFF' },
      { name: 'Node.js',        color: '#68A063' },
      { name: 'Tailwind CSS',   color: '#38BDF8' },
      { name: 'TypeScript',     color: '#3178C6' },
    ],
  },
  {
    label: 'Banco de Dados',
    color: '#10B981',
    items: [
      { name: 'PostgreSQL',          color: '#336791' },
      { name: 'Supabase',            color: '#3ECF8E' },
      { name: 'Redis',               color: '#FF4438' },
      { name: 'Relational Databases',color: '#A855F7' },
      { name: 'Data Modeling',       color: '#F59E0B' },
    ],
  },
  {
    label: 'Automação & IA',
    color: '#F59E0B',
    items: [
      { name: 'n8n',            color: '#FF6D5A' },
      { name: 'OpenAI / GPT',   color: '#10A37F' },
      { name: 'Anthropic',      color: '#D4A27F' },
      { name: 'WhatsApp API',   color: '#25D366' },
      { name: 'Evolution API',  color: '#25D366' },
      { name: 'Webhooks',       color: '#A855F7' },
      { name: 'Bot Development',color: '#6C63FF' },
      { name: 'Chatbot Flows',  color: '#FF3CAC' },
    ],
  },
  {
    label: 'QA & Testes',
    color: '#A855F7',
    items: [
      { name: 'E2E Testing',    color: '#A855F7' },
      { name: 'Cypress',        color: '#6CD163' },
      { name: 'Selenium',       color: '#43B02A' },
      { name: 'Postman',        color: '#FF6C37' },
      { name: 'API Testing',    color: '#6C63FF' },
      { name: 'Jira',           color: '#0052CC' },
    ],
  },
  {
    label: 'DevOps & Cloud',
    color: '#00D4FF',
    items: [
      { name: 'Docker',   color: '#2496ED' },
      { name: 'AWS',      color: '#FF9900' },
      { name: 'Vercel',   color: '#FFFFFF' },
      { name: 'GitHub',   color: '#FFFFFF' },
      { name: 'CI/CD',    color: '#10B981' },
    ],
  },
  {
    label: 'Integrações & APIs',
    color: '#EC4899',
    items: [
      { name: 'REST APIs',          color: '#6C63FF' },
      { name: 'API Integration',    color: '#FF3CAC' },
      { name: 'Google Sheets API',  color: '#0F9D58' },
      { name: 'System Integration', color: '#3B82F6' },
      { name: 'Order Management',   color: '#F59E0B' },
      { name: 'Billing Systems',    color: '#EC4899' },
    ],
  },
  {
    label: 'Ferramentas & Métodos',
    color: '#3B82F6',
    items: [
      { name: 'Dashboards',     color: '#6C63FF' },
      { name: 'KPI Development',color: '#F59E0B' },
      { name: 'Data Extraction',color: '#10B981' },
      { name: 'Log Analysis',   color: '#A855F7' },
      { name: 'Root Cause Analysis', color: '#EF4444' },
      { name: 'SLA Monitoring', color: '#00D4FF' },
    ],
  },
];

// Gerar 3 linhas de marquee com itens misturados de todas as categorias
const allItems = techCategories.flatMap(cat =>
  cat.items.map(item => ({ ...item, catColor: cat.color }))
);
// Embaralhar um pouco para misturar categorias nas linhas
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
// Usar seed determinístico para SSR compat — pegamos sequências fixas
const row1 = [...allItems, ...allItems];
const row2 = [...allItems.slice(15), ...allItems.slice(0, 15), ...allItems.slice(15), ...allItems.slice(0, 15)];
const row3 = [...allItems.slice(28), ...allItems.slice(0, 28), ...allItems.slice(28), ...allItems.slice(0, 28)];

const MarqueeRow = ({
  items,
  speed,
  direction = 'left',
}: {
  items: typeof row1;
  speed: number;
  direction?: 'left' | 'right';
}) => (
  <div
    className="flex gap-2.5 mb-2.5"
    style={{
      animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${speed}s linear infinite`,
      width: 'max-content',
    }}
  >
    {items.map((tech, i) => (
      <div
        key={i}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl flex-shrink-0 transition-all duration-200 cursor-default group"
        style={{
          background: 'rgba(13,13,30,0.9)',
          border: `1px solid rgba(108,99,255,0.14)`,
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${tech.color}55`;
          el.style.boxShadow = `0 0 14px ${tech.color}20`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'rgba(108,99,255,0.14)';
          el.style.boxShadow = 'none';
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
        />
        <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
          {tech.name}
        </span>
      </div>
    ))}
  </div>
);

const TechStackSection = () => {
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

  return (
    <section
      id="tecnologias"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px', height: '350px',
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-12 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="badge-chip mb-5 mx-auto inline-flex">
            <Code2 size={12} style={{ color: '#6C63FF' }} />
            Stack Tecnológica
          </div>
          <h2
            className="font-bold text-3xl md:text-4xl mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Tecnologias que{' '}
            <span className="gradient-text">dominamos</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Mais de 40 tecnologias e ferramentas em uso real — do frontend ao cloud, da IA à automação.
          </p>
        </div>

        {/* Category pills — grid de categorias */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 reveal">
          {techCategories.map((cat) => (
            <span
              key={cat.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: `${cat.color}12`,
                border: `1px solid ${cat.color}35`,
                color: cat.color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
              {cat.label}
            </span>
          ))}
        </div>

        {/* Marquee 3 linhas */}
        <div className="relative reveal" style={{ overflow: 'hidden' }}>
          {/* Fade masks laterais */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
          />

          <MarqueeRow items={row1} speed={40} direction="left"  />
          <MarqueeRow items={row2} speed={55} direction="right" />
          <MarqueeRow items={row3} speed={35} direction="left"  />
        </div>

        {/* Note */}
        <div className="flex items-center justify-center gap-2 mt-8 reveal">
          <Zap size={12} style={{ color: '#6C63FF' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            + Outras tecnologias conforme a necessidade do projeto
          </p>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default TechStackSection;
