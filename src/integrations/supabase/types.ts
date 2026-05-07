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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          full_name: string
          id: string
          issued_at: string | null
          score: number
          user_id: string
        }
        Insert: {
          full_name: string
          id?: string
          issued_at?: string | null
          score: number
          user_id: string
        }
        Update: {
          full_name?: string
          id?: string
          issued_at?: string | null
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      challenge_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          day_number: number
          id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          day_number: number
          id?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          day_number?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          city: string | null
          consent_date: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          lead_source: string | null
          marketing_consent: boolean | null
          phone: string | null
          state: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          consent_date?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          lead_source?: string | null
          marketing_consent?: boolean | null
          phone?: string | null
          state?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          consent_date?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          lead_source?: string | null
          marketing_consent?: boolean | null
          phone?: string | null
          state?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          duration_ms: number | null
          event_type: string
          id: string
          occurred_at: string | null
          properties: Json | null
          section: string | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          duration_ms?: number | null
          event_type: string
          id?: string
          occurred_at?: string | null
          properties?: Json | null
          section?: string | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          duration_ms?: number | null
          event_type?: string
          id?: string
          occurred_at?: string | null
          properties?: Json | null
          section?: string | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      nature_healing_bookings: {
        Row: {
          accessibility_notes: string | null
          created_at: string
          email: string
          experience_level: string | null
          group_size: number
          id: string
          intention: string
          modality: string
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time_of_day: string | null
          status: string
          updated_at: string
        }
        Insert: {
          accessibility_notes?: string | null
          created_at?: string
          email: string
          experience_level?: string | null
          group_size?: number
          id?: string
          intention: string
          modality: string
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time_of_day?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          accessibility_notes?: string | null
          created_at?: string
          email?: string
          experience_level?: string | null
          group_size?: number
          id?: string
          intention?: string
          modality?: string
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time_of_day?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          certificate_earned_at: string | null
          challenge_completed_at: string | null
          challenge_started_at: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          certificate_earned_at?: string | null
          challenge_completed_at?: string | null
          challenge_started_at?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          certificate_earned_at?: string | null
          challenge_completed_at?: string | null
          challenge_started_at?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          city: string | null
          country: string | null
          device_type: string | null
          duration_ms: number | null
          ended_at: string | null
          entry_page: string | null
          exit_page: string | null
          id: string
          pages_visited: string[] | null
          started_at: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_ms?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id: string
          pages_visited?: string[] | null
          started_at?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_ms?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          pages_visited?: string[] | null
          started_at?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      soul_discovery_sessions: {
        Row: {
          created_at: string
          email: string | null
          id: string
          messages: Json
          name: string | null
          reflection: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          messages?: Json
          name?: string | null
          reflection?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          messages?: Json
          name?: string | null
          reflection?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      test_results: {
        Row: {
          answers: Json | null
          attempt_number: number | null
          id: string
          passed: boolean
          percentage: number
          score: number
          taken_at: string | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          attempt_number?: number | null
          id?: string
          passed: boolean
          percentage: number
          score: number
          taken_at?: string | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          attempt_number?: number | null
          id?: string
          passed?: boolean
          percentage?: number
          score?: number
          taken_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
