
import { Brain, Instagram, Facebook, Linkedin, Twitter, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain size={32} className="text-intelektus-400" />
              <span className="font-heading font-bold text-2xl">Intelektus</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Democratizando o acesso à inteligência artificial, tornando-a acessível, 
              eficiente e ajustada às necessidades reais dos negócios locais.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/intelektus.solucoes" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-intelektus-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-intelektus-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/limahenrique/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-intelektus-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-intelektus-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nossos clientes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Soluções</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">IntelekBot</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">IA para varejo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">IA para serviços</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrações</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de uso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de cookies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LGPD</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Intelektus. Todos os direitos reservados.
          </p>
          
          {/* Admin Login Button */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-white hover:bg-gray-800 p-2"
              title="Login Administrativo"
              onClick={() => window.location.href = '/login'}
            >
              <User size={16} />
            </Button>
            
            <p className="text-gray-500 text-sm">
              Feito com ❤️ em Salvador, Bahia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
