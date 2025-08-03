import React, { useState } from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Users, 
  DollarSign, 
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';

export function Analytics() {
  const { currentUser } = useDemoAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const analyticsData = {
    overview: {
      totalEvents: { value: 23, change: 12, trend: 'up' },
      activeTasks: { value: 89, change: -5, trend: 'down' },
      totalBudget: { value: 485000, change: 8, trend: 'up' },
      teamMembers: { value: 47, change: 3, trend: 'up' }
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
      { category: 'Venue', allocated: 150000, spent: 120000 },
      { category: 'Catering', allocated: 80000, spent: 65000 },
      { category: 'Marketing', allocated: 45000, spent: 38000 },
      { category: 'Equipment', allocated: 60000, spent: 42000 },
      { category: 'Staff', allocated: 90000, spent: 75000 },
      { category: 'Miscellaneous', allocated: 25000, spent: 18000 }
    ],
    sponsorshipMetrics: {
      platinum: { count: 3, revenue: 150000 },
      gold: { count: 8, revenue: 200000 },
      silver: { count: 15, revenue: 225000 },
      bronze: { count: 22, revenue: 176000 }
    },
    monthlyTrends: [
      { month: 'Jan', events: 2, budget: 45000, tasks: 23 },
      { month: 'Feb', events: 3, budget: 67000, tasks: 34 },
      { month: 'Mar', events: 4, budget: 89000, tasks: 45 },
      { month: 'Apr', events: 3, budget: 78000, tasks: 38 },
      { month: 'May', events: 5, budget: 125000, tasks: 56 },
      { month: 'Jun', events: 6, budget: 156000, tasks: 67 }
    ]
  };

  const canViewAnalytics = ['it', 'admin'].includes(currentUser?.role || '');

  if (!canViewAnalytics) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 font-semibold">Access Denied</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Analytics dashboard is restricted to IT and Admin users only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
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
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(analyticsData.overview).map(([key, data]) => {
          const icons = {
            totalEvents: Calendar,
            activeTasks: CheckCircle,
            totalBudget: DollarSign,
            teamMembers: Users
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
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {key === 'totalBudget' ? `AED ${data.value.toLocaleString()}` : data.value}
                  </p>
                  <div className={`flex items-center mt-2 text-sm ${
                    data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    {Math.abs(data.change)}% from last month
                  </div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Icon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Event Status</h3>
          <div className="space-y-4">
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
                      ></div>
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

        {/* Task Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Status</h3>
          <div className="space-y-4">
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
                      ></div>
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
      </div>

      {/* Budget Analysis */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Budget Analysis</h3>
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
                    ${item.spent.toLocaleString()} / ${item.allocated.toLocaleString()}
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${
                    isOverBudget ? 'text-red-600' : percentage > 80 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {percentage.toFixed(1)}% used
                  </span>
                  {isOverBudget && (
                    <span className="text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Over budget
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sponsorship Revenue */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sponsorship Revenue</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(analyticsData.sponsorshipMetrics).map(([tier, data]) => {
            const colors = {
              platinum: 'bg-purple-100 text-purple-800 border-purple-200',
              gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
              silver: 'bg-gray-100 text-gray-800 border-gray-200',
              bronze: 'bg-orange-100 text-orange-800 border-orange-200'
            };
            
            return (
              <div key={tier} className={`p-4 rounded-lg border ${colors[tier as keyof typeof colors]}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium capitalize">{tier}</span>
                  <Target className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">{data.count}</p>
                  <p className="text-xs">sponsors</p>
                  <p className="text-sm font-semibold">AED {data.revenue.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Trends</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Month</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Events</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Budget</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.monthlyTrends.map((month) => (
                <tr key={month.month} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{month.month}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{month.events}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">AED {month.budget.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{month.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helper functions for custom date range */}
      {(() => {
        const handleCustomDateSubmit = () => {
          if (customDateRange.startDate && customDateRange.endDate) {
            setTimeRange(`${customDateRange.startDate}_${customDateRange.endDate}`);
            setShowCustomRange(false);
          }
        };

        return null;
      })()}

      {/* Custom Date Range Modal */}
      {showCustomRange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Custom Date Range
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customDateRange.startDate}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={customDateRange.endDate}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCustomDateSubmit}
                  disabled={!customDateRange.startDate || !customDateRange.endDate}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply Range
                </button>
                <button
                  onClick={() => {
                    setShowCustomRange(false);
                    setTimeRange('30d');
                  }}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}