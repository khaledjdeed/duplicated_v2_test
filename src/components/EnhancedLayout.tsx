import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
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
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolbarSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRoles: string[];
  subTabs: ToolbarSubTab[];
  order: number;
  color: string;
}

interface ToolbarSubTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRoles: string[];
  accessLevel: 'full' | 'readonly' | 'limited';
  badge?: string | number;
  description?: string;
}

interface EnhancedLayoutProps {
  children: React.ReactNode;
}

export function EnhancedLayout({ children }: EnhancedLayoutProps) {
  const { user, users, switchUser, signOut } = useAuth();
  const { currentPage, navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);

  const toolbarSections: ToolbarSection[] = [
    {
      id: 'dashboard',
      label: 'Dashboard & Analytics',
      icon: Home,
      requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
      color: 'text-blue-600',
      order: 1,
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
          description: 'Approval workflows and requests'
        },
        {
          id: 'event-archives',
          label: 'Event Archives',
          icon: FileText,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
          accessLevel: 'readonly',
          description: 'Historical events and documentation'
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
      subTabs: [
        {
          id: 'tasks',
          label: 'Task Management',
          icon: ClipboardList,
          requiredRoles: ['ceo', 'admin', 'marketing', 'ae', 'designer', 'logistics', 'it', 'team_lead'],
          accessLevel: 'full',
          description: 'Assignment, tracking, priorities',
          badge: user?.role === 'designer' ? '3' : undefined
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
          id: 'logistics',
          label: 'Logistics Coordination',
          icon: Target,
          requiredRoles: ['ceo', 'admin', 'logistics', 'it', 'team_lead'],
          accessLevel: user?.role === 'logistics' ? 'full' : 'readonly',
          description: 'Vendor management and supplies'
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
      subTabs: [
        {
          id: 'contacts',
          label: 'Contact Directory',
          icon: Users,
          requiredRoles: ['ceo', 'admin'],
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
    if (!user) return [];
    
    return toolbarSections
      .filter(section => section.requiredRoles.includes(user.role))
      .map(section => ({
        ...section,
        subTabs: section.subTabs.filter(tab => tab.requiredRoles.includes(user.role))
      }))
      .filter(section => section.subTabs.length > 0)
      .sort((a, b) => a.order - b.order);
  }, [user, toolbarSections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'ceo': 'bg-purple-100 text-purple-800 border-purple-200',
      'admin': 'bg-red-100 text-red-800 border-red-200',
      'marketing': 'bg-blue-100 text-blue-800 border-blue-200',
      'ae': 'bg-green-100 text-green-800 border-green-200',
      'designer': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'logistics': 'bg-orange-100 text-orange-800 border-orange-200',
      'it': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'team_lead': 'bg-pink-100 text-pink-800 border-pink-200',
      'finance': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAccessLevelBadge = (accessLevel: string) => {
    switch (accessLevel) {
      case 'readonly':
        return <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded ml-2">Read</span>;
      case 'limited':
        return <span className="text-xs bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded ml-2">Limited</span>;
      default:
        return null;
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCO
          </h1>
          <span className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded-full font-medium">
            PRO
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
              className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.full_name}
                </p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                  {user.role.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
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
                      className="w-full flex items-center space-x-3 p-3 rounded-md text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
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
        <nav className="space-y-2">
          {filteredSections.map((section) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <SectionIcon className={`h-5 w-5 ${section.color}`} />
                    <span>{section.label}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {/* Sub-tabs */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 space-y-1 overflow-hidden"
                    >
                      {section.subTabs.map((tab) => {
                        const TabIcon = tab.icon;
                        const isActive = currentPage === tab.id;
                        
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              navigateTo(tab.id);
                              setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-accent-100 text-accent-800 border-l-3 border-accent-600 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                            title={tab.description}
                          >
                            <div className="flex items-center space-x-3">
                              <TabIcon className="h-4 w-4" />
                              <span>{tab.label}</span>
                              {getAccessLevelBadge(tab.accessLevel)}
                            </div>
                            {tab.badge && (
                              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {tab.badge}
                              </span>
                            )}
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
          <p>Enhanced Role-Based Interface</p>
          <p>Switch users above to test permissions</p>
        </div>
      </div>
    </div>
  );

  if (user?.role === 'finance') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No UI Access
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Finance role has data-only access as per organizational policy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 h-full w-80 shadow-xl"
            >
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-80 shadow-sm border-r border-gray-200 dark:border-gray-700">
          {sidebarContent}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MCO
              </h1>
              <span className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded-full font-medium">
                PRO
              </span>
            </div>
            <div className="w-10" />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}