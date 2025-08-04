import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Calendar,
  Users,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Building2,
  Mail,
  BarChart3,
  Brain,
  Shield
} from 'lucide-react';

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

export function Dashboard({ onTabChange }: DashboardProps) {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardData = () => {
    switch (user.role) {
      case 'ceo':
        return {
          title: 'CEO Dashboard',
          subtitle: 'Complete organizational overview',
          stats: [
            { label: 'Active Events', value: '23', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Total Pods', value: '8', icon: Building2, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Budget Allocated', value: 'AED 2.4M', icon: DollarSign, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Team Members', value: '47', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50' }
          ],
          quickActions: [
            { label: 'View All Events', action: () => onTabChange('events'), icon: Calendar },
            { label: 'Pod Management', action: () => onTabChange('pods'), icon: Building2 },
            { label: 'AI Insights', action: () => onTabChange('ai-assistant'), icon: Brain },
            { label: 'Analytics', action: () => onTabChange('analytics'), icon: BarChart3 }
          ]
        };

      case 'admin':
        return {
          title: 'Admin Dashboard',
          subtitle: 'System administration and oversight',
          stats: [
            { label: 'Active Events', value: '23', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Pending Requests', value: '5', icon: ClipboardList, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
            { label: 'Email Campaigns', value: '12', icon: Mail, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Audit Logs', value: '156', icon: Shield, color: 'text-red-600', bgColor: 'bg-red-50' }
          ],
          quickActions: [
            { label: 'Contact Directory', action: () => onTabChange('contacts'), icon: Users },
            { label: 'Email Campaigns', action: () => onTabChange('email-campaigns'), icon: Mail },
            { label: 'Audit Logs', action: () => onTabChange('audit-logs'), icon: Shield },
            { label: 'User Management', action: () => onTabChange('user-management'), icon: Users }
          ]
        };

      case 'marketing':
        return {
          title: 'Marketing Dashboard',
          subtitle: 'Campaign management and analytics',
          stats: [
            { label: 'Active Campaigns', value: '8', icon: Mail, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Emails Sent', value: '2,847', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Open Rate', value: '24.3%', icon: BarChart3, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Contacts', value: '1,234', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50' }
          ],
          quickActions: [
            { label: 'Create Campaign', action: () => onTabChange('email-campaigns'), icon: Mail },
            { label: 'View Analytics', action: () => onTabChange('analytics'), icon: BarChart3 },
            { label: 'Contact List', action: () => onTabChange('contacts'), icon: Users }
          ]
        };

      case 'ae':
        return {
          title: 'Account Executive Dashboard',
          subtitle: 'Your events and tasks',
          stats: [
            { label: 'My Events', value: '5', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Active Tasks', value: '12', icon: ClipboardList, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Event Budget', value: 'AED 450K', icon: DollarSign, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-50' }
          ],
          quickActions: [
            { label: 'My Events', action: () => onTabChange('my-events'), icon: Calendar },
            { label: 'My Tasks', action: () => onTabChange('tasks'), icon: ClipboardList },
            { label: 'Request Event', action: () => onTabChange('event-requests'), icon: Calendar },
            { label: 'View Budgets', action: () => onTabChange('budgets'), icon: DollarSign }
          ]
        };

      case 'designer':
        return {
          title: 'Designer Dashboard',
          subtitle: 'Your creative tasks and projects',
          stats: [
            { label: 'Active Tasks', value: '8', icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Files Uploaded', value: '24', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Pod Projects', value: '3', icon: Building2, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Completion Rate', value: '92%', icon: BarChart3, color: 'text-orange-600', bgColor: 'bg-orange-50' }
          ],
          quickActions: [
            { label: 'My Tasks', action: () => onTabChange('tasks'), icon: ClipboardList },
            { label: 'Upload Files', action: () => onTabChange('uploads'), icon: TrendingUp },
            { label: 'Pod Overview', action: () => onTabChange('pod-overview'), icon: Building2 }
          ]
        };

      case 'it':
        return {
          title: 'IT Dashboard',
          subtitle: 'Event creation and system management',
          stats: [
            { label: 'Events Created Today', value: '2/3', icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Pending Requests', value: '7', icon: ClipboardList, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
            { label: 'System Health', value: '99.8%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Active Users', value: '42', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Create Event', action: () => onTabChange('event-creation'), icon: Calendar },
            { label: 'Event Requests', action: () => onTabChange('event-requests'), icon: ClipboardList },
            { label: 'System Settings', action: () => onTabChange('system-settings'), icon: TrendingUp }
          ]
        };

      case 'team_lead':
        return {
          title: 'Team Lead Dashboard',
          subtitle: 'Pod performance and team overview',
          stats: [
            { label: 'Team Tasks', value: '18', icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Pod Events', value: '4', icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Team Members', value: '6', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Efficiency', value: '94%', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-50' }
          ],
          quickActions: [
            { label: 'Team Tasks', action: () => onTabChange('team-tasks'), icon: ClipboardList },
            { label: 'Pod Overview', action: () => onTabChange('pod-overview'), icon: Building2 },
            { label: 'Team Analytics', action: () => onTabChange('team-analytics'), icon: BarChart3 }
          ]
        };

      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome to MCO',
          stats: [],
          quickActions: []
        };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {dashboardData.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {dashboardData.subtitle}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${user ? getRoleColor(user.role) : ''}`}>
              {user?.role.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Demo Mode Active
            </span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            System Active
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      {dashboardData.stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      {dashboardData.quickActions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardData.quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-left transition-colors"
                  >
                    <Icon className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {action.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Role-specific content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Activity feed will be populated with real-time data from Supabase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoleColor(role: string) {
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
}