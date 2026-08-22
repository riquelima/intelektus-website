import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Play, Pause, Volume2, VolumeX, Maximize2, X, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Smartphone, CheckCircle2, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ═══════════════════════════════════
   PROJETOS ESTÁTICOS COM VÍDEO
═══════════════════════════════════ */
const STATIC_PROJECTS = [
  {
    id: "static-8",
    title: "Meu Carro de Linha Salinas",
    tagline: "Meu Carro de Linha Salinas — Transporte & Mobilidade",
    category: "Mobile",
    videoUrl: "/videos/carro-de-linha.gif",
    isVideo: true,
    color: "#00D4FF",
    gradient: "linear-gradient(135deg, #00D4FF, #0072FF)",
    tags: ["Mobilidade Urbana", "Caronas", "Transporte Local", "Mobile", "Gestão de Serviços"],
    description:
      "Plataforma de caronas e mobilidade inteligente para Salinas da Margarida.",
    features: [
      "📍 Geolocalização em Tempo Real: Solicite sua carona com poucos toques e acompanhe o trajeto do motorista pelo mapa até o ponto de encontro.",
      "🤝 Foco na Comunidade Local: Desenvolvido especialmente para otimizar a mobilidade em Salinas da Margarida, conectando moradores e visitantes aos motoristas da região.",
      "📱 Interface Intuitiva: Design limpo e focado na usabilidade, permitindo que qualquer pessoa consiga pedir um carro sem complicações.",
      "📊 Gestão de Serviços: Sistema integrado para o gerenciamento de viagens, com cálculo de estimativa de preços prévia e histórico de corridas, oferecendo controle tanto para o passageiro quanto para o motorista parceiro.",
    ],
  },
  {
    id: "static-7",
    title: "MatchFlix",
    tagline: "MatchFlix — Descoberta & Entretenimento",
    category: "Mobile",
    videoUrl: "/videos/matchflix.gif",
    isVideo: true,
    color: "#E50914",
    gradient: "linear-gradient(135deg, #E50914, #B81D24)",
    tags: ["Streaming", "Match de Filmes", "Entretenimento", "Mobile", "UI/UX Design"],
    description:
      "Plataforma inteligente para dar match e assistir aos melhores filmes.",
    features: [
      "🎬 Sistema de Match: Encontre 'um pra chamar de seu'. Mecânica interativa e divertida para descobrir, filtrar e favoritar filmes com base nas suas preferências reais.",
      "🔥 Seção Em Alta (Trending): Fique por dentro do que é sucesso. Acompanhe os títulos mais populares e descubra exatamente o que o público está assistindo.",
      "📱 Experiência Imersiva: Interface premium e moderna em dark mode, com navegação altamente visual focada em pôsteres de alta qualidade e rolagem fluida e intuitiva.",
      "▶️ Streaming Integrado: Vá direto da tela de descoberta para o sofá. Assista aos filmes que você deu match diretamente pela plataforma, sem atritos.",
    ],
  },
  {
    id: "static-6",
    title: "Sandy's Pet Shop",
    tagline: "Sandy's Pet Shop — Agendamento & Gestão",
    category: "Sistemas",
    videoUrl: "/videos/sandys-pet-shop.mp4",
    isVideo: true,
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #F43F5E)",
    tags: ["Pet Shop", "Agendamento", "Gestão Financeira", "Mobile", "White-label"],
    description:
      "Plataforma de gestão inteligente e aplicativo exclusivo para o mercado pet.",
    features: [
      "📱 Aplicativo do Cliente com experiência intuitiva e tabela de preços dinâmica, calculando o valor exato na hora com base no peso do pet e nos serviços selecionados (Banho & Tosa, Pet Móvel, Creche).",
      "💻 Painel Administrativo completo: Controle total de agendamentos, lista de clientes e dashboard detalhado com estatísticas de faturamento diário e semanal em tempo real.",
      "🔄 Sistema Exclusivo (White-label): Aplicativo customizado com a sua identidade visual, escalável e desenhado para profissionalizar o atendimento de qualquer Pet Shop.",
    ],
  },
  {
    id: "static-1",
    title: "Edy Cão — Banho & Tosa",
    tagline: "Plataforma end-to-end para o mercado pet",
    category: "Sistemas",
    videoUrl: "/videos/edy-cao.mp4",
    isVideo: true,
    color: "#6C63FF",
    gradient: "linear-gradient(135deg, #6C63FF, #A855F7)",
    tags: ["Pet Shop", "Agendamento", "CRM", "Mobile", "React Native"],
    description:
      "Plataforma end-to-end para o mercado pet. O sistema resolve um dos maiores gargalos do setor: a logística de agendamento.",
    features: [
      "📱 Aplicativo do Cliente com UX intuitiva para agendamento, precificação em tempo real baseada em variáveis (porte, tipo de pelo, adicionais) e geolocalização para serviços móveis.",
      "💻 Painel Administrativo robusto: Dashboard com métricas de conversão e faturamento, Gestão de CRM, notificações push e calendário interativo.",
      "🔄 Sistema escalável e adaptável para qualquer Pet Shop que queira ter seu próprio aplicativo.",
    ],
  },
  {
    id: "static-2",
    title: "NeoEase — Soluções em Tecnologia",
    tagline: "Automação Inteligente e Agentes de IA",
    category: "IA",
    videoUrl: "/videos/neoease.mp4",
    isVideo: true,
    color: "#FF3CAC",
    gradient: "linear-gradient(135deg, #FF3CAC, #A855F7)",
    tags: ["IA", "Automação", "Agentes", "Dashboard", "Análise Preditiva"],
    description:
      "Transforme processos manuais em fluxos de trabalho autônomos com agentes de IA e análise preditiva.",
    features: [
      "🤖 Agentes Autônomos: Sistemas capazes de executar tarefas complexas, desde atendimento ao cliente até análise de dados em larga escala.",
      "📊 Análise Preditiva: Dashboards inteligentes que antecipam tendências e auxiliam na tomada de decisão estratégica.",
      "⚡ Integração com os principais LLMs do mercado (GPT, Claude) via API.",
    ],
  },
  {
    id: "static-3",
    title: "Money Balance",
    tagline: "Gestão Financeira Inteligente com IA",
    category: "SaaS",
    videoUrl: "/videos/money-balance.mp4",
    isVideo: true,
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #3B82F6)",
    tags: ["Financeiro", "IA", "SaaS", "Dashboard", "React"],
    description:
      "Assume o controle total com Money Balance. Gestão financeira inteligente que traz clareza absoluta para o seu negócio.",
    features: [
      "📊 Dashboard Intuitivo: panorama completo em segundos — saldo, entradas, saídas e status de pagamentos.",
      "🧠 Revolução com IA: Converse com suas finanças. Pergunte 'Qual foi meu total de gastos em janeiro?' e a IA responde.",
      "📅 Organização Total: Relatórios visuais, gráficos e calendário de pagamentos para nunca mais atrasar uma conta.",
    ],
  },
  {
    id: "static-4",
    title: "Quality Home — Portal Imobiliário",
    tagline: "A Revolução Imobiliária na Palma da Sua Mão",
    category: "Sistemas",
    videoUrl: "/videos/quality-home.mp4",
    isVideo: true,
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #EC4899)",
    tags: ["Imobiliária", "Mobile", "Maps", "Portal", "React Native"],
    description:
      "Portal imobiliário desenhado para oferecer uma experiência mobile irrepreensível, com mapas e navegação intuitiva.",
    features: [
      "📱 Fluidez Mobile-First: Imóveis em cartões otimizados com ícones claros para leitura imediata.",
      "🗺️ Integração com Mapas: Navegue pelos bairros e encontre as melhores oportunidades geolocalizadas.",
      "🏠 Navegação Intuitiva: Alterne facilmente entre venda e arrendamento com interface limpa e moderna.",
    ],
  },
  {
    id: "static-5",
    title: "Gourmet Go",
    tagline: "A Solução Definitiva em Delivery Mobile",
    category: "Mobile",
    videoUrl: "/videos/gourmet-go.mp4",
    isVideo: true,
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #F97316)",
    tags: ["Delivery", "Mobile", "Rastreamento", "E-commerce", "React Native"],
    description:
      "App de delivery de alta performance com rastreamento em tempo real e checkout simplificado para maximizar conversões.",
    features: [
      "📱 Interface Intuitiva: Design focado na usabilidade — o usuário encontra o que deseja em poucos toques.",
      "🗺️ Rastreamento em Tempo Real: Acompanhe a localização do entregador no mapa, gerando confiança.",
      "🛒 Checkout Simplificado: Fluxo de pagamento ágil para reduzir abandono de carrinho.",
    ],
  },
];

