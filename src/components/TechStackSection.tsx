
import { useEffect, useRef } from 'react';
import { Code2, Zap } from 'lucide-react';

const techStack = [
  { name: 'React',        category: 'Frontend',   color: '#61DAFB' },
  { name: 'Next.js',      category: 'Framework',  color: '#FFFFFF' },
  { name: 'TypeScript',   category: 'Linguagem',  color: '#3178C6' },
  { name: 'Node.js',      category: 'Backend',    color: '#68A063' },
  { name: 'Supabase',     category: 'Database',   color: '#3ECF8E' },
  { name: 'PostgreSQL',   category: 'Database',   color: '#336791' },
  { name: 'OpenAI / GPT', category: 'IA',         color: '#10A37F' },
  { name: 'Anthropic',    category: 'IA',         color: '#D4A27F' },
  { name: 'n8n',          category: 'Automação',  color: '#FF6D5A' },
  { name: 'Evolution API',category: 'WhatsApp',   color: '#25D366' },
  { name: 'Docker',       category: 'DevOps',     color: '#2496ED' },
  { name: 'AWS',          category: 'Cloud',      color: '#FF9900' },
  { name: 'Vercel',       category: 'Deploy',     color: '#FFFFFF' },
  { name: 'Redis',        category: 'Cache',      color: '#FF4438' },
  { name: 'Prisma',       category: 'ORM',        color: '#5A67D8' },
];

const marqueeItems = [...techStack, ...techStack]; // duplicar para loop

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
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <div className="badge-chip mb-5 mx-auto inline-flex">
            <Code2 size={12} style={{ color: '#6C63FF' }} />
            Stack Tecnológica
          </div>
          <h2
            className="font-bold text-3xl md:text-4xl mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Tecnologias{' '}
            <span className="gradient-text">modernas e escaláveis</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Utilizamos tecnologias consolidadas para garantir desempenho, segurança e crescimento sustentável.
          </p>
        </div>

        {/* Marquee infinite scroll */}
        <div className="relative reveal" style={{ overflow: 'hidden' }}>
          {/* Fade masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
          />

          {/* Row 1 — moving left */}
          <div
            className="flex gap-3 mb-3"
            style={{
              animation: 'marquee-left 30s linear infinite',
              width: 'max-content',
            }}
          >
            {marqueeItems.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-shrink-0 transition-all duration-250 group cursor-default"
                style={{
                  background: 'rgba(13,13,30,0.85)',
                  border: '1px solid rgba(108,99,255,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${tech.color}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}80` }}
                />
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                  {tech.name}
                </span>
                <span
                  className="text-xs opacity-60 whitespace-nowrap"
                  style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}
                >
                  {tech.category}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 — moving right (reversed) */}
          <div
            className="flex gap-3"
            style={{
              animation: 'marquee-right 35s linear infinite',
              width: 'max-content',
            }}
          >
            {[...marqueeItems].reverse().map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-shrink-0 transition-all duration-250 cursor-default"
                style={{
                  background: 'rgba(13,13,30,0.85)',
                  border: '1px solid rgba(108,99,255,0.12)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${tech.color}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.12)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}80` }}
                />
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="flex items-center justify-center gap-2 mt-8 reveal">
          <Zap size={12} style={{ color: '#6C63FF' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            + Outras tecnologias conforme a necessidade do seu projeto
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
