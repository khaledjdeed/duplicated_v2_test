import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/types';
import { mockUsers } from '../lib/mockUsers';
import { 
  mockEvents, 
  mockTasks, 
  mockBudgets, 
  mockSponsorships,
  mockNotifications,
  MockEvent,
  MockTask,
  MockBudget,
  MockSponsorship,
  MockNotification
} from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  users: User[];
  events: MockEvent[];
  tasks: MockTask[];
  budgets: MockBudget[];
  sponsorships: MockSponsorship[];
  notifications: MockNotification[];
  switchUser: (userId: string) => void;
  hasPermission: (permission: string) => boolean;
  canAccessContacts: () => boolean;
  canExport: () => boolean;
  canCreateEvents: () => boolean;
  canViewBudgets: () => boolean;
  canSendEmails: () => boolean;
  updateEvent: (eventId: string, updates: Partial<MockEvent>) => void;
  updateTask: (taskId: string, updates: Partial<MockTask>) => void;
  updateBudget: (budgetId: string, updates: Partial<MockBudget>) => void;
  updateSponsorship: (sponsorshipId: string, updates: Partial<MockSponsorship>) => void;
  createEvent: (event: Omit<MockEvent, 'id' | 'created_at'>) => void;
  createTask: (task: Omit<MockTask, 'id' | 'created_at'>) => void;
  createBudget: (budget: Omit<MockBudget, 'id'>) => void;
  createSponsorship: (sponsorship: Omit<MockSponsorship, 'id'>) => void;
  deleteEvent: (eventId: string) => void;
  deleteTask: (taskId: string) => void;
  deleteBudget: (budgetId: string) => void;
  deleteSponsorship: (sponsorshipId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<MockEvent[]>(mockEvents);
  const [tasks, setTasks] = useState<MockTask[]>(mockTasks);
  const [budgets, setBudgets] = useState<MockBudget[]>(mockBudgets);
  const [sponsorships, setSponsorships] = useState<MockSponsorship[]>(mockSponsorships);
  const [notifications, setNotifications] = useState<MockNotification[]>(mockNotifications);

  useEffect(() => {
    // Default to CEO user for demo
    setUser(mockUsers[0]);
  }, []);

  const switchUser = (userId: string) => {
    const newUser = mockUsers.find(u => u.id === userId);
    if (newUser) {
      setUser(newUser);
    }
  };

  // Data management functions
  const updateEvent = (eventId: string, updates: Partial<MockEvent>) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
  };

  const updateTask = (taskId: string, updates: Partial<MockTask>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const updateBudget = (budgetId: string, updates: Partial<MockBudget>) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === budgetId ? { ...budget, ...updates } : budget
    ));
  };

  const updateSponsorship = (sponsorshipId: string, updates: Partial<MockSponsorship>) => {
    setSponsorships(prev => prev.map(sponsorship => 
      sponsorship.id === sponsorshipId ? { ...sponsorship, ...updates } : sponsorship
    ));
  };

  const createEvent = (eventData: Omit<MockEvent, 'id' | 'created_at'>) => {
    const newEvent: MockEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const createTask = (taskData: Omit<MockTask, 'id' | 'created_at'>) => {
    const newTask: MockTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const createBudget = (budgetData: Omit<MockBudget, 'id'>) => {
    const newBudget: MockBudget = {
      ...budgetData,
      id: `budget-${Date.now()}`
    };
    setBudgets(prev => [...prev, newBudget]);
  };

  const createSponsorship = (sponsorshipData: Omit<MockSponsorship, 'id'>) => {
    const newSponsorship: MockSponsorship = {
      ...sponsorshipData,
      id: `sponsorship-${Date.now()}`
    };
    setSponsorships(prev => [...prev, newSponsorship]);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const deleteBudget = (budgetId: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== budgetId));
  };

  const deleteSponsorship = (sponsorshipId: string) => {
    setSponsorships(prev => prev.filter(sponsorship => sponsorship.id !== sponsorshipId));
  };
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const permissions = {
      'ceo': ['all'],
      'admin': ['contacts', 'export', 'view_budgets', 'send_emails', 'view_logs'],
      'marketing': ['send_emails', 'view_contacts_limited'],
      'ae': ['view_pod_events', 'view_assigned_budgets'],
      'designer': ['view_pod_tasks', 'upload_files'],
      'logistics': ['view_pod_tasks'],
      'it': ['create_events', 'view_budgets_readonly'],
      'team_lead': ['view_team_tasks', 'view_pod_overview'],
      'finance': []
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  };

  const canAccessContacts = (): boolean => {
    return ['ceo', 'admin'].includes(user?.role || '');
  };

  const canExport = (): boolean => {
    return ['ceo', 'admin'].includes(user?.role || '') || 
           ['mariam-admin', 'rana-admin'].includes(user?.id || '');
  };

  const canCreateEvents = (): boolean => {
    return user?.role === 'it';
  };

  const canViewBudgets = (): boolean => {
    return ['ceo', 'admin', 'ae', 'it'].includes(user?.role || '');
  };

  const canSendEmails = (): boolean => {
    return ['ceo', 'admin', 'marketing'].includes(user?.role || '');
  };

  return (
    <AuthContext.Provider value={{
      user,
      users: mockUsers,
      events,
      tasks,
      budgets,
      sponsorships,
      notifications,
      switchUser,
      hasPermission,
      canAccessContacts,
      canExport,
      canCreateEvents,
      canViewBudgets,
      canSendEmails,
      updateEvent,
      updateTask,
      updateBudget,
      updateSponsorship,
      createEvent,
      createTask,
      createBudget,
      createSponsorship,
      deleteEvent,
      deleteTask,
      deleteBudget,
      deleteSponsorship
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}