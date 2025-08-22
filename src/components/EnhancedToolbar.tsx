import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
import { useToolbarPermissions, ToolbarSection, ToolbarSubTab } from '../hooks/useToolbarPermissions';
import { 
  Home,
  Calendar,
  Users,
  ClipboardList,
  DollarSign,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Upload,
  BarChart3,
  Brain,
  Shield,
  UserCog,
  Building2,
  TrendingUp,
  FileText,
  Target,
  Mail,
  Zap,
  Database,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Activity,
  PieChart,
  LineChart,
  MapPin,
  Award,
  Globe,
  Lock,
  Server,
  Monitor,
  Cpu,
  HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedToolbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showUserSwitcher: boolean;
  setShowUserSwitcher: (show: boolean) => void;
}

export function EnhancedToolbar({ 
  sidebarOpen, 
  setSidebarOpen, 
  showUserSwitcher, 
  setShowUserSwitcher 
}: EnhancedToolbarProps) {
  const { user, users, switchUser, signOut } = useAuth();
  const { currentPage, navigateTo } = useNavigation();
  const { getVisibleSections, getSubTabAccessLevel, canAccessSection } = useToolbarPermissions();
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);

  const toolbarSections: ToolbarSection[] = [
    {
      id: 'dashboard',
      label: 'Dashboard & Analytics',
      icon: Home,
      requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
      color: 'text-blue-600',
      order: 1,
      description: 'Real-time insights and performance metrics',
      subTabs: [
        {
          id: 'dashboard',
          label: 'Overview Dashboard',
          icon: Home,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
          accessLevel: 'full',
          description: 'Real-time KPIs and system status'
        },
        {
          id: 'analytics',
          label: 'Performance Analytics',
          icon: BarChart3,
          requiredRoles: ['ceo', 'admin', 'marketing', 'it', 'team_lead'],
          accessLevel: user?.role === 'ceo' || user?.role === 'admin' || user?.role === 'it' ? 'full' : 'readonly',
          description: 'Event metrics and ROI analysis'
        },
        {
          id: 'financial-reports',
          label: 'Financial Reports',
          icon: TrendingUp,
          requiredRoles: ['ceo', 'admin', 'it'],
          accessLevel: 'full',
          description: 'Budget tracking and revenue analysis'
        },
        {
          id: 'team-analytics',
          label: 'Team Analytics',
          icon: Users,
          requiredRoles: ['ceo', 'admin', 'it', 'team_lead'],
          accessLevel: user?.role === 'team_lead' ? 'limited' : 'full',
          description: 'Productivity and task completion metrics'
        },
        {
          id: 'custom-reports',
          label: 'Custom Reports',
          icon: PieChart,
          requiredRoles: ['ceo', 'admin', 'it'],
          accessLevel: 'full',
          description: 'Configurable reporting tools'
        }
      ]
    },
    {
      id: 'events',
      label: 'Event Management',
      icon: Calendar,
      requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
      color: 'text-green-600',
      order: 2,
      description: 'Complete event lifecycle management',
      subTabs: [
        {
          id: 'events',
          label: 'Events Calendar',
          icon: Calendar,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'it', 'team_lead'],
          accessLevel: user?.role === 'designer' || user?.role === 'logistics' ? 'readonly' : 'full',
          description: 'Calendar view with event scheduling'
        },
        {
          id: 'event-planning',
          label: 'Event Planning',
          icon: ClipboardList,
          requiredRoles: ['ceo', 'admin', 'ae', 'it', 'team_lead'],
          accessLevel: user?.role === 'marketing' || user?.role === 'designer' || user?.role === 'logistics' ? 'readonly' : 'full',
          description: 'Event creation and workflows'
        },
        {
          id: 'event-requests',
          label: 'Event Requests',
          icon: Bell,
          requiredRoles: ['ceo', 'admin', 'ae', 'it'],
          accessLevel: user?.role === 'team_lead' ? 'readonly' : 'full',
          description: 'Approval workflows and requests',
          badge: user?.role === 'it' ? '3' : undefined
        },
        {
          id: 'event-archives',
          label: 'Event Archives',
          icon: FileText,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
          accessLevel: 'readonly',
          description: 'Historical events and documentation'
        },
        {
          id: 'venue-management',
          label: 'Venue Management',
          icon: MapPin,
          requiredRoles: ['ceo', 'admin', 'logistics', 'it'],
          accessLevel: user?.role === 'logistics' ? 'full' : 'readonly',
          description: 'Location booking and coordination'
        }
      ]
    },
    {
      id: 'operations',
      label: 'Operations & Tasks',
      icon: ClipboardList,
      requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
      color: 'text-purple-600',
      order: 3,
      description: 'Task management and team coordination',
      subTabs: [
        {
          id: 'tasks',
          label: 'Task Management',
          icon: ClipboardList,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
          accessLevel: 'full',
          description: 'Assignment, tracking, priorities',
          badge: user?.role === 'designer' ? '3' : user?.role === 'team_lead' ? '8' : undefined
        },
        {
          id: 'team-collaboration',
          label: 'Team Collaboration',
          icon: Users,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
          accessLevel: 'full',
          description: 'Communication and file sharing'
        },
        {
          id: 'uploads',
          label: 'File Management',
          icon: Upload,
          requiredRoles: ['designer', 'ceo', 'admin', 'it'],
          accessLevel: user?.role === 'designer' ? 'full' : 'readonly',
          description: 'File uploads and document management'
        },
        {
          id: 'resource-planning',
          label: 'Resource Planning',
          icon: Target,
          requiredRoles: ['ceo', 'admin', 'logistics', 'it', 'team_lead'],
          accessLevel: user?.role === 'logistics' ? 'full' : 'readonly',
          description: 'Equipment and staff allocation'
        },
        {
          id: 'quality-assurance',
          label: 'Quality Assurance',
          icon: Award,
          requiredRoles: ['ceo', 'admin', 'logistics', 'it', 'team_lead'],
          accessLevel: user?.role === 'logistics' ? 'full' : 'readonly',
          description: 'Checklists and compliance tracking'
        }
      ]
    },
    {
      id: 'business',
      label: 'Business Intelligence',
      icon: Brain,
      requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'it', 'team_lead'],
      color: 'text-orange-600',
      order: 4,
      description: 'Strategic insights and relationship management',
      subTabs: [
        {
          id: 'contacts',
          label: 'Contact Directory',
          icon: Users,
          requiredRoles: ['ceo', 'admin', 'marketing'],
          accessLevel: user?.role === 'marketing' ? 'limited' : 'full',
          description: 'Healthcare professional database'
        },
        {
          id: 'sponsorships',
          label: 'Sponsorship Pipeline',
          icon: Target,
          requiredRoles: ['ceo', 'admin', 'ae'],
          accessLevel: user?.role === 'marketing' || user?.role === 'team_lead' ? 'readonly' : 'full',
          description: 'Sales funnel and relationships'
        },
        {
          id: 'marketing-campaigns',
          label: 'Marketing Campaigns',
          icon: Mail,
          requiredRoles: ['ceo', 'admin', 'marketing'],
          accessLevel: user?.role === 'ae' || user?.role === 'designer' || user?.role === 'team_lead' ? 'readonly' : 'full',
          description: 'Promotion tracking and engagement'
        },
        {
          id: 'budgets',
          label: 'Budget Management',
          icon: DollarSign,
          requiredRoles: ['ceo', 'admin', 'ae', 'it'],
          accessLevel: user?.role === 'ae' || user?.role === 'team_lead' ? 'limited' : 'full',
          description: 'Financial planning and tracking'
        },
        {
          id: 'ai-assistant',
          label: 'AI Insights',
          icon: Brain,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'it', 'team_lead'],
          accessLevel: 'full',
          description: 'Predictive analytics and recommendations'
        }
      ]
    },
    {
      id: 'administration',
      label: 'System Administration',
      icon: Settings,
      requiredRoles: ['ceo', 'admin', 'it'],
      color: 'text-red-600',
      order: 5,
      description: 'System configuration and security',
      subTabs: [
        {
          id: 'teams',
          label: 'User Management',
          icon: UserCog,
          requiredRoles: ['ceo', 'admin', 'it'],
          accessLevel: 'full',
          description: 'Role assignments and permissions'
        },
        {
          id: 'settings',
          label: 'System Settings',
          icon: Settings,
          requiredRoles: ['ceo', 'admin', 'it'],
          accessLevel: 'full',
          description: 'Configuration and preferences'
        },
        {
          id: 'audit-logs',
          label: 'Security & Audit',
          icon: Shield,
          requiredRoles: ['ceo', 'admin', 'it'],
          accessLevel: 'full',
          description: 'Access logs and compliance'
        },
        {
          id: 'integrations',
          label: 'Integration Hub',
          icon: Zap,
          requiredRoles: ['ceo', 'it'],
          accessLevel: 'full',
          description: 'Third-party connections and APIs'
        },
        {
          id: 'support',
          label: 'Support Center',
          icon: HelpCircle,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
          accessLevel: 'full',
          description: 'Help desk and documentation'
        }
      ]
    }
  ];

  const filteredSections = useMemo(() => {
    return getVisibleSections(toolbarSections);
  }, [getVisibleSections, toolbarSections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'ceo': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      'admin': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
      'marketing': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      'ae': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
      'designer': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
      'logistics': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
      'it': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700',
      'team_lead': 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700',
      'finance': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAccessLevelBadge = (subTab: ToolbarSubTab) => {
    const accessLevel = getSubTabAccessLevel(subTab);
    
    if (accessLevel.level === 'readonly') {
      return <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-1.5 py-0.5 rounded ml-2">Read</span>;
    }
    if (accessLevel.level === 'limited') {
      return <span className="text-xs bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 px-1.5 py-0.5 rounded ml-2">Limited</span>;
    }
    return null;
  };

  const getNotificationCount = (tabId: string): number => {
    const counts = {
      'event-requests': user?.role === 'it' ? 3 : 0,
      'tasks': user?.role === 'designer' ? 3 : user?.role === 'team_lead' ? 8 : 0,
      'audit-logs': user?.role === 'admin' ? 2 : 0
    };
    return counts[tabId as keyof typeof counts] || 0;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 enhanced-toolbar">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCO
          </h1>
          <span className="text-xs bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300 px-2 py-1 rounded-full font-medium">
            PRO
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <button
              onClick={() => setShowUserSwitcher(!showUserSwitcher)}
              className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 focus:ring-2 focus:ring-accent-500 focus:outline-none"
              aria-expanded={showUserSwitcher}
              aria-haspopup="true"
            >
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.full_name}
                </p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                  {user.role.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showUserSwitcher ? 'rotate-180' : ''}`} />
            </button>

            {showUserSwitcher && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                    Switch Demo User
                  </div>
                  {users.map((demoUser) => (
                    <button
                      key={demoUser.id}
                      onClick={() => {
                        switchUser(demoUser.id);
                        setShowUserSwitcher(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-md text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        user.id === demoUser.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <img
                        src={demoUser.avatar_url}
                        alt={demoUser.full_name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {demoUser.full_name}
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(demoUser.role)}`}>
                          {demoUser.role.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      {user.id === demoUser.id && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserSwitcher(false);
                      }}
                      className="w-full flex items-center space-x-3 p-3 rounded-md text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2" role="navigation" aria-label="Main navigation">
          {filteredSections.map((section) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 toolbar-section-header focus:ring-2 focus:ring-accent-500 focus:outline-none"
                  aria-expanded={isExpanded}
                  aria-controls={`section-${section.id}`}
                  title={section.description}
                >
                  <div className="flex items-center space-x-3">
                    <SectionIcon className={`h-5 w-5 ${section.color}`} />
                    <span>{section.label}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                  )}
                </button>

                {/* Sub-tabs */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`section-${section.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="ml-6 space-y-1 overflow-hidden"
                    >
                      {section.subTabs.map((tab) => {
                        const TabIcon = tab.icon;
                        const isActive = currentPage === tab.id;
                        const accessLevel = getSubTabAccessLevel(tab);
                        const notificationCount = getNotificationCount(tab.id);
                        
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              navigateTo(tab.id);
                              setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 toolbar-subtab focus:ring-2 focus:ring-accent-500 focus:outline-none ${
                              isActive
                                ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300 border-l-3 border-accent-600 font-medium shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            } ${accessLevel.level === 'readonly' ? 'toolbar-subtab-readonly' : ''} ${accessLevel.level === 'limited' ? 'toolbar-subtab-limited' : ''}`}
                            title={tab.description}
                            data-access-level={accessLevel.level}
                            data-role={user?.role}
                          >
                            <div className="flex items-center space-x-3">
                              <TabIcon className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{tab.label}</span>
                              {getAccessLevelBadge(tab)}
                            </div>
                            <div className="flex items-center space-x-1">
                              {notificationCount > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                                  {notificationCount > 9 ? '9+' : notificationCount}
                                </span>
                              )}
                              {tab.badge && typeof tab.badge === 'string' && (
                                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-medium">
                                  {tab.badge}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <div className="flex items-center justify-between">
            <span>Enhanced Role-Based Interface</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
          <p>Switch users above to test permissions</p>
        </div>
      </div>
    </div>
  );
}