
import React, { useState, useEffect, useRef } from 'react';
import {
  Dog, Stethoscope, Briefcase, Utensils, ShoppingCart,
  Building2, Truck, Wrench, Car, Dumbbell,
  LineChart, ShoppingBag, Factory, X, ArrowRight,
  Pizza, Coffee, Scissors, Camera
} from 'lucide-react';

const segments = [
  {
    icon: Dog,
    title: 'Pet Shops',
    tagline: 'Agendamento + Histórico de Pets',
    example: 'Sistema completo de agendamento de banho e tosa, controle de estoque, histórico de pets, lembretes automáticos e atendimento via WhatsApp.',
    color: '#6C63FF',
    gradient: 'linear-gradient(135deg, #6C63FF, #A855F7)',
  },
  {
    icon: Pizza,
    title: 'Pizzarias',
    tagline: 'Pedidos Online + Delivery',
    example: 'Sistema de pedidos online, gestão de deliveries, cardápio digital com QR Code, integração com apps de entrega e controle de caixa.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
  },
  {
    icon: Utensils,
    title: 'Restaurantes',
    tagline: 'Mesas + Cardápio Digital',
    example: 'Pedidos online, controle de mesas, cardápio digital, integração com delivery, controle financeiro e relatórios de vendas.',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #F97316, #F59E0B)',
  },
  {
    icon: Coffee,
    title: 'Lanchonetes',
    tagline: 'PDV + Gestão Rápida',
    example: 'PDV simplificado para balcão, controle de fichas, cardápio digital, caixa integrado e relatórios diários automatizados.',
    color: '#14B8A6',
    gradient: 'linear-gradient(135deg, #14B8A6, #06B6D4)',
  },
  {
    icon: Stethoscope,
    title: 'Clínicas',
    tagline: 'Prontuário + Agendamento',
    example: 'Prontuário digital, agendamento online, lembretes automáticos, gestão financeira e portal do paciente.',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #6C63FF)',
  },
  {
    icon: Scissors,
    title: 'Salões de Beleza',
    tagline: 'Agenda Online + Fidelidade',
    example: 'Agendamento online, controle de serviços, histórico de clientes, programa de fidelidade e confirmação automática.',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899, #FF3CAC)',
  },
  {
    icon: Car,
    title: 'Estética Automotiva',
    tagline: 'Agenda + Histórico de Veículos',
    example: 'Agendamento, controle de serviços, fotos antes/depois, histórico do veículo e cobrança automatizada.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6, #6C63FF)',
  },
  {
    icon: Wrench,
    title: 'Oficinas',
    tagline: 'Ordem de Serviço Digital',
    example: 'Ordem de serviço digital, controle de peças, histórico do veículo, orçamentos e cobrança integrada.',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
  },
  {
    icon: Dumbbell,
    title: 'Academias',
    tagline: 'Mensalidades + Treinos',
    example: 'Controle de mensalidades, frequência, treinos personalizados, app do aluno e notificações de renovação.',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444, #F97316)',
  },
  {
    icon: Briefcase,
    title: 'Escritórios',
    tagline: 'CRM + Processos',
    example: 'CRM, controle de processos, automação de documentos, relatórios gerenciais e portal do cliente.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #14B8A6)',
  },
  {
    icon: ShoppingCart,
    title: 'Supermercados',
    tagline: 'Estoque + Relatórios',
    example: 'Gestão de estoque, etiquetas, controle de validade, PDV e relatórios de giro.',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
  },
  {
    icon: Building2,
    title: 'Imobiliárias',
    tagline: 'CRM + Contratos',
    example: 'CRM de imóveis, controle de contratos, comissões, funil de vendas digital e portal de imóveis.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #10B981)',
  },
  {
    icon: Camera,
    title: 'Fotógrafos / Estúdios',
    tagline: 'Agenda + Entrega de Arquivos',
    example: 'Agendamento de sessões, contrato digital, galeria de entrega online e cobrança automatizada.',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
  },
  {
    icon: Truck,
    title: 'Transportadoras',
    tagline: 'Frota + Rastreamento',
    example: 'Rastreamento de cargas, gestão de frota, CTes digitais e controle financeiro.',
    color: '#6C63FF',
    gradient: 'linear-gradient(135deg, #6C63FF, #3B82F6)',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    tagline: 'Loja Própria + Logística',
    example: 'Plataforma de loja própria, gestão de pedidos, integração logística e painel de controle.',
    color: '#FF3CAC',
    gradient: 'linear-gradient(135deg, #FF3CAC, #A855F7)',
  },
  {
    icon: Factory,
    title: 'Indústrias',
    tagline: 'Produção + Qualidade',
    example: 'Controle de produção, gestão de insumos, rastreabilidade e relatórios de qualidade.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
  },
];

