
import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "O IntelekBot transformou completamente o atendimento da minha pizzaria. Agora nossos clientes conseguem fazer pedidos em qualquer horário, sem filas ou espera. As vendas aumentaram em 35% no primeiro mês!",
    author: "Roberto Almeida",
    position: "Proprietário, Pizzaria Bella Napoli",
    image: "/daniel-oliveira.jpg",
    rating: 5
  },
  {
    quote: "Como farmacêutica, estava preocupada se um robô conseguiria lidar com questões delicadas de saúde. O IntelekBot superou todas as expectativas, esclarecendo dúvidas básicas e encaminhando casos mais complexos para nossa equipe. Economizamos tempo e melhoramos o atendimento.",
    author: "Carla Moreira",
    position: "Proprietária, Farmácia Saúde & Bem-estar",
    image: "/camila-santos.jpg",
    rating: 5
  },
  {
    quote: "Nossa clínica odontológica tinha problemas com faltas e cancelamentos de última hora. Com o IntelekBot, reduzimos em 80% esses problemas graças aos lembretes automáticos e confirmações. O investimento se pagou em apenas 2 meses!",
    author: "Dr. Paulo Ribeiro",
    position: "Diretor, Clínica Odontológica Sorriso Perfeito",
    image: "/fernanda-costa.jpg",
    rating: 4
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-intelektus-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-intelektus-100 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-intelektus-100 rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            O que nossos clientes <span className="gradient-text">estão dizendo</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Descubra como o IntelekBot tem ajudado empresas de diversos segmentos a transformar seu atendimento e aumentar seus resultados.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-gradient-to-br from-intelektus-500 to-purple-600 text-white p-8 flex flex-col justify-between">
                <Quote className="h-12 w-12 opacity-50" />
                
                <div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-300' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">{testimonials[currentIndex].author}</p>
                      <p className="text-sm opacity-75">{testimonials[currentIndex].position}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 p-8 flex flex-col justify-between">
                <p className="text-gray-700 text-lg italic leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">
                    {currentIndex + 1} de {testimonials.length} depoimentos
                  </p>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-intelektus-50 hover:text-intelektus-600 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-intelektus-50 hover:text-intelektus-600 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-intelektus-600 mb-2">+500</div>
            <p className="text-gray-600">Empresas atendidas</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-intelektus-600 mb-2">+2 milhões</div>
            <p className="text-gray-600">Interações realizadas</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-intelektus-600 mb-2">98%</div>
            <p className="text-gray-600">Taxa de satisfação</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
