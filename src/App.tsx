import React, { useState } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { NavigationProvider } from './hooks/useNavigation';
import { useNavigation } from './hooks/useNavigation';
import { EnhancedLayout } from './components/EnhancedLayout';
import { Dashboard } from './components/Dashboard';
import { EventsCalendar } from './components/EventsCalendar';
import { TeamManagement } from './components/TeamManagement';
import { BudgetOverview } from './components/BudgetOverview';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AuditLogs } from './components/AuditLogs';
import { SystemSettings } from './components/SystemSettings';
import { AIAssistant } from './components/AIAssistant';
import { ContactDirectory } from './components/ContactDirectory';
import { Auth } from './components/Auth';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { user } = useAuth();
  const { currentPage } = useNavigation();

  if (!user) {
    return <Auth />;
  }

  const renderActiveTab = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'events':
      case 'calendar':
      case 'event-planning':
      case 'event-archives':
      case 'venue-management':
        return <EventsCalendar />;
      case 'teams':
      case 'team-management':
      case 'user-management':
        return <TeamManagement />;
      case 'budgets':
      case 'budget-overview':
      case 'budget-management':
        return <BudgetOverview />;
      case 'analytics':
      case 'performance-analytics':
      case 'financial-reports':
      case 'team-analytics':
      case 'custom-reports':
        return <AnalyticsDashboard />;
      case 'audit-logs':
      case 'security-audit':
        return <AuditLogs />;
      case 'system-settings':
      case 'settings':
      case 'integrations':
        return <SystemSettings />;
      case 'ai-assistant':
      case 'ai-insights':
        return <AIAssistant />;
      case 'contacts':
      case 'contact-directory':
        return <ContactDirectory />;
      case 'tasks':
      case 'task-management':
      case 'team-collaboration':
      case 'uploads':
      case 'file-management':
      case 'resource-planning':
      case 'quality-assurance':
        return <Dashboard />; // Placeholder - these would have their own components
      case 'sponsorships':
      case 'sponsorship-pipeline':
      case 'marketing-campaigns':
        return <Dashboard />; // Placeholder - these would have their own components
      case 'event-requests':
      case 'support':
      case 'support-center':
        return <Dashboard />; // Placeholder - these would have their own components
      default:
        return <Dashboard />;
    }
  };

  return (
    <EnhancedLayout>
      {renderActiveTab()}
    </EnhancedLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}