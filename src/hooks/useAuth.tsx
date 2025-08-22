import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/types';
import { mockUsers, getCurrentUser } from '../lib/mockUsers';

interface AuthContextType {
  user: User | null;
  users: User[];
  switchUser: (userId: string) => void;
  signOut: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessContacts: () => boolean;
  canExport: () => boolean;
  canCreateEvents: () => boolean;
  canViewBudgets: () => boolean;
  canSendEmails: () => boolean;
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

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      users: mockUsers,
      switchUser,
      signOut,
      hasPermission,
      canAccessContacts,
      canExport,
      canCreateEvents,
      canViewBudgets,
      canSendEmails
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