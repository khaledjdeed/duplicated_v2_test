import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Building2, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  UserPlus,
  Calendar,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Pod {
  id: string;
  name: string;
  description: string;
  account_executives: string[];
  designers: string[];
  logistics_staff: string[];
  production_staff: string[];
  active_events: number;
  completed_tasks: number;
  total_budget: number;
  performance_score: number;
}

export function PodManagementView() {
  const { user, users } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPod, setEditingPod] = useState<Pod | null>(null);
  const [selectedPod, setSelectedPod] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    account_executives: [] as string[],
    designers: [] as string[],
    logistics_staff: [] as string[],
    production_staff: [] as string[]
  });

  // Mock pods data
  const [pods, setPods] = useState<Pod[]>([
    {
      id: 'pod-1',
      name: 'Alpha Pod',
      description: 'Primary healthcare events and conferences',
      account_executives: ['samir-ae'],
      designers: ['joel-designer'],
      logistics_staff: [],
      production_staff: [],
      active_events: 5,
      completed_tasks: 23,
      total_budget: 450000,
      performance_score: 94
    },
    {
      id: 'pod-2',
      name: 'Beta Pod',
      description: 'Specialized medical workshops and training',
      account_executives: [],
      designers: [],
      logistics_staff: [],
      production_staff: [],
      active_events: 3,
      completed_tasks: 18,
      total_budget: 280000,
      performance_score: 87
    },
    {
      id: 'pod-3',
      name: 'Gamma Pod',
      description: 'Research symposiums and academic events',
      account_executives: [],
      designers: [],
      logistics_staff: [],
      production_staff: [],
      active_events: 2,
      completed_tasks: 12,
      total_budget: 320000,
      performance_score: 91
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPod) {
        setPods(prev => prev.map(pod => 
          pod.id === editingPod.id 
            ? { 
                ...pod, 
                ...formData,
                // Recalculate performance metrics
                performance_score: Math.floor(Math.random() * 20) + 80
              }
            : pod
        ));
        toast.success('Pod updated successfully');
      } else {
        const newPod: Pod = {
          id: `pod-${Date.now()}`,
          ...formData,
          active_events: 0,
          completed_tasks: 0,
          total_budget: 0,
          performance_score: 85
        };
        setPods(prev => [...prev, newPod]);
        toast.success('Pod created successfully');
      }

      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleDelete = (podId: string) => {
    if (confirm('Are you sure you want to delete this pod? This action cannot be undone.')) {
      setPods(prev => prev.filter(pod => pod.id !== podId));
      toast.success('Pod deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      account_executives: [],
      designers: [],
      logistics_staff: [],
      production_staff: []
    });
    setShowCreateModal(false);
    setEditingPod(null);
  };

  const startEdit = (pod: Pod) => {
    setEditingPod(pod);
    setFormData({
      name: pod.name,
      description: pod.description,
      account_executives: pod.account_executives,
      designers: pod.designers,
      logistics_staff: pod.logistics_staff,
      production_staff: pod.production_staff
    });
    setShowCreateModal(true);
  };

  const getUserName = (userId: string) => {
    const foundUser = users.find(u => u.id === userId);
    return foundUser ? foundUser.full_name : 'Unknown User';
  };

  const getUsersByRole = (role: string) => {
    return users.filter(u => u.role === role);
  };

  const canManagePods = ['ceo', 'admin', 'team_lead'].includes(user?.role || '');
  const canViewPods = ['ceo', 'admin', 'team_lead', 'ae', 'designer', 'logistics'].includes(user?.role || '');

  if (!canViewPods) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Pod management is restricted to authorized roles only.
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
            <Building2 className="h-6 w-6 mr-2 text-blue-600" />
            Pod Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage operational pods with Account Executives and Designers
          </p>
        </div>
        {canManagePods && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Pod
          </button>
        )}
      </div>

      {/* Pod Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        {pods.map((pod) => (
          <div key={pod.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pod.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {pod.description}
                  </p>
                </div>
                {canManagePods && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(pod)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pod.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{pod.active_events}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Active Events</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <ClipboardList className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{pod.completed_tasks}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Completed Tasks</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {pod.total_budget > 0 ? `${(pod.total_budget / 1000).toFixed(0)}K` : '0'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Budget (AED)</div>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Award className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{pod.performance_score}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Performance</div>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Executives ({pod.account_executives.length})
                  </h4>
                  {pod.account_executives.length > 0 ? (
                    <div className="space-y-1">
                      {pod.account_executives.map(aeId => (
                        <div key={aeId} className="text-sm text-gray-600 dark:text-gray-400">
                          • {getUserName(aeId)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic">No AEs assigned</div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Designers ({pod.designers.length})
                  </h4>
                  {pod.designers.length > 0 ? (
                    <div className="space-y-1">
                      {pod.designers.map(designerId => (
                        <div key={designerId} className="text-sm text-gray-600 dark:text-gray-400">
                          • {getUserName(designerId)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic">No designers assigned</div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedPod(selectedPod === pod.id ? null : pod.id)}
                  className="w-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {selectedPod === pod.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {/* Expanded Details */}
              {selectedPod === pod.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Performance Trend:</span>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600 dark:text-green-400">+5% this month</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Recent Activity:</span>
                    <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• Event planning meeting scheduled</li>
                      <li>• 3 tasks completed this week</li>
                      <li>• Budget review pending</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Pod Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingPod ? 'Edit Pod' : 'Create New Pod'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pod Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Alpha Pod"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe the pod's focus and responsibilities"
                  />
                </div>

                {/* Team Member Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Account Executives (1-4 required)
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2">
                      {getUsersByRole('ae').map(user => (
                        <label key={user.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.account_executives.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  account_executives: [...prev.account_executives, user.id]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  account_executives: prev.account_executives.filter(id => id !== user.id)
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{user.full_name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Designers (exactly 2 required)
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2">
                      {getUsersByRole('designer').map(user => (
                        <label key={user.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.designers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked && formData.designers.length < 2) {
                                setFormData(prev => ({
                                  ...prev,
                                  designers: [...prev.designers, user.id]
                                }));
                              } else if (!e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  designers: prev.designers.filter(id => id !== user.id)
                                }));
                              } else {
                                toast.error('Maximum 2 designers per pod');
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{user.full_name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logistics Staff (optional)
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2">
                      {getUsersByRole('logistics').map(user => (
                        <label key={user.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.logistics_staff.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  logistics_staff: [...prev.logistics_staff, user.id]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  logistics_staff: prev.logistics_staff.filter(id => id !== user.id)
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{user.full_name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingPod ? 'Update Pod' : 'Create Pod'}
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