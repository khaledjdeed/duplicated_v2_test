import { User, Event, Task, Sponsorship } from './types';

export const mockUsers: User[] = [
  {
    id: 'yousef-ceo',
    email: 'yousef@mco.com',
    full_name: 'Yousef Al-Rashid',
    role: 'ceo',
    department: 'Executive',
    avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'mariam-admin',
    email: 'mariam@mco.com',
    full_name: 'Mariam Wael',
    role: 'admin',
    department: 'Administration',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    name: 'Healthcare Summit 2024',
    description: 'Annual healthcare technology summit',
    start_date: '2024-06-15T09:00:00Z',
    end_date: '2024-06-17T18:00:00Z',
    location: 'Convention Center',
    status: 'planning',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    event_id: 'event-1',
    title: 'Design event banner',
    description: 'Create promotional materials for the summit',
    status: 'pending',
    priority: 'high',
    due_date: '2024-05-01T00:00:00Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockSponsorships: Sponsorship[] = [
  {
    id: 'sponsor-1',
    event_id: 'event-1',
    company_name: 'TechCorp Inc',
    contact_name: 'John Smith',
    contact_email: 'john@techcorp.com',
    package_type: 'platinum',
    stage: 'confirmed',
    amount: 25000,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export interface MockAuditLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  table_name: string;
  record_id?: string;
  details?: Record<string, any>;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip_address?: string;
}

export const mockAuditLogs: MockAuditLog[] = [
  {
    id: 'log1',
    user_id: 'yousef-ceo',
    user_name: 'Yousef Al-Rashid',
    action: 'export_contacts',
    table_name: 'contacts',
    record_id: 'all',
    details: { contact_count: 1234, export_format: 'csv' },
    timestamp: '2024-12-01T14:30:00Z',
    severity: 'medium',
    ip_address: '192.168.1.100'
  }
];