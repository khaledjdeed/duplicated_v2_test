import { User } from './types';

export const mockUsers: User[] = [
  // Executive Leadership
  {
    id: 'ceo-yousef',
    email: 'yousef@mco.com',
    full_name: 'Yousef Al-Rashid',
    role: 'ceo',
    department: 'Executive',
    avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  
  // Administration
  {
    id: 'admin-mariam',
    email: 'mariam@mco.com',
    full_name: 'Mariam Wael',
    role: 'administrator',
    department: 'Administration',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'admin-rana',
    email: 'rana@mco.com',
    full_name: 'Rana Hammoud',
    role: 'administrator',
    department: 'Administration',
    avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Finance
  {
    id: 'accountant-fatima',
    email: 'fatima@mco.com',
    full_name: 'Fatima Al-Qasimi',
    role: 'accountant',
    department: 'Finance',
    avatar_url: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Design Department
  {
    id: 'head-design-sara',
    email: 'sara@mco.com',
    full_name: 'Sara Al-Mansouri',
    role: 'head_of_design',
    department: 'Design',
    team_id: 'team-design',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'designer-joel',
    email: 'joel@mco.com',
    full_name: 'Joel Mutia',
    role: 'designer',
    department: 'Design',
    team_id: 'team-design',
    pod_id: 'pod-1',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'designer-layla',
    email: 'layla.designer@mco.com',
    full_name: 'Layla Al-Zahra',
    role: 'designer',
    department: 'Design',
    team_id: 'team-design',
    pod_id: 'pod-2',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // IT Department
  {
    id: 'it-manager-imran',
    email: 'imran@mco.com',
    full_name: 'Imran Khan',
    role: 'it_manager',
    department: 'Technical & IT',
    team_id: 'team-it',
    avatar_url: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'it-staff-omar',
    email: 'omar@mco.com',
    full_name: 'Omar Al-Hashimi',
    role: 'it_technical_staff',
    department: 'Technical & IT',
    team_id: 'team-it',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Operations
  {
    id: 'team-lead-ahmed',
    email: 'ahmed@mco.com',
    full_name: 'Ahmed Al-Maktoum',
    role: 'team_lead',
    department: 'Operations',
    team_id: 'team-operations',
    pod_id: 'pod-1',
    avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'coordinator-nadia',
    email: 'nadia@mco.com',
    full_name: 'Nadia Al-Suwaidi',
    role: 'event_coordinator',
    department: 'Operations',
    team_id: 'team-operations',
    pod_id: 'pod-1',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'logistics-hassan',
    email: 'hassan@mco.com',
    full_name: 'Hassan Al-Blooshi',
    role: 'logistics_staff',
    department: 'Operations',
    team_id: 'team-operations',
    pod_id: 'pod-1',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'production-khalid',
    email: 'khalid@mco.com',
    full_name: 'Khalid Al-Awadi',
    role: 'production_staff',
    department: 'Operations',
    team_id: 'team-operations',
    pod_id: 'pod-2',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Marketing & Sales
  {
    id: 'marketing-layla',
    email: 'layla.marketing@mco.com',
    full_name: 'Layla Al-Zahra',
    role: 'marketing_staff',
    department: 'Marketing',
    team_id: 'team-marketing',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sales-samir',
    email: 'samir@mco.com',
    full_name: 'Samir Hassan',
    role: 'sales_representative',
    department: 'Sales',
    team_id: 'team-sales',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sales-amina',
    email: 'amina@mco.com',
    full_name: 'Amina Al-Blooshi',
    role: 'sales_representative',
    department: 'Sales',
    team_id: 'team-sales',
    avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },

  // Specialized Staff
  {
    id: 'accreditation-maryam',
    email: 'maryam@mco.com',
    full_name: 'Maryam Al-Qasimi',
    role: 'accreditation_staff',
    department: 'Quality Assurance',
    team_id: 'team-qa',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockTeams = [
  {
    id: 'team-design',
    name: 'Design Team',
    description: 'Creative design and visual communications',
    department: 'Design',
    lead_id: 'head-design-sara',
    member_count: 3,
    performance_score: 94,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'team-it',
    name: 'IT Team',
    description: 'Technical infrastructure and system management',
    department: 'Technical & IT',
    lead_id: 'it-manager-imran',
    member_count: 2,
    performance_score: 97,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'team-operations',
    name: 'Operations Team',
    description: 'Event coordination, logistics, and production',
    department: 'Operations',
    lead_id: 'team-lead-ahmed',
    member_count: 4,
    performance_score: 91,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'team-marketing',
    name: 'Marketing Team',
    description: 'Marketing campaigns and promotional activities',
    department: 'Marketing',
    member_count: 1,
    performance_score: 88,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'team-sales',
    name: 'Sales Team',
    description: 'Sponsorship management and business development',
    department: 'Sales',
    member_count: 2,
    performance_score: 92,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'team-qa',
    name: 'Quality Assurance Team',
    description: 'Accreditation and compliance management',
    department: 'Quality Assurance',
    member_count: 1,
    performance_score: 96,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getCurrentUser = (): User => {
  // For demo purposes, return CEO user
  return mockUsers[0];
};

export const switchUser = (userId: string): User | null => {
  return mockUsers.find(user => user.id === userId) || null;
};

export const getUsersByTeam = (teamId: string): User[] => {
  return mockUsers.filter(user => user.team_id === teamId);
};

export const getUsersByRole = (role: string): User[] => {
  return mockUsers.filter(user => user.role === role);
};