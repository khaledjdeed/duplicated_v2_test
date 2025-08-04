import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  PieChart
} from 'lucide-react';
import toast from 'react-hot-toast';

export function BudgetManagement() {
  const { user, budgets, events, updateBudget, createBudget, deleteBudget } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState('all');

  const [formData, setFormData] = useState({
    event_id: '',
    category: '',
    allocated_amount: 0,
    spent_amount: 0,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
    if (editingBudget) {
        updateBudget(editingBudget.id, formData);
      toast.success('Budget updated successfully');
    } else {
        const newBudget = {
          ...formData,
          created_by: user?.id || ''
      };
        createBudget(newBudget);
      toast.success('Budget created successfully');
    }

    resetForm();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleDelete = (budgetId: string) => {
    if (confirm('Are you sure you want to delete this budget item?')) {
      deleteBudget(budgetId);
      toast.success('Budget item deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      event_id: '',
      category: '',
      allocated_amount: 0,
      spent_amount: 0,
      notes: ''
    });
    setShowCreateModal(false);
    setEditingBudget(null);
  };

  const startEdit = (budget: any) => {
    setEditingBudget(budget);
    setFormData({
      event_id: budget.event_id,
      category: budget.category,
      allocated_amount: budget.allocated_amount,
      spent_amount: budget.spent_amount,
      notes: budget.notes
    });
    setShowCreateModal(true);
  };

  const getEventName = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.name : 'Unknown Event';
  };

  // Filter budgets based on role and event selection
  const getFilteredBudgets = () => {
    let filtered = budgets;
    
    if (user?.role === 'ae') {
      // AEs see only budgets for their assigned events
      const userEvents = events.filter(e => e.team_id === 'team1'); // Mock team filtering
      filtered = budgets.filter(b => userEvents.some(e => e.id === b.event_id));
    }
    
    if (selectedEvent !== 'all') {
      filtered = filtered.filter(b => b.event_id === selectedEvent);
    }
    
    return filtered;
  };
  const filteredBudgets = getFilteredBudgets();

  const totalAllocated = filteredBudgets.reduce((sum, b) => sum + b.allocated_amount, 0);
  const totalSpent = filteredBudgets.reduce((sum, b) => sum + b.spent_amount, 0);
  const remainingBudget = totalAllocated - totalSpent;
  const spentPercentage = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  const canManageBudgets = ['it', 'admin', 'ae'].includes(user?.role || '');
  const canViewBudgets = ['ceo', 'admin', 'ae', 'it'].includes(user?.role || '');

  if (!canViewBudgets) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 font-semibold">Access Denied</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Budget access is restricted to authorized roles only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <DollarSign className="h-6 w-6 mr-2 text-green-600" />
            Budget Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage event budgets and expenses
          </p>
        </div>
        {canManageBudgets && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Budget Item
          </button>
        )}
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Allocated</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                AED {totalAllocated.toLocaleString()}
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
                AED {totalSpent.toLocaleString()}
              </p>
              <div className={`flex items-center mt-1 text-sm ${
                spentPercentage > 90 ? 'text-red-600' : spentPercentage > 75 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {spentPercentage > 90 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {spentPercentage.toFixed(1)}% of budget
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
                remainingBudget < 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                AED {Math.abs(remainingBudget).toLocaleString()}
              </p>
              {remainingBudget < 0 && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Over budget
                </div>
              )}
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              {remainingBudget >= 0 ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Event:
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Events</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget Items */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Budget Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Event
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
                {canManageBudgets && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBudgets.map((budget) => {
                const remaining = budget.allocated_amount - budget.spent_amount;
                const percentage = budget.allocated_amount > 0 ? (budget.spent_amount / budget.allocated_amount) * 100 : 0;
                const isOverBudget = budget.spent_amount > budget.allocated_amount;
                
                return (
                  <tr key={budget.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {budget.category}
                      </div>
                      {budget.notes && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {budget.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {getEventName(budget.event_id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      AED {budget.allocated_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      AED {budget.spent_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${
                        remaining < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        AED {Math.abs(remaining).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${
                          isOverBudget ? 'text-red-600' : percentage > 80 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    {canManageBudgets && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(budget)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(budget.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBudgets.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No budget items found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Budget Modal */}
      {showCreateModal && canManageBudgets && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingBudget ? 'Edit Budget Item' : 'Add New Budget Item'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event
                  </label>
                  <select
                    value={formData.event_id}
                    onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select event</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Venue, Catering, Marketing"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Allocated Amount (AED)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={formData.allocated_amount}
                      onChange={(e) => setFormData({ ...formData, allocated_amount: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Spent Amount (AED)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.spent_amount}
                      onChange={(e) => setFormData({ ...formData, spent_amount: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Additional notes about this budget item"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    {editingBudget ? 'Update Budget Item' : 'Add Budget Item'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}