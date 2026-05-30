import React, { useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink, Play, Pause, Volume2, VolumeX, Maximize2, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ═══════════════════════════════════
   PROJETOS ESTÁTICOS COM VÍDEO
═══════════════════════════════════ */
const STATIC_PROJECTS = [
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
   PLAYER DE VÍDEO PREMIUM INLINE
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
        className="relative w-full rounded-[2.5rem] border-[6px] border-[#1E1E2F] overflow-hidden group mx-auto shadow-2xl"
        style={{ background: "#000", aspectRatio: "9/16", maxWidth: "280px" }}
      >
        <img
          src={src}
          alt="Demonstração GIF"
          className="w-full h-full object-cover"
        />
        {/* Topo: fechar */}
        {onClose && (
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff" }}
            >
              <X size={14} />
            </button>
          </div>
        )}
        {/* Badge flutuante premium indicando que é um GIF animado */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase font-sans">
            Animado GIF 🔄
          </span>
        </div>
      </div>
    );
  }
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
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
      className="relative w-full rounded-[2.5rem] border-[6px] border-[#1E1E2F] overflow-hidden group mx-auto shadow-2xl"
      style={{ background: "#000", aspectRatio: "9/16", maxWidth: "280px" }}
      onMouseMove={resetHide}
      onClick={togglePlay}
    >
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
          <div className="flex justify-end p-3">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff" }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Centro: botão play */}
        <div className="flex-1 flex items-center justify-center">
          {!playing && (
            <div className="relative">
              {/* Ondas de energia */}
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
                className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                  boxShadow: `0 0 30px ${color}60`,
                }}
              >
                <Play size={24} fill="white" className="text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Fundo: barra de controles */}
        <div
          className="px-4 pb-4 pt-8 flex flex-col gap-2"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div
            className="w-full h-1 rounded-full cursor-pointer group/bar"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity"
                style={{ background: color, transform: "translateY(-50%) scale(1.5)" }}
              />
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ color: "#fff" }}
              >
                {playing ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ color: "#fff" }}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>
                {fmt(progress)} / {fmt(duration)}
              </span>
            </div>
            <button
              onClick={fullscreen}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ color: "#fff" }}
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping-wave {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════
   CARD DE PROJETO COM VÍDEO THUMB
═══════════════════════════════════ */
const ProjectCard = ({
  project,
  onOpen,
}: {
  project: typeof STATIC_PROJECTS[0];
  onOpen: (p: typeof STATIC_PROJECTS[0]) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  const handleHoverEnter = () => {
    setHovered(true);
    if (!project.videoUrl.endsWith(".gif")) {
      previewRef.current?.play().catch(() => {});
    }
  };
  const handleHoverLeave = () => {
    setHovered(false);
    if (!project.videoUrl.endsWith(".gif") && previewRef.current) {
      previewRef.current.pause();
      previewRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
      style={{
        background: "rgba(13,13,30,0.85)",
        border: `1px solid ${hovered ? project.color + "50" : "rgba(108,99,255,0.12)"}`,
        boxShadow: hovered ? `0 0 40px ${project.color}18, 0 20px 50px rgba(0,0,0,0.4)` : "none",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.35s ease",
      }}
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
      onClick={() => onOpen(project)}
    >
      {/* Thumbnail / Preview de vídeo no hover */}
      <div className="relative overflow-hidden w-full bg-[#04040D]" style={{ aspectRatio: "9/16", maxHeight: "330px" }}>
        {/* Vídeo/GIF preview mudo no hover */}
        {project.videoUrl.endsWith(".gif") ? (
          <img
            src={project.videoUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
        ) : (
          <video
            ref={previewRef}
            src={project.videoUrl}
            muted
            playsInline
            loop
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
        )}

        {/* Placeholder gradient quando não está em hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center"
          style={{
            background: `linear-gradient(to bottom, rgba(8,8,21,0.25) 0%, rgba(8,8,21,0.95) 90%), ${project.gradient}`,
            opacity: hovered ? 0 : 0.85,
          }}
        >
          {/* Smartphone outline vector mockup for visual depth */}
          <div className="w-16 h-28 rounded-2xl border-2 border-white/20 flex flex-col items-center justify-between p-2 mb-2 relative">
            <div className="w-6 h-1 rounded-full bg-white/20" />
            <div className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center">
              <Play size={10} fill="white" className="text-white ml-0.5" />
            </div>
            <div className="w-3 h-3 rounded-full border border-white/20" />
          </div>
        </div>

        {/* Ícone centralizado */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", border: `2px solid ${project.color}80` }}
          >
            <Play size={24} fill="white" className="text-white ml-1" />
          </div>
        </div>

        {/* Overlay de play no hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(0,0,0,0.3)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.color}99)`,
              boxShadow: `0 0 24px ${project.color}60`,
            }}
          >
            <Play size={20} fill="white" className="text-white ml-1" />
          </div>
        </div>

        {/* Badge de categoria */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg"
            style={{
              background: `${project.color}25`,
              border: `1px solid ${project.color}50`,
              color: project.color,
              backdropFilter: "blur(8px)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Linha de cor no topo */}
        <div
          className="h-0.5 rounded-full -mt-5 mb-1 w-0 group-hover:w-full transition-all duration-500"
          style={{ background: project.gradient }}
        />

        <div>
          <h3
            className="font-bold text-base mb-1 line-clamp-1"
            style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
          <p className="text-xs" style={{ color: project.color, fontWeight: 600 }}>
            {project.tagline}
          </p>
        </div>

        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: `${project.color}12`,
                border: `1px solid ${project.color}25`,
                color: "var(--text-secondary)",
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          className="mt-1 flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/btn"
          style={{ color: project.color }}
        >
          Ver projeto
          <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════
   MODAL DO PROJETO
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl animate-scale-in"
        style={{
          background: "rgba(8,8,21,0.98)",
          border: `1px solid ${project.color}35`,
          boxShadow: `0 0 80px ${project.color}18, 0 40px 100px rgba(0,0,0,0.7)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradiente linha topo */}
        <div
          className="h-0.5 rounded-t-2xl"
          style={{ background: project.gradient }}
        />

        {/* Botão de Fechar Absoluto para o design de 2 colunas */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-muted)" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Layout de duas colunas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Coluna Esquerda: Player de vídeo em Smartphone Mockup */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-[rgba(13,13,30,0.3)] p-4 rounded-2xl border border-white/5">
            <div className="w-full max-w-[270px]">
              <VideoPlayer src={project.videoUrl} color={project.color} />
            </div>
            <p className="text-[11px] text-center mt-3" style={{ color: "var(--text-muted)" }}>
              ✦ Toque no player para controlar o vídeo
            </p>
          </div>

          {/* Coluna Direita: Informações */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg inline-block mb-3"
                style={{ background: `${project.color}18`, color: project.color }}
              >
                {project.category}
              </span>
              <h2
                className="font-bold text-2xl md:text-3xl"
                style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {project.title}
              </h2>
              <p className="text-sm mt-1 font-semibold" style={{ color: project.color }}>
                {project.tagline}
              </p>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {project.description}
            </p>

            <div>
              <h3
                className="font-bold text-xs mb-2.5 uppercase tracking-widest"
                style={{ color: "var(--text-muted)", fontFamily: "Syne, sans-serif" }}
              >
                Principais recursos
              </h3>
              <div className="space-y-2">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 p-3 rounded-xl text-xs leading-relaxed"
                    style={{
                      background: `${project.color}08`,
                      border: `1px solid ${project.color}18`,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3
                className="font-bold text-xs mb-2.5 uppercase tracking-widest"
                style={{ color: "var(--text-muted)", fontFamily: "Syne, sans-serif" }}
              >
                Tecnologias
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-lg font-medium"
                    style={{
                      background: `${project.color}12`,
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Tenho+interesse+em+um+projeto+similar+ao+${encodeURIComponent(project.title)}.&type=phone_number&app_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow w-full text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 mt-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Quero um projeto similar
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════
   SECTION PRINCIPAL
═══════════════════════════════════ */
const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<typeof STATIC_PROJECTS[0] | null>(null);
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Carregar projetos do Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*, project_media(file_path, is_cover)")
          .eq("status", "active")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setDbProjects(data || []);
      } catch (e) {
        console.error("Erro ao carregar projetos:", e);
      }
    };
    fetchProjects();
  }, []);

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

  const filters = ["Todos", "Sistemas", "Automação", "IA", "SaaS", "Mobile"];

  const allProjects = STATIC_PROJECTS; // estáticos primeiro; db pode ser adicionado depois

  const filtered = selectedFilter === "Todos"
    ? allProjects
    : allProjects.filter((p) => p.category === selectedFilter);

  return (
    <div ref={sectionRef} style={{ background: "var(--bg-surface)" }}>
      {/* Hero da seção */}
      <section
        id="projects"
        className="pt-24 pb-10 relative overflow-hidden"
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
          <div className="badge-chip mb-6 mx-auto inline-flex reveal">
            ✦ Portfólio de Sistemas
          </div>
          <h1
            className="font-bold text-4xl md:text-6xl mb-6 reveal"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
            }}
          >
            Sistemas que{" "}
            <span className="gradient-text block pb-3">Transformam Empresas</span>
          </h1>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal"
            style={{ color: "var(--text-secondary)" }}
          >
            Projetos reais — sistemas web, mobile, automações, plataformas com IA e delivery. 
            Clique em qualquer card para assistir a demonstração em vídeo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
            <a
              href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow text-white font-bold px-7 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 justify-center"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <ExternalLink size={15} />
              Solicitar Orçamento
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Quero+falar+com+um+especialista.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-glow font-bold px-7 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 justify-center"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      {/* Grid de projetos */}
      <section className="pb-24 relative" style={{ background: "var(--bg-surface)" }}>
        <div className="container mx-auto px-4 md:px-6">
          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-2 mb-10 reveal">
            <span className="text-xs font-semibold uppercase tracking-widest mr-2" style={{ color: "var(--text-muted)" }}>
              Filtrar:
            </span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer"
                style={
                  selectedFilter === f
                    ? { background: "rgba(108,99,255,0.18)", borderColor: "rgba(108,99,255,0.55)", color: "#A899FF" }
                    : { background: "transparent", borderColor: "rgba(108,99,255,0.15)", color: "var(--text-muted)" }
                }
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="reveal"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div
              className="text-center py-20 rounded-2xl"
              style={{ border: "1px solid rgba(108,99,255,0.15)", background: "rgba(13,13,30,0.5)" }}
            >
              <p className="text-lg" style={{ color: "var(--text-muted)" }}>
                Nenhum projeto nessa categoria ainda.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default ProjectsSection;
