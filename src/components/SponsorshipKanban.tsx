import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Plus, Edit, Trash2, DollarSign, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const stages = ['prospecting', 'in_progress', 'confirmed', 'fulfilled'] as const;

const stageConfig = {
  prospecting: {
    title: 'Prospecting',
    color: 'bg-gray-100 text-gray-800',
    bgColor: 'bg-gray-50'
  },
  in_progress: {
    title: 'In Progress',
    color: 'bg-blue-100 text-blue-800',
    bgColor: 'bg-blue-50'
  },
  confirmed: {
    title: 'Confirmed',
    color: 'bg-green-100 text-green-800',
    bgColor: 'bg-green-50'
  },
  fulfilled: {
    title: 'Fulfilled',
    color: 'bg-purple-100 text-purple-800',
    bgColor: 'bg-purple-50'
  }
};

const packageColors = {
  platinum: 'bg-purple-100 text-purple-800',
  gold: 'bg-yellow-100 text-yellow-800',
  silver: 'bg-gray-100 text-gray-800',
  bronze: 'bg-orange-100 text-orange-800'
};

export function SponsorshipKanban() {
  const { user, sponsorships, updateSponsorship, createSponsorship, deleteSponsorship } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSponsorship, setEditingSponsorship] = useState<any>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    contact_email: '',
    package_type: 'silver' as const,
    stage: 'prospecting' as const,
    amount: 0,
    notes: '',
    event_id: 'event1'
  });

  const handleDragStart = (e: React.DragEvent, sponsorshipId: string) => {
    setDraggedItem(sponsorshipId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    if (draggedItem) {
      updateSponsorship(draggedItem, { stage: newStage as any });
      setDraggedItem(null);
      toast.success('Sponsorship stage updated');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
    if (editingSponsorship) {
        updateSponsorship(editingSponsorship.id, formData);
      toast.success('Sponsorship updated successfully');
    } else {
        const newSponsorship = {
          ...formData,
          team_id: 'team1', // Mock team
          managed_by: user?.id || ''
      };
        createSponsorship(newSponsorship);
      toast.success('Sponsorship created successfully');
    }

    resetForm();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleDelete = (sponsorshipId: string) => {
    if (confirm('Are you sure you want to delete this sponsorship?')) {
      deleteSponsorship(sponsorshipId);
      toast.success('Sponsorship deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      contact_name: '',
      contact_email: '',
      package_type: 'silver',
      stage: 'prospecting',
      amount: 0,
      notes: '',
      event_id: 'event1'
    });
    setShowCreateModal(false);
    setEditingSponsorship(null);
  };

  const startEdit = (sponsorship: any) => {
    setEditingSponsorship(sponsorship);
    setFormData({
      company_name: sponsorship.company_name,
      contact_name: sponsorship.contact_name || '',
      contact_email: sponsorship.contact_email || '',
      package_type: sponsorship.package_type,
      stage: sponsorship.stage,
      amount: sponsorship.amount || 0,
      notes: sponsorship.notes || '',
      event_id: sponsorship.event_id
    });
    setShowCreateModal(true);
  };

  const canManageSponsorships = ['ceo', 'admin', 'it'].includes(user?.role || '');
  const canViewSponsorships = ['ceo', 'admin', 'it', 'ae'].includes(user?.role || '');

  if (!canViewSponsorships) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Access denied. Sponsorship access is restricted to authorized roles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sponsorship Pipeline</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage event sponsorships</p>
        </div>
        {canManageSponsorships && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sponsorship
          </button>
        )}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {stages.map((stage) => {
          const stageSponsors = sponsorships.filter(s => s.stage === stage);
          const stageTotal = stageSponsors.reduce((sum, s) => sum + (s.amount || 0), 0);
          
          return (
            <div
              key={stage}
              className={`rounded-lg ${stageConfig[stage].bgColor} border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-96`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {stageConfig[stage].title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageConfig[stage].color}`}>
                    {stageSponsors.length}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Total: AED {stageTotal.toLocaleString()}
                </p>
              </div>

              <div className="p-4 space-y-3">
                {stageSponsors.map((sponsorship) => (
                  <div
                    key={sponsorship.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, sponsorship.id)}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {sponsorship.company_name}
                      </h4>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => startEdit(sponsorship)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(sponsorship.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${packageColors[sponsorship.package_type]}`}>
                        {sponsorship.package_type}
                      </span>
                      
                      {sponsorship.amount && (
                        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <DollarSign className="h-3 w-3 mr-1" />
                          AED {sponsorship.amount.toLocaleString()}
                        </div>
                      )}

                      {sponsorship.contact_name && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Contact: {sponsorship.contact_name}
                        </div>
                      )}

                      {sponsorship.contact_email && (
                        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <Mail className="h-3 w-3 mr-1" />
                          {sponsorship.contact_email}
                        </div>
                      )}

                      {sponsorship.notes && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          {sponsorship.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && canManageSponsorships && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingSponsorship ? 'Edit Sponsorship' : 'Add New Sponsorship'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Package Type
                    </label>
                    <select
                      value={formData.package_type}
                      onChange={(e) => setFormData({ ...formData, package_type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Stage
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="prospecting">Prospecting</option>
                      <option value="in_progress">In Progress</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="fulfilled">Fulfilled</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount (AED)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingSponsorship ? 'Update Sponsorship' : 'Add Sponsorship'}
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