const SegmentsSection = () => {
  const [active, setActive] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 50);
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
      id="segments"
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      {/* Orbs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255,60,172,0.08) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(108,99,255,0.08) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="badge-chip-plasma mb-5 mx-auto inline-flex">
            <Factory size={12} style={{ color: '#FF3CAC' }} />
            Segmentos
          </div>
          <h2
            className="font-bold text-4xl md:text-5xl mb-5"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Fazemos para{' '}
            <span className="gradient-text">qualquer tipo de negócio</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Clique em um segmento para ver o que desenvolvemos especialmente para ele.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-10">
          {segments.map((seg, i) => {
            const Icon = seg.icon;
            const isHovered = hoveredIdx === i;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="reveal rounded-2xl p-5 text-left flex flex-col gap-3 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                style={{
                  background: isHovered ? `rgba(13,13,30,0.95)` : 'rgba(13,13,30,0.7)',
                  border: `1px solid ${isHovered ? seg.color + '55' : 'rgba(108,99,255,0.12)'}`,
                  boxShadow: isHovered ? `0 0 30px ${seg.color}20, 0 20px 40px rgba(0,0,0,0.4)` : 'none',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Holographic shimmer on hover */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 30% 30%, ${seg.color}12 0%, transparent 60%)`,
                    }}
                  />
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative z-10"
                  style={{
                    background: `${seg.color}18`,
                    border: `1px solid ${seg.color}35`,
                    boxShadow: isHovered ? `0 0 16px ${seg.color}35` : 'none',
                  }}
                >
                  <Icon size={18} style={{ color: seg.color }} />
                </div>

                <div className="relative z-10">
                  <span
                    className="font-bold text-sm block mb-0.5"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {seg.title}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: isHovered ? seg.color : 'var(--text-muted)' }}
                  >
                    {seg.tagline}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Faixa "não encontrou" */}
        <div
          className="reveal rounded-2xl p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden"
          style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(108,99,255,0.07) 0%, transparent 60%)' }}
          />
          <div className="flex-1 relative z-10">
            <h3
              className="font-bold text-xl mb-1"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
            >
              Não encontrou seu segmento?
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Desenvolvemos para qualquer negócio que queira digitalizar e crescer. Fale com a gente!
            </p>
          </div>
          <a
            href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Meu+segmento+n%C3%A3o+est%C3%A1+na+lista+e+gostaria+de+conversar.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-white font-bold px-7 py-3.5 rounded-xl text-sm flex items-center gap-2 whitespace-nowrap flex-shrink-0 relative z-10"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Falar com especialista
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Modal de detalhe */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
          onClick={() => setActive(null)}
        >
          <div
            className="relative rounded-2xl p-8 max-w-md w-full animate-scale-in"
            style={{
              background: 'rgba(8,8,21,0.97)',
              border: `1px solid ${segments[active].color}40`,
              boxShadow: `0 0 60px ${segments[active].color}20, 0 40px 80px rgba(0,0,0,0.6)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow header */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: segments[active].gradient }}
            />

            <button
              className="absolute top-5 right-5 p-1.5 rounded-lg transition-colors cursor-pointer"
              style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)' }}
              onClick={() => setActive(null)}
            >
              <X size={16} />
            </button>

            {(() => {
              const seg = segments[active];
              const Icon = seg.icon;
              return (
                <>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: `${seg.color}18`,
                      border: `1px solid ${seg.color}40`,
                      boxShadow: `0 0 30px ${seg.color}25`,
                    }}
                  >
                    <Icon size={28} style={{ color: seg.color }} />
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: seg.color }}
                  >
                    {seg.tagline}
                  </div>
                  <h2
                    className="font-bold text-2xl mb-4"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {seg.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-7"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {seg.example}
                  </p>
                  <a
                    href={`https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Tenho+interesse+em+um+sistema+para+${encodeURIComponent(seg.title)}.&type=phone_number&app_absent=0`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow text-white font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Quero um sistema para {seg.title}
                    <ArrowRight size={16} />
                  </a>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default SegmentsSection;
