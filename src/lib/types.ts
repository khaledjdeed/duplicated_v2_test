export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'it' | 'event_coordinator' | 'designer' | 'sales' | 'logistics' | 'admin' | 'ceo' | 'ae' | 'marketing' | 'team_lead' | 'finance';
  department: string;
  avatar_url?: string | null;
  pod_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location?: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  event_id?: string;
  title: string;
  description?: string;
  assigned_to?: string;
  created_by?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Sponsorship {
  id: string;
  event_id?: string;
  company_name: string;
  contact_name?: string;
  contact_email?: string;
  package_type: 'platinum' | 'gold' | 'silver' | 'bronze';
  stage: 'prospecting' | 'in_progress' | 'confirmed' | 'fulfilled';
  amount?: number;
  notes?: string;
  managed_by?: string;
  created_at: string;
  updated_at: string;
}