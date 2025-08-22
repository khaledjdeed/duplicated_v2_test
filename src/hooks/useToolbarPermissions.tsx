import { useMemo } from 'react';
import { useAuth } from './useAuth';

export interface Permission {
  action: 'read' | 'write' | 'delete' | 'admin';
  resource: string;
  condition?: (user: any) => boolean;
}

export interface AccessLevel {
  level: 'full' | 'readonly' | 'limited' | 'none';
  description: string;
  badge?: string;
}

export interface ToolbarSubTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRoles: string[];
  accessLevel: 'full' | 'readonly' | 'limited';
  badge?: string | number;
  description: string;
  permissions?: Permission[];
}

export interface ToolbarSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRoles: string[];
  subTabs: ToolbarSubTab[];
  order: number;
  color: string;
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
    ceo: { level: 'full', description: 'Complete financial oversight', badge: 'Full' },
    admin: { level: 'full', description: 'Administrative access to reports', badge: 'Full' },
    it: { level: 'readonly', description: 'System monitoring access', badge: 'Read' },
    ae: { level: 'limited', description: 'Event-specific budget data only', badge: 'Limited' },
    team_lead: { level: 'limited', description: 'Team budget overview', badge: 'Limited' },
    finance: { level: 'readonly', description: 'Data export only', badge: 'Read' }
  },
  'contact-directory': {
    ceo: { level: 'full', description: 'Complete contact management', badge: 'Full' },
    admin: { level: 'full', description: 'Contact administration', badge: 'Full' },
    marketing: { level: 'limited', description: 'Name and position only', badge: 'Limited' }
  },
  'user-management': {
    ceo: { level: 'full', description: 'Complete user administration', badge: 'Full' },
    admin: { level: 'full', description: 'User role management', badge: 'Full' },
    it: { level: 'full', description: 'Technical user management', badge: 'Full' }
  },
  'event-creation': {
    it: { level: 'full', description: 'Create and manage all events', badge: 'Full' },
    ceo: { level: 'full', description: 'Executive event oversight', badge: 'Full' },
    admin: { level: 'full', description: 'Administrative event management', badge: 'Full' }
  },
  'task-assignment': {
    ceo: { level: 'full', description: 'Assign tasks across all teams', badge: 'Full' },
    admin: { level: 'full', description: 'Administrative task management', badge: 'Full' },
    it: { level: 'full', description: 'Technical task coordination', badge: 'Full' },
    team_lead: { level: 'full', description: 'Team task management', badge: 'Full' },
    ae: { level: 'limited', description: 'Event-specific task assignment', badge: 'Limited' }
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
    return (sections: ToolbarSection[]): ToolbarSection[] => {
      if (!user) return [];
      
      return sections
        .filter(section => canAccessSection(section.requiredRoles))
        .map(section => ({
          ...section,
          subTabs: section.subTabs.filter((tab: ToolbarSubTab) => 
            canAccessSection(tab.requiredRoles)
          )
        }))
        .filter(section => section.subTabs.length > 0)
        .sort((a, b) => a.order - b.order);
    };
  }, [user, canAccessSection]);

  const getSubTabAccessLevel = useMemo(() => {
    return (subTab: ToolbarSubTab): AccessLevel => {
      if (!user) return { level: 'none', description: 'No access' };
      
      // Check for specific resource access rules
      const resourceAccess = getAccessLevel(subTab.id);
      if (resourceAccess.level !== 'full') return resourceAccess;
      
      // Default to sub-tab defined access level
      return {
        level: subTab.accessLevel,
        description: subTab.description,
        badge: subTab.accessLevel === 'readonly' ? 'Read' : 
               subTab.accessLevel === 'limited' ? 'Limited' : undefined
      };
    };
  }, [user, getAccessLevel]);

  return {
    hasPermission,
    getAccessLevel,
    canAccessSection,
    getVisibleSections,
    getSubTabAccessLevel,
    user
  };
};