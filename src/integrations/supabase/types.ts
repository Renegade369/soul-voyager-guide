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
      blog_posts: {
        Row: {
          body: string
          category: string
          created_at: string
          excerpt: string | null
          hero_image_url: string | null
          hook: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          primary_reader: string | null
          published_at: string | null
          reading_time_minutes: number
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          body: string
          category: string
          created_at?: string
          excerpt?: string | null
          hero_image_url?: string | null
          hook?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          primary_reader?: string | null
          published_at?: string | null
          reading_time_minutes?: number
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          excerpt?: string | null
          hero_image_url?: string | null
          hook?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          primary_reader?: string | null
          published_at?: string | null
          reading_time_minutes?: number
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blood_type_results: {
        Row: {
          blood_type: string
          created_at: string
          email: string
          full_name: string
          id: string
          rh_factor: string
          user_id: string
        }
        Insert: {
          blood_type: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          rh_factor: string
          user_id: string
        }
        Update: {
          blood_type?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          rh_factor?: string
          user_id?: string
        }
        Relationships: []
      }
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
      consciousness_data: {
        Row: {
          aura_color: string | null
          awakening_stage: string | null
          created_at: string
          dominant_emotion: string | null
          dominant_energy: string | null
          geographic_region: string | null
          id: string
          life_path_number: number | null
          primary_focus: string | null
          reader_type: string | null
          soul_archetype: string | null
          sun_sign: string | null
        }
        Insert: {
          aura_color?: string | null
          awakening_stage?: string | null
          created_at?: string
          dominant_emotion?: string | null
          dominant_energy?: string | null
          geographic_region?: string | null
          id?: string
          life_path_number?: number | null
          primary_focus?: string | null
          reader_type?: string | null
          soul_archetype?: string | null
          sun_sign?: string | null
        }
        Update: {
          aura_color?: string | null
          awakening_stage?: string | null
          created_at?: string
          dominant_emotion?: string | null
          dominant_energy?: string | null
          geographic_region?: string | null
          id?: string
          life_path_number?: number | null
          primary_focus?: string | null
          reader_type?: string | null
          soul_archetype?: string | null
          sun_sign?: string | null
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
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      energy_reading_sessions: {
        Row: {
          aura_result: Json | null
          created_at: string
          email: string
          fingerprint_result: Json | null
          id: string
          iris_result: Json | null
          mood_answers: Json | null
          soul_profile_result: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          aura_result?: Json | null
          created_at?: string
          email: string
          fingerprint_result?: Json | null
          id?: string
          iris_result?: Json | null
          mood_answers?: Json | null
          soul_profile_result?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          aura_result?: Json | null
          created_at?: string
          email?: string
          fingerprint_result?: Json | null
          id?: string
          iris_result?: Json | null
          mood_answers?: Json | null
          soul_profile_result?: Json | null
          updated_at?: string
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
      journal_email_sends: {
        Row: {
          email: string
          error: string | null
          id: string
          post_id: string | null
          post_slug: string | null
          resend_id: string | null
          sent_at: string
          status: string
          subscriber_id: string | null
        }
        Insert: {
          email: string
          error?: string | null
          id?: string
          post_id?: string | null
          post_slug?: string | null
          resend_id?: string | null
          sent_at?: string
          status?: string
          subscriber_id?: string | null
        }
        Update: {
          email?: string
          error?: string | null
          id?: string
          post_id?: string | null
          post_slug?: string | null
          resend_id?: string | null
          sent_at?: string
          status?: string
          subscriber_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_email_sends_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_email_sends_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
        ]
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
      promo_code_redemptions: {
        Row: {
          code: string
          code_id: string | null
          email: string | null
          id: string
          reader_slug: string
          redeemed_at: string
        }
        Insert: {
          code: string
          code_id?: string | null
          email?: string | null
          id?: string
          reader_slug: string
          redeemed_at?: string
        }
        Update: {
          code?: string
          code_id?: string | null
          email?: string | null
          id?: string
          reader_slug?: string
          redeemed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_code_redemptions_code_id_fkey"
            columns: ["code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          unlocks: string[]
          updated_at: string
          uses_count: number
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          unlocks?: string[]
          updated_at?: string
          uses_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          unlocks?: string[]
          updated_at?: string
          uses_count?: number
        }
        Relationships: []
      }
      saved_meditations: {
        Row: {
          content: string
          created_at: string
          feeling: string
          id: string
          pillar: string
          shift_target: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          feeling: string
          id?: string
          pillar: string
          shift_target: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          feeling?: string
          id?: string
          pillar?: string
          shift_target?: string
          user_id?: string
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
      shared_profiles: {
        Row: {
          created_at: string
          id: string
          profile_data: Json
          view_count: number
        }
        Insert: {
          created_at?: string
          id: string
          profile_data: Json
          view_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          profile_data?: Json
          view_count?: number
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
      soul_quiz_results: {
        Row: {
          created_at: string
          id: string
          scores: Json
          soul_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          scores?: Json
          soul_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          scores?: Json
          soul_type?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_assistant_escalations: {
        Row: {
          ai_attempted_answer: string | null
          confidence_score: number | null
          escalated_at: string
          escalation_reason: string
          id: string
          module_slug: string | null
          question: string
          replied_at: string | null
          resolved_at: string | null
          status: string
          thread_id: string
          user_id: string
          william_reply: string | null
        }
        Insert: {
          ai_attempted_answer?: string | null
          confidence_score?: number | null
          escalated_at?: string
          escalation_reason: string
          id?: string
          module_slug?: string | null
          question: string
          replied_at?: string | null
          resolved_at?: string | null
          status?: string
          thread_id: string
          user_id: string
          william_reply?: string | null
        }
        Update: {
          ai_attempted_answer?: string | null
          confidence_score?: number | null
          escalated_at?: string
          escalation_reason?: string
          id?: string
          module_slug?: string | null
          question?: string
          replied_at?: string | null
          resolved_at?: string | null
          status?: string
          thread_id?: string
          user_id?: string
          william_reply?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sovereign_assistant_escalations_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "sovereign_assistant_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      sovereign_assistant_settings: {
        Row: {
          last_activity_at: string
          tier_at_enrollment: string
          total_messages: number
          user_id: string
          window_end: string
          window_start: string
        }
        Insert: {
          last_activity_at?: string
          tier_at_enrollment: string
          total_messages?: number
          user_id: string
          window_end: string
          window_start: string
        }
        Update: {
          last_activity_at?: string
          tier_at_enrollment?: string
          total_messages?: number
          user_id?: string
          window_end?: string
          window_start?: string
        }
        Relationships: []
      }
      sovereign_assistant_threads: {
        Row: {
          created_at: string
          id: string
          messages: Json
          module_slug: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json
          module_slug?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          module_slug?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_audio_plays: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          last_position_seconds: number
          play_count: number
          transmission_slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_position_seconds?: number
          play_count?: number
          transmission_slug: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_position_seconds?: number
          play_count?: number
          transmission_slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_audio_transmissions: {
        Row: {
          audio_url: string
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          is_published: boolean
          module_slug: string | null
          slug: string
          sort_order: number
          tier_required: string
          title: string
          updated_at: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean
          module_slug?: string | null
          slug: string
          sort_order?: number
          tier_required?: string
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean
          module_slug?: string | null
          slug?: string
          sort_order?: number
          tier_required?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sovereign_community_posts: {
        Row: {
          author_display_name: string
          body: string
          created_at: string
          id: string
          is_hidden: boolean
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          author_display_name: string
          body: string
          created_at?: string
          id?: string
          is_hidden?: boolean
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          author_display_name?: string
          body?: string
          created_at?: string
          id?: string
          is_hidden?: boolean
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_email_sequence: {
        Row: {
          created_at: string
          email_key: string
          enrollment_id: string
          error_message: string | null
          id: string
          scheduled_for: string
          sent_at: string | null
          status: string
          tier: string
        }
        Insert: {
          created_at?: string
          email_key: string
          enrollment_id: string
          error_message?: string | null
          id?: string
          scheduled_for: string
          sent_at?: string | null
          status?: string
          tier: string
        }
        Update: {
          created_at?: string
          email_key?: string
          enrollment_id?: string
          error_message?: string | null
          id?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string
          tier?: string
        }
        Relationships: [
          {
            foreignKeyName: "sovereign_email_sequence_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "sovereign_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      sovereign_enrollments: {
        Row: {
          amount_cents: number | null
          cert_name: string | null
          created_at: string
          currency: string | null
          email: string
          environment: string
          id: string
          meditation_voice: string | null
          status: string
          stripe_customer_id: string | null
          stripe_session_id: string | null
          tier: string
          timezone: string | null
          updated_at: string
          wake_time: string | null
        }
        Insert: {
          amount_cents?: number | null
          cert_name?: string | null
          created_at?: string
          currency?: string | null
          email: string
          environment?: string
          id?: string
          meditation_voice?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          tier: string
          timezone?: string | null
          updated_at?: string
          wake_time?: string | null
        }
        Update: {
          amount_cents?: number | null
          cert_name?: string | null
          created_at?: string
          currency?: string | null
          email?: string
          environment?: string
          id?: string
          meditation_voice?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          tier?: string
          timezone?: string | null
          updated_at?: string
          wake_time?: string | null
        }
        Relationships: []
      }
      sovereign_live_calls: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_published: boolean
          join_url: string | null
          recording_url: string | null
          scheduled_at: string
          slug: string
          tier_required: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_published?: boolean
          join_url?: string | null
          recording_url?: string | null
          scheduled_at: string
          slug: string
          tier_required?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_published?: boolean
          join_url?: string | null
          recording_url?: string | null
          scheduled_at?: string
          slug?: string
          tier_required?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sovereign_milestones: {
        Row: {
          earned_at: string
          id: string
          milestone: string
          module_slug: string | null
          user_id: string
        }
        Insert: {
          earned_at?: string
          id?: string
          milestone: string
          module_slug?: string | null
          user_id: string
        }
        Update: {
          earned_at?: string
          id?: string
          milestone?: string
          module_slug?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sovereign_module_progress: {
        Row: {
          completed_at: string
          created_at: string
          id: string
          lesson_slug: string
          module_slug: string
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_slug: string
          module_slug: string
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          id?: string
          lesson_slug?: string
          module_slug?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_module_responses: {
        Row: {
          created_at: string
          exercise_id: string
          id: string
          module_slug: string
          response_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          exercise_id: string
          id?: string
          module_slug: string
          response_text?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: string
          module_slug?: string
          response_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_module_unlocks: {
        Row: {
          id: string
          module_slug: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          id?: string
          module_slug: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          id?: string
          module_slug?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_onboarding: {
        Row: {
          cert_name: string | null
          completed_at: string | null
          created_at: string
          email: string
          id: string
          intention_one: string | null
          intention_three: string | null
          intention_two: string | null
          meditation_voice: string | null
          sacred_contract_signed_at: string | null
          timezone: string | null
          updated_at: string
          user_id: string
          wake_time: string | null
          why_now: string | null
        }
        Insert: {
          cert_name?: string | null
          completed_at?: string | null
          created_at?: string
          email: string
          id?: string
          intention_one?: string | null
          intention_three?: string | null
          intention_two?: string | null
          meditation_voice?: string | null
          sacred_contract_signed_at?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          wake_time?: string | null
          why_now?: string | null
        }
        Update: {
          cert_name?: string | null
          completed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          intention_one?: string | null
          intention_three?: string | null
          intention_two?: string | null
          meditation_voice?: string | null
          sacred_contract_signed_at?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          wake_time?: string | null
          why_now?: string | null
        }
        Relationships: []
      }
      sovereign_ritual_completions: {
        Row: {
          completed_at: string
          created_at: string
          day_number: number | null
          enrollment_id: string | null
          id: string
          skipped: boolean
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          day_number?: number | null
          enrollment_id?: string | null
          id?: string
          skipped?: boolean
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          day_number?: number | null
          enrollment_id?: string | null
          id?: string
          skipped?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sovereign_ritual_completions_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "sovereign_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      sovereign_rituals: {
        Row: {
          created_at: string
          evening_completed_at: string | null
          evening_reflection: string | null
          id: string
          morning_completed_at: string | null
          reflection: string | null
          ritual_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          evening_completed_at?: string | null
          evening_reflection?: string | null
          id?: string
          morning_completed_at?: string | null
          reflection?: string | null
          ritual_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          evening_completed_at?: string | null
          evening_reflection?: string | null
          id?: string
          morning_completed_at?: string | null
          reflection?: string | null
          ritual_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sovereign_vip_waitlist: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          notes?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          opted_in_consciousness_map: boolean
          source: string | null
          subscribed_at: string
          unsubscribe_token: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          opted_in_consciousness_map?: boolean
          source?: string | null
          subscribed_at?: string
          unsubscribe_token?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          opted_in_consciousness_map?: boolean
          source?: string | null
          subscribed_at?: string
          unsubscribe_token?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
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
      transmission_credits: {
        Row: {
          all_access: boolean
          credits: number
          updated_at: string
          user_id: string
        }
        Insert: {
          all_access?: boolean
          credits?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          all_access?: boolean
          credits?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transmissions: {
        Row: {
          audio_path: string | null
          created_at: string
          emotional_state: string
          id: string
          intention: string
          profile_snapshot: Json | null
          script: string
          seal: string | null
          user_id: string
        }
        Insert: {
          audio_path?: string | null
          created_at?: string
          emotional_state: string
          id?: string
          intention: string
          profile_snapshot?: Json | null
          script: string
          seal?: string | null
          user_id: string
        }
        Update: {
          audio_path?: string | null
          created_at?: string
          emotional_state?: string
          id?: string
          intention?: string
          profile_snapshot?: Json | null
          script?: string
          seal?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trusted_practitioners: {
        Row: {
          bio: string | null
          booking_url: string | null
          created_at: string
          display_order: number
          how_william_knows_them: string | null
          id: string
          is_featured: boolean
          location: string | null
          name: string
          photo: string | null
          slug: string
          specialty: Database["public"]["Enums"]["practitioner_specialty"]
          updated_at: string
          what_they_offer: string | null
        }
        Insert: {
          bio?: string | null
          booking_url?: string | null
          created_at?: string
          display_order?: number
          how_william_knows_them?: string | null
          id?: string
          is_featured?: boolean
          location?: string | null
          name: string
          photo?: string | null
          slug: string
          specialty?: Database["public"]["Enums"]["practitioner_specialty"]
          updated_at?: string
          what_they_offer?: string | null
        }
        Update: {
          bio?: string | null
          booking_url?: string | null
          created_at?: string
          display_order?: number
          how_william_knows_them?: string | null
          id?: string
          is_featured?: boolean
          location?: string | null
          name?: string
          photo?: string | null
          slug?: string
          specialty?: Database["public"]["Enums"]["practitioner_specialty"]
          updated_at?: string
          what_they_offer?: string | null
        }
        Relationships: []
      }
      user_readings: {
        Row: {
          created_at: string
          id: string
          reading_type: string
          result_data: Json
          shared_profile_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reading_type: string
          result_data: Json
          shared_profile_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reading_type?: string
          result_data?: Json
          shared_profile_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_readings_shared_profile_id_fkey"
            columns: ["shared_profile_id"]
            isOneToOne: false
            referencedRelation: "shared_profiles"
            referencedColumns: ["id"]
          },
        ]
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
      wellness_products: {
        Row: {
          buy_url: string | null
          category: Database["public"]["Enums"]["wellness_category"]
          created_at: string
          description: string | null
          display_order: number
          how_to_use: string | null
          id: string
          image: string | null
          is_featured: boolean
          name: string
          slug: string
          updated_at: string
          why_william_uses_it: string | null
        }
        Insert: {
          buy_url?: string | null
          category?: Database["public"]["Enums"]["wellness_category"]
          created_at?: string
          description?: string | null
          display_order?: number
          how_to_use?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          name: string
          slug: string
          updated_at?: string
          why_william_uses_it?: string | null
        }
        Update: {
          buy_url?: string | null
          category?: Database["public"]["Enums"]["wellness_category"]
          created_at?: string
          description?: string | null
          display_order?: number
          how_to_use?: string | null
          id?: string
          image?: string | null
          is_featured?: boolean
          name?: string
          slug?: string
          updated_at?: string
          why_william_uses_it?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_shared_profile_views: {
        Args: { _id: string }
        Returns: undefined
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      redeem_promo_code: {
        Args: { _code: string; _email?: string; _reader: string }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "user"
      practitioner_specialty:
        | "healer"
        | "coach"
        | "bodyworker"
        | "energy_worker"
        | "therapist"
        | "other"
      wellness_category:
        | "supplement"
        | "tool"
        | "book"
        | "candle"
        | "accessory"
        | "other"
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
      practitioner_specialty: [
        "healer",
        "coach",
        "bodyworker",
        "energy_worker",
        "therapist",
        "other",
      ],
      wellness_category: [
        "supplement",
        "tool",
        "book",
        "candle",
        "accessory",
        "other",
      ],
    },
  },
} as const
