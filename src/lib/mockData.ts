import { Event, Task, Sponsorship, Budget, Notification, Upload, EventRequest, Contact } from './types';

// Comprehensive Mock Events
export const mockEvents: Event[] = [
  // Current/Active Events
  {
    id: 'event-1',
    name: 'UAE Healthcare Innovation Summit 2024',
    description: 'Premier healthcare conference focusing on digital health, AI in medicine, and healthcare innovation across the UAE.',
    start_date: '2024-12-10T08:00:00Z',
    end_date: '2024-12-12T17:00:00Z',
    location: 'Dubai World Trade Centre, UAE',
    status: 'active',
    team_id: 'team-operations',
    created_by: 'it-manager-imran',
    budget_allocated: 450000,
    attendee_count: 1200,
    cme_credits: 24,
    cme_accreditation: 'DHA, MOH, HAAD',
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-11-15T14:30:00Z'
  },
  {
    id: 'event-2',
    name: 'Middle East Medical Excellence Awards 2024',
    description: 'Annual awards ceremony recognizing outstanding achievements in healthcare and medical research in the Middle East.',
    start_date: '2024-12-15T18:00:00Z',
    end_date: '2024-12-15T22:00:00Z',
    location: 'Emirates Palace, Abu Dhabi',
    status: 'active',
    team_id: 'team-operations',
    created_by: 'it-manager-imran',
    budget_allocated: 280000,
    attendee_count: 800,
    cme_credits: 4,
    cme_accreditation: 'DHA, MOH',
    created_at: '2024-09-15T09:00:00Z',
    updated_at: '2024-11-20T16:45:00Z'
  },
  {
    id: 'event-3',
    name: 'Healthcare Digital Transformation Workshop',
    description: 'Intensive workshop on digital transformation strategies for healthcare institutions and medical practices.',
    start_date: '2024-12-20T09:00:00Z',
    end_date: '2024-12-20T17:00:00Z',
    location: 'Dubai Healthcare City',
    status: 'planning',
    team_id: 'team-marketing',
    created_by: 'it-staff-omar',
    budget_allocated: 120000,
    attendee_count: 300,
    cme_credits: 8,
    cme_accreditation: 'DHA, MOH',
    created_at: '2024-11-01T11:00:00Z',
    updated_at: '2024-11-25T10:15:00Z'
  },
  // Future Events - 2025
  {
    id: 'event-4',
    name: 'Abu Dhabi Global Healthcare Week 2025',
    description: 'Major healthcare exhibition featuring medical devices, pharmaceuticals, and healthcare technologies.',
    start_date: '2025-02-15T08:00:00Z',
    end_date: '2025-02-18T18:00:00Z',
    location: 'ADNEC, Abu Dhabi',
    status: 'planning',
    team_id: 'team-operations',
    created_by: 'it-manager-imran',
    budget_allocated: 650000,
    attendee_count: 2500,
    cme_credits: 32,
    cme_accreditation: 'DHA, MOH, HAAD, SCFHS',
    created_at: '2024-11-10T08:00:00Z',
    updated_at: '2024-11-28T12:00:00Z'
  },
  {
    id: 'event-5',
    name: 'Middle East Cardiology Congress 2025',
    description: 'Leading cardiology conference bringing together cardiologists, researchers, and medical device companies.',
    start_date: '2025-03-10T09:00:00Z',
    end_date: '2025-03-11T17:00:00Z',
    location: 'Dubai International Convention Centre',
    status: 'planning',
    team_id: 'team-sales',
    created_by: 'it-staff-omar',
    budget_allocated: 320000,
    attendee_count: 900,
    cme_credits: 16,
    cme_accreditation: 'DHA, MOH, HAAD',
    created_at: '2024-11-05T14:00:00Z',
    updated_at: '2024-11-22T09:30:00Z'
  },
  {
    id: 'event-6',
    name: 'Gulf Nursing & Midwifery Conference 2025',
    description: 'Conference and exhibition for nursing professionals, midwives, and healthcare support staff.',
    start_date: '2025-04-20T09:00:00Z',
    end_date: '2025-04-22T18:00:00Z',
    location: 'Dubai World Trade Centre, UAE',
    status: 'planning',
    team_id: 'team-design',
    created_by: 'it-manager-imran',
    budget_allocated: 380000,
    attendee_count: 1100,
    cme_credits: 20,
    cme_accreditation: 'DHA, MOH, HAAD',
    created_at: '2024-10-20T13:00:00Z',
    updated_at: '2024-11-18T15:20:00Z'
  },
  // Completed Events
  {
    id: 'event-7',
    name: 'UAE Pharmacy & Pharmaceutical Sciences Conference 2024',
    description: 'Conference on pharmaceutical sciences, clinical pharmacy, and medication management.',
    start_date: '2024-10-15T09:00:00Z',
    end_date: '2024-10-16T17:00:00Z',
    location: 'Dubai Healthcare City',
    status: 'completed',
    team_id: 'team-qa',
    created_by: 'it-staff-omar',
    budget_allocated: 180000,
    attendee_count: 650,
    cme_credits: 16,
    cme_accreditation: 'DHA, MOH, HAAD',
    created_at: '2024-08-01T10:00:00Z',
    updated_at: '2024-10-17T18:00:00Z'
  },
  {
    id: 'event-8',
    name: 'Middle East Radiology & Imaging Congress 2024',
    description: 'Major radiology conference featuring latest imaging technologies and diagnostic techniques.',
    start_date: '2024-09-20T08:00:00Z',
    end_date: '2024-09-23T18:00:00Z',
    location: 'Dubai World Trade Centre, UAE',
    status: 'completed',
    team_id: 'team-marketing',
    created_by: 'it-manager-imran',
    budget_allocated: 520000,
    attendee_count: 1800,
    cme_credits: 28,
    cme_accreditation: 'DHA, MOH, HAAD, ACR',
    created_at: '2024-07-01T09:00:00Z',
    updated_at: '2024-09-24T20:00:00Z'
  }
];

