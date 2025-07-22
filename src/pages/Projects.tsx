import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Filter, ExternalLink, Play, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import YouTubePlayer from "@/components/YouTubePlayer";

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const filters = ["Todos", "IA", "Automação", "SaaS", "Mobile"];

  const [projects, setProjects] = useState([]);

  // Função para extrair URL do YouTube da descrição
  const extractYouTubeUrl = (text: string) => {
    if (!text) return null;
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = text.match(youtubeRegex);
    return match ? match[0] : null;
  };

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

        if (error) {
          console.error('Erro ao carregar projetos:', error);
          return;
        }

        // Transformar dados para o formato esperado
        const formattedProjects = data?.map(project => {
          console.log('Projeto do Supabase:', project); // Debug
          
          // Buscar URL do YouTube na descrição
          const youtubeUrl = extractYouTubeUrl(project.description) ||
                           extractYouTubeUrl(project.short_description);
          
          console.log('YouTube URL encontrada:', youtubeUrl); // Debug
          
          return {
            id: project.id,
            title: project.title,
            description: project.short_description || project.description,
            fullDescription: project.description,
            category: project.category,
            tags: project.tags || [],
            featured: project.featured,
            // Procurar por links do YouTube na descrição
            youtubeUrl: youtubeUrl,
            image: project.project_media?.find(media => media.is_cover)?.file_path || 
                   "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop"
          };
        }) || [];

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

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setShowVideo(false); // Reset video state
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setShowVideo(false);
  };

  const handlePlayVideo = () => {
    if (selectedProject?.youtubeUrl) {
      setShowVideo(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-intelektus-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 rounded-full text-sm font-medium text-intelektus-600 mb-8 backdrop-blur-sm border border-intelektus-100">
            ✨ Portfólio de Projetos Inovadores
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Projetos que
            <span className="block bg-gradient-to-r from-intelektus-600 to-purple-600 bg-clip-text text-transparent">
              Revolucionam Negócios
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore uma seleção cuidadosa de projetos desenvolvidos com inteligência artificial, automações 
            avançadas e tecnologias de ponta para transformar a experiência do cliente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity">
              <ExternalLink className="mr-2 h-4 w-4" />
              Explorar Projetos
            </Button>
            <Button size="lg" variant="outline" className="border-intelektus-200 text-intelektus-600 hover:bg-intelektus-50">
              Fale com um Especialista
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-intelektus-600 mb-2">15+</div>
              <div className="text-gray-600">Projetos Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-intelektus-600 mb-2">100%</div>
              <div className="text-gray-600">Automação IA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-intelektus-600 mb-2">24/7</div>
              <div className="text-gray-600">Atendimento Inteligente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter size={20} />
              <span className="font-medium">Filtrar por categoria:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "gradient-bg" : ""}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                {/* Project Image */}
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                {/* Project Content */}
                <CardContent className="p-6">
                  {/* Project Title */}
                  <h3 className="font-heading text-xl font-bold text-intelektus-600 mb-4">
                    {project.title}
                  </h3>
                  
                  {/* Project Description */}
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="bg-intelektus-100 text-intelektus-700 hover:bg-intelektus-200 text-xs px-3 py-1 rounded-full border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-intelektus-600 hover:bg-intelektus-700 text-white rounded-lg font-medium"
                      onClick={() => openModal(project)}
                    >
                      Ver Detalhes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-intelektus-600 text-intelektus-600 hover:bg-intelektus-50 rounded-lg px-4"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-intelektus-600">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              {/* Project Media */}
              <div className="relative rounded-lg overflow-hidden">
                {showVideo && selectedProject.youtubeUrl ? (
                  <YouTubePlayer 
                    url={selectedProject.youtubeUrl} 
                    title={selectedProject.title}
                    className="w-full"
                  />
                ) : (
                  <>
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-80 object-cover"
                    />
                    {selectedProject.youtubeUrl && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                        <Play 
                          className="text-white w-16 h-16 cursor-pointer hover:scale-110 transition-transform" 
                          onClick={handlePlayVideo}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              
               {/* Project Description */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição do Projeto</h3>
                 <p className="text-gray-700 leading-relaxed">
                   {selectedProject.fullDescription || selectedProject.description}
                 </p>
               </div>
              
              {/* Technologies Used */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      className="bg-intelektus-100 text-intelektus-700 hover:bg-intelektus-200 px-3 py-1 rounded-full border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Project Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Principais Funcionalidades</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-intelektus-600 rounded-full mr-3"></div>
                    Integração completa com WhatsApp Business API
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-intelektus-600 rounded-full mr-3"></div>
                    Sistema de IA conversacional avançado
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-intelektus-600 rounded-full mr-3"></div>
                    Dashboard administrativo em tempo real
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-intelektus-600 rounded-full mr-3"></div>
                    Analytics e relatórios detalhados
                  </li>
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1 bg-intelektus-600 hover:bg-intelektus-700 text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver Demonstração
                </Button>
                <Button variant="outline" className="flex-1 border-intelektus-600 text-intelektus-600 hover:bg-intelektus-50">
                  Solicitar Orçamento
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Projects;