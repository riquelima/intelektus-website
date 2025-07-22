export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      ai_chunks: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          session_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          session_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          session_id?: string | null
        }
        Relationships: []
      }
      project_categories: {
        Row: {
          color_hex: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      project_details: {
        Row: {
          budget_range: string | null
          challenges_solved: string[] | null
          client_name: string | null
          created_at: string | null
          demo_url: string | null
          features: string[] | null
          full_description: string | null
          id: string
          project_duration: string | null
          project_id: string | null
          repository_url: string | null
          results_achieved: string[] | null
          technologies_used: string[] | null
          updated_at: string | null
        }
        Insert: {
          budget_range?: string | null
          challenges_solved?: string[] | null
          client_name?: string | null
          created_at?: string | null
          demo_url?: string | null
          features?: string[] | null
          full_description?: string | null
          id?: string
          project_duration?: string | null
          project_id?: string | null
          repository_url?: string | null
          results_achieved?: string[] | null
          technologies_used?: string[] | null
          updated_at?: string | null
        }
        Update: {
          budget_range?: string | null
          challenges_solved?: string[] | null
          client_name?: string | null
          created_at?: string | null
          demo_url?: string | null
          features?: string[] | null
          full_description?: string | null
          id?: string
          project_duration?: string | null
          project_id?: string | null
          repository_url?: string | null
          results_achieved?: string[] | null
          technologies_used?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          display_order: number | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_cover: boolean | null
          is_thumbnail: boolean | null
          media_type: string
          mime_type: string | null
          project_id: string | null
          storage_bucket: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          display_order?: number | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_cover?: boolean | null
          is_thumbnail?: boolean | null
          media_type: string
          mime_type?: string | null
          project_id?: string | null
          storage_bucket: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          display_order?: number | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_cover?: boolean | null
          is_thumbnail?: boolean | null
          media_type?: string
          mime_type?: string | null
          project_id?: string | null
          storage_bucket?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_testimonials: {
        Row: {
          client_company: string | null
          client_name: string
          client_photo_url: string | null
          client_position: string | null
          created_at: string | null
          id: string
          is_featured: boolean | null
          project_id: string | null
          rating: number | null
          testimonial_text: string
        }
        Insert: {
          client_company?: string | null
          client_name: string
          client_photo_url?: string | null
          client_position?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          project_id?: string | null
          rating?: number | null
          testimonial_text: string
        }
        Update: {
          client_company?: string | null
          client_name?: string
          client_photo_url?: string | null
          client_position?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          project_id?: string | null
          rating?: number | null
          testimonial_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string
          featured: boolean | null
          id: string
          short_description: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          youtube_url: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description: string
          featured?: boolean | null
          id?: string
          short_description?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          featured?: boolean | null
          id?: string
          short_description?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_project_details: {
        Args: { project_uuid: string }
        Returns: {
          id: string
          title: string
          description: string
          short_description: string
          category: string
          tags: string[]
          featured: boolean
          full_description: string
          features: string[]
          technologies_used: string[]
          demo_url: string
          repository_url: string
          client_name: string
          project_duration: string
          budget_range: string
          challenges_solved: string[]
          results_achieved: string[]
          media: Json
          testimonials: Json
          created_at: string
          updated_at: string
        }[]
      }
      search_projects: {
        Args: {
          search_term?: string
          category_filter?: string
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          id: string
          title: string
          description: string
          short_description: string
          category: string
          tags: string[]
          featured: boolean
          cover_image: string
          total_media: number
          created_at: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
