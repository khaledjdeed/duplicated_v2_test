// Mock data for demo purposes
export interface MockUser {
  id: string;
  username: string;
  full_name: string;
  role: 'it' | 'event_coordinator' | 'designer' | 'sales' | 'logistics' | 'admin';
  team_id: string;
  avatar_url?: string;
}

export interface MockEvent {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  team_id: string;
  created_by: string;
  cme_credits?: number;
  cme_accreditation?: string;
}

export interface MockTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigned_to: string;
  event_id: string;
  due_date: string;
  created_at: string;
}

export interface MockSponsorship {
  id: string;
  event_id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  package_type: 'platinum' | 'gold' | 'silver' | 'bronze';
  stage: 'prospecting' | 'in_progress' | 'confirmed' | 'fulfilled';
  amount: number;
  notes: string;
}

export interface MockBudget {
  id: string;
  event_id: string;
  category: string;
  allocated_amount: number;
  spent_amount: number;
  notes: string;
}

export interface MockNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'task_assigned' | 'event_request' | 'logistics' | 'system';
  read: boolean;
  created_at: string;
}

// Mock users
export const mockUsers: MockUser[] = [
  {
    id: '1',
    username: 'admin',
    full_name: 'Ghassan Al-Rashid',
    role: 'it',
    team_id: 'team1',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    username: 'coordinator',
    full_name: 'Christa Al-Mansouri',
    role: 'event_coordinator',
    team_id: 'team1',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    username: 'designer1',
    full_name: 'Amira Hassan',
    role: 'designer',
    team_id: 'team1',
    avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '4',
    username: 'designer2',
    full_name: 'Layla Al-Zahra',
    role: 'designer',
    team_id: 'team1',
    avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '5',
    username: 'sales',
    full_name: 'Salim Al-Maktoum',
    role: 'sales',
    team_id: 'team1',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '6',
    username: 'logistics',
    full_name: 'Fatima Al-Qasimi',
    role: 'logistics',
    team_id: 'team1',
    avatar_url: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '7',
    username: 'ceo',
    full_name: 'Dr. Mohammad Al-Nahyan',
    role: 'admin',
    team_id: 'team1',
    avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

// Mock events
export const mockEvents: MockEvent[] = [
  // Current/Active Events
  {
    id: 'event1',
    name: 'UAE Healthcare Innovation Summit 2024',
    description: 'Premier healthcare conference focusing on digital health, AI in medicine, and healthcare innovation across the UAE.',
    start_date: '2024-12-10T08:00:00Z',
    end_date: '2024-12-12T17:00:00Z',
    location: 'Dubai World Trade Centre, UAE',
    status: 'active',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 24,
    cme_accreditation: 'DHA, MOH, HAAD'
  },
  {
    id: 'event2',
    name: 'Middle East Medical Excellence Awards 2024',
    description: 'Annual awards ceremony recognizing outstanding achievements in healthcare and medical research in the Middle East.',
    start_date: '2024-12-15T18:00:00Z',
    end_date: '2024-12-15T22:00:00Z',
    location: 'Emirates Palace, Abu Dhabi',
    status: 'active',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 4,
    cme_accreditation: 'DHA, MOH'
  },
  {
    id: 'event3',
    name: 'Healthcare Digital Transformation Workshop',
    description: 'Intensive workshop on digital transformation strategies for healthcare institutions and medical practices.',
    start_date: '2024-12-20T09:00:00Z',
    end_date: '2024-12-20T17:00:00Z',
    location: 'Dubai Healthcare City',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 8,
    cme_accreditation: 'DHA, MOH'
  },
  // Future Events - 2025
  {
    id: 'event4',
    name: 'Abu Dhabi Global Healthcare Week 2025',
    description: 'Major healthcare exhibition featuring medical devices, pharmaceuticals, and healthcare technologies.',
    start_date: '2025-02-15T08:00:00Z',
    end_date: '2025-02-18T18:00:00Z',
    location: 'ADNEC, Abu Dhabi',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 32,
    cme_accreditation: 'DHA, MOH, HAAD, SCFHS'
  },
  {
    id: 'event5',
    name: 'Middle East Cardiology Congress 2025',
    description: 'Leading cardiology conference bringing together cardiologists, researchers, and medical device companies.',
    start_date: '2025-03-10T09:00:00Z',
    end_date: '2025-03-11T17:00:00Z',
    location: 'Dubai International Convention Centre',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 16,
    cme_accreditation: 'DHA, MOH, HAAD'
  },
  {
    id: 'event6',
    name: 'Gulf Nursing & Midwifery Conference 2025',
    description: 'Conference and exhibition for nursing professionals, midwives, and healthcare support staff.',
    start_date: '2025-04-20T09:00:00Z',
    end_date: '2025-04-22T18:00:00Z',
    location: 'Dubai World Trade Centre, UAE',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 20,
    cme_accreditation: 'DHA, MOH, HAAD'
  },
  {
    id: 'event7',
    name: 'UAE Pediatrics & Child Health Summit 2025',
    description: 'Specialized conference focusing on pediatric medicine, child health, and family healthcare.',
    start_date: '2025-05-15T08:30:00Z',
    end_date: '2025-05-17T17:30:00Z',
    location: 'Al Ain Convention Centre',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 24,
    cme_accreditation: 'DHA, MOH, HAAD'
  },
  {
    id: 'event8',
    name: 'Middle East Oncology Conference 2025',
    description: 'Comprehensive oncology conference covering cancer research, treatment innovations, and patient care.',
    start_date: '2025-06-08T09:00:00Z',
    end_date: '2025-06-09T18:00:00Z',
    location: 'Sharjah Expo Centre',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 16,
    cme_accreditation: 'DHA, MOH, HAAD'
  },
  {
    id: 'event9',
    name: 'Gulf Mental Health & Wellness Summit 2025',
    description: 'Major mental health conference covering psychiatry, psychology, and community mental health programs.',
    start_date: '2025-09-12T08:00:00Z',
    end_date: '2025-09-15T18:00:00Z',
    location: 'Dubai Healthcare City',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 32,
    cme_accreditation: 'DHA, MOH, HAAD, APA'
  },
  {
    id: 'event10',
    name: 'UAE Medical Technology & Innovation Expo 2025',
    description: 'Annual medical technology exhibition showcasing latest medical devices, AI in healthcare, and digital health solutions.',
    start_date: '2025-10-25T10:00:00Z',
    end_date: '2025-10-30T20:00:00Z',
    location: 'Dubai World Trade Centre, UAE',
    status: 'planning',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 40,
    cme_accreditation: 'DHA, MOH, HAAD, SCFHS'
  },
  // Completed Events
  {
    id: 'event11',
    name: 'UAE Pharmacy & Pharmaceutical Sciences Conference 2024',
    description: 'Conference on pharmaceutical sciences, clinical pharmacy, and medication management.',
    start_date: '2024-10-15T09:00:00Z',
    end_date: '2024-10-16T17:00:00Z',
    location: 'Dubai Healthcare City',
    status: 'completed',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 16,
    cme_accreditation: 'DHA, MOH, HAAD'
  },
  {
    id: 'event12',
    name: 'Middle East Radiology & Imaging Congress 2024',
    description: 'Major radiology conference featuring latest imaging technologies and diagnostic techniques.',
    start_date: '2024-09-20T08:00:00Z',
    end_date: '2024-09-23T18:00:00Z',
    location: 'Dubai World Trade Centre, UAE',
    status: 'completed',
    team_id: 'team1',
    created_by: '1',
    cme_credits: 28,
    cme_accreditation: 'DHA, MOH, HAAD, ACR'
  }
];

// Mock tasks
export const mockTasks: MockTask[] = [
  {
    id: 'task1',
    title: 'Design Healthcare Innovation Summit Banner',
    description: 'Create main banner for the UAE Healthcare Innovation Summit with medical branding guidelines.',
    status: 'in_progress',
    priority: 'high',
    assigned_to: '3',
    event_id: 'event1',
    due_date: '2024-12-05T17:00:00Z',
    created_at: '2024-11-15T10:00:00Z'
  },
  {
    id: 'task2',
    title: 'Social Media Campaign - Medical Excellence Awards',
    description: 'Create promotional graphics for Middle East Medical Excellence Awards social media campaigns.',
    status: 'pending',
    priority: 'medium',
    assigned_to: '4',
    event_id: 'event2',
    due_date: '2024-12-10T17:00:00Z',
    created_at: '2024-11-20T14:00:00Z'
  },
  {
    id: 'task3',
    title: 'Healthcare Digital Workshop Materials',
    description: 'Design and layout the healthcare digital transformation workshop materials and medical handouts.',
    status: 'completed',
    priority: 'medium',
    assigned_to: '3',
    event_id: 'event3',
    due_date: '2024-12-15T17:00:00Z',
    created_at: '2024-11-25T09:00:00Z'
  },
  {
    id: 'task4',
    title: 'Healthcare Week Signage',
    description: 'Create wayfinding and informational signage for Abu Dhabi Global Healthcare Week.',
    status: 'pending',
    priority: 'low',
    assigned_to: '4',
    event_id: 'event4',
    due_date: '2025-02-01T17:00:00Z',
    created_at: '2024-12-01T11:00:00Z'
  },
  {
    id: 'task5',
    title: 'Cardiology Congress Branding Package',
    description: 'Complete branding package including medical logos, banners, and presentation templates.',
    status: 'pending',
    priority: 'high',
    assigned_to: '3',
    event_id: 'event5',
    due_date: '2025-02-20T17:00:00Z',
    created_at: '2024-12-01T09:00:00Z'
  },
  {
    id: 'task6',
    title: 'Nursing Conference Exhibition Design',
    description: 'Design exhibition booth layouts and interactive displays for Gulf Nursing & Midwifery Conference.',
    status: 'pending',
    priority: 'medium',
    assigned_to: '4',
    event_id: 'event6',
    due_date: '2025-03-15T17:00:00Z',
    created_at: '2024-12-01T14:00:00Z'
  }
];

// Mock sponsorships
export const mockSponsorships: MockSponsorship[] = [
  {
    id: 'sponsor1',
    event_id: 'event1',
    company_name: 'Cleveland Clinic Abu Dhabi',
    contact_name: 'Dr. Ahmed Al Mansouri',
    contact_email: 'ahmed.almansouri@clevelandclinicabudhabi.ae',
    package_type: 'platinum',
    stage: 'confirmed',
    amount: 150000,
    notes: 'Confirmed platinum sponsor with premium booth space and keynote speaking slot on AI in Healthcare.'
  },
  {
    id: 'sponsor2',
    event_id: 'event1',
    company_name: 'Philips Healthcare Middle East',
    contact_name: 'Dr. Fatima Al Zahra',
    contact_email: 'fatima.alzahra@philips.com',
    package_type: 'gold',
    stage: 'in_progress',
    amount: 75000,
    notes: 'In final negotiations for gold sponsorship package, showcasing latest medical imaging technology.'
  },
  {
    id: 'sponsor3',
    event_id: 'event2',
    company_name: 'Johnson & Johnson Medical Devices',
    contact_name: 'Dr. Omar Hassan',
    contact_email: 'omar.hassan@jnj.com',
    package_type: 'silver',
    stage: 'confirmed',
    amount: 50000,
    notes: 'Confirmed silver sponsor for Medical Excellence Awards with networking reception.'
  },
  {
    id: 'sponsor4',
    event_id: 'event4',
    company_name: 'Siemens Healthineers',
    contact_name: 'Dr. Khalid Al Awadi',
    contact_email: 'khalid.alawadi@siemens-healthineers.com',
    package_type: 'platinum',
    stage: 'in_progress',
    amount: 200000,
    notes: 'Discussing platinum sponsorship for healthcare week, showcasing digital health solutions.'
  },
  {
    id: 'sponsor5',
    event_id: 'event5',
    company_name: 'Medtronic Middle East',
    contact_name: 'Dr. Mariam Al Suwaidi',
    contact_email: 'mariam.alsuwaidi@medtronic.com',
    package_type: 'gold',
    stage: 'prospecting',
    amount: 80000,
    notes: 'Initial contact made for cardiology congress sponsorship, sending detailed proposal for cardiac devices showcase.'
  },
  {
    id: 'sponsor6',
    event_id: 'event6',
    company_name: 'Dubai Health Authority (DHA)',
    contact_name: 'Dr. Hassan Al Mansoori',
    contact_email: 'hassan.almansoori@dha.gov.ae',
    package_type: 'bronze',
    stage: 'confirmed',
    amount: 25000,
    notes: 'Government partner for Nursing Conference, confirmed bronze package with regulatory updates session.'
  },
  {
    id: 'sponsor7',
    event_id: 'event7',
    company_name: 'Pfizer Middle East',
    contact_name: 'Dr. Amina Al Blooshi',
    contact_email: 'amina.alblooshi@pfizer.com',
    package_type: 'gold',
    stage: 'prospecting',
    amount: 90000,
    notes: 'Interested in pediatrics summit sponsorship, scheduling follow-up meeting for vaccine education program.'
  }
];

// Mock budgets
export const mockBudgets: MockBudget[] = [
  {
    id: 'budget1',
    event_id: 'event1',
    category: 'Medical Venue & Equipment',
    allocated_amount: 120000,
    spent_amount: 45000,
    notes: 'Dubai World Trade Centre booking with medical-grade AV equipment and live surgery streaming setup.'
  },
  {
    id: 'budget2',
    event_id: 'event1',
    category: 'Medical Catering & Dietary',
    allocated_amount: 85000,
    spent_amount: 15000,
    notes: 'Premium catering for 1000+ healthcare professionals with halal, diabetic, and special dietary options.'
  },
  {
    id: 'budget3',
    event_id: 'event1',
    category: 'Medical Marketing & CME',
    allocated_amount: 45000,
    spent_amount: 28000,
    notes: 'Digital marketing campaign across GCC healthcare networks and CME accreditation materials.'
  },
  {
    id: 'budget4',
    event_id: 'event2',
    category: 'Awards Venue & Ceremony',
    allocated_amount: 95000,
    spent_amount: 95000,
    notes: 'Emirates Palace venue rental for medical excellence awards ceremony - premium healthcare networking location.'
  },
  {
    id: 'budget5',
    event_id: 'event4',
    category: 'Medical Exhibition Setup',
    allocated_amount: 150000,
    spent_amount: 0,
    notes: 'ADNEC exhibition hall setup with medical device demonstration areas and sterile environments.'
  },
  {
    id: 'budget6',
    event_id: 'event5',
    category: 'Medical Technology & Live Surgery',
    allocated_amount: 60000,
    spent_amount: 0,
    notes: 'Advanced medical AV equipment and live surgery streaming setup for cardiology procedures.'
  },
  {
    id: 'budget7',
    event_id: 'event6',
    category: 'Nursing Education Displays',
    allocated_amount: 80000,
    spent_amount: 0,
    notes: 'Nursing simulation labs and interactive patient care demonstration zones.'
  }
];

// Mock notifications
export const mockNotifications: MockNotification[] = [
  {
    id: 'notif1',
    user_id: '3',
    title: 'New Task Assigned',
    message: 'You have been assigned to design the conference banner.',
    type: 'task_assigned',
    read: false,
    created_at: '2024-05-01T10:00:00Z'
  },
  {
    id: 'notif2',
    user_id: '1',
    title: 'Event Request Pending',
    message: 'Sarah Chen has requested approval for Summer Team Retreat.',
    type: 'event_request',
    read: false,
    created_at: '2024-05-02T09:00:00Z'
  },
  {
    id: 'notif3',
    user_id: '6',
    title: 'Logistics Coordination Needed',
    message: 'Special dietary requirements for 25 attendees at Tech Conference.',
    type: 'logistics',
    read: true,
    created_at: '2024-05-01T15:30:00Z'
  }
];

// Helper functions
export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getEventById = (id: string): MockEvent | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getTasksByUserId = (userId: string): MockTask[] => {
  return mockTasks.filter(task => task.assigned_to === userId);
};

export const getTasksByEventId = (eventId: string): MockTask[] => {
  return mockTasks.filter(task => task.event_id === eventId);
};

export const getSponsorshipsByEventId = (eventId: string): MockSponsorship[] => {
  return mockSponsorships.filter(sponsor => sponsor.event_id === eventId);
};

export const getBudgetsByEventId = (eventId: string): MockBudget[] => {
  return mockBudgets.filter(budget => budget.event_id === eventId);
};

export const getNotificationsByUserId = (userId: string): MockNotification[] => {
  return mockNotifications.filter(notif => notif.user_id === userId);
};

export const getAllEvents = (): MockEvent[] => mockEvents;
export const getAllTasks = (): MockTask[] => mockTasks;
export const getAllSponsorships = (): MockSponsorship[] => mockSponsorships;
export const getAllBudgets = (): MockBudget[] => mockBudgets;

// Mock teams data
export const mockTeams = [
  {
    id: 'team1',
    name: 'Marketing Team',
    description: 'Handles all marketing and promotional activities'
  },
  {
    id: 'team2',
    name: 'Development Team',
    description: 'Software development and technical implementation'
  },
  {
    id: 'team3',
    name: 'Operations Team',
    description: 'Day-to-day operations and logistics'
  }
];