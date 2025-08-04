import React, { useState } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ContactDirectory } from './components/ContactDirectory';
import { EmailCampaigns } from './components/EmailCampaigns';
import { AIAssistant } from './components/AIAssistant';
import { EventsView } from './components/EventsView';
import { TasksView } from './components/TasksView';
import { BudgetManagement } from './components/BudgetManagement';
import { SponsorshipKanban } from './components/SponsorshipKanban';
import { UserManagement } from './components/UserManagement';
import { SystemSettings } from './components/SystemSettings';
import { Analytics } from './components/Analytics';
import { AuditLogsView } from './components/AuditLogsView';
import { EventCreationForm } from './components/EventCreationForm';
import { EventRequestForm } from './components/EventRequestForm';
import { FileUpload } from './components/FileUpload';
import { PodManagementView } from './components/PodManagementView';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tabHistory, setTabHistory] = useState<string[]>(['dashboard']);

  const handleTabChange = (tab: string) => {
    if (tab !== activeTab) {
      setTabHistory(prev => [...prev, tab]);
      setActiveTab(tab);
    }
  };

  const goBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop(); // Remove current tab
      const previousTab = newHistory[newHistory.length - 1];
      setTabHistory(newHistory);
      setActiveTab(previousTab);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={handleTabChange} />;
      case 'contacts':
        return <ContactDirectory />;
      case 'email-campaigns':
        return <EmailCampaigns />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'events':
        return <EventsView />;
      case 'my-events':
        return <EventsView />;
      case 'tasks':
        return <TasksView />;
      case 'budgets':
        return <BudgetManagement />;
      case 'pods':
        return <PodManagementView />;
        return <PodManagementView />;
      case 'analytics':
        return <Analytics />;
        return <Analytics />;
      case 'audit-logs':
        return <AuditLogsView />;
      case 'uploads':
        return <FileUpload />;
      case 'event-requests':
        return <EventRequestForm />;
      case 'event-creation':
        return <EventCreationForm />;
      case 'team-tasks':
        return <TasksView />;
      case 'user-management':
        return <UserManagement />;
      case 'sponsorships':
        return <SponsorshipKanban />;
      case 'settings':
      case 'system-settings':
        return <SystemSettings />;
      default:
        return <Dashboard onTabChange={handleTabChange} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={handleTabChange}
      tabHistory={tabHistory}
      onGoBack={goBack}
    >
      {renderActiveTab()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#f9fafb',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;