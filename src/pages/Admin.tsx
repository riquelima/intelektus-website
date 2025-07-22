import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Brain, Plus, Edit, Trash2, LogOut, Upload, X, Video, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  tags: string[];
  category: string;
  featured?: boolean;
  status?: string;
  cover_image?: string;
  youtube_url?: string;
}

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    short_description: "",
    tags: "",
    category: "",
    youtube_url: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar autenticação
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    loadProjects();
  }, [navigate]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          description,
          short_description,
          category,
          tags,
          featured,
          status,
          project_media(file_path, is_cover)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const projectsWithMedia = data?.map(project => ({
        ...project,
        cover_image: project.project_media?.find((media: any) => media.is_cover)?.file_path || 
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
      })) || [];

      setProjects(projectsWithMedia);
    } catch (error: any) {
      console.error('Erro ao carregar projetos:', error);
      toast({
        title: "Erro ao carregar projetos",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/");
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        short_description: formData.short_description || formData.description.substring(0, 150) + "...",
        tags: formData.tags.split(",").map(tag => tag.trim()),
        category: formData.category,
        status: 'active'
      };

      let result;
      if (editingProject) {
        result = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Adicionar mídia do YouTube se fornecida
      if (formData.youtube_url && result.data) {
        const youtubeId = extractYouTubeId(formData.youtube_url);
        if (youtubeId) {
          const { error: mediaError } = await supabase
            .from('project_media')
            .insert({
              project_id: result.data.id,
              media_type: 'youtube',
              file_name: `youtube_${youtubeId}`,
              file_path: formData.youtube_url,
              storage_bucket: 'external',
              is_cover: false,
              display_order: 1
            });

          if (mediaError) {
            console.error('Erro ao adicionar vídeo:', mediaError);
          }
        }
      }

      await loadProjects();
      
      toast({
        title: editingProject ? "Projeto atualizado!" : "Projeto criado!",
        description: editingProject ? "As alterações foram salvas com sucesso." : "O novo projeto foi adicionado com sucesso.",
      });

      resetForm();
    } catch (error: any) {
      console.error('Erro ao salvar projeto:', error);
      toast({
        title: "Erro ao salvar projeto",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (project: Project) => {
    setEditingProject(project);
    
    // Buscar URL do YouTube se existir
    const { data: mediaData } = await supabase
      .from('project_media')
      .select('file_path')
      .eq('project_id', project.id)
      .eq('media_type', 'youtube')
      .single();

    setFormData({
      title: project.title,
      description: project.description,
      short_description: project.short_description || "",
      tags: project.tags.join(", "),
      category: project.category,
      youtube_url: mediaData?.file_path || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) {
      return;
    }

    try {
      setLoading(true);
      
      // Deletar mídia relacionada primeiro
      const { error: mediaError } = await supabase
        .from('project_media')
        .delete()
        .eq('project_id', id);

      if (mediaError) {
        console.error('Erro ao deletar mídia:', mediaError);
      }

      // Deletar projeto
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Atualizar lista local removendo o projeto deletado
      setProjects(prev => prev.filter(project => project.id !== id));
      
      toast({
        title: "Projeto removido!",
        description: "O projeto foi deletado com sucesso.",
      });
    } catch (error: any) {
      console.error('Erro ao deletar projeto:', error);
      toast({
        title: "Erro ao deletar projeto",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      title: "", 
      description: "", 
      short_description: "", 
      tags: "", 
      category: "",
      youtube_url: ""
    });
    setEditingProject(null);
    setIsModalOpen(false);
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain size={32} className="text-intelektus-600" />
            <span className="font-heading font-bold text-xl text-gray-900">Intelektus Admin</span>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Projetos</h1>
            <p className="text-gray-600">Adicione, edite ou remova projetos do seu portfólio</p>
          </div>
          <Button onClick={openNewProjectModal} className="bg-intelektus-600 hover:bg-intelektus-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-8">Carregando projetos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={project.cover_image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(project)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(project.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {project.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-yellow-500 text-white">
                        Destaque
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge className="bg-intelektus-100 text-intelektus-700">
                    {project.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Project Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Editar Projeto" : "Novo Projeto"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Projeto</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Digite o título do projeto"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Completa</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva o projeto detalhadamente"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_description">Descrição Resumida</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                  placeholder="Versão resumida para cards (opcional)"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube_url">URL do YouTube (opcional)</Label>
                <div className="flex gap-2">
                  <Video className="h-4 w-4 mt-3 text-gray-500" />
                  <Input
                    id="youtube_url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({...formData, youtube_url: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="React, Node.js, IA, WhatsApp"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IA">IA</SelectItem>
                    <SelectItem value="Automação">Automação</SelectItem>
                    <SelectItem value="SaaS">SaaS</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Web">Web</SelectItem>
                    <SelectItem value="Chatbot">Chatbot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-intelektus-600 hover:bg-intelektus-700"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : (editingProject ? "Salvar Alterações" : "Criar Projeto")}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;