import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Layers, 
  Bot, 
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface SystemOption {
  id: string;
  label: string;
  icon: React.ElementType;
  multiplier: number;
  avgWeeks: string;
  badge: string;
}

const systemOptions: SystemOption[] = [
  {
    id: 'web-erp',
    label: 'Sistema Web / ERP Sob Medida',
    icon: Layers,
    multiplier: 1.0,
    avgWeeks: '3 a 6 semanas',
    badge: 'Mais pedido',
  },
  {
    id: 'mobile-app',
    label: 'App Mobile (iOS & Android)',
    icon: Smartphone,
    multiplier: 1.15,
    avgWeeks: '4 a 8 semanas',
    badge: 'Alta Conversão',
  },
  {
    id: 'ai-automation',
    label: 'Agentes de IA & Automação n8n',
    icon: Bot,
    multiplier: 0.85,
    avgWeeks: '2 a 4 semanas',
    badge: 'ROI Imediato',
  },
  {
    id: 'saas-platform',
    label: 'Plataforma SaaS Comercial',
    icon: Cpu,
    multiplier: 1.3,
    avgWeeks: '6 a 10 semanas',
    badge: 'Escalabilidade',
  },
];

const RoiSimulator: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>('web-erp');
  const [teamSize, setTeamSize] = useState<number>(8);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [hourlyCost] = useState<number>(45); // Custo médio hora/colaborador em R$

  // Cálculos dinâmicos em tempo real
  const currentOption = systemOptions.find((opt) => opt.id === selectedSystem) || systemOptions[0];

  // Horas manuais totais gastas pela equipe ao mês
  const totalMonthlyHours = Math.round(teamSize * (hoursPerWeek * 4.2));

  // Estimativa de redução de desperdício (65% a 80% do tempo manual é eliminado com sistema sob medida)
  const savedHoursPerMonth = Math.round(totalMonthlyHours * 0.72);

  // Economia financeira anual estimada em retrabalho / horas desperdiçadas
  const annualSavings = Math.round(savedHoursPerMonth * hourlyCost * 12);

  // Payback estimado em meses
  const estimatedPaybackMonths = (2.2 * currentOption.multiplier).toFixed(1);

  const handleSendToWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();

    // Disparar efeito confetti tátil na tela mobile
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6C63FF', '#00F5D4', '#FF3CAC'],
      });
    } catch {
      // Ignora erro se confetti não estiver carregado
    }

    const message = `Olá Henrique! Fiz uma simulação de projeto no site da Intelektus:
- *Tipo de Solução:* ${currentOption.label}
- *Tamanho da Equipe:* ${teamSize} colaboradores
- *Horas manuais estimadas:* ~${hoursPerWeek}h/semana
- *Economia Potencial:* ~${savedHoursPerMonth}h/mês (aprox. R$ ${annualSavings.toLocaleString('pt-BR')}/ano)

Gostaria de agendar um diagnóstico técnico gratuito e entender os próximos passos.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=557199088651&text=${encoded}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="simulador-roi" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.08) 0%, rgba(108, 99, 255, 0.06) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        {/* Header da Seção */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/25 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,245,212,0.15)]">
            <Calculator size={13} className="text-[#00F5D4]" />
            Simulador Interativo Mobile
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Descubra o Retorno Real do seu{' '}
            <span className="gradient-text-cyan">Software Sob Medida</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            Selecione o tipo de sistema e o tamanho da sua operação para ver o impacto direto em horas e redução de custos.
          </p>
        </div>

        {/* Card Principal da Calculadora (Design Tátil Mobile) */}
        <div 
          className="rounded-3xl border border-[#6C63FF]/30 p-5 sm:p-8 backdrop-blur-2xl shadow-2xl relative"
          style={{
            background: 'linear-gradient(180deg, rgba(14, 14, 32, 0.85) 0%, rgba(8, 8, 20, 0.95) 100%)',
          }}
        >
          {/* 1. Escolha da Solução (Pills Táteis com Feedback Rápido) */}
          <div className="mb-7">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
              1. Qual solução sua empresa precisa?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {systemOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedSystem === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSystem(opt.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-300 border active:scale-[0.98] cursor-pointer ${
                      isSelected
                        ? 'bg-[#6C63FF]/20 border-[#00F5D4] shadow-[0_0_25px_rgba(0,245,212,0.2)]'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#00F5D4] text-[#04040D]'
                            : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          MVP em ~{opt.avgWeeks}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/40'
                          : 'bg-white/5 text-gray-500'
                      }`}
                    >
                      {opt.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sliders Táteis de Tamanho e Horas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pt-5 border-t border-white/10">
            {/* Equipe envolvida */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  2. Pessoas envolvidas na operação:
                </span>
                <span className="text-sm font-extrabold text-[#00F5D4] font-mono px-2.5 py-0.5 rounded-lg bg-[#00F5D4]/10 border border-[#00F5D4]/30">
                  {teamSize} {teamSize === 1 ? 'pessoa' : 'pessoas'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00F5D4]"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                <span>1 autônomo</span>
                <span>25 equipe</span>
                <span>50+ empresa</span>
              </div>
            </div>

            {/* Horas gastas com retrabalho manual */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  3. Horas manuais/planilhas por semana:
                </span>
                <span className="text-sm font-extrabold text-[#FF3CAC] font-mono px-2.5 py-0.5 rounded-lg bg-[#FF3CAC]/10 border border-[#FF3CAC]/30">
                  {hoursPerWeek}h/sem
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF3CAC]"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                <span>5h leves</span>
                <span>40h críticas</span>
                <span>80h caóticas</span>
              </div>
            </div>
          </div>

          {/* 3. Painel de Resultados (High-Contrast Neon Badges) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 mb-6">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center sm:text-left">
              Impacto Projetado para a sua Operação:
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 text-center">
              {/* Horas Recuperadas */}
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="flex items-center justify-center gap-1 text-[#00F5D4] mb-1">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Tempo</span>
                </div>
                <div className="text-lg sm:text-2xl font-black text-white font-mono leading-none">
                  +{savedHoursPerMonth}h
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  livres por mês
                </div>
              </div>

              {/* Economia Anual */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#6C63FF]/15 border border-[#6C63FF]/30">
                <div className="flex items-center justify-center gap-1 text-[#9B59FF] mb-1">
                  <TrendingUp size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Economia</span>
                </div>
                <div className="text-base sm:text-2xl font-black text-[#00F5D4] font-mono leading-none">
                  R$ {(annualSavings / 1000).toFixed(0)}k
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  estimada/ano
                </div>
              </div>

              {/* Payback & MVP */}
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="flex items-center justify-center gap-1 text-[#FF3CAC] mb-1">
                  <Sparkles size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Retorno</span>
                </div>
                <div className="text-lg sm:text-2xl font-black text-white font-mono leading-none">
                  ~{estimatedPaybackMonths}m
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  tempo de retorno
                </div>
              </div>
            </div>
          </div>

          {/* 4. Botão de Conversão Direta no WhatsApp com Dados Preenchidos */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400 text-center sm:text-left">
              <ShieldCheck size={16} className="text-[#00F5D4] shrink-0" />
              <span>Diagnóstico técnico gratuito &middot; Sem compromisso contratual</span>
            </div>

            <button
              onClick={handleSendToWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-extrabold text-sm text-[#04040D] bg-gradient-to-r from-[#00F5D4] to-[#6C63FF] hover:brightness-110 active:scale-[0.97] transition-all duration-200 shadow-[0_0_30px_rgba(0,245,212,0.35)] cursor-pointer"
            >
              <Zap size={16} className="fill-current" />
              Enviar Simulação no WhatsApp
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiSimulator;
