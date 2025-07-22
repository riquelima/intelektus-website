
import { MessageSquare, Settings, Bot, ArrowRight, Lightbulb, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Análise da sua empresa",
    description: "Entendemos o funcionamento, necessidades e desafios específicos do seu negócio."
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Personalização do IntelekBot",
    description: "Desenvolvemos e treinamos o agente virtual com o conhecimento do seu negócio."
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Implementação e testes",
    description: "Integramos o IntelekBot aos seus canais de atendimento e realizamos testes."
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Treinamento da equipe",
    description: "Capacitamos sua equipe para gerenciar e extrair o máximo do seu agente virtual."
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: "Monitoramento contínuo",
    description: "Acompanhamos o desempenho, identificando oportunidades de melhoria."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-intelektus-50/50 clip-path-diagonal"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-intelektus-200 bg-intelektus-50/50 text-intelektus-700 text-sm font-medium mb-6">
              <Bot size={16} className="mr-2" />
              Processo simplificado
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Como implementamos o <span className="gradient-text">IntelekBot</span> no seu negócio
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Nossa equipe especializada garante uma implementação tranquila e eficiente do IntelekBot, 
              adaptando-o perfeitamente às necessidades da sua empresa em um processo claro e estruturado.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-bg flex items-center justify-center text-white mr-4">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2">{`${index + 1}. ${step.title}`}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Button 
                className="gradient-bg hover:opacity-90 transition-opacity text-white px-6 py-6 text-lg"
                onClick={() => window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank')}
              >
                Quero implementar o IntelekBot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl bg-white shadow-2xl p-8 border border-gray-100 relative z-20">
              <h3 className="font-heading text-2xl font-bold mb-6">Benefícios da implementação</h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium">Redução de até 70% no tempo de resposta</p>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium">Atendimento 24/7, mesmo fora do horário comercial</p>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium">Aumento médio de 40% nas conversões</p>
                </div>
                
                <div className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium">Economia de até 60% nos custos de atendimento</p>
                </div>
                
                <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium">98% de satisfação dos clientes</p>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-8 -left-8 w-full h-full bg-intelektus-100 rounded-2xl z-10 transform -rotate-3"></div>
            <div className="absolute top-4 -left-4 w-full h-full bg-intelektus-200 rounded-2xl z-0 transform -rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
