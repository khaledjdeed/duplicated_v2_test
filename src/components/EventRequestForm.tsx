import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { mockEventRequests, getEventRequestsByUserId } from '../lib/mockData';
import { BackButton } from './BackButton';
import { EventRequest } from '../lib/types';
import { Calendar, Send, Clock, MapPin, FileText } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function EventRequestForm() {
  const { user, canRequestEvents, canApproveEvents } = useAuth();
  const [requests, setRequests] = useState<EventRequest[]>(mockEventRequests);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    justification: ''
  });

  const getFilteredRequests = () => {
    if (!user) return [];
    
    if (canApproveEvents()) {
      // IT can see all requests for approval
      return requests;
    } else if (canRequestEvents()) {
      // Event coordinators can see their own requests
      return getEventRequestsByUserId(user.id);
    }
    
    return [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: EventRequest = {
      id: `req-${Date.now()}`,
      ...formData,
      team_id: user?.team_id || '',
      status: 'pending',
      requested_by: user?.id || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setRequests(prev => [newRequest, ...prev]);
    toast.success('Event request submitted successfully');
    
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      justification: ''
    });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleApproval = (requestId: string, status: 'approved' | 'rejected') => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status, reviewed_by: user?.id, updated_at: new Date().toISOString() }
          : req
      )
    );
    toast.success(`Request ${status} successfully`);
  };

  const filteredRequests = getFilteredRequests();
  const hasAccess = canRequestEvents() || canApproveEvents();

  if (!hasAccess) {
    return (
      <div className="p-6">
        <BackButton />
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You do not have permission to view event requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {canRequestEvents() && !canApproveEvents() ? 'My Event Requests' : 'Event Request Management'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {canRequestEvents() && !canApproveEvents()
              ? 'Submit requests for new events to IT for approval' 
              : 'Review and approve event requests from coordinators'
            }
          </p>
        </div>
        {canRequestEvents() && (
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Request New Event
          </button>
        )}
      </div>

      {hasAccess && (
        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No event requests found</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-2 ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    {canApproveEvents() && request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproval(request.id, 'approved')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(request.id, 'rejected')}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  {request.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {request.description}
                    </p>
                  )}

                  {(request.start_date || request.location) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {request.start_date && request.end_date && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          {format(new Date(request.start_date), 'MMM d, yyyy h:mm a')} - {format(new Date(request.end_date), 'MMM d, yyyy h:mm a')}
                        </div>
                      )}
                      {request.location && (
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          {request.location}
                        </div>
                      )}
                    </div>
                  )}

                  {request.justification && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start">
                        <FileText className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            Justification
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {request.justification}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                    Requested on {format(new Date(request.created_at), 'MMM d, yyyy at h:mm a')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Request Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Request New Event
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter event name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe the event"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date & Time (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date & Time (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Event venue or location (can be determined later)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Business Justification
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.justification}
                    onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Explain why this event is necessary and how it benefits the organization"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        Review Process
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Your request will be reviewed by the IT team. Date, time, and location can be finalized during the approval process. You'll receive notification once it's approved or if additional information is needed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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