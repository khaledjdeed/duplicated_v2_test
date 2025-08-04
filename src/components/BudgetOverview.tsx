import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  PieChart,
  BarChart3,
  Download,
  Filter,
  Calendar,
  Building
} from 'lucide-react';
import { BackButton } from './BackButton';
import toast from 'react-hot-toast';

interface BudgetItem {
  id: string;
  event_id: string;
  event_name: string;
  category: string;
  allocated_amount: number;
  spent_amount: number;
  remaining_amount: number;
  percentage_used: number;
  status: 'on_track' | 'at_risk' | 'over_budget';
  last_updated: string;
}

export function BudgetOverview() {
  const { user, canViewBudgets } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewType, setViewType] = useState<'summary' | 'detailed'>('summary');

  const budgetData: BudgetItem[] = [
    {
      id: 'budget-1',
      event_id: 'event-1',
      event_name: 'UAE Healthcare Innovation Summit 2024',
      category: 'Venue & Equipment',
      allocated_amount: 150000,
      spent_amount: 120000,
      remaining_amount: 30000,
      percentage_used: 80,
      status: 'on_track',
      last_updated: '2024-12-01T10:00:00Z'
    },
    {
      id: 'budget-2',
      event_id: 'event-1',
      event_name: 'UAE Healthcare Innovation Summit 2024',
      category: 'Catering & Hospitality',
      allocated_amount: 85000,
      spent_amount: 92000,
      remaining_amount: -7000,
      percentage_used: 108,
      status: 'over_budget',
      last_updated: '2024-11-28T15:30:00Z'
    },
    {
      id: 'budget-3',
      event_id: 'event-2',
      event_name: 'Middle East Cardiology Congress',
      category: 'Marketing & Promotion',
      allocated_amount: 45000,
      spent_amount: 38000,
      remaining_amount: 7000,
      percentage_used: 84,
      status: 'on_track',
      last_updated: '2024-11-30T09:15:00Z'
    },
    {
      id: 'budget-4',
      event_id: 'event-2',
      event_name: 'Middle East Cardiology Congress',
      category: 'Technology & AV',
      allocated_amount: 60000,
      spent_amount: 55000,
      remaining_amount: 5000,
      percentage_used: 92,
      status: 'at_risk',
      last_updated: '2024-11-29T14:20:00Z'
    }
  ];

  const summaryStats = {
    totalAllocated: budgetData.reduce((sum, item) => sum + item.allocated_amount, 0),
    totalSpent: budgetData.reduce((sum, item) => sum + item.spent_amount, 0),
    totalRemaining: budgetData.reduce((sum, item) => sum + item.remaining_amount, 0),
    onTrackCount: budgetData.filter(item => item.status === 'on_track').length,
    atRiskCount: budgetData.filter(item => item.status === 'at_risk').length,
    overBudgetCount: budgetData.filter(item => item.status === 'over_budget').length
  };

  const categoryBreakdown = budgetData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { allocated: 0, spent: 0 };
    }
    acc[item.category].allocated += item.allocated_amount;
    acc[item.category].spent += item.spent_amount;
    return acc;
  }, {} as Record<string, { allocated: number; spent: number }>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-100 text-green-800 border-green-200';
      case 'at_risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'over_budget': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track': return CheckCircle;
      case 'at_risk': return AlertTriangle;
      case 'over_budget': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const handleExportBudget = () => {
    toast.success('Budget report exported successfully');
  };

  if (!canViewBudgets()) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You do not have permission to view budget information.
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
              <DollarSign className="h-6 w-6 mr-2 text-green-600" />
              Budget Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Financial tracking and budget management for all events
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewType('summary')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'summary'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setViewType('detailed')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'detailed'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Detailed
            </button>
          </div>
          <button
            onClick={handleExportBudget}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Allocated</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                AED {summaryStats.totalAllocated.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <PieChart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                AED {summaryStats.totalSpent.toLocaleString()}
              </p>
              <div className="flex items-center mt-1 text-sm text-purple-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                {((summaryStats.totalSpent / summaryStats.totalAllocated) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining</p>
              <p className={`text-2xl font-bold ${
                summaryStats.totalRemaining < 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                AED {Math.abs(summaryStats.totalRemaining).toLocaleString()}
              </p>
              {summaryStats.totalRemaining < 0 && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Over budget
                </div>
              )}
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              {summaryStats.totalRemaining >= 0 ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget Health</p>
              <div className="space-y-1 mt-2">
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">{summaryStats.onTrackCount} On Track</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">{summaryStats.atRiskCount} At Risk</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">{summaryStats.overBudgetCount} Over Budget</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="current">Current Quarter</option>
              <option value="last">Last Quarter</option>
              <option value="ytd">Year to Date</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="venue">Venue & Equipment</option>
              <option value="catering">Catering & Hospitality</option>
              <option value="marketing">Marketing & Promotion</option>
              <option value="technology">Technology & AV</option>
              <option value="staff">Staff & Personnel</option>
            </select>
          </div>
        </div>
      </div>

      {viewType === 'summary' ? (
        /* Summary View */
        <div className="space-y-6">
          {/* Category Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Budget by Category
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(categoryBreakdown).map(([category, data]) => {
                  const percentage = data.allocated > 0 ? (data.spent / data.allocated) * 100 : 0;
                  const isOverBudget = data.spent > data.allocated;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {category}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          AED {data.spent.toLocaleString()} / AED {data.allocated.toLocaleString()}
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
                        {isOverBudget && (
                          <span className="text-red-600 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Over budget by AED {(data.spent - data.allocated).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Budget Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Budget Alerts
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {budgetData.filter(item => item.status !== 'on_track').map((item) => {
                  const StatusIcon = getStatusIcon(item.status);
                  return (
                    <div key={item.id} className={`p-4 rounded-lg border ${
                      item.status === 'over_budget' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <StatusIcon className={`h-5 w-5 mt-0.5 ${
                          item.status === 'over_budget' ? 'text-red-600' : 'text-yellow-600'
                        }`} />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.event_name} - {item.category}
                          </h4>
                          <p className={`text-sm ${
                            item.status === 'over_budget' ? 'text-red-700' : 'text-yellow-700'
                          }`}>
                            {item.status === 'over_budget' 
                              ? `Over budget by AED ${Math.abs(item.remaining_amount).toLocaleString()}`
                              : `At ${item.percentage_used}% of allocated budget`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {budgetData.filter(item => item.status !== 'on_track').length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-green-600 font-medium">All budgets are on track!</p>
                    <p className="text-gray-500 dark:text-gray-400">No budget alerts at this time.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed View */
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Detailed Budget Breakdown
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Event / Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Allocated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Remaining
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {budgetData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.event_name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      AED {item.allocated_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      AED {item.spent_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${
                        item.remaining_amount < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        AED {Math.abs(item.remaining_amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.status === 'over_budget' ? 'bg-red-500' : 
                              item.status === 'at_risk' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(item.percentage_used, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {item.percentage_used}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}