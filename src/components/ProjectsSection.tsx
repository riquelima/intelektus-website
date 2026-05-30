
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Filter, ExternalLink, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            project_media(file_path, is_cover)
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedProjects = data?.map(project => ({
          ...project,
          image: project.project_media?.find((media: any) => media.is_cover)?.file_path || 
                 "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop"
        })) || [];

        setProjects(formattedProjects);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedFilter === "Todos" 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handlePlayVideo = (videoUrl: string) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const filters = ["Todos", "Sistemas", "Automação", "IA", "SaaS", "Mobile"];

  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const tagColors = [
    "bg-blue-500 text-white",
    "bg-green-500 text-white",
    "bg-yellow-500 text-white",
    "bg-red-500 text-white",
    "bg-purple-500 text-white",
    "bg-pink-500 text-white",
  ];

  return (
    <div style={{ background: 'var(--bg-surface)' }}>
      <section id="projects-hero" className="pt-24 pb-16 relative">
        <div
          className="absolute inset-0 dot-grid opacity-20 pointer-events-none"
        />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="badge-chip mb-6 mx-auto inline-flex">
            ✦ Portfólio de Sistemas
          </div>
          <h1
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
          >
            Sistemas que
            <span className="block gradient-text pb-3">
              Transformam Empresas
            </span>
          </h1>
          <p
            className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Veja projetos reais que desenvolvemos — sistemas web, automações, plataformas SaaS e soluções com IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow text-white font-semibold px-6 py-3 rounded-xl text-base inline-flex items-center gap-2 justify-center"
            >
              <ExternalLink className="h-4 w-4" />
              Solicitar Orçamento
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=557199088651&text=Ol%C3%A1%21+Quero+falar+com+um+especialista.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl text-base font-semibold border inline-flex items-center gap-2 justify-center transition-all duration-200"
              style={{ borderColor: '#1E1E2E', color: 'var(--text-secondary)', background: 'transparent' }}
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-16" style={{ background: 'var(--bg-surface)' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <Filter size={18} />
              <span className="text-sm font-medium">Filtrar:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={selectedFilter === filter
                    ? { background: 'rgba(108,99,255,0.2)', borderColor: 'rgba(108,99,255,0.5)', color: '#A899FF' }
                    : { background: 'transparent', borderColor: '#1E1E2E', color: 'var(--text-muted)' }
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true, // Adiciona loop para rolagem infinita
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {filteredProjects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-2">
                  <div className="p-1">
                    <Card className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                      <div className="relative">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-64 object-cover"
                        />
                        {project.video_url && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                              <Play 
                                className="text-white w-16 h-16 cursor-pointer hover:scale-110 transition-transform" 
                                onClick={() => handlePlayVideo(project.video_url)}
                              />
                            </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-bold text-intelektus-600 mb-4">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed max-h-24 overflow-y-auto pr-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag: string, index: number) => {
                            const colorClass = tagColors[index % tagColors.length];
                            return <Badge key={tag} colorClass={colorClass}>{tag}</Badge>;
                          })}
                        </div>
                        <div className="flex gap-3">
                          <Button className="flex-1" onClick={() => openModal(project)}>Ver Detalhes</Button>
                          {project.video_url && (
                            <Button variant="outline" asChild>
                              <a href={project.video_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" /> Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-intelektus-600">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              <div className="relative rounded-lg overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-80 object-cover" />
                {selectedProject.video_url && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                    <Play className="text-white w-20 h-20 cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePlayVideo(selectedProject.video_url)} />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição do Projeto</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProject.fullDescription || selectedProject.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                {selectedProject.video_url && (
                  <Button className="flex-1" asChild>
                    <a href={selectedProject.video_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> Ver Demonstração
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="flex-1">Solicitar Orçamento</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsSection;
