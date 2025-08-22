import React, { useState } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { NavigationProvider } from './hooks/useNavigation';
import { useNavigation } from './hooks/useNavigation';
import { Layout } from './components/Layout';
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
        return <EventsCalendar />;
      case 'teams':
      case 'team-management':
        return <TeamManagement />;
      case 'budgets':
      case 'budget-overview':
        return <BudgetOverview />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'system-settings':
      case 'settings':
        return <SystemSettings />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'contacts':
        return <ContactDirectory />;
      default:
        return <Dashboard />;
    }
  };

  return (
      <Layout>
        {renderActiveTab()}
      </Layout>
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