// Comprehensive Mock Tasks
export const mockTasks: Task[] = [
  // Design Tasks
  {
    id: 'task-1',
    title: 'Design Healthcare Innovation Summit Banner',
    description: 'Create main banner for the UAE Healthcare Innovation Summit with medical branding guidelines.',
    event_id: 'event-1',
    team_id: 'team-design',
    assigned_to: 'designer-joel',
    created_by: 'head-design-sara',
    status: 'in_progress',
    priority: 'high',
    task_type: 'design',
    due_date: '2024-12-05T17:00:00Z',
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2024-11-28T14:30:00Z'
  },
  {
    id: 'task-2',
    title: 'Social Media Campaign Graphics - Medical Awards',
    description: 'Create promotional graphics for Middle East Medical Excellence Awards social media campaigns.',
    event_id: 'event-2',
    team_id: 'team-design',
    assigned_to: 'designer-layla',
    created_by: 'marketing-layla',
    status: 'pending',
    priority: 'medium',
    task_type: 'design',
    due_date: '2024-12-10T17:00:00Z',
    created_at: '2024-11-20T14:00:00Z',
    updated_at: '2024-11-20T14:00:00Z'
  },
  {
    id: 'task-3',
    title: 'Event Program Layout Design',
    description: 'Design and layout the healthcare digital transformation workshop materials and medical handouts.',
    event_id: 'event-3',
    team_id: 'team-design',
    assigned_to: 'designer-joel',
    created_by: 'coordinator-nadia',
    status: 'completed',
    priority: 'medium',
    task_type: 'design',
    due_date: '2024-12-15T17:00:00Z',
    created_at: '2024-11-25T09:00:00Z',
    updated_at: '2024-11-30T16:00:00Z'
  },
  
  // Logistics Tasks
  {
    id: 'task-4',
    title: 'Venue Setup Coordination - Healthcare Summit',
    description: 'Coordinate venue setup, equipment installation, and logistics for the Healthcare Innovation Summit.',
    event_id: 'event-1',
    team_id: 'team-operations',
    assigned_to: 'logistics-hassan',
    created_by: 'coordinator-nadia',
    status: 'in_progress',
    priority: 'high',
    task_type: 'logistics',
    due_date: '2024-12-08T12:00:00Z',
    created_at: '2024-11-18T11:00:00Z',
    updated_at: '2024-11-29T09:15:00Z'
  },
  {
    id: 'task-5',
    title: 'Catering Arrangements - Awards Ceremony',
    description: 'Arrange premium catering services for the Medical Excellence Awards ceremony at Emirates Palace.',
    event_id: 'event-2',
    team_id: 'team-operations',
    assigned_to: 'logistics-hassan',
    created_by: 'team-lead-ahmed',
    status: 'pending',
    priority: 'medium',
    task_type: 'logistics',
    due_date: '2024-12-12T15:00:00Z',
    created_at: '2024-11-22T13:00:00Z',
    updated_at: '2024-11-22T13:00:00Z'
  },

  // Production Tasks
  {
    id: 'task-6',
    title: 'AV Equipment Setup - Healthcare Week',
    description: 'Install and test all audio-visual equipment for Abu Dhabi Global Healthcare Week.',
    event_id: 'event-4',
    team_id: 'team-operations',
    assigned_to: 'production-khalid',
    created_by: 'team-lead-ahmed',
    status: 'pending',
    priority: 'high',
    task_type: 'production',
    due_date: '2025-02-10T10:00:00Z',
    created_at: '2024-11-25T10:00:00Z',
    updated_at: '2024-11-25T10:00:00Z'
  },
  {
    id: 'task-7',
    title: 'Stage Production - Cardiology Congress',
    description: 'Manage stage setup, lighting, and production elements for the Cardiology Congress.',
    event_id: 'event-5',
    team_id: 'team-operations',
    assigned_to: 'production-khalid',
    created_by: 'coordinator-nadia',
    status: 'pending',
    priority: 'medium',
    task_type: 'production',
    due_date: '2025-03-05T16:00:00Z',
    created_at: '2024-11-20T15:30:00Z',
    updated_at: '2024-11-20T15:30:00Z'
  },

  // Accreditation Tasks
  {
    id: 'task-8',
    title: 'CME Accreditation Application - Healthcare Summit',
    description: 'Submit and manage CME accreditation applications for the Healthcare Innovation Summit.',
    event_id: 'event-1',
    team_id: 'team-qa',
    assigned_to: 'accreditation-maryam',
    created_by: 'coordinator-nadia',
    status: 'completed',
    priority: 'high',
    task_type: 'accreditation',
    due_date: '2024-11-30T17:00:00Z',
    created_at: '2024-11-01T09:00:00Z',
    updated_at: '2024-11-28T16:45:00Z'
  },
  {
    id: 'task-9',
    title: 'Quality Compliance Review - Awards Ceremony',
    description: 'Conduct quality compliance review and documentation for the Medical Excellence Awards.',
    event_id: 'event-2',
    team_id: 'team-qa',
    assigned_to: 'accreditation-maryam',
    created_by: 'admin-mariam',
    status: 'in_progress',
    priority: 'medium',
    task_type: 'accreditation',
    due_date: '2024-12-13T17:00:00Z',
    created_at: '2024-11-10T14:00:00Z',
    updated_at: '2024-11-27T11:20:00Z'
  },

  // Marketing Tasks
  {
    id: 'task-10',
    title: 'Digital Marketing Campaign - Healthcare Week',
    description: 'Develop and execute comprehensive digital marketing campaign for Abu Dhabi Global Healthcare Week.',
    event_id: 'event-4',
    team_id: 'team-marketing',
    assigned_to: 'marketing-layla',
    created_by: 'team-lead-ahmed',
    status: 'in_progress',
    priority: 'high',
    task_type: 'marketing',
    due_date: '2025-01-15T17:00:00Z',
    created_at: '2024-11-12T10:30:00Z',
    updated_at: '2024-11-26T13:45:00Z'
  },
  {
    id: 'task-11',
    title: 'Attendee Engagement Strategy',
    description: 'Create attendee engagement and retention strategy for upcoming conferences.',
    event_id: 'event-5',
    team_id: 'team-marketing',
    assigned_to: 'marketing-layla',
    created_by: 'coordinator-nadia',
    status: 'pending',
    priority: 'medium',
    task_type: 'marketing',
    due_date: '2025-02-01T17:00:00Z',
    created_at: '2024-11-18T16:00:00Z',
    updated_at: '2024-11-18T16:00:00Z'
  },

  // General/Administrative Tasks
  {
    id: 'task-12',
    title: 'Budget Review and Approval',
    description: 'Review and approve budget allocations for Q1 2025 healthcare events.',
    team_id: 'team-operations',
    assigned_to: 'team-lead-ahmed',
    created_by: 'admin-mariam',
    status: 'pending',
    priority: 'high',
    task_type: 'general',
    due_date: '2024-12-31T17:00:00Z',
    created_at: '2024-11-28T09:00:00Z',
    updated_at: '2024-11-28T09:00:00Z'
  },
  {
    id: 'task-13',
    title: 'Team Performance Analysis',
    description: 'Analyze team performance metrics and prepare quarterly report.',
    team_id: 'team-design',
    assigned_to: 'head-design-sara',
    created_by: 'admin-rana',
    status: 'in_progress',
    priority: 'medium',
    task_type: 'general',
    due_date: '2024-12-20T17:00:00Z',
    created_at: '2024-11-25T11:30:00Z',
    updated_at: '2024-11-29T14:15:00Z'
  }
];

