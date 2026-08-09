export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      alertas: {
        Row: {
          certificado_id: string
          enviada_a: string | null
          estado: Database["public"]["Enums"]["estado_alerta"]
          fecha_generada: string
          id: string
          tenant_id: string
          tipo: Database["public"]["Enums"]["tipo_alerta"]
          umbral_dias: number
        }
        Insert: {
          certificado_id: string
          enviada_a?: string | null
          estado?: Database["public"]["Enums"]["estado_alerta"]
          fecha_generada?: string
          id?: string
          tenant_id: string
          tipo: Database["public"]["Enums"]["tipo_alerta"]
          umbral_dias: number
        }
        Update: {
          certificado_id?: string
          enviada_a?: string | null
          estado?: Database["public"]["Enums"]["estado_alerta"]
          fecha_generada?: string
          id?: string
          tenant_id?: string
          tipo?: Database["public"]["Enums"]["tipo_alerta"]
          umbral_dias?: number
        }
        Relationships: [
          {
            foreignKeyName: "alertas_certificado_id_fkey"
            columns: ["certificado_id"]
            isOneToOne: false
            referencedRelation: "certificados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alertas_certificado_id_fkey"
            columns: ["certificado_id"]
            isOneToOne: false
            referencedRelation: "certificados_con_dias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alertas_enviada_a_fkey"
            columns: ["enviada_a"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alertas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      certificado_hitos: {
        Row: {
          certificado_id: string
          hito_avance_id: string
        }
        Insert: {
          certificado_id: string
          hito_avance_id: string
        }
        Update: {
          certificado_id?: string
          hito_avance_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificado_hitos_certificado_id_fkey"
            columns: ["certificado_id"]
            isOneToOne: false
            referencedRelation: "certificados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificado_hitos_certificado_id_fkey"
            columns: ["certificado_id"]
            isOneToOne: false
            referencedRelation: "certificados_con_dias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificado_hitos_hito_avance_id_fkey"
            columns: ["hito_avance_id"]
            isOneToOne: false
            referencedRelation: "hitos_avance"
            referencedColumns: ["id"]
          },
        ]
      }
      certificados: {
        Row: {
          comitente_id: string
          created_at: string
          estado: Database["public"]["Enums"]["estado_certificado"]
          fecha_presentacion: string
          fecha_ultimo_cambio_estado: string
          id: string
          moneda: Database["public"]["Enums"]["moneda"]
          monto: number
          numero_certificado: string | null
          numero_expediente: string | null
          obra_id: string
          tenant_id: string
        }
        Insert: {
          comitente_id: string
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_certificado"]
          fecha_presentacion?: string
          fecha_ultimo_cambio_estado?: string
          id?: string
          moneda: Database["public"]["Enums"]["moneda"]
          monto: number
          numero_certificado?: string | null
          numero_expediente?: string | null
          obra_id: string
          tenant_id: string
        }
        Update: {
          comitente_id?: string
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_certificado"]
          fecha_presentacion?: string
          fecha_ultimo_cambio_estado?: string
          id?: string
          moneda?: Database["public"]["Enums"]["moneda"]
          monto?: number
          numero_certificado?: string | null
          numero_expediente?: string | null
          obra_id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificados_comitente_id_fkey"
            columns: ["comitente_id"]
            isOneToOne: false
            referencedRelation: "comitentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificados_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificados_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      comitentes: {
        Row: {
          created_at: string
          id: string
          nombre: string
          organismo: string | null
          tenant_id: string
          tipo: Database["public"]["Enums"]["tipo_comitente"]
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
          organismo?: string | null
          tenant_id: string
          tipo: Database["public"]["Enums"]["tipo_comitente"]
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
          organismo?: string | null
          tenant_id?: string
          tipo?: Database["public"]["Enums"]["tipo_comitente"]
        }
        Relationships: [
          {
            foreignKeyName: "comitentes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      hitos_avance: {
        Row: {
          canal: Database["public"]["Enums"]["canal_carga"]
          cargado_por: string | null
          created_at: string
          descripcion: string | null
          fecha: string
          fotos: string[]
          id: string
          nota_voz_url: string | null
          obra_id: string
          porcentaje_avance: number | null
          tenant_id: string
          tipo_hito: string
          transcripcion: string | null
        }
        Insert: {
          canal?: Database["public"]["Enums"]["canal_carga"]
          cargado_por?: string | null
          created_at?: string
          descripcion?: string | null
          fecha?: string
          fotos?: string[]
          id?: string
          nota_voz_url?: string | null
          obra_id: string
          porcentaje_avance?: number | null
          tenant_id: string
          tipo_hito: string
          transcripcion?: string | null
        }
        Update: {
          canal?: Database["public"]["Enums"]["canal_carga"]
          cargado_por?: string | null
          created_at?: string
          descripcion?: string | null
          fecha?: string
          fotos?: string[]
          id?: string
          nota_voz_url?: string | null
          obra_id?: string
          porcentaje_avance?: number | null
          tenant_id?: string
          tipo_hito?: string
          transcripcion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hitos_avance_cargado_por_fkey"
            columns: ["cargado_por"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hitos_avance_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hitos_avance_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      obras: {
        Row: {
          comitente_id: string
          created_at: string
          estado: Database["public"]["Enums"]["estado_obra"]
          fecha_estimada_fin: string | null
          fecha_inicio: string | null
          fiscalizador_interno: boolean
          fiscalizador_nombre: string | null
          hitos_configurados: string[]
          id: string
          moneda: Database["public"]["Enums"]["moneda"]
          nombre: string
          presupuesto_total: number
          tenant_id: string
          ubicacion: string | null
        }
        Insert: {
          comitente_id: string
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_obra"]
          fecha_estimada_fin?: string | null
          fecha_inicio?: string | null
          fiscalizador_interno?: boolean
          fiscalizador_nombre?: string | null
          hitos_configurados?: string[]
          id?: string
          moneda: Database["public"]["Enums"]["moneda"]
          nombre: string
          presupuesto_total?: number
          tenant_id: string
          ubicacion?: string | null
        }
        Update: {
          comitente_id?: string
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_obra"]
          fecha_estimada_fin?: string | null
          fecha_inicio?: string | null
          fiscalizador_interno?: boolean
          fiscalizador_nombre?: string | null
          hitos_configurados?: string[]
          id?: string
          moneda?: Database["public"]["Enums"]["moneda"]
          nombre?: string
          presupuesto_total?: number
          tenant_id?: string
          ubicacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "obras_comitente_id_fkey"
            columns: ["comitente_id"]
            isOneToOne: false
            referencedRelation: "comitentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "obras_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          moneda_base: Database["public"]["Enums"]["moneda"]
          nombre: string
          pais: string
          plan: string
        }
        Insert: {
          created_at?: string
          id?: string
          moneda_base?: Database["public"]["Enums"]["moneda"]
          nombre: string
          pais?: string
          plan?: string
        }
        Update: {
          created_at?: string
          id?: string
          moneda_base?: Database["public"]["Enums"]["moneda"]
          nombre?: string
          pais?: string
          plan?: string
        }
        Relationships: []
      }
      usuario_obras: {
        Row: {
          obra_id: string
          usuario_id: string
        }
        Insert: {
          obra_id: string
          usuario_id: string
        }
        Update: {
          obra_id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_obras_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuario_obras_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string | null
          id: string
          nombre: string
          rol: Database["public"]["Enums"]["rol"]
          telefono_whatsapp: string | null
          tenant_id: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nombre: string
          rol: Database["public"]["Enums"]["rol"]
          telefono_whatsapp?: string | null
          tenant_id: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nombre?: string
          rol?: Database["public"]["Enums"]["rol"]
          telefono_whatsapp?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      certificados_con_dias: {
        Row: {
          comitente_id: string | null
          created_at: string | null
          dias_en_estado_actual: number | null
          estado: Database["public"]["Enums"]["estado_certificado"] | null
          fecha_presentacion: string | null
          fecha_ultimo_cambio_estado: string | null
          id: string | null
          moneda: Database["public"]["Enums"]["moneda"] | null
          monto: number | null
          numero_certificado: string | null
          numero_expediente: string | null
          obra_id: string | null
          tenant_id: string | null
        }
        Insert: {
          comitente_id?: string | null
          created_at?: string | null
          dias_en_estado_actual?: never
          estado?: Database["public"]["Enums"]["estado_certificado"] | null
          fecha_presentacion?: string | null
          fecha_ultimo_cambio_estado?: string | null
          id?: string | null
          moneda?: Database["public"]["Enums"]["moneda"] | null
          monto?: number | null
          numero_certificado?: string | null
          numero_expediente?: string | null
          obra_id?: string | null
          tenant_id?: string | null
        }
        Update: {
          comitente_id?: string | null
          created_at?: string | null
          dias_en_estado_actual?: never
          estado?: Database["public"]["Enums"]["estado_certificado"] | null
          fecha_presentacion?: string | null
          fecha_ultimo_cambio_estado?: string | null
          id?: string | null
          moneda?: Database["public"]["Enums"]["moneda"] | null
          monto?: number | null
          numero_certificado?: string | null
          numero_expediente?: string | null
          obra_id?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificados_comitente_id_fkey"
            columns: ["comitente_id"]
            isOneToOne: false
            referencedRelation: "comitentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificados_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificados_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      current_tenant_id: { Args: never; Returns: string }
    }
    Enums: {
      canal_carga: "whatsapp" | "panel"
      estado_alerta: "activa" | "resuelta"
      estado_certificado:
        | "presentado"
        | "en_fiscalizacion"
        | "certificado_reconocimiento_emitido"
        | "aprobado"
        | "pagado"
      estado_obra: "activa" | "pausada" | "finalizada"
      moneda: "PYG" | "USD"
      rol: "dueño" | "arquitecto" | "admin"
      tipo_alerta: "certificado_estancado" | "vencimiento_proximo"
      tipo_comitente: "publico" | "privado"
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
    Enums: {
      canal_carga: ["whatsapp", "panel"],
      estado_alerta: ["activa", "resuelta"],
      estado_certificado: [
        "presentado",
        "en_fiscalizacion",
        "certificado_reconocimiento_emitido",
        "aprobado",
        "pagado",
      ],
      estado_obra: ["activa", "pausada", "finalizada"],
      moneda: ["PYG", "USD"],
      rol: ["dueño", "arquitecto", "admin"],
      tipo_alerta: ["certificado_estancado", "vencimiento_proximo"],
      tipo_comitente: ["publico", "privado"],
    },
  },
} as const
