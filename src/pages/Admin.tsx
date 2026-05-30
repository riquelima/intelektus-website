import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, Plus, Edit, Trash2, LogOut, Upload, X, Video, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

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
  video_url?: string; // Alterado de youtube_url
  user_id?: string;
}

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    short_description: "",
    tags: "",
    category: "",
    video_url: "" // Alterado de youtube_url
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        navigate("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkSession();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`*, project_media(file_path, is_cover)`)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const projectsWithMedia = data?.map(p => ({
        ...p,
        cover_image: p.project_media?.find((m: any) => m.is_cover)?.file_path || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
      })) || [];
      setProjects(projectsWithMedia);
    } catch (err: any) {
      toast({ title: "Erro ao carregar projetos", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Erro no logout", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logout realizado", description: "Você foi desconectado com sucesso." });
      navigate("/login");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !user) {
      toast({ title: "Erro de Validação", description: "Usuário não autenticado ou categoria não selecionada.", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      let coverImagePath: string | null = editingProject?.cover_image || null;

      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-thumbnails')
          .upload(fileName, thumbnailFile);

        if (uploadError) throw uploadError;
        coverImagePath = supabase.storage.from('project-thumbnails').getPublicUrl(uploadData.path).data.publicUrl;
      }

      const projectData = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()),
        short_description: formData.short_description || formData.description.substring(0, 150),
        user_id: user.id,
        status: 'active'
      };

      const { data: savedProject, error: projectError } = editingProject
        ? await supabase.from('projects').update(projectData).eq('id', editingProject.id).select().single()
        : await supabase.from('projects').insert(projectData).select().single();

      if (projectError) throw projectError;

      if (coverImagePath && savedProject) {
        if (editingProject) {
          await supabase.from('project_media').delete().match({ project_id: savedProject.id, is_cover: true });
        }
        await supabase.from('project_media').insert({
          project_id: savedProject.id,
          media_type: 'image',
          file_name: thumbnailFile?.name || 'cover',
          file_path: coverImagePath,
          storage_bucket: 'project-thumbnails',
          is_cover: true,
        });
      }

      await loadProjects();
      toast({ title: "Sucesso!", description: `Projeto ${editingProject ? 'atualizado' : 'criado'} com sucesso.` });
      resetForm();
    } catch (error: any) {
      toast({ title: "Erro ao salvar projeto", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      short_description: project.short_description || "",
      tags: project.tags.join(", "),
      category: project.category,
      video_url: project.video_url || "" // Alterado de youtube_url
    });
    setThumbnailPreview(project.cover_image || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza?")) return;
    setLoading(true);
    try {
      await supabase.from('project_media').delete().eq('project_id', id);
      await supabase.from('projects').delete().eq('id', id);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast({ title: "Projeto removido!", description: "O projeto foi deletado com sucesso." });
    } catch (err: any) {
      toast({ title: "Erro ao deletar", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", short_description: "", tags: "", category: "", video_url: "" }); // Alterado de youtube_url
    setEditingProject(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/finalogo.png" alt="Intelektus" className="h-8 w-auto object-contain mr-1 brightness-0 opacity-80" />
            <span className="font-heading font-bold text-lg text-gray-600 border-l pl-3 border-gray-200">Admin</span>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Projetos</h1>
            <p className="text-gray-600">Adicione, edite ou remova projetos do seu portfólio</p>
          </div>
          <Button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-intelektus-600 hover:bg-intelektus-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden bg-white shadow-md rounded-lg">
                <div className="relative">
                  <img src={project.cover_image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="icon" variant="secondary" onClick={() => handleEdit(project)} className="h-8 w-8 rounded-full"><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(project.id)} className="h-8 w-8 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                  <Badge className="bg-intelektus-100 text-intelektus-700">{project.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Editar Projeto" : "Adicionar Novo Projeto"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Projeto</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail do Projeto</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border border-dashed flex items-center justify-center bg-gray-50">
                    {thumbnailPreview ? <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover rounded-lg"/> : <ImageIcon className="h-8 w-8 text-gray-400" />}
                  </div>
                  <Input id="thumbnail" type="file" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}><Upload className="mr-2 h-4 w-4" /> Carregar Imagem</Button>
                  {thumbnailPreview && <Button type="button" variant="ghost" size="sm" onClick={() => { setThumbnailFile(null); setThumbnailPreview(null); if (fileInputRef.current) fileInputRef.current.value = "";}}><X className="mr-2 h-4 w-4" /> Remover</Button>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição Completa</Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short_description">Descrição Resumida</Label>
                <Textarea id="short_description" value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video_url">URL do Vídeo (opcional)</Label>
                <Input id="video_url" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input id="tags" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={value => setFormData({...formData, category: value})}>
                  <SelectTrigger><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
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
              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>Cancelar</Button>
                <Button type="submit" className="bg-intelektus-600 hover:bg-intelektus-700" disabled={loading}>
                  {loading ? "Salvando..." : (editingProject ? "Salvar Alterações" : "Criar Projeto")}
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