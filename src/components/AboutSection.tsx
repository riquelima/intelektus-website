
import { useEffect, useRef, useState } from 'react';
import { Zap, User, ExternalLink, Linkedin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const stats = [
  { value: '500+', label: 'Empresas atendidas',   color: '#6C63FF' },
  { value: '7+',   label: 'Anos de experiência',   color: '#A855F7' },
  { value: '100%', label: 'Personalizado',          color: '#FF3CAC' },
  { value: '24/7', label: 'Suporte ativo',          color: '#10B981' },
];

/* Animated counter */
const AnimatedStat = ({ value, label, color }: { value: string; label: string; color: string }) => {
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
      className="text-center py-6 px-4 rounded-2xl transition-all duration-700"
      style={{
        background: 'rgba(13,13,30,0.8)',
        border: `1px solid ${visible ? color + '30' : 'rgba(108,99,255,0.1)'}`,
        boxShadow: visible ? `0 0 30px ${color}15` : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <p
        className="font-bold mb-1"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '2.2rem',
          letterSpacing: '-0.03em',
          background: `linear-gradient(135deg, ${color}, ${color}AA)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </p>
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="quem-somos"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute top-0 left-0 w-60 h-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14 reveal">
            <div className="badge-chip mb-5 mx-auto inline-flex">
              <Zap size={12} style={{ color: '#6C63FF' }} />
              Quem Somos
            </div>
            <h2
              className="font-bold text-4xl md:text-5xl mb-5"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
            >
              Uma{' '}
              <span className="gradient-text">Software House</span>{' '}
              feita para crescer com você
            </h2>
          </div>

          {/* Stats animados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {stats.map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} color={s.color} />
            ))}
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">

            {/* Missão */}
            <div className="card-glass rounded-2xl p-7 flex flex-col gap-5 reveal">
              <h3
                className="font-bold text-xl"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Nossa missão
              </h3>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  A Intelektus nasceu para democratizar o acesso à tecnologia de ponta.
                  Hoje somos uma{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Software House completa</strong>{' '}
                  — desenvolvemos sistemas web, automações, robôs de atendimento e soluções com
                  inteligência artificial sob medida para pequenos e médios negócios.
                </p>
                <p>
                  Acreditamos que tecnologia não precisa ser complicada nem cara.
                  Por isso, entregamos soluções eficientes, escaláveis e com a cara do seu negócio —
                  do primeiro diagnóstico ao suporte contínuo.
                </p>
                <p>
                  Nosso compromisso:{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>
                    fazer seu negócio crescer com tecnologia feita para você.
                  </strong>
                </p>
              </div>
            </div>

            {/* Founder — com spotlight effect */}
            <div
              className="card-glass rounded-2xl p-7 flex flex-col gap-5 reveal relative overflow-hidden cursor-default"
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight dinâmico */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(300px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(108,99,255,0.08) 0%, transparent 60%)`,
                }}
              />

              <h3
                className="font-bold text-xl relative z-10"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Quem está por trás
              </h3>

              {/* Perfil */}
              <div className="flex items-center gap-4 relative z-10">
                <Avatar className="w-16 h-16 flex-shrink-0" style={{ border: '2px solid rgba(108,99,255,0.4)' }}>
                  <AvatarImage src="/henrique-lima.jpg" alt="Henrique Lima" />
                  <AvatarFallback
                    className="font-bold text-lg"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      background: 'rgba(108,99,255,0.2)',
                      color: '#A899FF',
                    }}
                  >
                    HL
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p
                    className="font-bold"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    Henrique Lima
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Fundador & Engenheiro de Software
                  </p>
                  <div className="flex gap-2 mt-2">
                    <a
                      href="https://www.linkedin.com/in/limahenrique/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                      style={{
                        background: 'rgba(108,99,255,0.15)',
                        border: '1px solid rgba(108,99,255,0.3)',
                        color: '#A899FF',
                      }}
                    >
                      <Linkedin size={12} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  +7 anos em tecnologia, qualidade de software e automação.
                  Passou por empresas como{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Netcracker, Uber, Meta e Cognizant</strong>.
                </p>
                <p>
                  Especialista em transformar processos complexos em soluções simples, inteligentes e escaláveis.
                  Fundou a Intelektus para levar tecnologia de ponta a pequenas e médias empresas.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {['Engenharia de Software', 'QA & Automação', 'IA Aplicada', 'Sistemas Web'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg"
                    style={{
                      color: 'var(--text-muted)',
                      background: 'rgba(13,13,30,0.8)',
                      border: '1px solid rgba(108,99,255,0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA band */}
          <div
            className="rounded-2xl p-8 text-center relative overflow-hidden reveal"
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
              style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.7), rgba(255,60,172,0.5), transparent)' }}
            />
            <p
              className="font-bold text-xl md:text-2xl mb-2 relative z-10"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              Tecnologia feita para o seu negócio crescer.
            </p>
            <p className="text-sm mb-7 relative z-10" style={{ color: 'var(--text-secondary)' }}>
              Seja bem-vindo à Intelektus.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+conversar+sobre+um+projeto+com+a+Intelektus.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex btn-glow text-white font-bold px-7 py-3.5 rounded-xl text-sm items-center gap-2"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Vamos conversar
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
