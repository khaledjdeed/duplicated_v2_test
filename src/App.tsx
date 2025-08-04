import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { EventsView } from './components/EventsView';
import { TasksView } from './components/TasksView';
import { SponsorshipKanban } from './components/SponsorshipKanban';
import { PodManagementView } from './components/PodManagementView';
import { FileUpload } from './components/FileUpload';
import { ContactDirectory } from './components/ContactDirectory';
import { EventRequestForm } from './components/EventRequestForm';
import { BudgetManagement } from './components/BudgetManagement';
import { Analytics } from './components/Analytics';
import { AuditLogsView } from './components/AuditLogsView';
import { UserManagement } from './components/UserManagement';
import { SystemSettings } from './components/SystemSettings';
import { EventCreationForm } from './components/EventCreationForm';
import { AIAssistant } from './components/AIAssistant';

// Mock user for demo purposes
const mockUser = {
  id: 'yousef-ceo',
  email: 'yousef@mco.com',
  full_name: 'Yousef Al-Rashid',
  role: 'ceo',
  team_id: 'team-1'
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<EventsView />} />
              <Route path="/tasks" element={<TasksView />} />
              <Route path="/sponsorships" element={<SponsorshipKanban />} />
              <Route path="/pods" element={<PodManagementView />} />
              <Route path="/uploads" element={<FileUpload />} />
              <Route path="/contacts" element={<ContactDirectory />} />
              <Route path="/event-requests" element={<EventRequestForm />} />
              <Route path="/budgets" element={<BudgetManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/audit-logs" element={<AuditLogsView />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<SystemSettings />} />
              <Route path="/create-event" element={<EventCreationForm />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </div>
        <Toaster position="top-right" />
      </Router>
    </ErrorBoundary>
  );
}

export default App;