// Comprehensive Mock Sponsorships
export const mockSponsorships: Sponsorship[] = [
  {
    id: 'sponsor-1',
    event_id: 'event-1',
    team_id: 'team-sales',
    company_name: 'Cleveland Clinic Abu Dhabi',
    contact_name: 'Dr. Ahmed Al Mansouri',
    contact_email: 'ahmed.almansouri@clevelandclinicabudhabi.ae',
    package_type: 'platinum',
    stage: 'confirmed',
    amount: 150000,
    notes: 'Confirmed platinum sponsor with premium booth space and keynote speaking slot on AI in Healthcare.',
    assigned_to: 'sales-samir',
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-11-15T14:30:00Z'
  },
  {
    id: 'sponsor-2',
    event_id: 'event-1',
    team_id: 'team-sales',
    company_name: 'Philips Healthcare Middle East',
    contact_name: 'Dr. Fatima Al Zahra',
    contact_email: 'fatima.alzahra@philips.com',
    package_type: 'gold',
    stage: 'in_progress',
    amount: 75000,
    notes: 'In final negotiations for gold sponsorship package, showcasing latest medical imaging technology.',
    assigned_to: 'sales-amina',
    created_at: '2024-10-05T12:00:00Z',
    updated_at: '2024-11-20T16:45:00Z'
  },
  {
    id: 'sponsor-3',
    event_id: 'event-2',
    team_id: 'team-sales',
    company_name: 'Johnson & Johnson Medical Devices',
    contact_name: 'Dr. Omar Hassan',
    contact_email: 'omar.hassan@jnj.com',
    package_type: 'silver',
    stage: 'confirmed',
    amount: 50000,
    notes: 'Confirmed silver sponsor for Medical Excellence Awards with networking reception.',
    assigned_to: 'sales-samir',
    created_at: '2024-09-15T14:00:00Z',
    updated_at: '2024-11-10T11:20:00Z'
  },
  {
    id: 'sponsor-4',
    event_id: 'event-4',
    team_id: 'team-sales',
    company_name: 'Siemens Healthineers',
    contact_name: 'Dr. Khalid Al Awadi',
    contact_email: 'khalid.alawadi@siemens-healthineers.com',
    package_type: 'platinum',
    stage: 'in_progress',
    amount: 200000,
    notes: 'Discussing platinum sponsorship for healthcare week, showcasing digital health solutions.',
    assigned_to: 'sales-amina',
    created_at: '2024-11-01T09:00:00Z',
    updated_at: '2024-11-25T13:15:00Z'
  },
  {
    id: 'sponsor-5',
    event_id: 'event-5',
    team_id: 'team-sales',
    company_name: 'Medtronic Middle East',
    contact_name: 'Dr. Mariam Al Suwaidi',
    contact_email: 'mariam.alsuwaidi@medtronic.com',
    package_type: 'gold',
    stage: 'prospecting',
    amount: 80000,
    notes: 'Initial contact made for cardiology congress sponsorship, sending detailed proposal for cardiac devices showcase.',
    assigned_to: 'sales-samir',
    created_at: '2024-11-10T11:00:00Z',
    updated_at: '2024-11-22T15:30:00Z'
  },
  {
    id: 'sponsor-6',
    event_id: 'event-6',
    team_id: 'team-sales',
    company_name: 'Dubai Health Authority (DHA)',
    contact_name: 'Dr. Hassan Al Mansoori',
    contact_email: 'hassan.almansoori@dha.gov.ae',
    package_type: 'bronze',
    stage: 'confirmed',
    amount: 25000,
    notes: 'Government partner for Nursing Conference, confirmed bronze package with regulatory updates session.',
    assigned_to: 'sales-amina',
    created_at: '2024-10-20T13:00:00Z',
    updated_at: '2024-11-18T10:45:00Z'
  },
  {
    id: 'sponsor-7',
    event_id: 'event-7',
    team_id: 'team-sales',
    company_name: 'Pfizer Middle East',
    contact_name: 'Dr. Amina Al Blooshi',
    contact_email: 'amina.alblooshi@pfizer.com',
    package_type: 'gold',
    stage: 'fulfilled',
    amount: 90000,
    notes: 'Successfully completed sponsorship for pharmacy conference, excellent partnership results.',
    assigned_to: 'sales-samir',
    created_at: '2024-08-15T10:00:00Z',
    updated_at: '2024-10-17T18:30:00Z'
  }
];

