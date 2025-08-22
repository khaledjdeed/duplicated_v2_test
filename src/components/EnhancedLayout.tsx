import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedToolbar } from './EnhancedToolbar';

interface EnhancedLayoutProps {
  children: React.ReactNode;
}

export function EnhancedLayout({ children }: EnhancedLayoutProps) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);

  // Finance role has no UI access
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
              className="absolute left-0 top-0 h-full w-80 shadow-xl z-50"
            >
              <EnhancedToolbar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                showUserSwitcher={showUserSwitcher}
                setShowUserSwitcher={setShowUserSwitcher}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-80 shadow-sm border-r border-gray-200 dark:border-gray-700">
          <EnhancedToolbar 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            showUserSwitcher={showUserSwitcher}
            setShowUserSwitcher={setShowUserSwitcher}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:ring-2 focus:ring-accent-500 focus:outline-none rounded-md"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MCO
              </h1>
              <span className="text-xs bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300 px-2 py-1 rounded-full font-medium">
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