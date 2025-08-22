import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

export interface Permission {
  action: 'read' | 'write' | 'delete' | 'admin';
  resource: string;
  condition?: (user: any) => boolean;
}

export interface AccessLevel {
  level: 'full' | 'readonly' | 'limited' | 'none';
  description: string;
}

// Role-based permission matrix
const ROLE_PERMISSIONS: Record<string, string[]> = {
  ceo: ['admin'], // CEO has all permissions
  admin: ['read', 'write', 'delete'],
  marketing: ['read', 'write'],
  ae: ['read', 'write'],
  designer: ['read', 'write'],
  logistics: ['read', 'write'],
  it: ['admin'],
  team_lead: ['read', 'write'],
  finance: ['read'] // Finance has data-only access
};

// Resource-specific access control
const RESOURCE_ACCESS: Record<string, Record<string, AccessLevel>> = {
  'financial-reports': {
    ceo: { level: 'full', description: 'Complete financial oversight' },
    admin: { level: 'full', description: 'Administrative access to reports' },
    it: { level: 'readonly', description: 'System monitoring access' },
    ae: { level: 'limited', description: 'Event-specific budget data only' },
    team_lead: { level: 'limited', description: 'Team budget overview' },
    finance: { level: 'readonly', description: 'Data export only' }
  },
  'contact-directory': {
    ceo: { level: 'full', description: 'Complete contact management' },
    admin: { level: 'full', description: 'Contact administration' },
    marketing: { level: 'limited', description: 'Name and position only' }
  },
  'user-management': {
    ceo: { level: 'full', description: 'Complete user administration' },
    admin: { level: 'full', description: 'User role management' },
    it: { level: 'full', description: 'Technical user management' }
  },
  'event-creation': {
    it: { level: 'full', description: 'Create and manage all events' },
    ceo: { level: 'full', description: 'Executive event oversight' },
    admin: { level: 'full', description: 'Administrative event management' }
  },
  'task-assignment': {
    ceo: { level: 'full', description: 'Assign tasks across all teams' },
    admin: { level: 'full', description: 'Administrative task management' },
    it: { level: 'full', description: 'Technical task coordination' },
    team_lead: { level: 'full', description: 'Team task management' },
    ae: { level: 'limited', description: 'Event-specific task assignment' }
  }
};

export const useToolbarPermissions = () => {
  const { user } = useAuth();

  const hasPermission = useMemo(() => {
    return (permission: Permission): boolean => {
      if (!user) return false;

      // Get role-based permissions
      const rolePermissions = ROLE_PERMISSIONS[user.role] || [];
      
      // Check if user has admin access (overrides all)
      if (rolePermissions.includes('admin')) return true;
      
      // Check if user has required permission level
      const hasBasePermission = rolePermissions.includes(permission.action);
      
      // Apply conditional logic if present
      if (permission.condition) {
        return hasBasePermission && permission.condition(user);
      }
      
      return hasBasePermission;
    };
  }, [user]);

  const getAccessLevel = useMemo(() => {
    return (resource: string): AccessLevel => {
      if (!user) return { level: 'none', description: 'No access' };
      
      const resourceAccess = RESOURCE_ACCESS[resource];
      if (!resourceAccess) return { level: 'full', description: 'Default access' };
      
      return resourceAccess[user.role] || { level: 'none', description: 'No access' };
    };
  }, [user]);

  const canAccessSection = useMemo(() => {
    return (requiredRoles: string[]): boolean => {
      if (!user) return false;
      return requiredRoles.includes(user.role);
    };
  }, [user]);

  const getVisibleSections = useMemo(() => {
    return (sections: any[]): any[] => {
      if (!user) return [];
      
      return sections
        .filter(section => canAccessSection(section.requiredRoles))
        .map(section => ({
          ...section,
          subTabs: section.subTabs.filter((tab: any) => 
            canAccessSection(tab.requiredRoles)
          )
        }))
        .filter(section => section.subTabs.length > 0);
    };
  }, [user, canAccessSection]);

  return {
    hasPermission,
    getAccessLevel,
    canAccessSection,
    getVisibleSections,
    user
  };
};