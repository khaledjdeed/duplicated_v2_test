import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  activeTab: string;
  tabHistory: string[];
}

export function Breadcrumbs({ activeTab, tabHistory }: BreadcrumbsProps) {
  const getTabLabel = (tab: string): string => {
    const labels: Record<string, string> = {
      'dashboard': 'Dashboard',
      'events': 'Events',
      'my-events': 'My Events',
      'tasks': 'Tasks',
      'team-tasks': 'Team Tasks',
      'budgets': 'Budgets',
      'pods': 'Pod Management',
      'pod-overview': 'Pod Overview',
      'contacts': 'Contact Directory',
      'email-campaigns': 'Email Campaigns',
      'sponsorships': 'Sponsorships',
      'analytics': 'Analytics',
      'team-analytics': 'Team Analytics',
      'ai-assistant': 'AI Assistant',
      'audit-logs': 'Audit Logs',
      'uploads': 'File Uploads',
      'event-requests': 'Event Requests',
      'event-creation': 'Event Creation',
      'user-management': 'User Management',
      'settings': 'Settings',
      'system-settings': 'System Settings'
    };
    return labels[tab] || tab;
  };

  // Show only the last 3 items in history to keep breadcrumbs manageable
  const visibleHistory = tabHistory.slice(-3);

  return (
    <nav className="flex items-center space-x-1 text-sm">
      <Home className="h-4 w-4 text-gray-400" />
      {visibleHistory.map((tab, index) => (
        <React.Fragment key={tab}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className={`${
            index === visibleHistory.length - 1 
              ? 'text-gray-900 dark:text-white font-medium' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {getTabLabel(tab)}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}