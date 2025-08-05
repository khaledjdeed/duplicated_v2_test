export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'ceo' | 'administrator' | 'accountant' | 'head_of_design' | 'designer' | 'it_manager' | 'it_technical_staff' | 'team_lead' | 'event_coordinator' | 'marketing_staff' | 'logistics_staff' | 'sales_representative' | 'production_staff' | 'accreditation_staff';
  department: string;
  team_id?: string;
  pod_id?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  department: string;
  lead_id?: string;
  member_count: number;
  performance_score: number;
  created_at: string;
  updated_at: string;
}

export interface Pod {
  id: string;
  name: string;
  description?: string;
  team_id: string;
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
  team_id: string;
  created_by: string;
  budget_allocated?: number;
  attendee_count?: number;
  cme_credits?: number;
  cme_accreditation?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  event_id?: string;
  team_id: string;
  assigned_to: string;
  created_by: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  task_type: 'design' | 'logistics' | 'marketing' | 'production' | 'accreditation' | 'general';
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

export interface Sponsorship {
  id: string;
  event_id: string;
  team_id: string;
  company_name: string;
  contact_name?: string;
  contact_email?: string;
  package_type: 'platinum' | 'gold' | 'silver' | 'bronze';
  stage: 'prospecting' | 'in_progress' | 'confirmed' | 'fulfilled';
  amount?: number;
  notes?: string;
  assigned_to: string; // Sales representative managing this sponsorship
  created_at: string;
  updated_at: string;
}

export interface Upload {
  id: string;
  task_id?: string;
  uploaded_by: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  created_at: string;
}

export interface EventRequest {
  id: string;
  team_id: string;
  requested_by: string;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  justification: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'task_assigned' | 'event_request' | 'logistics' | 'system';
  read: boolean;
  metadata?: any;
  created_at: string;
}