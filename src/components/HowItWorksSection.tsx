
import { useEffect, useRef, useState } from 'react';
import { Search, Map, Code2, TestTube2, Server, Headphones, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Diagnóstico',
    description: 'Entendemos seu negócio, mapeamos desafios e identificamos as maiores oportunidades de melhoria.',
    color: '#6C63FF',
  },
  {
    icon: Map,
    number: '02',
    title: 'Planejamento',
    description: 'Documentamos processos, definimos escopo, arquitetura e cronograma detalhado do projeto.',
    color: '#A855F7',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Desenvolvimento',
    description: 'Criamos sua solução com tecnologias modernas, código limpo e entregas em sprints contínuos.',
    color: '#3B82F6',
  },
  {
    icon: TestTube2,
    number: '04',
    title: 'Testes Rigorosos',
    description: 'Validamos cada funcionalidade com testes rigorosos para garantir estabilidade e qualidade.',
    color: '#10B981',
  },
  {
    icon: Server,
    number: '05',
    title: 'Implantação',
    description: 'Colocamos o sistema em produção com segurança, monitoramento e treinamento da sua equipe.',
    color: '#F59E0B',
  },
  {
    icon: Headphones,
    number: '06',
    title: 'Suporte Contínuo',
    description: 'Evoluímos a solução junto com sua empresa — novas funcionalidades, melhorias e suporte dedicado.',
    color: '#FF3CAC',
  },
];

const HowItWorksSection = () => {
  const WHATSAPP = 'https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+iniciar+um+projeto+com+a+Intelektus.&type=phone_number&app_absent=0';
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar linha da timeline
            let h = 0;
            const interval = setInterval(() => {
              h += 2;
              setLineHeight(Math.min(h, 100));
              if (h >= 100) clearInterval(interval);
            }, 20);

            // Revelar steps um a um
            steps.forEach((_, i) => {
              setTimeout(() => {
                setVisibleSteps(prev => new Set([...prev, i]));
              }, i * 180);
            });

            // Revelar outros elementos
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="como-trabalhamos"
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Background effects */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 reveal">
          <div className="badge-chip mb-3 mx-auto inline-flex">
            <Search size={12} style={{ color: '#6C63FF' }} />
            Metodologia
          </div>
          <h2
            className="font-bold text-2xl sm:text-4xl md:text-5xl mb-2.5 sm:mb-4 text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            Como{' '}
            <span className="gradient-text">trabalhamos</span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300">
            Um processo estruturado e transparente — do diagnóstico à entrega, com você em cada etapa.
          </p>
        </div>

        {/* Timeline layout */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Linha vertical animada */}
            <div
              className="absolute left-4 sm:left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 pointer-events-none"
              style={{ background: 'rgba(108,99,255,0.12)' }}
            >
              <div
                ref={lineRef}
                className="w-full rounded-full"
                style={{
                  height: `${lineHeight}%`,
                  background: 'linear-gradient(180deg, #6C63FF 0%, #A855F7 50%, #FF3CAC 100%)',
                  boxShadow: '0 0 12px rgba(108,99,255,0.5)',
                  transition: 'none',
                }}
              />
            </div>

            <div className="flex flex-col gap-4 sm:gap-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                const isVisible = visibleSteps.has(i);

                return (
                  <div
                    key={i}
                    className="relative flex items-center"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : `translateX(${isLeft ? '-20px' : '20px'})`,
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}
                  >
                    {/* Dot na linha */}
                    <div
                      className="absolute left-4 sm:left-5 md:left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}, ${step.color}88)`,
                        boxShadow: `0 0 16px ${step.color}50`,
                        border: `2px solid ${step.color}`,
                      }}
                    >
                      <span className="font-bold text-[10px] sm:text-xs text-white">
                        {step.number}
                      </span>
                    </div>

                    {/* Card — alternando lado no desktop e margem suave no mobile */}
                    <div
                      className={`ml-10 sm:ml-14 md:ml-0 md:w-5/12 card-glass rounded-2xl p-4 sm:p-6 group cursor-default transition-all duration-300 ${
                        isLeft ? 'md:mr-auto md:pr-6' : 'md:ml-auto md:pl-6'
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: `${step.color}18`,
                            border: `1px solid ${step.color}35`,
                          }}
                        >
                          <Icon size={16} className="sm:hidden" style={{ color: step.color }} />
                          <Icon size={18} className="hidden sm:block" style={{ color: step.color }} />
                        </div>
                        <div>
                          <h3
                            className="font-bold text-sm sm:text-base mb-1 text-white"
                          >
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm leading-relaxed text-gray-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8 sm:mt-14 reveal">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-glow text-white font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base"
            >
              Iniciar meu projeto agora
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
