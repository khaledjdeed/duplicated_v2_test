import React, { useState } from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth';
import { RoleSwitcher } from './RoleSwitcher';
import { 
  Calendar,
  Users,
  Settings,
  Bell,
  Menu,
  X,
  Home,
  ClipboardList,
  DollarSign,
  Upload,
  UserCog,
  AlertCircle,
  Target,
  BarChart3,
  Cog,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DemoLayout({ children, activeTab, onTabChange }: DemoLayoutProps) {
  const { currentUser } = useDemoAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
    ];

    const roleSpecificItems = [];

    if (currentUser?.role === 'it') {
      roleSpecificItems.push(
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'event-requests', label: 'Event Requests', icon: AlertCircle },
        { id: 'tasks', label: 'Tasks', icon: ClipboardList },
        { id: 'budgets', label: 'Budgets', icon: DollarSign },
        { id: 'sponsorships', label: 'Sponsorships', icon: Target },
        { id: 'users', label: 'User Management', icon: UserCog },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
        { id: 'dev-tools', label: 'Developer Tools', icon: Cog },
        { id: 'settings', label: 'System Settings', icon: Settings }
      );
    } else if (currentUser?.role === 'admin') {
      roleSpecificItems.push(
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'tasks', label: 'Tasks', icon: ClipboardList },
        { id: 'budgets', label: 'Budgets', icon: DollarSign },
        { id: 'sponsorships', label: 'Sponsorships', icon: Target },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
        { id: 'users', label: 'Team', icon: Users }
      );
    } else if (currentUser?.role === 'event_coordinator') {
      roleSpecificItems.push(
        { id: 'events', label: 'My Events', icon: Calendar },
        { id: 'event-requests', label: 'Request Event', icon: AlertCircle },
        { id: 'tasks', label: 'Tasks', icon: ClipboardList },
        { id: 'budgets', label: 'Budgets', icon: DollarSign },
        { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
        { id: 'logistics', label: 'Logistics', icon: Users }
      );
    } else if (currentUser?.role === 'designer') {
      roleSpecificItems.push(
        { id: 'tasks', label: 'My Tasks', icon: ClipboardList },
        { id: 'uploads', label: 'File Uploads', icon: Upload }
      );
    } else if (currentUser?.role === 'sales') {
      roleSpecificItems.push(
        { id: 'sponsorships', label: 'Sponsorships', icon: Target },
        { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
        { id: 'events', label: 'Events', icon: Calendar }
      );
    } else if (currentUser?.role === 'logistics') {
      roleSpecificItems.push(
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'events', label: 'Events', icon: Calendar }
      );
    }

    return [...baseItems, ...roleSpecificItems];
  };

  const navItems = getNavItems();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MCOpro
        </h1>
        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
          DEMO
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <RoleSwitcher />
      </div>

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
          <p>Demo Mode - No Authentication Required</p>
          <p>Switch roles above to test different permissions</p>
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
                MCOpro
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