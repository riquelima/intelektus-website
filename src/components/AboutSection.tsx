
import React from "react";
import { Brain, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AboutSection = () => {
  return (
    <section id="quem-somos" className="py-20 bg-gradient-to-br from-intelektus-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Brain size={48} className="text-intelektus-600" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Quem Somos
          </h2>
          
          {/* Unified card with both sections */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-left">
            <div className="prose prose-lg prose-gray max-w-none">
              {/* Quem Somos content */}
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A Intelektus nasceu com um propósito claro: democratizar o acesso à inteligência artificial para pequenos e médios negócios.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Acreditamos que tecnologia não precisa ser complicada, cara ou exclusiva das grandes empresas. Por isso, desenvolvemos soluções acessíveis, inteligentes e sob medida, que ajudam empreendedores a automatizar seu atendimento, aumentar suas vendas e oferecer experiências modernas para seus clientes.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Somos especialistas em criar assistentes virtuais inteligentes, como o IntelekBot, que responde seus clientes automaticamente no WhatsApp, 24 horas por dia, de forma humanizada, educada e eficiente. Além disso, desenvolvemos sistemas personalizados para delivery, clínicas, academias, lojas, pet shops, salões de beleza e muito mais.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Nossa missão é fazer seu negócio crescer com tecnologia, eliminando tarefas manuais, otimizando processos e colocando sua empresa no caminho da transformação digital — de forma simples, prática e sem complicação.
              </p>
              
              <div className="bg-intelektus-50 p-6 rounded-lg text-center mt-8 mb-12">
                <p className="text-xl font-semibold text-intelektus-800 mb-2">
                  Seja bem-vindo à Intelektus.
                </p>
                <p className="text-lg text-intelektus-700">
                  Tecnologia feita para o seu negócio crescer.
                </p>
              </div>

              {/* Separator line */}
              <hr className="border-gray-200 my-12" />

              {/* Quem faz section */}
              <div className="flex items-center justify-center mb-8">
                <User size={40} className="text-intelektus-600 mr-3" />
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
                  Quem faz
                </h3>
              </div>
              
              {/* Profile picture */}
              <div className="flex justify-center mb-8">
                <Avatar className="w-32 h-32">
                  <AvatarImage 
                    src="/henrique-lima.jpg"
                    alt="Henrique Lima"
                  />
                  <AvatarFallback className="text-2xl">HL</AvatarFallback>
                </Avatar>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Prazer, sou Henrique Lima, engenheiro de software e fundador da Intelektus. Minha trajetória sempre foi movida pela curiosidade, pela vontade de entender como as coisas funcionam e, principalmente, de como torná-las melhores.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Atuo há mais de 7 anos na área de tecnologia, qualidade de software e automação de processos, passando por grandes empresas de tecnologia como Netcracker, Uber, Facebook, e Cognizant. Minha especialidade é transformar processos complexos em soluções simples, inteligentes e eficientes.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Comecei minha carreira no suporte ao cliente, onde aprendi, na prática, a importância de ouvir, entender e resolver problemas de forma rápida e eficaz. Com o tempo, mergulhei no universo da qualidade de software (QA), onde atuei diretamente na análise de bugs, testes de sistemas, automação e validação de processos críticos em ambientes de telecom e tecnologia.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Foi nesse caminho que percebi uma grande necessidade no mercado: muitos pequenos e médios negócios ainda não têm acesso às soluções tecnológicas que poderiam transformar sua operação e seu atendimento. E foi assim que nasceu a Intelektus — uma empresa que carrega meu DNA de inquietação, inovação e proximidade.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Aqui, eu uno toda minha bagagem em análise de sistemas, desenvolvimento, automação e atendimento para criar chatbots inteligentes, sistemas personalizados e soluções que fazem a tecnologia trabalhar a favor do seu negócio.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Se você é empreendedor e busca uma forma de otimizar seu atendimento, automatizar processos ou até mesmo tirar uma ideia do papel, conte comigo. Meu compromisso é entregar uma solução que seja acessível, eficiente, com cara e jeito do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
