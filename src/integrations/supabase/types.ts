export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_url: string | null
          description: string | null
          earned_at: string | null
          id: string
          title: string
          type: Database["public"]["Enums"]["achievement_type"]
          user_id: string | null
        }
        Insert: {
          badge_url?: string | null
          description?: string | null
          earned_at?: string | null
          id?: string
          title: string
          type: Database["public"]["Enums"]["achievement_type"]
          user_id?: string | null
        }
        Update: {
          badge_url?: string | null
          description?: string | null
          earned_at?: string | null
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["achievement_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          title: string
          total_points: number
          type: Database["public"]["Enums"]["assignment_type"]
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date: string
          id?: string
          title: string
          total_points: number
          type: Database["public"]["Enums"]["assignment_type"]
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          title?: string
          total_points?: number
          type?: Database["public"]["Enums"]["assignment_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          credits: number | null
          description: string | null
          duration: string
          end_date: string
          enrolled_count: number | null
          id: string
          instructor_id: string | null
          language: string | null
          prerequisites: string[] | null
          rating: number | null
          start_date: string
          status: Database["public"]["Enums"]["course_status"]
          title: string
          type: Database["public"]["Enums"]["course_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credits?: number | null
          description?: string | null
          duration: string
          end_date: string
          enrolled_count?: number | null
          id?: string
          instructor_id?: string | null
          language?: string | null
          prerequisites?: string[] | null
          rating?: number | null
          start_date: string
          status?: Database["public"]["Enums"]["course_status"]
          title: string
          type: Database["public"]["Enums"]["course_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credits?: number | null
          description?: string | null
          duration?: string
          end_date?: string
          enrolled_count?: number | null
          id?: string
          instructor_id?: string | null
          language?: string | null
          prerequisites?: string[] | null
          rating?: number | null
          start_date?: string
          status?: Database["public"]["Enums"]["course_status"]
          title?: string
          type?: Database["public"]["Enums"]["course_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          completed: boolean | null
          course_id: string | null
          created_at: string | null
          id: string
          progress: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          progress?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at: string | null
          endorsements: number | null
          id: string
          level: number | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          endorsements?: number | null
          id?: string
          level?: number | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          endorsements?: number | null
          id?: string
          level?: number | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          assignment_id: string | null
          content: string | null
          feedback: string | null
          grade: number | null
          graded_at: string | null
          id: string
          status: Database["public"]["Enums"]["submission_status"] | null
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          graded_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["submission_status"] | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          graded_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["submission_status"] | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          attendance: number | null
          avatar_url: string | null
          cgpa: number | null
          created_at: string | null
          department: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          semester: number | null
          updated_at: string | null
        }
        Insert: {
          attendance?: number | null
          avatar_url?: string | null
          cgpa?: number | null
          created_at?: string | null
          department?: string | null
          email: string
          id?: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          semester?: number | null
          updated_at?: string | null
        }
        Update: {
          attendance?: number | null
          avatar_url?: string | null
          cgpa?: number | null
          created_at?: string | null
          department?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          semester?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      achievement_type: "academic" | "coding" | "certification"
      assignment_type: "quiz" | "project" | "coding" | "exam"
      course_status: "upcoming" | "ongoing" | "completed"
      course_type: "academic" | "coding"
      skill_category: "programming" | "soft-skills" | "tools"
      submission_status: "pending" | "submitted" | "graded"
      user_role: "student" | "faculty" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      achievement_type: ["academic", "coding", "certification"],
      assignment_type: ["quiz", "project", "coding", "exam"],
      course_status: ["upcoming", "ongoing", "completed"],
      course_type: ["academic", "coding"],
      skill_category: ["programming", "soft-skills", "tools"],
      submission_status: ["pending", "submitted", "graded"],
      user_role: ["student", "faculty", "admin"],
    },
  },
} as const
