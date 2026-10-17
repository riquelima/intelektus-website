import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import MaterialIcon from '@/components/ui/MaterialIcon';

interface SolutionItem {
  id: string;
  title: string;
  tag: string;
  icon: string;
  color: string;
  gradient: string;
  summary: string;
  description: string;
  highlights: string[];
  whatsappText: string;
}

const solutions: SolutionItem[] = [
  {
    id: 'sistemas-sob-medida',
    title: 'Sistemas Sob Medida',
    tag: 'Core & Enterprise',
    icon: 'tune',
    color: '#6C63FF',
    gradient: 'linear-gradient(135deg, #6C63FF 0%, #A855F7 100%)',
    summary: 'Arquitetura de software 100% personalizada para sua empresa',
    description: 'Desenvolvimento do zero ao deploy com regras exclusivas do seu negócio, sem limitações de templates ou taxas abusivas por usuário.',
    highlights: [
      'Zero mensalidades infinitas de terceiros',
      'Código limpo, documentado e de sua propriedade',
      'Painel administrativo completo e responsivo'
    ],
    whatsappText: 'Olá Henrique! Gostaria de conversar sobre o desenvolvimento de um Sistema Sob Medida para minha empresa.',
  },
  {
    id: 'robos-atendimento',
    title: 'Robôs de Atendimento com IA',
    tag: 'IA & Automação',
    icon: 'smart_toy',
    color: '#FF3CAC',
    gradient: 'linear-gradient(135deg, #FF3CAC 0%, #EC4899 100%)',
    summary: 'Atendimento inteligente 24 horas por dia sem filas',
    description: 'Agentes conversacionais treinados nas regras do seu negócio que atendem no WhatsApp, tiram dúvidas, qualificam leads e realizam agendamentos.',
    highlights: [
      'Integração nativa com WhatsApp e Instagram',
      'Treinado com histórico e catálogo da sua empresa',
      'Encaminhamento inteligente para atendente humano'
    ],
    whatsappText: 'Olá Henrique! Quero saber mais sobre os Robôs de Atendimento com IA para o WhatsApp da minha empresa.',
  },
  {
    id: 'automacoes-n8n',
    title: 'Automações & n8n',
    tag: 'Produtividade',
    icon: 'bolt',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
    summary: 'Elimine tarefas repetitivas e conecte sua operação',
    description: 'Fluxos automatizados que conectam formulários, planilhas, bancos de dados e sistemas de pagamento sem necessidade de intervenção humana.',
    highlights: [
      'Economia de até 80% do tempo em rotinas manuais',
      'Disparos automáticos e geração de documentos',
      'Infraestrutura segura em nuvem com alta disponibilidade'
    ],
    whatsappText: 'Olá Henrique! Gostaria de automatizar processos e rotinas com n8n na minha operação.',
  },
  {
    id: 'captura-leads',
    title: 'Captura de Leads & Funis',
    tag: 'Vendas & Crescimento',
    icon: 'ads_click',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #00F5D4 100%)',
    summary: 'Páginas e funis de alta conversão para atrair clientes',
    description: 'Landing pages de alta performance, projetadas especificamente para dispositivos móveis, com carregamento em menos de 1 segundo.',
    highlights: [
      'Design persuasivo focado em geração de orçamentos',
      'Rastreamento avançado de conversão e eventos',
      'Integração direta com CRM e WhatsApp'
    ],
    whatsappText: 'Olá Henrique! Preciso de uma estrutura de Captura de Leads e Funis de alta conversão.',
  },
  {
    id: 'disparos-whatsapp',
    title: 'Disparos no WhatsApp',
    tag: 'Mensageria Inteligente',
    icon: 'campaign',
    color: '#00D4FF',
    gradient: 'linear-gradient(135deg, #00D4FF 0%, #3B82F6 100%)',
    summary: 'Campanhas em massa segmentadas e com alta entrega',
    description: 'Envio de mensagens personalizadas para sua base de clientes com proteção antibloqueio, intervalos inteligentes e relatórios de entrega.',
    highlights: [
      'Comunicação direta com 98% de taxa de abertura',
      'Variáveis dinâmicas de nome e dados do cliente',
      'Relatórios em tempo real de envios e respostas'
    ],
    whatsappText: 'Olá Henrique! Tenho interesse na solução de Disparos Segmentados no WhatsApp.',
  },
  {
    id: 'inteligencia-artificial',
    title: 'Inteligência Artificial Aplicada',
    tag: 'Inovação & Dados',
    icon: 'psychology',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #6C63FF 100%)',
    summary: 'Modelos de linguagem e IA conectados aos seus dados',
    description: 'Crie agentes corporativos que analisam relatórios, extraem dados de notas fiscais e documentos, e geram insights automáticos para tomada de decisão.',
    highlights: [
      'Modelos OpenAI GPT-4o e Claude adaptados à sua empresa',
      'Privacidade e segurança de dados corporativos',
      'Análise preditiva e sumarização instantânea'
    ],
    whatsappText: 'Olá Henrique! Gostaria de aplicar Inteligência Artificial nos dados e processos da minha empresa.',
  },
  {
    id: 'dashboards-kpis',
    title: 'Dashboards & KPIs em Tempo Real',
    tag: 'Gestão Executiva',
    icon: 'monitoring',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #FF3CAC 100%)',
    summary: 'Visão 360° da sua empresa em uma única tela',
    description: 'Centralize dados financeiros, vendas, estoque e desempenho operacional em painéis gráficos interativos e acessíveis de qualquer dispositivo.',
    highlights: [
      'Métricas atualizadas em tempo real',
      'Filtros por período, vendedor e categoria',
      'Alertas automáticos de metas e anomalias'
    ],
    whatsappText: 'Olá Henrique! Preciso de um Dashboard personalizado com KPIs da minha operação.',
  },
  {
    id: 'sistemas-web-saas',
    title: 'Sistemas Web & SaaS',
    tag: 'Plataformas Cloud',
    icon: 'public',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #00D4FF 100%)',
    summary: 'Plataformas completas e escaláveis na nuvem',
    description: 'Transforme sua ideia ou processo em uma plataforma SaaS moderna com gestão de assinaturas, controle de permissões e segurança nível bancário.',
    highlights: [
      'Arquitetura multi-tenant escalável',
      'Integração com gateways de pagamento (Pix, Cartão)',
      'Backup diário e redundância em nuvem'
    ],
    whatsappText: 'Olá Henrique! Quero desenvolver uma Plataforma SaaS / Sistema Web para meu negócio.',
  },
  {
    id: 'crm-personalizado',
    title: 'CRM Personalizado',
    tag: 'Gestão Comercial',
    icon: 'groups',
    color: '#14B8A6',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #10B981 100%)',
    summary: 'Controle de vendas, clientes e pipeline estruturado',
    description: 'Um funil comercial adaptado ao seu ciclo de venda real, com histórico de conversas, lembretes de follow-up e controle de comissões.',
    highlights: [
      'Pipeline visual estilo Kanban (arrastar e soltar)',
      'Histórico unificado de contatos e propostas',
      'Zero perda de oportunidades por falta de acompanhamento'
    ],
    whatsappText: 'Olá Henrique! Gostaria de implantar um CRM Personalizado para minha equipe comercial.',
  },
  {
    id: 'apps-corporativos',
    title: 'Apps Corporativos & PWA',
    tag: 'Mobile First',
    icon: 'smartphone',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
    summary: 'Aplicativos modernos e rápidos para iOS e Android',
    description: 'Soluções móveis instaláveis sem burocracia de lojas, com suporte offline, notificações push e navegação ultrafluida com gestos.',
    highlights: [
      'Design ergonômico feito para uso com uma mão',
      'Acesso rápido direto na tela inicial do celular',
      'Sincronização em tempo real com o banco de dados'
    ],
    whatsappText: 'Olá Henrique! Gostaria de desenvolver um Aplicativo Móvel Corporativo para minha empresa.',
  },
  {
    id: 'integracoes-apis',
    title: 'Integrações & APIs',
    tag: 'Conectividade Total',
    icon: 'link',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
    summary: 'Conecte seus sistemas existentes sem retrabalho',
    description: 'Integramos seu ERP atual (Bling, Tiny, Omie), sistemas de pagamento, e-commerces e planilhas para operarem de forma 100% sincronizada.',
    highlights: [
      'Eliminação de digitação manual de notas e pedidos',
      'Webhooks bidirecionais instantâneos',
      'Monitoramento ativo de falhas e logs'
    ],
    whatsappText: 'Olá Henrique! Preciso integrar sistemas e APIs existentes na minha empresa.',
  },
  {
    id: 'email-marketing',
    title: 'E-mail Marketing & Réguas',
    tag: 'Relacionamento',
    icon: 'mail',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
    summary: 'Campanhas automatizadas que chegam na hora certa',
    description: 'Crie réguas de relacionamento para onboarding, recuperação de clientes inativos, pós-venda e comunicações estratégicas automatizadas.',
    highlights: [
      'Alta entregabilidade na caixa de entrada principal',
      'Gatilhos baseados no comportamento do cliente',
      'Templates modernos e responsivos'
    ],
    whatsappText: 'Olá Henrique! Gostaria de estruturar automações de E-mail Marketing e réguas de clientes.',
  },
];

