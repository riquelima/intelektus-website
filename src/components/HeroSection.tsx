
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Bot, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 grid-pattern"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 pt-16 pb-24 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-intelektus-200 bg-intelektus-50/50 text-intelektus-700 text-sm font-medium mb-6">
              <Sparkles size={16} className="mr-2" />
              Automatização inteligente para o seu negócio
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6">
              Transforme seu atendimento com <span className="gradient-text">Inteligência Artificial</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Democratizando o acesso à IA para pequenos e médios negócios. 
              Conheça o IntelekBot, seu agente virtual personalizado que vai revolucionar o relacionamento com seus clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="gradient-bg hover:opacity-90 transition-opacity text-white px-6 py-6 text-lg"
                onClick={() => window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank')}
              >
                Quero conhecer o IntelekBot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-intelektus-300 text-intelektus-700 hover:bg-intelektus-50 px-6 py-6 text-lg"
                onClick={() => window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Fale com um especialista
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                    <div className={`w-full h-full bg-intelektus-${100 + item * 100}`}></div>
                  </div>
                ))}
              </div>
              <p className="ml-4 text-sm text-gray-600">Mais de <span className="font-bold">500 empresas</span> atendidas em todo Brasil</p>
            </div>
          </div>
          
          {/* Chat UI Mockup */}
          <div className="relative animate-float">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md mx-auto border border-gray-100">
              <div className="bg-intelektus-600 text-white p-4 flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                <h3 className="font-medium">IntelekBot</h3>
              </div>
              <div className="p-4 bg-gray-50 h-96 overflow-y-auto flex flex-col space-y-4">
                {/* Bot Message */}
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-intelektus-100 flex items-center justify-center text-intelektus-600 flex-shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="ml-2 bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                    <p className="text-gray-700">Olá! Bem-vindo(a) à Pizzaria Bella Napoli. Como posso te ajudar hoje?</p>
                  </div>
                </div>
                
                {/* User Message */}
                <div className="flex items-start justify-end">
                  <div className="mr-2 bg-intelektus-600 p-3 rounded-lg rounded-tr-none shadow-sm max-w-xs">
                    <p className="text-white">Quero fazer um pedido de pizza.</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-intelektus-200 flex items-center justify-center text-intelektus-600 flex-shrink-0">
                    <span className="text-sm font-medium">JC</span>
                  </div>
                </div>
                
                {/* Bot Message */}
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-intelektus-100 flex items-center justify-center text-intelektus-600 flex-shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="ml-2 bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                    <p className="text-gray-700">Ótimo! Você poderia me informar seu nome, por favor? Assim posso personalizar melhor o atendimento.</p>
                  </div>
                </div>
                
                {/* User Message */}
                <div className="flex items-start justify-end">
                  <div className="mr-2 bg-intelektus-600 p-3 rounded-lg rounded-tr-none shadow-sm max-w-xs">
                    <p className="text-white">Meu nome é João Carlos.</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-intelektus-200 flex items-center justify-center text-intelektus-600 flex-shrink-0">
                    <span className="text-sm font-medium">JC</span>
                  </div>
                </div>
                
                {/* Bot Message */}
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-intelektus-100 flex items-center justify-center text-intelektus-600 flex-shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="ml-2 bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                    <p className="text-gray-700">Obrigado, João Carlos! Temos várias opções de pizzas disponíveis hoje. Gostaria de conhecer nossas promoções ou já sabe o que deseja pedir?</p>
                  </div>
                </div>
                
                {/* Typing indicator */}
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-intelektus-100 flex items-center justify-center text-intelektus-600 flex-shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="ml-2 bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex items-center">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-intelektus-500"
                />
                <button className="ml-2 p-2 rounded-full bg-intelektus-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Visual elements behind the chat */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-lg rotate-12 z-[-1] animate-pulse-subtle"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-intelektus-300 rounded-full z-[-1] animate-pulse-subtle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
