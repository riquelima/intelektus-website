
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Brain } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <Brain size={28} className="text-intelektus-600" />
            <span className="font-heading font-bold text-xl md:text-2xl text-gray-900">Intelektus</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/projetos" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors">
              Projetos
            </a>
            <a href="#features" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors">
              Recursos
            </a>
            <a href="#segments" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors">
              Segmentos
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors">
              Como Funciona
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors">
              Depoimentos
            </a>
            <a href="#quem-somos" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors">
              Quem Somos
            </a>
            <Button className="gradient-bg hover:opacity-90 transition-opacity" onClick={() => window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank')}>
              Entre em Contato
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-intelektus-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-3 p-4">
              <a href="/projetos" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors py-2" onClick={() => setIsOpen(false)}>
                Projetos
              </a>
              <a href="#features" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors py-2" onClick={() => setIsOpen(false)}>
                Recursos
              </a>
              <a href="#segments" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors py-2" onClick={() => setIsOpen(false)}>
                Segmentos
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors py-2" onClick={() => setIsOpen(false)}>
                Como Funciona
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors py-2" onClick={() => setIsOpen(false)}>
                Depoimentos
              </a>
              <a href="#quem-somos" className="text-gray-700 hover:text-intelektus-600 font-medium transition-colors py-2" onClick={() => setIsOpen(false)}>
                Quem Somos
              </a>
              <Button className="gradient-bg hover:opacity-90 transition-opacity w-full" onClick={() => window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank')}>
                Entre em Contato
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
