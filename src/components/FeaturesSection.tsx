
import { Bot, Users, Clock, TrendingUp, Shield, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Atendimento Personalizado 24/7",
    description: "Atenda seus clientes a qualquer momento, sem pausas ou filas de espera, proporcionando respostas precisas e personalizadas."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Qualificação de Leads",
    description: "Capture e qualifique potenciais clientes automaticamente, encaminhando apenas os leads mais promissores para sua equipe de vendas."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Economia de Tempo",
    description: "Automatize respostas para perguntas frequentes e processos repetitivos, liberando sua equipe para tarefas de maior valor."
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Aumento nas Conversões",
    description: "Resposta instantânea às dúvidas dos clientes, reduzindo o tempo de decisão de compra e aumentando as taxas de conversão."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Segurança e Privacidade",
    description: "Seus dados e de seus clientes são tratados com os mais altos padrões de segurança, em conformidade com a LGPD."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Experiência Humanizada",
    description: "Interações naturais e empáticas que fazem o cliente se sentir valorizado, mesmo quando atendido por uma IA."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Benefícios do <span className="gradient-text">IntelekBot</span> para seu negócio
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed px-4">
            Nossos agentes de IA são projetados para atender às necessidades específicas do seu negócio,
            oferecendo um conjunto completo de recursos para revolucionar seu atendimento ao cliente.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center gradient-bg text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl bg-intelektus-50 border border-intelektus-100 max-w-2xl">
            <p className="text-intelektus-700 font-medium text-lg md:text-xl mb-6">
              "Nosso IntelekBot permitiu que atendêssemos 78% mais clientes com a mesma equipe e aumentou nossas vendas em 42%!"
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-intelektus-200"></div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-900">Maria Silva</p>
                <p className="text-sm text-gray-500">Proprietária, Farmácia Saúde Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