// Comprehensive Mock Budgets
export const mockBudgets: Budget[] = [
  // Event 1 - Healthcare Innovation Summit
  {
    id: 'budget-1',
    event_id: 'event-1',
    category: 'Medical Venue & Equipment',
    allocated_amount: 120000,
    spent_amount: 95000,
    notes: 'Dubai World Trade Centre booking with medical-grade AV equipment and live surgery streaming setup.',
    created_by: 'accountant-fatima',
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-11-25T14:20:00Z'
  },
  {
    id: 'budget-2',
    event_id: 'event-1',
    category: 'Medical Catering & Dietary',
    allocated_amount: 85000,
    spent_amount: 78000,
    notes: 'Premium catering for 1200+ healthcare professionals with halal, diabetic, and special dietary options.',
    created_by: 'accountant-fatima',
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-11-28T16:30:00Z'
  },
  {
    id: 'budget-3',
    event_id: 'event-1',
    category: 'Medical Marketing & CME',
    allocated_amount: 45000,
    spent_amount: 42000,
    notes: 'Digital marketing campaign across GCC healthcare networks and CME accreditation materials.',
    created_by: 'accountant-fatima',
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-11-26T12:15:00Z'
  },

  // Event 2 - Medical Excellence Awards
  {
    id: 'budget-4',
    event_id: 'event-2',
    category: 'Awards Venue & Ceremony',
    allocated_amount: 95000,
    spent_amount: 95000,
    notes: 'Emirates Palace venue rental for medical excellence awards ceremony - premium healthcare networking location.',
    created_by: 'accountant-fatima',
    created_at: '2024-09-15T09:00:00Z',
    updated_at: '2024-12-01T10:00:00Z'
  },
  {
    id: 'budget-5',
    event_id: 'event-2',
    category: 'Awards Production & Entertainment',
    allocated_amount: 65000,
    spent_amount: 58000,
    notes: 'Awards ceremony production, entertainment, and recognition materials.',
    created_by: 'accountant-fatima',
    created_at: '2024-09-15T09:00:00Z',
    updated_at: '2024-11-30T15:45:00Z'
  },

  // Event 4 - Abu Dhabi Healthcare Week
  {
    id: 'budget-6',
    event_id: 'event-4',
    category: 'Medical Exhibition Setup',
    allocated_amount: 180000,
    spent_amount: 25000,
    notes: 'ADNEC exhibition hall setup with medical device demonstration areas and sterile environments.',
    created_by: 'accountant-fatima',
    created_at: '2024-11-10T08:00:00Z',
    updated_at: '2024-11-28T11:30:00Z'
  },
  {
    id: 'budget-7',
    event_id: 'event-4',
    category: 'International Speaker Fees',
    allocated_amount: 220000,
    spent_amount: 0,
    notes: 'Fees for international healthcare experts and keynote speakers.',
    created_by: 'accountant-fatima',
    created_at: '2024-11-10T08:00:00Z',
    updated_at: '2024-11-28T11:30:00Z'
  },

  // Event 5 - Cardiology Congress
  {
    id: 'budget-8',
    event_id: 'event-5',
    category: 'Medical Technology & Live Surgery',
    allocated_amount: 90000,
    spent_amount: 15000,
    notes: 'Advanced medical AV equipment and live surgery streaming setup for cardiology procedures.',
    created_by: 'accountant-fatima',
    created_at: '2024-11-05T14:00:00Z',
    updated_at: '2024-11-22T09:30:00Z'
  },
  {
    id: 'budget-9',
    event_id: 'event-5',
    category: 'Cardiology Equipment Rental',
    allocated_amount: 75000,
    spent_amount: 0,
    notes: 'Specialized cardiology equipment rental for hands-on workshops and demonstrations.',
    created_by: 'accountant-fatima',
    created_at: '2024-11-05T14:00:00Z',
    updated_at: '2024-11-22T09:30:00Z'
  }
];

