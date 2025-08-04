import React, { useState, useEffect } from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth';
import { Calendar, MapPin, Users, Clock, Plus, Edit, Trash2, Award } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Event {
  id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export function EventsView() {
  const { currentUser } = useDemoAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    status: 'planning' as const
  });

  useEffect(() => {
    fetchEvents();
  }, [currentUser]);

  const fetchEvents = async () => {
    if (!currentUser) return;

    try {
      // Simulate fetching events based on role
      const mockEvents: Event[] = [
        {
          id: '1',
          name: 'Tech Conference 2024',
          description: 'Annual technology conference with industry leaders',
          start_date: '2024-03-15T09:00:00Z',
          end_date: '2024-03-15T17:00:00Z',
          location: 'Convention Center',
          status: 'planning',
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'Product Launch Event',
          description: 'Launch event for our new product line',
          start_date: '2024-04-20T14:00:00Z',
          end_date: '2024-04-20T18:00:00Z',
          location: 'Main Auditorium',
          status: 'active',
          created_at: '2024-02-01T09:00:00Z'
        }
      ];

      // Filter events based on role
      let filteredEvents = mockEvents;
      if (currentUser.role !== 'it' && currentUser.role !== 'admin') {
        // In demo mode, show all events but in real app would filter by team_id
        filteredEvents = mockEvents;
      }

      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      if (editingEvent) {
        // Simulate updating event
        const updatedEvents = events.map(event =>
          event.id === editingEvent.id
            ? { ...event, ...formData, updated_at: new Date().toISOString() }
            : event
        );
        setEvents(updatedEvents);
        toast.success('Event updated successfully');
      } else {
        // Create new event (only IT can do this)
        if (currentUser.role !== 'it') {
          toast.error('Only IT can create events directly');
          return;
        }

        // Simulate creating new event
        const newEvent: Event = {
          id: Date.now().toString(),
          ...formData,
          created_at: new Date().toISOString()
        };
        setEvents([...events, newEvent]);
        toast.success('Event created successfully');
      }

      resetForm();
      fetchEvents();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      // Simulate deleting event
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      toast.success('Event deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete event');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      status: 'planning'
    });
    setShowCreateModal(false);
    setEditingEvent(null);
  };

  const startEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      description: event.description || '',
      start_date: format(new Date(event.start_date), "yyyy-MM-dd'T'HH:mm"),
      end_date: format(new Date(event.end_date), "yyyy-MM-dd'T'HH:mm"),
      location: event.location || '',
      status: event.status
    });
    setShowCreateModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canCreateEvents = currentUser?.role === 'it';
  const canEditEvents = currentUser?.role === 'it' || currentUser?.role === 'admin';

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {currentUser?.role === 'it' ? 'Manage all events' : 'View your team events'}
          </p>
        </div>
        {canCreateEvents && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No events found</p>
          {canCreateEvents && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Event
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  {canEditEvents && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(event)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {event.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {event.description}
                  </p>
                )}

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    {format(new Date(event.start_date), 'MMM d, yyyy h:mm a')} - {format(new Date(event.end_date), 'MMM d, yyyy h:mm a')}
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  )}
                  {event.cme_credits && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Award className="h-4 w-4 mr-2" />
                      {event.cme_credits} CME Credits
                    </div>
                  )}
                  {event.cme_accreditation && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 ml-6">
                      Accredited by: {event.cme_accreditation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date & Time
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
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

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
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