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
      recipes: {
        Row: {
          description: string | null
          displayOrder: number
          id: string
          oss: boolean
          owner: string
          recipe: string | null
          title: string | null
          urlType: Database["public"]["Enums"]["url_type"]
        }
        Insert: {
          description?: string | null
          displayOrder?: number
          id?: string
          oss?: boolean
          owner: string
          recipe?: string | null
          title?: string | null
          urlType?: Database["public"]["Enums"]["url_type"]
        }
        Update: {
          description?: string | null
          displayOrder?: number
          id?: string
          oss?: boolean
          owner?: string
          recipe?: string | null
          title?: string | null
          urlType?: Database["public"]["Enums"]["url_type"]
        }
        Relationships: [
          {
            foreignKeyName: "recipes_id_urls_id_fk"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "urls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_recipe_recipes_id_fk"
            columns: ["recipe"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_urlType_id_urls_type_id_fk"
            columns: ["urlType", "id"]
            isOneToOne: false
            referencedRelation: "urls"
            referencedColumns: ["type", "id"]
          },
        ]
      }
      snippets: {
        Row: {
          code: string | null
          codemod: string
          dependsOn: string[] | null
          description: string | null
          displayOrder: number
          frameworks: Database["public"]["Enums"]["snippet_framework"][] | null
          glob: string | null
          id: string
          lang: Database["public"]["Enums"]["snippet_lang"]
          langs: Database["public"]["Enums"]["snippet_lang"][] | null
          oss: boolean
          owner: string
          recipe: string | null
          title: string | null
          urlType: Database["public"]["Enums"]["url_type"]
        }
        Insert: {
          code?: string | null
          codemod: string
          dependsOn?: string[] | null
          description?: string | null
          displayOrder?: number
          frameworks?: Database["public"]["Enums"]["snippet_framework"][] | null
          glob?: string | null
          id?: string
          lang: Database["public"]["Enums"]["snippet_lang"]
          langs?: Database["public"]["Enums"]["snippet_lang"][] | null
          oss?: boolean
          owner: string
          recipe?: string | null
          title?: string | null
          urlType?: Database["public"]["Enums"]["url_type"]
        }
        Update: {
          code?: string | null
          codemod?: string
          dependsOn?: string[] | null
          description?: string | null
          displayOrder?: number
          frameworks?: Database["public"]["Enums"]["snippet_framework"][] | null
          glob?: string | null
          id?: string
          lang?: Database["public"]["Enums"]["snippet_lang"]
          langs?: Database["public"]["Enums"]["snippet_lang"][] | null
          oss?: boolean
          owner?: string
          recipe?: string | null
          title?: string | null
          urlType?: Database["public"]["Enums"]["url_type"]
        }
        Relationships: [
          {
            foreignKeyName: "snippets_id_urls_id_fk"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "urls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snippets_recipe_recipes_id_fk"
            columns: ["recipe"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snippets_urlType_id_urls_type_id_fk"
            columns: ["urlType", "id"]
            isOneToOne: false
            referencedRelation: "urls"
            referencedColumns: ["type", "id"]
          },
        ]
      }
      urls: {
        Row: {
          id: string
          type: Database["public"]["Enums"]["url_type"]
        }
        Insert: {
          id?: string
          type: Database["public"]["Enums"]["url_type"]
        }
        Update: {
          id?: string
          type?: Database["public"]["Enums"]["url_type"]
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
      snippet_framework: "next-js" | "react" | "shiki" | "cypress-io"
      snippet_lang:
        | "TypeScript"
        | "Tsx"
        | "Python"
        | "Rust"
        | "Java"
        | "JavaScript"
        | "Bash"
        | "C"
        | "Cpp"
        | "CSharp"
        | "Css"
        | "Dart"
        | "Elixir"
        | "Go"
        | "Haskell"
        | "Html"
        | "Json"
        | "Kotlin"
        | "Lua"
        | "Php"
        | "Ruby"
        | "Scala"
        | "Sql"
        | "Swift"
        | "Yaml"
      url_type: "snippet" | "recipe"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