// Mock Event Requests
export const mockEventRequests: EventRequest[] = [
  {
    id: 'request-1',
    team_id: 'team-operations',
    requested_by: 'coordinator-nadia',
    name: 'UAE Mental Health Awareness Conference 2025',
    description: 'Conference focusing on mental health awareness and treatment in the UAE healthcare system.',
    start_date: '2025-05-15T09:00:00Z',
    end_date: '2025-05-17T17:00:00Z',
    location: 'Dubai Healthcare City',
    justification: 'Growing need for mental health awareness in the region. Expected 800+ healthcare professionals attendance.',
    status: 'pending',
    created_at: '2024-11-28T10:00:00Z',
    updated_at: '2024-11-28T10:00:00Z'
  },
  {
    id: 'request-2',
    team_id: 'team-marketing',
    requested_by: 'ceo-yousef',
    name: 'GCC Healthcare Leadership Summit 2025',
    description: 'Executive-level summit for healthcare leaders across the Gulf Cooperation Council countries.',
    start_date: '2025-06-20T08:00:00Z',
    end_date: '2025-06-22T18:00:00Z',
    location: 'Burj Al Arab, Dubai',
    justification: 'Strategic initiative to position MCO as the leading healthcare event organizer in the GCC region.',
    status: 'approved',
    reviewed_by: 'it-manager-imran',
    created_at: '2024-11-25T14:00:00Z',
    updated_at: '2024-11-29T16:30:00Z'
  },
  {
    id: 'request-3',
    team_id: 'team-operations',
    requested_by: 'coordinator-nadia',
    name: 'Healthcare Innovation Workshop Series',
    description: 'Monthly workshop series on healthcare innovation and technology adoption.',
    justification: 'Continuous education initiative to keep healthcare professionals updated on latest innovations.',
    status: 'rejected',
    reviewed_by: 'it-staff-omar',
    created_at: '2024-11-20T11:00:00Z',
    updated_at: '2024-11-27T13:45:00Z'
  }
];

