import React, { useState } from 'react';
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
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, users, switchUser } = useAuth();
  const { currentPage, navigateTo } = useNavigation();
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
          { id: 'events', label: 'Events Calendar', icon: Calendar },
          { id: 'teams', label: 'Manage Tasks & Teams', icon: Building2 },
          { id: 'budgets', label: 'Financial Overview', icon: DollarSign },
          { id: 'event-requests', label: 'Request Events', icon: Bell },
          { id: 'contacts', label: 'Contact Directory', icon: Users },
          { id: 'uploads', label: 'Manage Uploads', icon: Upload },
          { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
          { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
          { id: 'audit-logs', label: 'Audit Logs', icon: Shield },
          { id: 'settings', label: 'System Settings', icon: Settings }
        );
        break;

      case 'administrator':
        roleSpecificItems.push(
          { id: 'events', label: 'Events Calendar', icon: Calendar },
          { id: 'teams', label: 'Manage Users & Teams', icon: Building2 },
          { id: 'tasks', label: 'Create & Assign Tasks', icon: ClipboardList },
          { id: 'budgets', label: 'Financial Overview', icon: DollarSign },
          { id: 'contacts', label: 'Contact Directory', icon: Users },
          { id: 'uploads', label: 'Manage Uploads', icon: Upload },
          { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
          { id: 'audit-logs', label: 'Audit Logs', icon: Shield },
          { id: 'settings', label: 'System Settings', icon: Settings }
        );
        break;

      case 'accountant':
        roleSpecificItems.push(
          { id: 'budgets', label: 'Budget Tasks', icon: DollarSign },
          { id: 'analytics', label: 'Financial Analytics', icon: BarChart3 }
        );
        break;

      case 'head_of_design':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Assign Tasks', icon: ClipboardList },
          { id: 'uploads', label: 'Manage Uploads', icon: Upload },
          { id: 'teams', label: 'Design Team', icon: Building2 },
          { id: 'analytics', label: 'Team Analytics', icon: BarChart3 }
        );
        break;

      case 'designer':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Update Tasks', icon: ClipboardList },
          { id: 'uploads', label: 'Upload Files', icon: Upload }
        );
        break;

      case 'it_manager':
        roleSpecificItems.push(
          { id: 'events', label: 'Events Calendar', icon: Calendar },
          { id: 'event-requests', label: 'Approve Events (2/day)', icon: Bell },
          { id: 'teams', label: 'Manage Users & Roles', icon: Building2 },
          { id: 'tasks', label: 'Manage Tasks', icon: ClipboardList },
          { id: 'uploads', label: 'Manage Uploads', icon: Upload },
          { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
          { id: 'audit-logs', label: 'Audit Logs', icon: Shield },
          { id: 'settings', label: 'System Settings', icon: Settings }
        );
        break;

      case 'it_technical_staff':
        roleSpecificItems.push(
          { id: 'events', label: 'Events Calendar', icon: Calendar },
          { id: 'event-requests', label: 'Approve Events (2/day)', icon: Bell },
          { id: 'tasks', label: 'View Tasks', icon: ClipboardList },
          { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
          { id: 'audit-logs', label: 'Audit Logs', icon: Shield }
        );
        break;

      case 'team_lead':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Create & Assign Tasks', icon: ClipboardList },
          { id: 'events', label: 'Manage Team Events', icon: Calendar },
          { id: 'uploads', label: 'Manage Uploads', icon: Upload },
          { id: 'budgets', label: 'Team Budgets', icon: DollarSign },
          { id: 'analytics', label: 'Team Analytics', icon: BarChart3 }
        );
        break;

      case 'event_coordinator':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Manage Tasks', icon: ClipboardList },
          { id: 'event-requests', label: 'Request Event', icon: Bell },
          { id: 'uploads', label: 'Manage Uploads', icon: Upload },
          { id: 'events', label: 'Team Events', icon: Calendar },
          { id: 'analytics', label: 'Team Analytics', icon: BarChart3 }
        );
        break;

      case 'marketing_staff':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Plan Campaigns', icon: ClipboardList },
          { id: 'contacts', label: 'Contacts (Limited)', icon: Users },
          { id: 'analytics', label: 'Marketing Analytics', icon: BarChart3 }
        );
        break;

      case 'logistics_staff':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Update Tasks', icon: ClipboardList },
          { id: 'events', label: 'Team Events', icon: Calendar }
        );
        break;

      case 'sales_representative':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Update Tasks', icon: ClipboardList },
          { id: 'sponsorships', label: 'View Sponsorships', icon: Target },
          { id: 'budgets', label: 'Request Budgets', icon: DollarSign }
        );
        break;

      case 'production_staff':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Update Tasks', icon: ClipboardList },
          { id: 'events', label: 'Team Events', icon: Calendar }
        );
        break;

      case 'accreditation_staff':
        roleSpecificItems.push(
          { id: 'tasks', label: 'Update Tasks', icon: ClipboardList },
          { id: 'events', label: 'Team Events', icon: Calendar }
        );
        break;
    }

    return [...baseItems, ...roleSpecificItems];
  };

  const navItems = getNavItems();

  const getRoleColor = (role: string) => {
    const colors = {
      'ceo': 'bg-purple-100 text-purple-800 border-purple-200',
      'administrator': 'bg-red-100 text-red-800 border-red-200',
      'accountant': 'bg-green-100 text-green-800 border-green-200',
      'head_of_design': 'bg-pink-100 text-pink-800 border-pink-200',
      'designer': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'it_manager': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'it_technical_staff': 'bg-blue-100 text-blue-800 border-blue-200',
      'team_lead': 'bg-orange-100 text-orange-800 border-orange-200',
      'event_coordinator': 'bg-teal-100 text-teal-800 border-teal-200',
      'marketing_staff': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'logistics_staff': 'bg-amber-100 text-amber-800 border-amber-200',
      'sales_representative': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'production_staff': 'bg-slate-100 text-slate-800 border-slate-200',
      'accreditation_staff': 'bg-violet-100 text-violet-800 border-violet-200'
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
          <span className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded-full font-medium">
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
                  {user.role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                          {demoUser.role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                  navigateTo(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === item.id
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
              <span className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded-full font-medium">
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