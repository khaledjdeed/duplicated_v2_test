import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Calendar, 
  Plus, 
  Clock, 
  MapPin, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Award,
  Users
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function EventCreationForm() {
  const { user, createEvent } = useAuth();
  const [eventsCreatedToday, setEventsCreatedToday] = useState(2); // Mock daily count
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    status: 'planning' as const,
    cme_credits: 0,
    cme_accreditation: '',
    expected_attendees: 0,
    budget_estimate: 0
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (eventsCreatedToday >= 3) {
      toast.error('Daily event creation limit reached (3/day)');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmCreateEvent = () => {
    try {
      const eventData = {
        ...formData,
        team_id: 'team1', // Default team
        created_by: user?.id || '',
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString()
      };

      createEvent(eventData);
      setEventsCreatedToday(prev => prev + 1);
      
      // Log the event creation
      const logEntry = {
        user_id: user?.id,
        action: 'create_event',
        table_name: 'events',
        details: { 
          event_name: formData.name,
          budget_estimate: formData.budget_estimate,
          expected_attendees: formData.expected_attendees
        },
        timestamp: new Date().toISOString()
      };

      console.log('Event creation logged:', logEntry);
      toast.success('Event created successfully');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        status: 'planning',
        cme_credits: 0,
        cme_accreditation: '',
        expected_attendees: 0,
        budget_estimate: 0
      });
      setShowConfirmation(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create event');
    }
  };

  const canCreateEvents = user?.role === 'it';
  const dailyLimitReached = eventsCreatedToday >= 3;

  if (!canCreateEvents) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Event creation is restricted to IT administrators only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
            Event Creation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create new events with comprehensive details and CME accreditation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            dailyLimitReached 
              ? 'bg-red-100 text-red-800 border-red-200' 
              : 'bg-green-100 text-green-800 border-green-200'
          } border`}>
            {dailyLimitReached ? <AlertTriangle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
            {eventsCreatedToday}/3 events created today
          </span>
        </div>
      </div>

      {/* Daily Limit Warning */}
      {dailyLimitReached && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Daily Event Creation Limit Reached
              </p>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                You have reached the maximum of 3 events per day. Please try again tomorrow or contact system administrator for exceptions.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., UAE Healthcare Innovation Summit 2024"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Detailed description of the event, target audience, and objectives"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Dubai World Trade Centre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Healthcare-Specific Fields */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-600" />
                Healthcare Accreditation
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CME Credits
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.cme_credits}
                    onChange={(e) => setFormData({ ...formData, cme_credits: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Number of CME credits offered"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accreditation Bodies
                  </label>
                  <input
                    type="text"
                    value={formData.cme_accreditation}
                    onChange={(e) => setFormData({ ...formData, cme_accreditation: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., DHA, MOH, HAAD, SCFHS"
                  />
                </div>
              </div>
            </div>

            {/* Planning Details */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Planning Details
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Attendees
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.expected_attendees}
                    onChange={(e) => setFormData({ ...formData, expected_attendees: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Estimated number of attendees"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Estimate (AED)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.budget_estimate}
                    onChange={(e) => setFormData({ ...formData, budget_estimate: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Initial budget estimate"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={dailyLimitReached}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({
                    name: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    location: '',
                    status: 'planning',
                    cme_credits: 0,
                    cme_accreditation: '',
                    expected_attendees: 0,
                    budget_estimate: 0
                  })}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Event Creation
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Event Name:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formData.name}</span>
                </div>
                {formData.start_date && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Start Date:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {format(new Date(formData.start_date), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                )}
                {formData.cme_credits > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">CME Credits:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formData.cme_credits}</span>
                  </div>
                )}
                {formData.budget_estimate > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Budget Estimate:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      AED {formData.budget_estimate.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={confirmCreateEvent}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Confirm Creation
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
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