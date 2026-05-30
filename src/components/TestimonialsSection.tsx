
import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'A Intelektus criou um sistema de gestão que transformou completamente nossa operação. Antes era tudo em papel e planilha, agora temos controle total em tempo real. Vale cada centavo.',
    author: 'Roberto Almeida',
    position: 'Sócio, Apex Estética Automotiva',
    initials: 'RA',
    rating: 5,
    segment: 'Estética Automotiva',
    color: '#6C63FF',
  },
  {
    quote: 'O sistema de agendamento reduziu 80% das faltas com lembretes automáticos. O robô no WhatsApp atende os clientes 24h e ainda agenda consultas sozinho. Incrível!',
    author: 'Dra. Carla Moreira',
    position: 'Diretora, Clínica Saúde & Bem-estar',
    initials: 'CM',
    rating: 5,
    segment: 'Clínica',
    color: '#A855F7',
  },
  {
    quote: 'Precisávamos de um CRM personalizado para o nosso processo de vendas. A Intelektus entregou exatamente o que precisávamos, no prazo e com suporte impecável.',
    author: 'Dr. Paulo Ribeiro',
    position: 'CEO, Consultoria Integrada',
    initials: 'PR',
    rating: 5,
    segment: 'Consultoria',
    color: '#10B981',
  },
  {
    quote: 'O sistema de pet shop que desenvolveram para a Sandy mudou tudo. Agendamento online, lembretes automáticos, controle de estoque... zero ligações desnecessárias!',
    author: 'Sandra Menezes',
    position: 'Proprietária, Sandy Pet Shop',
    initials: 'SM',
    rating: 5,
    segment: 'Pet Shop',
    color: '#F59E0B',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const navigate = (dir: 'next' | 'prev') => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(c =>
        dir === 'next'
          ? (c + 1) % testimonials.length
          : (c - 1 + testimonials.length) % testimonials.length
      );
      setAnimating(false);
    }, 200);
  };

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

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => navigate('next'), 5000);
    return () => clearInterval(id);
  }, [current, animating]);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="badge-chip mb-5 mx-auto inline-flex">
            <Star size={12} style={{ color: '#F59E0B' }} />
            Depoimentos
          </div>
          <h2
            className="font-bold text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            O que nossos{' '}
            <span className="gradient-text">clientes dizem</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Empresas reais com resultados reais.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto mb-12 reveal">
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden transition-all duration-500"
            style={{
              background: 'rgba(13,13,30,0.85)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${t.color}30`,
              boxShadow: `0 0 50px ${t.color}12, 0 30px 60px rgba(0,0,0,0.4)`,
              opacity: animating ? 0.5 : 1,
              transform: animating ? 'scale(0.99)' : 'scale(1)',
            }}
          >
            {/* Top gradient bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(to right, ${t.color}, transparent)` }}
            />

            {/* Segment tag */}
            <div className="flex items-center justify-between mb-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg"
                style={{ background: `${t.color}15`, color: t.color }}
              >
                {t.segment}
              </span>
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < t.rating ? '#FBBF24' : 'none'}
                    style={{ color: i < t.rating ? '#FBBF24' : 'var(--text-muted)' }}
                  />
                ))}
              </div>
            </div>

            {/* Quote icon */}
            <Quote size={32} className="mb-5 opacity-15" style={{ color: t.color }} />

            {/* Quote text */}
            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}
            >
              "{t.quote}"
            </p>

            {/* Author + nav */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    background: `${t.color}20`,
                    color: t.color,
                    border: `1px solid ${t.color}40`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
                    {t.author}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.position}</p>
                </div>
              </div>

              {/* Nav buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('prev')}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
                  style={{
                    color: 'var(--text-muted)',
                    background: 'rgba(13,13,30,0.8)',
                    border: '1px solid rgba(108,99,255,0.2)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.6)';
                    (e.currentTarget as HTMLElement).style.color = '#A899FF';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.2)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => navigate('next')}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
                  style={{
                    color: 'var(--text-muted)',
                    background: 'rgba(13,13,30,0.8)',
                    border: '1px solid rgba(108,99,255,0.2)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.6)';
                    (e.currentTarget as HTMLElement).style.color = '#A899FF';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.2)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: current === i ? '28px' : '6px',
                    background: current === i
                      ? `linear-gradient(90deg, ${testimonials[i].color}, ${testimonials[i].color}99)`
                      : 'rgba(108,99,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto reveal">
          {[
            { value: '500+', label: 'Empresas atendidas' },
            { value: '2M+',  label: 'Transações processadas' },
            { value: '98%',  label: 'Taxa de satisfação' },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center card-glass rounded-2xl py-6 px-4"
            >
              <p
                className="font-bold text-2xl md:text-3xl gradient-text mb-1"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
