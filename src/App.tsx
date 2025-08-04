import React, { useState } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ContactDirectory } from './components/ContactDirectory';
import { EmailCampaigns } from './components/EmailCampaigns';
import { AIAssistant } from './components/AIAssistant';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'contacts':
        return <ContactDirectory />;
      case 'email-campaigns':
        return <EmailCampaigns />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'events':
      case 'my-events':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Events Management
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Event management system will be integrated with Supabase schema.
              </p>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Task Management
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Task management with criticality levels and pod scoping.
              </p>
            </div>
          </div>
        );
      case 'budgets':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Budget Management
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Role-based budget visibility and management.
              </p>
            </div>
          </div>
        );
      case 'pods':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Pod Management
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Operational subunits with Account Executives and Designers.
              </p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Performance metrics and insights from materialized views.
              </p>
            </div>
          </div>
        );
      case 'audit-logs':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Audit Logs
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Complete audit trail of all system activities and exports.
              </p>
            </div>
          </div>
        );
      case 'uploads':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                File Uploads
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Designer file upload system with task association.
              </p>
            </div>
          </div>
        );
      case 'event-requests':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Event Requests
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                AE event request system with IT approval workflow.
              </p>
            </div>
          </div>
        );
      case 'event-creation':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛠️</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Event Creation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                IT event creation panel with 3/day limit enforcement.
              </p>
            </div>
          </div>
        );
      case 'pod-overview':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Pod Overview
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Team collaboration and task overview within your pod.
              </p>
            </div>
          </div>
        );
      case 'team-tasks':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Team Tasks
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Team lead view of all team member tasks and progress.
              </p>
            </div>
          </div>
        );
      case 'team-analytics':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Team Analytics
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Performance analytics for your team and pod.
              </p>
            </div>
          </div>
        );
      case 'user-management':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👤</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                User Management
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Manage user roles and permissions.
              </p>
            </div>
          </div>
        );
      case 'settings':
      case 'system-settings':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                System Settings
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Configure system preferences and integrations.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
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