// Card do topo arrastável (Tinder Card)
interface TinderCardProps {
  item: SolutionItem;
  index: number;
  total: number;
  onSwipe: (direction: 'left' | 'right') => void;
  isFront: boolean;
  stackOffset: number; // 0 para o card ativo, 1 para o segundo, 2 para o terceiro
}

const TinderCard: React.FC<TinderCardProps> = ({
  item,
  index,
  total,
  onSwipe,
  isFront,
  stackOffset,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 0, 260], [-16, 0, 16]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1]);

  const handleDragEnd = (_e: any, info: PanInfo) => {
    const threshold = 90;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipe('left');
    }
  };

  const WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=557199088651&text=${encodeURIComponent(
    item.whatsappText
  )}&type=phone_number&app_absent=0`;

  // Configuração de profundidade da pilha
  const scale = 1 - stackOffset * 0.05;
  const translateY = stackOffset * 14;
  const opacity = 1 - stackOffset * 0.28;
  const blur = stackOffset > 0 ? `${stackOffset * 1.5}px` : '0px';

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[360px] sm:max-w-[400px] select-none touch-pan-y"
      style={{
        zIndex: 30 - stackOffset,
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        cursor: isFront ? 'grab' : 'default',
        transformOrigin: 'bottom center',
      }}
      animate={{
        scale,
        y: translateY,
        opacity,
        filter: `blur(${blur})`,
      }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 26,
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={isFront ? handleDragEnd : undefined}
      whileTap={isFront ? { cursor: 'grabbing' } : undefined}
    >
      <div
        className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-300 min-h-[490px] sm:min-h-[510px]"
        style={{
          background: 'rgba(11, 11, 26, 0.94)',
          border: `1.5px solid ${item.color}45`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px ${item.color}20`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Glow de fundo ambiental */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Linha gradiente no topo do card */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: item.gradient }}
        />

        {/* Stamps visuais que aparecem enquanto o usuário arrasta */}
        {isFront && (
          <>
            {/* Stamp "INTERESSE / QUERO" (quando arrasta para a direita) */}
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-5 left-5 z-40 px-3.5 py-1.5 rounded-xl border-2 border-[#00F5D4] bg-[#00F5D4]/15 backdrop-blur-md shadow-[0_0_20px_rgba(0,245,212,0.4)] pointer-events-none rotate-[-12deg]"
            >
              <div className="flex items-center gap-1.5 text-xs font-black tracking-wider text-[#00F5D4] uppercase">
                <MaterialIcon name="favorite" size={14} fill className="text-[#00F5D4]" />
                Quero Este
              </div>
            </motion.div>

            {/* Stamp "PASSAR" (quando arrasta para a esquerda) */}
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-5 right-5 z-40 px-3.5 py-1.5 rounded-xl border-2 border-[#FF3CAC] bg-[#FF3CAC]/15 backdrop-blur-md shadow-[0_0_20px_rgba(255,60,172,0.4)] pointer-events-none rotate-[12deg]"
            >
              <div className="flex items-center gap-1.5 text-xs font-black tracking-wider text-[#FF3CAC] uppercase">
                <MaterialIcon name="close" size={14} className="text-[#FF3CAC]" />
                Próximo
              </div>
            </motion.div>
          </>
        )}

        {/* TOPO: Ícone Material Design + Badge + Contador */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            {/* Container do Ícone Material Design com Glow */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300"
              style={{
                background: `${item.color}20`,
                border: `1.5px solid ${item.color}60`,
                boxShadow: `0 0 25px ${item.color}35`,
              }}
            >
              <MaterialIcon
                name={item.icon}
                size={28}
                color={item.color}
                weight={500}
              />
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{
                  background: `${item.color}18`,
                  color: item.color,
                  border: `1px solid ${item.color}40`,
                }}
              >
                {item.tag}
              </span>

              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400">
                {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* TÍTULO & RESUMO */}
          <h3 className="font-extrabold text-xl sm:text-2xl text-white mb-2 tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-[#00F5D4] mb-3">
            {item.summary}
          </p>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
            {item.description}
          </p>

          {/* LISTA DE DESTAQUES */}
          <div className="space-y-2 mb-6">
            {item.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${item.color}25` }}
                >
                  <MaterialIcon
                    name="check"
                    size={11}
                    color={item.color}
                    weight={600}
                  />
                </div>
                <span className="text-xs sm:text-[13px] text-gray-200 leading-tight">
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RODAPÉ DO CARD: BOTÃO DE AÇÃO DIRETA + DICA TÁTIL */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg"
            style={{
              background: item.gradient,
              boxShadow: `0 4px 20px ${item.color}40`,
            }}
          >
            <MaterialIcon name="chat" size={16} fill />
            Conversar sobre esta Solução
            <MaterialIcon name="arrow_forward" size={16} />
          </a>

          {isFront && (
            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
              <MaterialIcon name="swipe" size={14} className="text-[#00F5D4] animate-pulse" />
              <span>Arraste para o lado para ver a próxima</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right');
  const sectionRef = useRef<HTMLElement>(null);

  // Swipe function
  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    setExitDirection(direction);
    setHistory((prev) => [...prev, currentIndex]);
    setCurrentIndex((prev) => (prev + 1) % solutions.length);
  }, [currentIndex]);

  // Rewind / Desfazer
  const handleRewind = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex(last);
  };

  // Atalhos de teclado no desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleSwipe('right');
      if (e.key === 'ArrowLeft') handleSwipe('left');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwipe]);

  // Visibilidade para animação de reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 70);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentSolution = solutions[currentIndex];
  const WHATSAPP_ACTIVE_URL = `https://api.whatsapp.com/send/?phone=557199088651&text=${encodeURIComponent(
    currentSolution.whatsappText
  )}&type=phone_number&app_absent=0`;

  // Próximos 3 cards a renderizar na pilha
  const visibleCards = [
    { item: solutions[currentIndex], offset: 0, key: `${solutions[currentIndex].id}-${currentIndex}` },
    { item: solutions[(currentIndex + 1) % solutions.length], offset: 1, key: `${solutions[(currentIndex + 1) % solutions.length].id}-${currentIndex + 1}` },
    { item: solutions[(currentIndex + 2) % solutions.length], offset: 2, key: `${solutions[(currentIndex + 2) % solutions.length].id}-${currentIndex + 2}` },
  ];

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="py-12 sm:py-20 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Iluminação de fundo imersiva */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '750px',
          height: '550px',
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.09) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 reveal">
          <div className="badge-chip mb-3 mx-auto inline-flex items-center gap-1.5">
            <MaterialIcon name="tune" size={14} color="#00F5D4" />
            <span>Nossas Soluções</span>
          </div>

          <h2
            className="font-extrabold text-2xl sm:text-4xl md:text-5xl mb-3 text-white tracking-tight"
          >
            Tudo que seu negócio precisa{' '}
            <span className="gradient-text">em um só lugar</span>
          </h2>

          <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto">
            Arraste os cards para o lado para explorar cada tecnologia e encontrar a solução sob medida para sua operação.
          </p>
        </div>

        {/* CONTAINER DO CARD STACK TINDER */}
        <div className="relative w-full max-w-[420px] mx-auto min-h-[520px] sm:min-h-[540px] flex items-center justify-center mb-8">
          <AnimatePresence mode="popLayout" custom={exitDirection}>
            {visibleCards
              .slice()
              .reverse()
              .map(({ item, offset, key }, i) => {
                const isFront = offset === 0;
                return (
                  <TinderCard
                    key={key}
                    item={item}
                    index={(currentIndex + offset) % solutions.length}
                    total={solutions.length}
                    onSwipe={handleSwipe}
                    isFront={isFront}
                    stackOffset={offset}
                  />
                );
              })}
          </AnimatePresence>
        </div>

        {/* BARRA DE CONTROLE TINDER ERGONÔMICA */}
        <div className="flex flex-col items-center gap-4 reveal">
          <div
            className="flex items-center justify-center gap-3 sm:gap-4 p-2.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            style={{ background: 'rgba(10, 10, 24, 0.85)' }}
          >
            {/* BOTÃO 1: REWIND / DESFAZER */}
            <button
              onClick={handleRewind}
              disabled={history.length === 0}
              title="Voltar ao card anterior"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                history.length > 0
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 hover:bg-amber-500/25 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                  : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
              }`}
            >
              <MaterialIcon name="replay" size={20} />
            </button>

            {/* BOTÃO 2: PULAR / PASSAR (SWIPE ESQUERDA) */}
            <button
              onClick={() => handleSwipe('left')}
              title="Passar para a próxima solução"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-rose-500/15 text-rose-400 border border-rose-500/40 hover:bg-rose-500/25 active:scale-90 transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.25)]"
            >
              <MaterialIcon name="close" size={24} weight={600} />
            </button>

            {/* BOTÃO 3: CTA WHATSAPP DIRETO PARA A SOLUÇÃO ATIVA */}
            <a
              href={WHATSAPP_ACTIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Falar sobre esta solução no WhatsApp"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#25D366] to-[#00F5D4] text-[#04040D] shadow-[0_0_25px_rgba(0,245,212,0.45)] hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-white/30"
            >
              <MaterialIcon name="chat" size={26} fill className="text-black" />
            </a>

            {/* BOTÃO 4: GOSTEI / PRÓXIMO (SWIPE DIREITA) */}
            <button
              onClick={() => handleSwipe('right')}
              title="Próxima solução"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/50 hover:bg-[#6C63FF]/30 active:scale-90 transition-all cursor-pointer shadow-[0_0_20px_rgba(108,99,255,0.3)]"
            >
              <MaterialIcon name="arrow_forward" size={24} weight={600} />
            </button>
          </div>

          {/* INDICADORES DE PROGRESSO (DOTS / BARRINHAS DE CADA SOLUÇÃO) */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-xs sm:max-w-md pt-2">
            {solutions.map((s, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setHistory((prev) => [...prev, currentIndex]);
                    setCurrentIndex(idx);
                  }}
                  title={s.title}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: isActive ? '24px' : '6px',
                    height: '6px',
                    background: isActive ? s.color : 'rgba(255,255,255,0.15)',
                    boxShadow: isActive ? `0 0 10px ${s.color}` : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* MINI BADGE INFORMATIVO */}
          <p className="text-[11px] text-gray-400 mt-1">
            Solução <span className="text-white font-bold">{currentIndex + 1}</span> de{' '}
            <span className="text-white font-bold">{solutions.length}</span> —{' '}
            <span style={{ color: currentSolution.color }} className="font-semibold">
              {currentSolution.title}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
