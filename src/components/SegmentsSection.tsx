
import React, { useState } from "react";
import { Pizza, Pill, ShoppingCart, Stethoscope, Dog, Utensils, Scissors, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const segments = [
  {
    icon: <Pizza className="h-8 w-8" />,
    title: "Pizzarias",
    description: "Automatize pedidos, cadastre clientes e gerencie entregas de forma inteligente."
  },
  {
    icon: <Pill className="h-8 w-8" />,
    title: "Farmácias",
    description: "Responda dúvidas sobre medicamentos, oriente clientes e gerencie entregas."
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "Supermercados",
    description: "Atenda pedidos online, gerencie estoque e fidelize clientes com promoções personalizadas."
  },
  {
    icon: <Stethoscope className="h-8 w-8" />,
    title: "Clínicas Médicas",
    description: "Agende consultas, envie lembretes e forneça informações sobre procedimentos."
  },
  {
    icon: <Dog className="h-8 w-8" />,
    title: "Pet Shops",
    description: "Gerencie agendamentos de banho e tosa, venda produtos e envie dicas de cuidados."
  },
  {
    icon: <Utensils className="h-8 w-8" />,
    title: "Restaurantes",
    description: "Receba pedidos, gerencie reservas e proporcione experiência personalizada aos clientes."
  },
  {
    icon: <Scissors className="h-8 w-8" />,
    title: "Salões de Beleza",
    description: "Organize agendamentos, envie lembretes e promova seus serviços de forma eficiente."
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: "Lojas de Varejo",
    description: "Atenda clientes sobre produtos, estoques, prazos de entrega e políticas de troca."
  }
];

const SegmentsSection = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (activeSegment === index) {
      setActiveSegment(null);
    } else {
      setActiveSegment(index);
    }
  };

  const closeModal = () => {
    setActiveSegment(null);
  };

  return (
    <section id="segments" className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 z-0 grid-pattern opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Inteligência artificial para <span className="gradient-text">todos os segmentos</span>
          </h2>
          <p className="text-gray-600 text-lg">
            O IntelekBot é adaptado para as necessidades específicas de cada tipo de negócio,
            garantindo o melhor atendimento para seus clientes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((segment, index) => (
            <Card 
              key={index} 
              className="bg-white p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="h-14 w-14 rounded-lg flex items-center justify-center bg-intelektus-100 text-intelektus-600 mb-4 group-hover:bg-intelektus-600 group-hover:text-white transition-colors duration-300">
                {segment.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">{segment.title}</h3>
              <p className="text-gray-600">{segment.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-intelektus-100 rounded-full translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          <div className="relative z-10">
            <h3 className="font-heading text-2xl font-bold mb-4">Não achou seu segmento?</h3>
            <p className="text-gray-600 mb-6">
              O IntelekBot pode ser adaptado para qualquer tipo de negócio que necessite de atendimento ao cliente.
              Entre em contato conosco para conversarmos sobre as necessidades específicas da sua empresa.
            </p>
            <button 
              className="gradient-bg text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              onClick={() => window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank')}
            >
              Solicite uma demonstração personalizada
            </button>
          </div>
        </div>
      </div>

      {/* Modal com animação expandida */}
      {activeSegment !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-300 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="h-24 w-24 rounded-xl flex items-center justify-center bg-intelektus-100 text-intelektus-600 transform transition-all duration-300 animate-pulse-subtle">
                {segments[activeSegment].icon && React.cloneElement(segments[activeSegment].icon as React.ReactElement, { 
                  className: "h-14 w-14" 
                })}
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold gradient-text mb-2">
                  {segments[activeSegment].title}
                </h2>
                <p className="text-gray-700 text-lg">
                  {segments[activeSegment].description}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-heading text-xl font-bold mb-4">Como o IntelekBot ajuda:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-intelektus-100 text-intelektus-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p>Atendimento automatizado 24/7 com interação natural</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-intelektus-100 text-intelektus-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p>Integração com seus sistemas existentes</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-intelektus-100 text-intelektus-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p>Personalização conforme o perfil e necessidades do seu negócio</p>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button 
                className="gradient-bg text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank')}
              >
                Solicitar demonstração
              </button>
              <button 
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-opacity"
                onClick={closeModal}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SegmentsSection;