// Mock Uploads
export const mockUploads: Upload[] = [
  {
    id: 'upload-1',
    task_id: 'task-1',
    uploaded_by: 'designer-joel',
    file_name: 'healthcare-summit-banner-v3.psd',
    file_path: '/uploads/designs/healthcare-summit-banner-v3.psd',
    file_size: 15728640, // 15MB
    file_type: 'application/vnd.adobe.photoshop',
    created_at: '2024-11-28T14:30:00Z'
  },
  {
    id: 'upload-2',
    task_id: 'task-2',
    uploaded_by: 'designer-layla',
    file_name: 'awards-social-media-pack.zip',
    file_path: '/uploads/designs/awards-social-media-pack.zip',
    file_size: 8388608, // 8MB
    file_type: 'application/zip',
    created_at: '2024-11-26T16:15:00Z'
  },
  {
    id: 'upload-3',
    task_id: 'task-3',
    uploaded_by: 'designer-joel',
    file_name: 'workshop-program-layout.pdf',
    file_path: '/uploads/designs/workshop-program-layout.pdf',
    file_size: 2097152, // 2MB
    file_type: 'application/pdf',
    created_at: '2024-11-30T16:00:00Z'
  },
  {
    id: 'upload-4',
    task_id: 'task-8',
    uploaded_by: 'accreditation-maryam',
    file_name: 'cme-accreditation-documents.pdf',
    file_path: '/uploads/accreditation/cme-accreditation-documents.pdf',
    file_size: 5242880, // 5MB
    file_type: 'application/pdf',
    created_at: '2024-11-28T16:45:00Z'
  },
  {
    id: 'upload-5',
    task_id: 'task-10',
    uploaded_by: 'marketing-layla',
    file_name: 'healthcare-week-campaign-assets.zip',
    file_path: '/uploads/marketing/healthcare-week-campaign-assets.zip',
    file_size: 12582912, // 12MB
    file_type: 'application/zip',
    created_at: '2024-11-26T13:45:00Z'
  }
];

