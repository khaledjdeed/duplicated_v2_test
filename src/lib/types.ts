export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'ceo' | 'admin' | 'marketing' | 'ae' | 'designer' | 'logistics' | 'it' | 'team_lead' | 'finance';
  department: string;
  pod_id?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Pod {
  id: string;
  name: string;
  description?: string;
  account_executives: string[];
  designers: string[];
  logistics_staff?: string[];
  production_staff?: string[];
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
  pod_id: string;
  created_by: string;
  budget_allocated?: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  event_id: string;
  assigned_to: string;
  created_by: string;
  status: 'pending' | 'in_progress' | 'completed';
  criticality_level: 'low' | 'medium' | 'high';
  due_date?: string;
  pod_id: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  position: string;
  email: string; // Encrypted for non-privileged users
  phone?: string; // Encrypted for non-privileged users
  organization: string;
  attributes: Record<string, any>;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: 'draft' | 'sending' | 'completed' | 'failed';
  created_by: string;
  sent_count: number;
  failed_count: number;
  bounced_count: number;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id?: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface AIInteraction {
  id: string;
  user_id: string;
  query: string;
  response: string;
  rating?: number;
  feedback?: string;
  created_at: string;
}

export interface Budget {
  id: string;
  event_id: string;
  category: string;
  allocated_amount: number;
  spent_amount: number;
  notes?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}