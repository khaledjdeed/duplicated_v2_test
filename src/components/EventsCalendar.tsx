import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Eye,
  Edit,
  Trash2,
  Clock, 
  MapPin,
  Users,
  Award,
  Filter,
  Grid3X3,
  List,
  X
} from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek,
  endOfWeek,
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  isToday,
  parseISO
} from 'date-fns';
import { BackButton } from './BackButton';
import { LoadingSpinner } from './LoadingSpinner';
import toast from 'react-hot-toast';

interface Event {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location?: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  cme_credits?: number;
  cme_accreditation?: string;
  created_by: string;
  created_at: string;
}

type CalendarView = 'month' | 'week' | 'day';

export function EventsCalendar() {
  const { user, canCreateEvents } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Mock events data - in real app this would come from Supabase
  const events: Event[] = [
    {
      id: '1',
      name: 'UAE Healthcare Innovation Summit 2024',
      description: 'Premier healthcare conference focusing on digital health and AI in medicine.',
      start_date: '2024-12-15T09:00:00Z',
      end_date: '2024-12-17T18:00:00Z',
      location: 'Dubai World Trade Centre',
      status: 'planning',
      cme_credits: 24,
      cme_accreditation: 'DHA, MOH, HAAD',
      created_by: 'user-1',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Middle East Cardiology Congress',
      description: 'Annual cardiology conference with leading specialists.',
      start_date: '2024-12-20T08:30:00Z',
      end_date: '2024-12-22T17:30:00Z',
      location: 'Abu Dhabi Convention Centre',
      status: 'active',
      cme_credits: 32,
      cme_accreditation: 'DHA, MOH, HAAD, AHA',
      created_by: 'user-1',
      created_at: '2024-02-01T14:30:00Z'
    },
    {
      id: '3',
      name: 'Pediatric Excellence Workshop',
      description: 'Specialized workshop for pediatric healthcare professionals.',
      start_date: '2024-11-25T09:00:00Z',
      end_date: '2024-11-25T17:00:00Z',
      location: 'Dubai Healthcare City',
      status: 'completed',
      cme_credits: 8,
      cme_accreditation: 'DHA, MOH',
      created_by: 'user-2',
      created_at: '2024-10-01T09:00:00Z'
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    status: 'planning' as const,
    cme_credits: 0,
    cme_accreditation: ''
  });

  const getCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = parseISO(event.start_date);
      const eventEnd = parseISO(event.end_date);
      return date >= startOfDay(eventStart) && date <= endOfDay(eventEnd);
    });
  };

  const navigateCalendar = (direction: 'prev' | 'next') => {
    if (view === 'month') {
      setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
    } else {
      setCurrentDate(direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-purple-500';
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreateEvents()) {
      toast.error('You do not have permission to create events');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Event created successfully');
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Event updated successfully');
      setShowEditModal(false);
      setSelectedEvent(null);
      resetForm();
    } catch (error) {
      toast.error('Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Event deleted successfully');
      setSelectedEvent(null);
    } catch (error) {
      toast.error('Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      status: 'planning',
      cme_credits: 0,
      cme_accreditation: ''
    });
  };

  const startEdit = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      name: event.name,
      description: event.description || '',
      start_date: format(parseISO(event.start_date), "yyyy-MM-dd'T'HH:mm"),
      end_date: format(parseISO(event.end_date), "yyyy-MM-dd'T'HH:mm"),
      location: event.location || '',
      status: event.status,
      cme_credits: event.cme_credits || 0,
      cme_accreditation: event.cme_accreditation || ''
    });
    setShowEditModal(true);
  };

  const renderCalendarHeader = () => {
    let title = '';
    if (view === 'month') {
      title = format(currentDate, 'MMMM yyyy');
    } else if (view === 'week') {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      title = `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      title = format(currentDate, 'EEEE, MMMM d, yyyy');
    }

    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateCalendar('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={() => navigateCalendar('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 rounded-md hover:bg-accent-200 dark:hover:bg-accent-800/50 transition-colors font-medium"
          >
            Today
          </button>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                  view === viewType
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const days = getCalendarDays();
    
    return (
      <>
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2 p-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 p-4">
          {days.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-24 p-2 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors ${
                  isCurrentDay ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${
                  !isCurrentMonth ? 'opacity-50' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isCurrentDay ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80 transition-opacity ${getEventColor(event.status)}`}
                      title={event.name}
                    >
                      {event.name}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays();
    
    return (
      <div className="p-4">
        <div className="grid grid-cols-7 gap-4">
          {days.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentDay = isToday(day);
            
            return (
              <div key={day.toISOString()} className="space-y-2">
                <div className={`text-center p-2 rounded-lg ${
                  isCurrentDay ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  <div className="text-xs font-medium">{format(day, 'EEE')}</div>
                  <div className="text-lg font-bold">{format(day, 'd')}</div>
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`text-xs p-2 rounded text-white cursor-pointer hover:opacity-80 transition-opacity ${getEventColor(event.status)}`}
                    >
                      <div className="font-medium">{event.name}</div>
                      <div className="opacity-90">{format(parseISO(event.start_date), 'h:mm a')}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    
    return (
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        
        <div className="space-y-3">
          {dayEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No events scheduled for this day</p>
              {canCreateEvents() && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </button>
              )}
            </div>
          ) : (
            dayEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.name}
                    </h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {format(parseISO(event.start_date), 'h:mm a')} - {format(parseISO(event.end_date), 'h:mm a')}
                      </div>
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      )}
                      {event.cme_credits && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Award className="h-4 w-4 mr-2" />
                          {event.cme_credits} CME Credits
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" />
              Events Calendar
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and view all healthcare events and conferences
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {canCreateEvents() && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </button>
          )}
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {renderCalendarHeader()}
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedEvent.name}
                </h2>
                <div className="flex items-center space-x-2">
                  {canCreateEvents() && (
                    <>
                      <button
                        onClick={() => startEdit(selectedEvent)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(selectedEvent.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedEvent.status)}`}>
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                  </span>
                </div>

                {selectedEvent.description && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedEvent.description}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {format(parseISO(selectedEvent.start_date), 'PPP')}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {format(parseISO(selectedEvent.start_date), 'h:mm a')} - {format(parseISO(selectedEvent.end_date), 'h:mm a')}
                        </div>
                      </div>
                    </div>

                    {selectedEvent.location && (
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{selectedEvent.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {selectedEvent.cme_credits && (
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 mr-2 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {selectedEvent.cme_credits} CME Credits
                          </div>
                          {selectedEvent.cme_accreditation && (
                            <div className="text-gray-500 dark:text-gray-400">
                              Accredited by: {selectedEvent.cme_accreditation}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                    {canCreateEvents() && (
                      <button
                        onClick={() => startEdit(selectedEvent)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Edit Event
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create New Event
              </h2>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event Name *
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
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Event description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    placeholder="Event location"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CME Credits
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.cme_credits}
                      onChange={(e) => setFormData({ ...formData, cme_credits: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Accreditation
                    </label>
                    <input
                      type="text"
                      value={formData.cme_accreditation}
                      onChange={(e) => setFormData({ ...formData, cme_accreditation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., DHA, MOH, HAAD"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
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

      {/* Edit Event Modal */}
      {showEditModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Edit Event
              </h2>
              <form onSubmit={handleEditEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event Name *
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : 'Update Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
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