// Mock Contacts
export const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Dr. Ahmed Al-Rashid',
    position: 'Chief Medical Officer',
    email: 'ahmed.rashid@hospital.ae',
    phone: '+971-50-123-4567',
    organization: 'Dubai Health Authority',
    attributes: { specialty: 'Cardiology', years_experience: 15, cme_provider: true },
    created_by: 'admin-mariam',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-11-20T14:30:00Z'
  },
  {
    id: 'contact-2',
    name: 'Dr. Fatima Al-Zahra',
    position: 'Head of Neurology',
    email: 'fatima.zahra@clinic.ae',
    phone: '+971-55-987-6543',
    organization: 'American Hospital Dubai',
    attributes: { specialty: 'Neurology', years_experience: 12, research_focus: 'Brain Surgery' },
    created_by: 'admin-rana',
    created_at: '2024-01-20T14:30:00Z',
    updated_at: '2024-11-18T16:20:00Z'
  },
  {
    id: 'contact-3',
    name: 'Dr. Omar Hassan',
    position: 'Director of Operations',
    email: 'omar.hassan@medical.ae',
    phone: '+971-52-456-7890',
    organization: 'Mediclinic Middle East',
    attributes: { specialty: 'Administration', years_experience: 20, hospital_network: 'Mediclinic' },
    created_by: 'admin-mariam',
    created_at: '2024-02-01T09:15:00Z',
    updated_at: '2024-11-15T11:45:00Z'
  },
  {
    id: 'contact-4',
    name: 'Dr. Khalid Al-Awadi',
    position: 'Chief Technology Officer',
    email: 'khalid.alawadi@healthtech.ae',
    phone: '+971-56-789-0123',
    organization: 'UAE HealthTech Innovation Hub',
    attributes: { specialty: 'Health Technology', years_experience: 18, focus_area: 'AI in Medicine' },
    created_by: 'marketing-layla',
    created_at: '2024-02-10T11:30:00Z',
    updated_at: '2024-11-22T13:20:00Z'
  },
  {
    id: 'contact-5',
    name: 'Dr. Mariam Al-Suwaidi',
    position: 'Head of Cardiology',
    email: 'mariam.alsuwaidi@cardiac.ae',
    phone: '+971-50-345-6789',
    organization: 'Dubai Cardiac Center',
    attributes: { specialty: 'Interventional Cardiology', years_experience: 14, procedures_annually: 500 },
    created_by: 'admin-rana',
    created_at: '2024-02-15T13:45:00Z',
    updated_at: '2024-11-20T15:10:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    user_id: 'designer-joel',
    title: 'High Priority Task Assigned',
    message: 'You have been assigned to design the Healthcare Innovation Summit banner. Due in 5 days.',
    type: 'task_assigned',
    read: false,
    metadata: { task_id: 'task-1', priority: 'high' },
    created_at: '2024-11-28T10:00:00Z'
  },
  {
    id: 'notif-2',
    user_id: 'it-manager-imran',
    title: 'Event Request Pending Approval',
    message: 'Nadia Al-Suwaidi has requested approval for UAE Mental Health Awareness Conference 2025.',
    type: 'event_request',
    read: false,
    metadata: { request_id: 'request-1' },
    created_at: '2024-11-28T10:30:00Z'
  },
  {
    id: 'notif-3',
    user_id: 'logistics-hassan',
    title: 'Venue Setup Coordination Required',
    message: 'Special medical equipment setup required for Healthcare Innovation Summit venue.',
    type: 'logistics',
    read: true,
    metadata: { event_id: 'event-1', urgency: 'high' },
    created_at: '2024-11-27T15:30:00Z'
  },
  {
    id: 'notif-4',
    user_id: 'sales-samir',
    title: 'Sponsorship Follow-up Required',
    message: 'Cleveland Clinic Abu Dhabi sponsorship requires contract finalization.',
    type: 'info',
    read: false,
    metadata: { sponsorship_id: 'sponsor-1' },
    created_at: '2024-11-29T09:15:00Z'
  },
  {
    id: 'notif-5',
    user_id: 'accreditation-maryam',
    title: 'CME Accreditation Approved',
    message: 'Healthcare Innovation Summit CME accreditation has been approved by DHA.',
    type: 'system',
    read: false,
    metadata: { event_id: 'event-1', credits: 24 },
    created_at: '2024-11-28T16:45:00Z'
  },
  {
    id: 'notif-6',
    user_id: 'marketing-layla',
    title: 'Campaign Performance Update',
    message: 'Healthcare Week digital campaign has reached 50,000 impressions.',
    type: 'info',
    read: true,
    metadata: { campaign_id: 'campaign-1', impressions: 50000 },
    created_at: '2024-11-26T13:45:00Z'
  }
];

