import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          team_id: string | null;
          username: string;
          full_name: string;
          role: 'it' | 'event_coordinator' | 'designer' | 'sales' | 'logistics' | 'admin';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          team_id?: string | null;
          username: string;
          full_name: string;
          role: 'it' | 'event_coordinator' | 'designer' | 'sales' | 'logistics' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          team_id?: string | null;
          username?: string;
          full_name?: string;
          role?: 'it' | 'event_coordinator' | 'designer' | 'sales' | 'logistics' | 'admin';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          team_id: string | null;
          name: string;
          description: string | null;
          start_date: string;
          end_date: string;
          location: string | null;
          status: 'planning' | 'active' | 'completed' | 'cancelled';
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          team_id?: string | null;
          name: string;
          description?: string | null;
          start_date: string;
          end_date: string;
          location?: string | null;
          status?: 'planning' | 'active' | 'completed' | 'cancelled';
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          team_id?: string | null;
          name?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string;
          location?: string | null;
          status?: 'planning' | 'active' | 'completed' | 'cancelled';
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_requests: {
        Row: {
          id: string;
          team_id: string | null;
          requested_by: string;
          name: string;
          description: string | null;
          start_date: string;
          end_date: string;
          location: string | null;
          justification: string | null;
          status: 'pending' | 'approved' | 'rejected';
          reviewed_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          team_id?: string | null;
          requested_by: string;
          name: string;
          description?: string | null;
          start_date: string;
          end_date: string;
          location?: string | null;
          justification?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          reviewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          team_id?: string | null;
          requested_by?: string;
          name?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string;
          location?: string | null;
          justification?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          reviewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          event_id: string | null;
          team_id: string | null;
          title: string;
          description: string | null;
          assigned_to: string | null;
          created_by: string | null;
          status: 'pending' | 'in_progress' | 'completed';
          priority: 'low' | 'medium' | 'high';
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id?: string | null;
          team_id?: string | null;
          title: string;
          description?: string | null;
          assigned_to?: string | null;
          created_by?: string | null;
          status?: 'pending' | 'in_progress' | 'completed';
          priority?: 'low' | 'medium' | 'high';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string | null;
          team_id?: string | null;
          title?: string;
          description?: string | null;
          assigned_to?: string | null;
          created_by?: string | null;
          status?: 'pending' | 'in_progress' | 'completed';
          priority?: 'low' | 'medium' | 'high';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_budgets: {
        Row: {
          id: string;
          event_id: string | null;
          category: string;
          allocated_amount: number;
          spent_amount: number;
          notes: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id?: string | null;
          category: string;
          allocated_amount?: number;
          spent_amount?: number;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string | null;
          category?: string;
          allocated_amount?: number;
          spent_amount?: number;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sponsorships: {
        Row: {
          id: string;
          event_id: string | null;
          team_id: string | null;
          company_name: string;
          contact_name: string | null;
          contact_email: string | null;
          package_type: 'platinum' | 'gold' | 'silver' | 'bronze';
          stage: 'prospecting' | 'in_progress' | 'confirmed' | 'fulfilled';
          amount: number | null;
          notes: string | null;
          managed_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id?: string | null;
          team_id?: string | null;
          company_name: string;
          contact_name?: string | null;
          contact_email?: string | null;
          package_type: 'platinum' | 'gold' | 'silver' | 'bronze';
          stage?: 'prospecting' | 'in_progress' | 'confirmed' | 'fulfilled';
          amount?: number | null;
          notes?: string | null;
          managed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string | null;
          team_id?: string | null;
          company_name?: string;
          contact_name?: string | null;
          contact_email?: string | null;
          package_type?: 'platinum' | 'gold' | 'silver' | 'bronze';
          stage?: 'prospecting' | 'in_progress' | 'confirmed' | 'fulfilled';
          amount?: number | null;
          notes?: string | null;
          managed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      logistics_notifications: {
        Row: {
          id: string;
          event_id: string | null;
          team_id: string | null;
          message: string;
          attendee_info: any | null;
          status: 'pending' | 'acknowledged' | 'completed';
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id?: string | null;
          team_id?: string | null;
          message: string;
          attendee_info?: any | null;
          status?: 'pending' | 'acknowledged' | 'completed';
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string | null;
          team_id?: string | null;
          message?: string;
          attendee_info?: any | null;
          status?: 'pending' | 'acknowledged' | 'completed';
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'info' | 'task_assigned' | 'event_request' | 'logistics' | 'system';
          read: boolean;
          metadata: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: 'info' | 'task_assigned' | 'event_request' | 'logistics' | 'system';
          read?: boolean;
          metadata?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: 'info' | 'task_assigned' | 'event_request' | 'logistics' | 'system';
          read?: boolean;
          metadata?: any | null;
          created_at?: string;
        };
      };
      uploads: {
        Row: {
          id: string;
          task_id: string | null;
          uploaded_by: string;
          file_name: string;
          file_path: string;
          file_size: number | null;
          file_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          task_id?: string | null;
          uploaded_by: string;
          file_name: string;
          file_path: string;
          file_size?: number | null;
          file_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          task_id?: string | null;
          uploaded_by?: string;
          file_name?: string;
          file_path?: string;
          file_size?: number | null;
          file_type?: string | null;
          created_at?: string;
        };
      };
    };
  };
};