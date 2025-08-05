import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/types';
import { mockUsers, getCurrentUser } from '../lib/mockUsers';
import { getSponsorshipsByAssignedTo, getTasksByUserId, getEventsByTeamId } from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  users: User[];
  switchUser: (userId: string) => void;
  signIn: (username: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, username: string, fullName: string, role: string) => Promise<{ error?: any }>;
  signOut: () => void;
  
  // Permission checking functions
  hasPermission: (permission: string) => boolean;
  
  // Specific permission functions based on RBAC
  canRequestEvents: () => boolean;
  canApproveEvents: () => boolean;
  canCreateEvents: () => boolean;
  canViewAllEvents: () => boolean;
  canViewTeamEvents: () => boolean;
  
  canCreateAssignTasksAll: () => boolean;
  canCreateAssignTasksTeam: () => boolean;
  canUpdateAssignedTasks: () => boolean;
  canViewAllTasks: () => boolean;
  canViewTeamTasks: () => boolean;
  
  canViewBudgetsFull: () => boolean;
  canViewBudgetsAssignedSponsors: () => boolean;
  canViewBudgetsTeamEvents: () => boolean;
  
  canManageAllUploads: () => boolean;
  canManageOwnUploads: () => boolean;
  
  canAccessContactsFull: () => boolean;
  canAccessContactsLimited: () => boolean;
  
  canViewAuditLogs: () => boolean;
  canManageSystemSettings: () => boolean;
  canManageUsers: () => boolean;
  canExportData: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const switchUser = (userId: string) => {
    const newUser = mockUsers.find(u => u.id === userId);
    if (newUser) {
      setUser(newUser);
    }
  };

  const signIn = async (username: string, password: string) => {
    // Mock authentication - in production this would use Supabase auth
    const foundUser = mockUsers.find(u => 
      u.email.split('@')[0] === username || u.full_name.toLowerCase().includes(username.toLowerCase())
    );
    
    if (foundUser) {
      setUser(foundUser);
      return { error: null };
    }
    
    return { error: { message: 'Invalid credentials' } };
  };

  const signUp = async (email: string, password: string, username: string, fullName: string, role: string) => {
    // Mock sign up - in production this would use Supabase auth
    return { error: null };
  };

  const signOut = () => {
    setUser(null);
  };

  // Core permission checking
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const rolePermissions = {
      'ceo': [
        'view_events_all', 'request_events', 'view_budgets_full', 'manage_tasks_all', 
        'manage_uploads_all', 'access_contacts_full', 'view_audit_logs', 'manage_system_settings',
        'manage_users', 'export_data', 'view_analytics_all'
      ],
      'administrator': [
        'view_events_all', 'view_budgets_full', 'manage_tasks_all', 'manage_uploads_all',
        'access_contacts_full', 'view_audit_logs', 'manage_users', 'export_data', 'view_analytics_all'
      ],
      'accountant': [
        'view_budgets_full', 'export_data', 'view_analytics_financial'
      ],
      'head_of_design': [
        'view_events_team', 'manage_tasks_team', 'manage_uploads_all', 'view_budgets_team_events',
        'view_analytics_team'
      ],
      'designer': [
        'view_events_team', 'update_tasks_assigned', 'manage_uploads_own'
      ],
      'it_manager': [
        'view_events_all', 'approve_events', 'create_events', 'manage_tasks_all', 'manage_uploads_all',
        'view_audit_logs', 'manage_system_settings', 'manage_users', 'view_analytics_all'
      ],
      'it_technical_staff': [
        'view_events_all', 'approve_events', 'create_events', 'manage_tasks_all', 'manage_uploads_all',
        'view_audit_logs', 'view_analytics_all'
      ],
      'team_lead': [
        'view_events_team', 'manage_tasks_team', 'manage_uploads_all', 'view_budgets_team_events',
        'view_analytics_team'
      ],
      'event_coordinator': [
        'view_events_team', 'request_events', 'manage_tasks_team', 'manage_uploads_all',
        'view_analytics_team'
      ],
      'marketing_staff': [
        'view_events_team', 'manage_tasks_team', 'access_contacts_limited', 'view_analytics_marketing'
      ],
      'logistics_staff': [
        'view_events_team', 'update_tasks_assigned'
      ],
      'sales_representative': [
        'view_events_team', 'update_tasks_assigned', 'view_budgets_assigned_sponsors'
      ],
      'production_staff': [
        'view_events_team', 'update_tasks_assigned'
      ],
      'accreditation_staff': [
        'view_events_team', 'update_tasks_assigned'
      ]
    };

    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission);
  };

  // Event permissions
  const canRequestEvents = (): boolean => {
    return hasPermission('request_events');
  };

  const canApproveEvents = (): boolean => {
    return hasPermission('approve_events');
  };

  const canCreateEvents = (): boolean => {
    return hasPermission('create_events');
  };

  const canViewAllEvents = (): boolean => {
    return hasPermission('view_events_all');
  };

  const canViewTeamEvents = (): boolean => {
    return hasPermission('view_events_team');
  };

  // Task permissions
  const canCreateAssignTasksAll = (): boolean => {
    return hasPermission('manage_tasks_all');
  };

  const canCreateAssignTasksTeam = (): boolean => {
    return hasPermission('manage_tasks_team');
  };

  const canUpdateAssignedTasks = (): boolean => {
    return hasPermission('update_tasks_assigned');
  };

  const canViewAllTasks = (): boolean => {
    return hasPermission('manage_tasks_all');
  };

  const canViewTeamTasks = (): boolean => {
    return hasPermission('manage_tasks_team') || hasPermission('update_tasks_assigned');
  };

  // Budget permissions
  const canViewBudgetsFull = (): boolean => {
    return hasPermission('view_budgets_full');
  };

  const canViewBudgetsAssignedSponsors = (): boolean => {
    return hasPermission('view_budgets_assigned_sponsors');
  };

  const canViewBudgetsTeamEvents = (): boolean => {
    return hasPermission('view_budgets_team_events');
  };

  // Upload permissions
  const canManageAllUploads = (): boolean => {
    return hasPermission('manage_uploads_all');
  };

  const canManageOwnUploads = (): boolean => {
    return hasPermission('manage_uploads_own');
  };

  // Contact permissions
  const canAccessContactsFull = (): boolean => {
    return hasPermission('access_contacts_full');
  };

  const canAccessContactsLimited = (): boolean => {
    return hasPermission('access_contacts_limited');
  };

  // System permissions
  const canViewAuditLogs = (): boolean => {
    return hasPermission('view_audit_logs');
  };

  const canManageSystemSettings = (): boolean => {
    return hasPermission('manage_system_settings');
  };

  const canManageUsers = (): boolean => {
    return hasPermission('manage_users');
  };

  const canExportData = (): boolean => {
    return hasPermission('export_data');
  };

  // Helper functions for data filtering
  const getFilteredEvents = () => {
    if (!user) return [];
    
    if (canViewAllEvents()) {
      return mockEvents;
    } else if (canViewTeamEvents()) {
      return getEventsByTeamId(user.team_id || '');
    }
    
    return [];
  };

  const getFilteredTasks = () => {
    if (!user) return [];
    
    if (canViewAllTasks()) {
      return mockTasks;
    } else if (canViewTeamTasks()) {
      if (canCreateAssignTasksTeam()) {
        return getTasksByTeamId(user.team_id || '');
      } else {
        return getTasksByUserId(user.id);
      }
    }
    
    return [];
  };

  const getFilteredSponsorships = () => {
    if (!user) return [];
    
    if (['ceo', 'administrator'].includes(user.role)) {
      return mockSponsorships;
    } else if (user.role === 'sales_representative') {
      return getSponsorshipsByAssignedTo(user.id);
    }
    
    return [];
  };

  return (
    <AuthContext.Provider value={{
      user,
      users: mockUsers,
      switchUser,
      signIn,
      signUp,
      signOut,
      hasPermission,
      canRequestEvents,
      canApproveEvents,
      canCreateEvents,
      canViewAllEvents,
      canViewTeamEvents,
      canCreateAssignTasksAll,
      canCreateAssignTasksTeam,
      canUpdateAssignedTasks,
      canViewAllTasks,
      canViewTeamTasks,
      canViewBudgetsFull,
      canViewBudgetsAssignedSponsors,
      canViewBudgetsTeamEvents,
      canManageAllUploads,
      canManageOwnUploads,
      canAccessContactsFull,
      canAccessContactsLimited,
      canViewAuditLogs,
      canManageSystemSettings,
      canManageUsers,
      canExportData
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