// Helper functions
export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getTasksByUserId = (userId: string): Task[] => {
  return mockTasks.filter(task => task.assigned_to === userId);
};

export const getTasksByTeamId = (teamId: string): Task[] => {
  return mockTasks.filter(task => task.team_id === teamId);
};

export const getTasksByEventId = (eventId: string): Task[] => {
  return mockTasks.filter(task => task.event_id === eventId);
};

export const getSponsorshipsByEventId = (eventId: string): Sponsorship[] => {
  return mockSponsorships.filter(sponsor => sponsor.event_id === eventId);
};

export const getSponsorshipsByAssignedTo = (userId: string): Sponsorship[] => {
  return mockSponsorships.filter(sponsor => sponsor.assigned_to === userId);
};

export const getBudgetsByEventId = (eventId: string): Budget[] => {
  return mockBudgets.filter(budget => budget.event_id === eventId);
};

export const getBudgetsForSponsorships = (sponsorshipIds: string[]): Budget[] => {
  // Get budgets for events that have sponsorships assigned to a sales rep
  const eventIds = mockSponsorships
    .filter(s => sponsorshipIds.includes(s.id))
    .map(s => s.event_id);
  return mockBudgets.filter(budget => eventIds.includes(budget.event_id));
};

export const getNotificationsByUserId = (userId: string): Notification[] => {
  return mockNotifications.filter(notif => notif.user_id === userId);
};

export const getUploadsByUserId = (userId: string): Upload[] => {
  return mockUploads.filter(upload => upload.uploaded_by === userId);
};

export const getEventsByTeamId = (teamId: string): Event[] => {
  return mockEvents.filter(event => event.team_id === teamId);
};

export const getEventRequestsByUserId = (userId: string): EventRequest[] => {
  return mockEventRequests.filter(request => request.requested_by === userId);
};

// Export all data
export const getAllEvents = (): Event[] => mockEvents;
export const getAllTasks = (): Task[] => mockTasks;
export const getAllSponsorships = (): Sponsorship[] => mockSponsorships;
export const getAllBudgets = (): Budget[] => mockBudgets;
export const getAllContacts = (): Contact[] => mockContacts;
export const getAllUploads = (): Upload[] => mockUploads;
export const getAllEventRequests = (): EventRequest[] => mockEventRequests;
export const getAllNotifications = (): Notification[] => mockNotifications;