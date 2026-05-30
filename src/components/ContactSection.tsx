
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Phone, Mail, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
        duration: 5000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+%EF%BF%BD+Gostaria+de+saber+mais+sobre+os+servi%C3%A7os+oferecidos+pela+Intelektus.&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <section id="contato" className="py-28 relative" style={{ background: 'var(--bg-surface)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="badge-chip mb-5 inline-flex">
                <MessageSquare size={12} style={{ color: '#6C63FF' }} />
                Fale conosco
              </div>
              <h2
                className="font-heading text-3xl md:text-4xl font-bold mb-5"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
              >
                Vamos construir algo{' '}
                <span className="gradient-text">incrível juntos?</span>
              </h2>
              <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Preencha o formulário e nossa equipe entrará em contato para um diagnóstico gratuito e sem compromisso sobre as necessidades da sua empresa.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.3)' }}
                  >
                    <Phone className="h-4 w-4" style={{ color: '#6C63FF' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Telefone</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>(71) 99908-8651</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.3)' }}
                  >
                    <Mail className="h-4 w-4" style={{ color: '#6C63FF' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Email</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>contato@intelektus.com.br</p>
                  </div>
                </div>


              </div>
              
              <div
                className="mt-10 p-6 rounded-xl border border-[#1E1E2E]"
                style={{ background: 'rgba(108,99,255,0.07)' }}
              >
                <h3 className="font-heading text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Prefere o WhatsApp?</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Fale diretamente com um especialista agora mesmo.
                </p>
                <Button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Conversar no WhatsApp
                </Button>
              </div>
            </div>
            
            <div>
              <div className="card-glass rounded-2xl p-8 border border-[#1E1E2E]">
                <h3 className="font-heading text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Solicite um diagnóstico gratuito</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Nome completo</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Email</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Telefone / WhatsApp</label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="(00) 00000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Nome da empresa</label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Nome da sua empresa"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>O que você precisa?</label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Conte-nos sobre seu negócio e suas necessidades..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="gradient-bg hover:opacity-90 transition-opacity w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-5 w-5" />
                          Enviar mensagem
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
