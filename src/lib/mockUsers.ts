import { User } from './types';

// Temporary user simulation for CEO demo
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
  },
  {
    id: 'rana-admin',
    email: 'rana@mco.com',
    full_name: 'Rana Hammoud',
    role: 'admin',
    department: 'Administration',
    avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'joel-designer',
    email: 'joel@mco.com',
    full_name: 'Joel Mutia',
    role: 'designer',
    department: 'Design',
    pod_id: 'pod-1',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'samir-ae',
    email: 'samir@mco.com',
    full_name: 'Samir Hassan',
    role: 'ae',
    department: 'Sales',
    pod_id: 'pod-1',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'layla-marketing',
    email: 'layla@mco.com',
    full_name: 'Layla Al-Zahra',
    role: 'marketing',
    department: 'Marketing',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'imran-it',
    email: 'imran@mco.com',
    full_name: 'Imran Khan',
    role: 'it',
    department: 'Technical & IT',
    avatar_url: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'ahmed-teamlead',
    email: 'ahmed@mco.com',
    full_name: 'Ahmed Al-Maktoum',
    role: 'team_lead',
    department: 'Operations',
    pod_id: 'pod-1',
    avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'fatima-finance',
    email: 'fatima@mco.com',
    full_name: 'Fatima Al-Qasimi',
    role: 'finance',
    department: 'Finance',
    avatar_url: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const getCurrentUser = (): User => {
  // For demo purposes, return CEO user
  return mockUsers[0];
};

export const switchUser = (userId: string): User | null => {
  return mockUsers.find(user => user.id === userId) || null;
};