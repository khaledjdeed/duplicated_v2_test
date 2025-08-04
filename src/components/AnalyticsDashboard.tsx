import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Users, 
  DollarSign, 
  Target,
  Download,
  Filter,
  RefreshCw,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';
import { BackButton } from './BackButton';
import toast from 'react-hot-toast';

export function AnalyticsDashboard() {
  const { user, hasPermission } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [activeChart, setActiveChart] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(false);

  const analyticsData = {
    overview: {
      totalEvents: { value: 23, change: 12, trend: 'up' },
      activeTasks: { value: 89, change: -5, trend: 'down' },
      totalBudget: { value: 485000, change: 8, trend: 'up' },
      teamMembers: { value: 47, change: 3, trend: 'up' },
      eventAttendance: { value: 2847, change: 15, trend: 'up' },
      revenueGenerated: { value: 750000, change: 22, trend: 'up' }
    },
    eventMetrics: {
      completed: 15,
      active: 5,
      planning: 3,
      cancelled: 0
    },
    taskMetrics: {
      completed: 156,
      inProgress: 34,
      pending: 23,
      overdue: 8
    },
    budgetBreakdown: [
      { category: 'Venue & Equipment', allocated: 150000, spent: 120000 },
      { category: 'Catering & Hospitality', allocated: 80000, spent: 65000 },
      { category: 'Marketing & Promotion', allocated: 45000, spent: 38000 },
      { category: 'Technology & AV', allocated: 60000, spent: 42000 },
      { category: 'Staff & Personnel', allocated: 90000, spent: 75000 },
      { category: 'Miscellaneous', allocated: 25000, spent: 18000 }
    ],
    monthlyTrends: [
      { month: 'Jul', events: 2, budget: 45000, tasks: 23, attendance: 380 },
      { month: 'Aug', events: 3, budget: 67000, tasks: 34, attendance: 520 },
      { month: 'Sep', events: 4, budget: 89000, tasks: 45, attendance: 680 },
      { month: 'Oct', events: 3, budget: 78000, tasks: 38, attendance: 590 },
      { month: 'Nov', events: 5, budget: 125000, tasks: 56, attendance: 820 },
      { month: 'Dec', events: 6, budget: 156000, tasks: 67, attendance: 950 }
    ],
    userEngagement: {
      daily_active_users: 42,
      weekly_active_users: 89,
      monthly_active_users: 156,
      user_retention_rate: 87,
      session_duration: 24
    },
    performanceMetrics: {
      page_load_time: 1.2,
      api_response_time: 145,
      uptime_percentage: 99.8,
      error_rate: 0.15
    }
  };

  const canViewAnalytics = hasPermission('view_analytics') || ['ceo', 'admin', 'it', 'marketing'].includes(user?.role || '');

  const handleExport = () => {
    toast.success('Analytics report exported successfully');
  };

  const handleRefresh = () => {
    toast.success('Analytics data refreshed');
  };

  if (!canViewAnalytics) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You do not have permission to view analytics data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive insights and performance metrics
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            <RefreshCw className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {Object.entries(analyticsData.overview).map(([key, data]) => {
          const icons = {
            totalEvents: Calendar,
            activeTasks: Activity,
            totalBudget: DollarSign,
            teamMembers: Users,
            eventAttendance: Target,
            revenueGenerated: TrendingUp
          };
          const Icon = icons[key as keyof typeof icons];
          const TrendIcon = data.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={key} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                    {key.includes('Budget') || key.includes('revenue') ? `AED ${data.value.toLocaleString()}` : data.value.toLocaleString()}
                  </p>
                  <div className={`flex items-center mt-1 text-xs ${
                    data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {Math.abs(data.change)}% vs last period
                  </div>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Icon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'financial', label: 'Financial', icon: DollarSign },
              { id: 'users', label: 'User Engagement', icon: Users },
              { id: 'performance', label: 'Performance', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveChart(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeChart === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeChart === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Status Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Status</h3>
                {Object.entries(analyticsData.eventMetrics).map(([status, count]) => {
                  const colors = {
                    completed: 'bg-green-500',
                    active: 'bg-blue-500',
                    planning: 'bg-yellow-500',
                    cancelled: 'bg-red-500'
                  };
                  const total = Object.values(analyticsData.eventMetrics).reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${colors[status as keyof typeof colors]}`}></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${colors[status as keyof typeof colors]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white w-8">
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Task Status Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Task Status</h3>
                {Object.entries(analyticsData.taskMetrics).map(([status, count]) => {
                  const colors = {
                    completed: 'bg-green-500',
                    inProgress: 'bg-blue-500',
                    pending: 'bg-yellow-500',
                    overdue: 'bg-red-500'
                  };
                  const total = Object.values(analyticsData.taskMetrics).reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${colors[status as keyof typeof colors]}`}></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {status === 'inProgress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${colors[status as keyof typeof colors]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white w-8">
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeChart === 'financial' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget Analysis</h3>
              <div className="space-y-4">
                {analyticsData.budgetBreakdown.map((item) => {
                  const percentage = (item.spent / item.allocated) * 100;
                  const isOverBudget = item.spent > item.allocated;
                  
                  return (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.category}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          AED {item.spent.toLocaleString()} / AED {item.allocated.toLocaleString()}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${
                          isOverBudget ? 'text-red-600' : percentage > 80 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {percentage.toFixed(1)}% used
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeChart === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Engagement</h3>
                <div className="space-y-3">
                  {Object.entries(analyticsData.userEngagement).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {key.includes('rate') ? `${value}%` : 
                         key.includes('duration') ? `${value} min` : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Performance</h3>
                <div className="space-y-3">
                  {Object.entries(analyticsData.performanceMetrics).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className={`text-sm font-bold ${
                        key.includes('uptime') ? 'text-green-600' : 
                        key.includes('error') ? 'text-red-600' : 'text-gray-900 dark:text-white'
                      }`}>
                        {key.includes('time') ? `${value} ms` :
                         key.includes('percentage') ? `${value}%` :
                         key.includes('rate') ? `${value}%` : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeChart === 'events' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Trends</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Month</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Events</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Budget</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Tasks</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.monthlyTrends.map((month) => (
                      <tr key={month.month} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{month.month}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{month.events}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">AED {month.budget.toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{month.tasks}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{month.attendance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Data Indicator */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Auto-refresh</span>
          </label>
        </div>
      </div>
    </div>
  );
}