import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Home,
  Calendar,
  Users,
  ClipboardList,
  DollarSign,
  Mail,
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
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { user, users, switchUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);

  const getNavItems = () => {
    if (!user) return [];

    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    const roleSpecificItems = [];

    switch (user.role) {
      case 'ceo':
        roleSpecificItems.push(
          { id: 'events', label: 'All Events', icon: Calendar },
          { id: 'pods', label: 'Pod Management', icon: Building2 },
          { id: 'budgets', label: 'Budget Overview', icon: DollarSign },
          { id: 'contacts', label: 'Contact Directory', icon: Users },
          { id: 'email-campaigns', label: 'Email Campaigns', icon: Mail },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
          { id: 'audit-logs', label: 'Audit Logs', icon: Shield },
          { id: 'settings', label: 'Settings', icon: Settings }
        );
        break;

      case 'admin':
        roleSpecificItems.push(
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'contacts', label: 'Contact Directory', icon: Users },
          { id: 'email-campaigns', label: 'Email Campaigns', icon: Mail },
          { id: 'budgets', label: 'Budgets', icon: DollarSign },
          { id: 'audit-logs', label: 'Audit Logs', icon: Shield },
          { id: 'user-management', label: 'User Management', icon: UserCog }
        );
        break;

      case 'marketing':
        roleSpecificItems.push(
          { id: 'email-campaigns', label: 'Email Campaigns', icon: Mail },
          { id: 'contacts', label: 'Contacts (Limited)', icon: Users },
          { id: 'analytics', label: 'Campaign Analytics', icon: BarChart3 }
        );
        break;

      case 'ae':
        roleSpecificItems.push(
          { id: 'my-events', label: 'My Events', icon: Calendar },
          { id: 'tasks', label: 'My Tasks', icon: ClipboardList },
          { id: 'event-requests', label: 'Request Event', icon: Bell },
          { id: 'budgets', label: 'Event Budgets', icon: DollarSign }
        );
        break;

      case 'designer':
        roleSpecificItems.push(
          { id: 'tasks', label: 'My Tasks', icon: ClipboardList },
          { id: 'uploads', label: 'File Uploads', icon: Upload },
          { id: 'pod-overview', label: 'Pod Overview', icon: Building2 }
        );
        break;

      case 'logistics':
        roleSpecificItems.push(
          { id: 'tasks', label: 'My Tasks', icon: ClipboardList },
          { id: 'pod-overview', label: 'Pod Overview', icon: Building2 }
        );
        break;

      case 'it':
        roleSpecificItems.push(
          { id: 'event-creation', label: 'Create Events', icon: Calendar },
          { id: 'event-requests', label: 'Event Requests', icon: Bell },
          { id: 'budgets', label: 'Budget Overview', icon: DollarSign },
          { id: 'system-settings', label: 'System Settings', icon: Settings }
        );
        break;

      case 'team_lead':
        roleSpecificItems.push(
          { id: 'team-tasks', label: 'Team Tasks', icon: ClipboardList },
          { id: 'pod-overview', label: 'Pod Overview', icon: Building2 },
          { id: 'team-analytics', label: 'Team Analytics', icon: BarChart3 }
        );
        break;

      case 'finance':
        // Finance role has no UI access as specified
        break;
    }

    return [...baseItems, ...roleSpecificItems];
  };

  const navItems = getNavItems();

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

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCO
          </h1>
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
            DEMO
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {user && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <button
              onClick={() => setShowUserSwitcher(!showUserSwitcher)}
              className="w-full flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
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
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>Demo Mode - Role-Based Access</p>
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
              className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl"
            >
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700">
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
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                DEMO
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