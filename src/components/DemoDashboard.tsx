import React from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth';
import { 
  Calendar, 
  ClipboardList, 
  DollarSign, 
  AlertCircle, 
  TrendingUp, 
  Users,
  Target,
  BarChart3,
  Zap,
  Upload
} from 'lucide-react';
import { 
  mockEvents, 
  mockTasks, 
  mockBudgets, 
  mockSponsorships,
  getTasksByUserId,
  getNotificationsByUserId
} from '../lib/mockData';
import { format } from 'date-fns';

interface DemoDashboardProps {
  onTabChange: (tab: string) => void;
}

export function DemoDashboard({ onTabChange }: DemoDashboardProps) {
  const { currentUser } = useDemoAuth();

  if (!currentUser) return null;

  const getStatsForRole = () => {
    const stats = [];

    if (['it', 'admin', 'event_coordinator', 'sales'].includes(currentUser.role)) {
      stats.push({
        title: 'Total Events',
        value: mockEvents.length,
        icon: Calendar,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        change: '+2 this month'
      });
    }

    if (currentUser.role === 'designer') {
      const myTasks = getTasksByUserId(currentUser.id);
      stats.push({
        title: 'My Tasks',
        value: myTasks.length,
        icon: ClipboardList,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        change: `${myTasks.filter(t => t.status === 'pending').length} pending`
      });
    } else {
      stats.push({
        title: 'Active Tasks',
        value: mockTasks.filter(t => t.status !== 'completed').length,
        icon: ClipboardList,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        change: '+5 this week'
      });
    }

    if (['it', 'admin', 'event_coordinator'].includes(currentUser.role)) {
      const totalBudget = mockBudgets.reduce((sum, b) => sum + b.allocated_amount, 0);
      stats.push({
        title: 'Total Budget',
        value: `AED ${totalBudget.toLocaleString()}`,
        icon: DollarSign,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        change: '85% allocated'
      });
    }

    if (currentUser.role === 'sales') {
      const confirmedSponsorships = mockSponsorships.filter(s => s.stage === 'confirmed').length;
      stats.push({
        title: 'Confirmed Sponsors',
        value: confirmedSponsorships,
        icon: Target,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        change: `${mockSponsorships.length - confirmedSponsorships} in pipeline`
      });
    }

    if (currentUser.role === 'it') {
      stats.push({
        title: 'System Health',
        value: '99.8%',
        icon: Zap,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        change: 'All systems operational'
      });
    }

    return stats;
  };

  const getRecentActivities = () => {
    const activities = [];

    if (currentUser.role === 'designer') {
      const myTasks = getTasksByUserId(currentUser.id);
      activities.push(...myTasks.slice(0, 3).map(task => ({
        type: 'task',
        title: `Task: ${task.title}`,
        description: `Status: ${task.status}`,
        timestamp: task.created_at,
        color: 'bg-blue-400'
      })));
    } else {
      // Recent events
      activities.push(...mockEvents.slice(0, 2).map(event => ({
        type: 'event',
        title: `Event: ${event.name}`,
        description: `Status: ${event.status}`,
        timestamp: event.start_date,
        color: 'bg-green-400'
      })));

      // Recent tasks
      activities.push(...mockTasks.slice(0, 2).map(task => ({
        type: 'task',
        title: `Task: ${task.title}`,
        description: `Priority: ${task.priority}`,
        timestamp: task.created_at,
        color: 'bg-blue-400'
      })));
    }

    // Add notifications
    const notifications = getNotificationsByUserId(currentUser.id);
    activities.push(...notifications.slice(0, 2).map(notif => ({
      type: 'notification',
      title: notif.title,
      description: notif.message,
      timestamp: notif.created_at,
      color: 'bg-purple-400'
    })));

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 6);
  };

  const stats = getStatsForRole();
  const recentActivities = getRecentActivities();

  const getRoleDisplayName = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getRoleGradient = (role: string) => {
    switch (role) {
      case 'it': return 'from-purple-500 to-purple-700';
      case 'admin': return 'from-red-500 to-red-700';
      case 'event_coordinator': return 'from-blue-500 to-blue-700';
      case 'designer': return 'from-green-500 to-green-700';
      case 'sales': return 'from-yellow-500 to-yellow-700';
      case 'logistics': return 'from-orange-500 to-orange-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {currentUser.full_name}
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getRoleGradient(currentUser.role)} text-white shadow-sm`}>
              {getRoleDisplayName(currentUser.role)} Dashboard
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const getClickHandler = () => {
            if (stat.title === 'Total Events') return () => onTabChange('events');
            if (stat.title === 'Active Tasks' || stat.title === 'My Tasks') return () => onTabChange('tasks');
            if (stat.title === 'Total Budget') return () => onTabChange('budgets');
            if (stat.title === 'Confirmed Sponsors') return () => onTabChange('sponsorships');
            return undefined;
          };
          
          return (
            <div 
              key={index} 
              onClick={getClickHandler()}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow ${
                getClickHandler() ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-600' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.change}
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

      {/* Quick Actions based on role */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Quick Actions
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentUser.role === 'it' && (
              <>
                <button 
                  onClick={() => onTabChange('events')}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                >
                  <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-900">Create Event</p>
                  <p className="text-sm text-gray-500">Add new event</p>
                </button>
                <button 
                  onClick={() => onTabChange('users')}
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
                >
                  <Users className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-500">User permissions</p>
                </button>
                <button 
                  onClick={() => onTabChange('ai-assistant')}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">AI Assistant</p>
                  <p className="text-sm text-gray-500">Smart insights</p>
                </button>
              </>
            )}
            {currentUser.role === 'event_coordinator' && (
              <>
                <button 
                  onClick={() => onTabChange('event-requests')}
                  className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors"
                >
                  <AlertCircle className="h-6 w-6 text-orange-600 mb-2" />
                  <p className="font-medium text-gray-900">Request Event</p>
                  <p className="text-sm text-gray-500">Submit new request</p>
                </button>
                <button 
                  onClick={() => onTabChange('tasks')}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                >
                  <ClipboardList className="h-6 w-6 text-green-600 mb-2" />
                  <p className="font-medium text-gray-900">Assign Task</p>
                  <p className="text-sm text-gray-500">Create task</p>
                </button>
                <button 
                  onClick={() => onTabChange('ai-assistant')}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">AI Assistant</p>
                  <p className="text-sm text-gray-500">Event suggestions</p>
                </button>
              </>
            )}
            {currentUser.role === 'designer' && (
              <>
                <button 
                  onClick={() => onTabChange('tasks')}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                >
                  <ClipboardList className="h-6 w-6 text-green-600 mb-2" />
                  <p className="font-medium text-gray-900">View Tasks</p>
                  <p className="text-sm text-gray-500">Check assignments</p>
                </button>
                <button 
                  onClick={() => onTabChange('uploads')}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                >
                  <Upload className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-900">Upload Files</p>
                  <p className="text-sm text-gray-500">Submit designs</p>
                </button>
              </>
            )}
            {currentUser.role === 'sales' && (
              <>
                <button 
                  onClick={() => onTabChange('sponsorships')}
                  className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors"
                >
                  <Target className="h-6 w-6 text-yellow-600 mb-2" />
                  <p className="font-medium text-gray-900">Add Sponsor</p>
                  <p className="text-sm text-gray-500">New sponsorship</p>
                </button>
                <button 
                  onClick={() => onTabChange('ai-assistant')}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">AI Assistant</p>
                  <p className="text-sm text-gray-500">Smart leads</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
            Recent Activities
          </h2>
        </div>
        <div className="p-6">
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {format(new Date(activity.timestamp), 'MMM d, yyyy at h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No recent activities to show</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}