/* ═══════════════════════════════════
   PLAYER DE VÍDEO SMARTPHONE PREMIUM
═══════════════════════════════════ */
const VideoPlayer = ({
  src,
  color,
  onClose,
}: {
  src: string;
  color: string;
  onClose?: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isGif = src.endsWith(".gif");

  if (isGif) {
    return (
      <div
        className="relative w-full rounded-[2.2rem] sm:rounded-[2.5rem] border-[5px] sm:border-[6px] border-[#1E1E2F] overflow-hidden group mx-auto shadow-2xl"
        style={{ background: "#04040D", aspectRatio: "9/16", maxWidth: "290px" }}
      >
        {/* Dynamic Island / Notch do smartphone */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black/80 border border-white/10 z-20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>

        <img
          src={src}
          alt="Demonstração"
          className="w-full h-full object-cover"
        />

        {/* Topo: fechar se houver */}
        {onClose && (
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-black/60 backdrop-blur-md text-white hover:bg-black/80 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Badge flutuante de looping contínuo */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white font-semibold tracking-wider uppercase">
            Vídeo em Loop
          </span>
        </div>
      </div>
    );
  }

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {
          v.muted = true;
          v.play().then(() => setPlaying(true)).catch(() => {});
        });
    }
  }, [src]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { 
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else { 
      v.pause(); 
      setPlaying(false); 
    }
    resetHide();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    resetHide();
  };

  const resetHide = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2500);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress(v.currentTime);
  };

  const onLoaded = () => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
    resetHide();
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const fullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.();
  };

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <div
      className="relative w-full rounded-[2.2rem] sm:rounded-[2.5rem] border-[5px] sm:border-[6px] border-[#1E1E2F] overflow-hidden group mx-auto shadow-2xl cursor-pointer"
      style={{ background: "#04040D", aspectRatio: "9/16", maxWidth: "290px" }}
      onMouseMove={resetHide}
      onClick={togglePlay}
    >
      {/* Dynamic Island / Notch do smartphone */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black/80 border border-white/10 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>

      <video
        ref={videoRef}
        src={src}
        muted={muted}
        playsInline
        loop
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoaded}
        className="w-full h-full object-cover"
      />

      {/* Overlay controles */}
      <div
        className="absolute inset-0 flex flex-col justify-between transition-opacity duration-300"
        style={{ opacity: showControls || !playing ? 1 : 0 }}
      >
        {/* Topo: fechar */}
        {onClose && (
          <div className="flex justify-end p-3 pt-4">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-black/60 backdrop-blur-md text-white hover:bg-black/80 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Centro: botão play com efeito ripple */}
        <div className="flex-1 flex items-center justify-center">
          {!playing && (
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid ${color}`,
                    animation: `ping-wave 2s ease-out ${i * 0.6}s infinite`,
                    opacity: 0,
                  }}
                />
              ))}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center relative z-10 transition-transform hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                  boxShadow: `0 0 35px ${color}80`,
                }}
              >
                <Play size={24} fill="white" className="text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Fundo: barra de controles com touch target aprimorado */}
        <div
          className="px-4 pb-4 pt-8 flex flex-col gap-2.5"
          style={{
            background: "linear-gradient(to top, rgba(4,4,13,0.92) 0%, rgba(4,4,13,0.6) 60%, transparent 100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div
            className="w-full h-1.5 rounded-full cursor-pointer group/bar relative"
            style={{ background: "rgba(255,255,255,0.2)" }}
            onClick={seek}
          >
            <div
              className="h-full rounded-full relative"
              style={{
                width: duration ? `${(progress / duration) * 100}%` : "0%",
                background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                boxShadow: `0 0 8px ${color}`,
                transition: "width 0.1s linear",
              }}
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full"
                style={{ background: color, transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          {/* Controles de Play, Áudio e Tela cheia */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/10 hover:bg-white/20 cursor-pointer"
                title={playing ? "Pausar" : "Reproduzir"}
              >
                {playing ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/10 hover:bg-white/20 cursor-pointer"
                title={muted ? "Ativar som" : "Desativar som"}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <span className="text-[11px] font-mono text-gray-300 ml-1">
                {fmt(progress)} / {fmt(duration)}
              </span>
            </div>
            <button
              onClick={fullscreen}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/10 hover:bg-white/20 cursor-pointer"
              title="Tela cheia"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping-wave {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════
   CARD DE PROJETO COM VÍDEO SMARTPHONE ELEGANTE
═══════════════════════════════════ */
const ProjectCard = ({
  project,
  onOpen,
  isActive,
}: {
  project: typeof STATIC_PROJECTS[0];
  onOpen: (p: typeof STATIC_PROJECTS[0]) => void;
  isActive?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!project.videoUrl.endsWith(".gif")) {
      previewRef.current?.play().catch(() => {});
    }
  }, [project.videoUrl]);

  return (
    <div
      className={`relative rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden cursor-pointer group snap-center shrink-0 w-[78vw] max-w-[270px] sm:w-[305px] aspect-[9/16] transition-all duration-500 border-4 sm:border-[5px] ${
        isActive 
          ? 'scale-100 border-[#6C63FF]/60 shadow-[0_0_40px_rgba(108,99,255,0.35),0_20px_60px_rgba(0,0,0,0.8)]' 
          : 'scale-[0.96] border-white/10 opacity-80 hover:opacity-100 hover:scale-[0.98] shadow-2xl'
      }`}
      style={{
        background: "#04040D",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
    >
      {/* Smartphone Dynamic Island / Notch no Topo */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3.5 sm:h-4 rounded-full bg-black/85 border border-white/15 z-30 flex items-center justify-between px-2 pointer-events-none shadow-md">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40 animate-pulse" />
      </div>

      {/* Container do Vídeo/GIF em 100% da tela do smartphone */}
      <div className="absolute inset-0 w-full h-full bg-[#04040D]">
        {project.videoUrl.endsWith(".gif") ? (
          <img
            src={project.videoUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <video
            ref={previewRef}
            src={project.videoUrl}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {/* Badge de categoria no topo esquerdo */}
      <div className="absolute top-3 left-3 z-30">
        <span
          className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-lg flex items-center gap-1"
          style={{
            background: `rgba(8,8,21,0.85)`,
            border: `1px solid ${project.color}70`,
            color: project.color,
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.color }} />
          {project.category}
        </span>
      </div>

      {/* Centro: Botão Play Glassmorphism com Onda de Pulso */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div 
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl backdrop-blur-md"
          style={{
            background: 'rgba(8, 8, 21, 0.75)',
            border: `1.5px solid ${project.color}`,
            boxShadow: `0 0 25px ${project.color}70`,
          }}
        >
          <Play size={16} className="text-white ml-0.5 sm:hidden" fill="white" />
          <Play size={20} className="text-white ml-0.5 hidden sm:block" fill="white" />
        </div>
      </div>

      {/* Barra Flutuante Inferior Limpa & Moderna */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 pt-16 flex flex-col gap-1.5 z-20"
        style={{
          background: "linear-gradient(to top, rgba(4, 4, 13, 0.98) 0%, rgba(4, 4, 13, 0.8) 55%, transparent 100%)",
        }}
      >
        <div>
          <h3 className="font-bold text-sm sm:text-base text-white truncate leading-tight">
            {project.title}
          </h3>
          <p className="text-[11px] font-medium text-gray-300 truncate" style={{ color: project.color }}>
            {project.tagline.split('—')[1] || project.tagline}
          </p>
        </div>

        {/* Botão de Ação Estilizado */}
        <div className="pt-1 flex items-center justify-between">
          <div 
            className="w-full py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${project.color}25, rgba(255,255,255,0.05))`,
              border: `1px solid ${project.color}45`,
              color: '#FFFFFF',
            }}
          >
            <span className="flex items-center gap-1.5 text-[11px]">
              <Sparkles size={11} className="text-yellow-300" />
              Assistir Demo
            </span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" style={{ color: project.color }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════
   MODAL DO PROJETO THEATER MODE
═══════════════════════════════════ */
const ProjectModal = ({
  project,
  onClose,
}: {
  project: typeof STATIC_PROJECTS[0];
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl animate-scale-in flex flex-col no-scrollbar"
        style={{
          background: "rgba(8,8,21,0.98)",
          border: `1px solid ${project.color}45`,
          boxShadow: `0 0 90px ${project.color}25, 0 40px 100px rgba(0,0,0,0.8)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior de gradiente */}
        <div
          className="h-1 rounded-t-3xl w-full"
          style={{ background: project.gradient }}
        />

        {/* Botão de Fechar Grande */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all bg-white/10 hover:bg-white/20 border border-white/15 text-white cursor-pointer shadow-lg"
            title="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Conteúdo do Modal em 2 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-7 items-start">
          
          {/* Coluna Esquerda: Smartphone Mockup Player */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-[rgba(13,13,30,0.4)] p-4 sm:p-5 rounded-2xl border border-white/5 w-full">
            <div className="w-full max-w-[210px] sm:max-w-[270px]">
              <VideoPlayer src={project.videoUrl} color={project.color} />
            </div>
            <p className="text-[11px] text-center mt-3 text-gray-400 font-medium">
              ✦ Toque na tela para pausar ou controlar o áudio
            </p>
          </div>

          {/* Coluna Direita: Informações Detalhadas */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-xl"
                  style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
                >
                  {project.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                  <Smartphone size={13} /> Sistema Sob Medida
                </span>
              </div>

              <h2
                className="font-bold text-2xl md:text-3xl text-white tracking-tight"
              >
                {project.title}
              </h2>
              <p className="text-sm mt-1 font-semibold" style={{ color: project.color }}>
                {project.tagline}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-gray-300">
              {project.description}
            </p>

            {/* Lista de Recursos Principais */}
            <div>
              <h3
                className="font-bold text-xs mb-3 uppercase tracking-widest text-gray-400"
              >
                Principais Funcionalidades Entregues:
              </h3>
              <div className="space-y-2">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 p-3 rounded-xl text-xs leading-relaxed"
                    style={{
                      background: `${project.color}0A`,
                      border: `1px solid ${project.color}22`,
                      color: "#E2E8F0",
                    }}
                  >
                    <CheckCircle2 size={15} style={{ color: project.color, flexShrink: 0, marginTop: '2px' }} />
                    <div>{f}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags e Tecnologias */}
            <div>
              <h3 className="font-bold text-xs mb-2.5 uppercase tracking-widest text-gray-400">
                Tecnologias Utilizadas:
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-lg font-medium"
                    style={{
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}35`,
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Botão de CTA para WhatsApp */}
            <div className="pt-2">
              <a
                href={`https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1+Henrique%21+Gostei+muito+do+projeto+${encodeURIComponent(project.title)}+no+portf%C3%B3lio+e+quero+desenvolver+algo+similar.&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow w-full text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-xl"
              >
                <Sparkles size={16} className="text-yellow-300" />
                Quero um projeto similar para minha empresa
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ═══════════════════════════════════
   SECTION PRINCIPAL COM CARROSSEL & CÁPSULA DE CONTROLE
═══════════════════════════════════ */
const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<typeof STATIC_PROJECTS[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filters = ["Todos", "Sistemas", "Automação", "IA", "SaaS", "Mobile"];
  const allProjects = STATIC_PROJECTS;

  const filtered = selectedFilter === "Todos"
    ? allProjects
    : allProjects.filter((p) => p.category === selectedFilter);

  // Monitorar scroll do carrossel para atualizar o index do card ativo
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const cards = el.querySelectorAll('.snap-center');
    if (!cards.length) return;
    
    const center = el.scrollLeft + el.clientWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card, i) => {
      const rect = (card as HTMLElement);
      const cardCenter = rect.offsetLeft + rect.clientWidth / 2;
      const diff = Math.abs(center - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const cards = el.querySelectorAll('.snap-center');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const scrollLeft = () => {
    scrollToCard(Math.max(activeIndex - 1, 0));
  };

  const scrollRight = () => {
    scrollToCard(Math.min(activeIndex + 1, filtered.length - 1));
  };

  // Reveal no scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
    <div ref={sectionRef} style={{ background: "var(--bg-surface)" }}>
      {/* Hero da seção */}
      <section
        id="projects"
        className="pt-10 sm:pt-16 pb-4 sm:pb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 mesh-gradient pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "600px", height: "300px",
            background: "radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="badge-chip mb-3 sm:mb-4 mx-auto inline-flex reveal">
            ✦ Demonstrações Reais em Vídeo
          </div>
          <h2
            className="font-bold text-2xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 reveal text-white"
            style={{
              letterSpacing: "-0.03em",
            }}
          >
            Sistemas que{" "}
            <span className="gradient-text">Transformam Empresas</span>
          </h2>
          <p
            className="text-xs sm:text-base mb-6 max-w-xl mx-auto leading-relaxed reveal text-gray-300"
          >
            Projetos reais com interface interativa. Deslize para explorar e toque em qualquer card para ver a demonstração completa.
          </p>

          {/* Barra de Filtros Mobile-First e Desktop */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-2 max-w-xl mx-auto reveal">
            {filters.map((f) => {
              const count = f === "Todos" ? allProjects.length : allProjects.filter(p => p.category === f).length;
              const isSelected = selectedFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => {
                    setSelectedFilter(f);
                    setActiveIndex(0);
                    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center gap-1.5"
                  style={
                    isSelected
                      ? { 
                          background: "linear-gradient(135deg, rgba(108,99,255,0.3) 0%, rgba(255,60,172,0.2) 100%)", 
                          borderColor: "rgba(108,99,255,0.7)", 
                          color: "#FFFFFF",
                          boxShadow: "0 0 20px rgba(108,99,255,0.25)"
                        }
                      : { 
                          background: "rgba(13,13,30,0.6)", 
                          borderColor: "rgba(255,255,255,0.08)", 
                          color: "var(--text-secondary)" 
                        }
                  }
                >
                  <span>{f}</span>
                  <span className="text-[10px] opacity-75 px-1.5 py-0.2 rounded-full bg-white/10">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid de projetos com Carrossel Coverflow / Smooth Snap */}
      <section className="pb-12 sm:pb-16 relative" style={{ background: "var(--bg-surface)" }}>
        <div className="container mx-auto px-2 sm:px-6">
          
          {/* Carrossel Horizontal Centralizado */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex flex-row overflow-x-auto gap-3 sm:gap-6 py-4 sm:py-6 px-4 snap-x snap-mandatory scroll-smooth no-scrollbar items-center"
            style={{
              scrollPaddingLeft: 'calc(50vw - 140px)',
              scrollPaddingRight: 'calc(50vw - 140px)',
            }}
          >
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="reveal snap-center shrink-0"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <ProjectCard 
                  project={project} 
                  onOpen={setSelectedProject} 
                  isActive={activeIndex === i}
                />
              </div>
            ))}
          </div>

          {/* Cápsula de Navegação Cyber Elegante & Unificada */}
          {filtered.length > 0 && (
            <div className="max-w-md mx-auto px-4 mt-3 reveal">
              <div 
                className="flex items-center justify-between gap-3 p-2 px-3 sm:px-4 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl"
                style={{ background: 'rgba(10, 10, 25, 0.92)' }}
              >
                {/* Botão Anterior */}
                <button
                  onClick={scrollLeft}
                  disabled={activeIndex === 0}
                  className="py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white flex items-center gap-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft size={15} />
                  <span className="hidden xs:inline sm:inline">Anterior</span>
                </button>

                {/* Centro: Contador + Dots */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-bold text-gray-200 tracking-wider">
                    {activeIndex + 1} / {filtered.length} · <strong className="text-[#A899FF]">{filtered[activeIndex]?.title.split('—')[0]}</strong>
                  </span>
                  
                  <div className="flex items-center gap-1">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToCard(i)}
                        className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: activeIndex === i ? "16px" : "5px",
                          background: activeIndex === i ? "linear-gradient(90deg, #6C63FF, #00D4FF)" : "rgba(255,255,255,0.2)",
                        }}
                        title={`Projeto ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Botão Próximo */}
                <button
                  onClick={scrollRight}
                  disabled={activeIndex >= filtered.length - 1}
                  className="py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white flex items-center gap-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="hidden xs:inline sm:inline">Próximo</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div
              className="text-center py-12 rounded-3xl max-w-md mx-auto border border-white/10 bg-white/5"
            >
              <p className="text-sm text-gray-400">
                Nenhum projeto encontrado nesta categoria no momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Interativo de Detalhes */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default ProjectsSection;
