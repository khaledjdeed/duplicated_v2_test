import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  EyeOff, 
  Shield,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  organization: string;
  attributes: Record<string, any>;
  created_at: string;
}

export function ContactDirectory() {
  const { user, canAccessContacts, canExport } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Mock contacts data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Al-Rashid',
      position: 'Chief Medical Officer',
      email: 'ahmed.rashid@hospital.ae',
      phone: '+971-50-123-4567',
      organization: 'Dubai Health Authority',
      attributes: { specialty: 'Cardiology', years_experience: 15 },
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Dr. Fatima Al-Zahra',
      position: 'Head of Neurology',
      email: 'fatima.zahra@clinic.ae',
      phone: '+971-55-987-6543',
      organization: 'American Hospital Dubai',
      attributes: { specialty: 'Neurology', years_experience: 12 },
      created_at: '2024-01-20T14:30:00Z'
    },
    {
      id: '3',
      name: 'Dr. Omar Hassan',
      position: 'Director of Operations',
      email: 'omar.hassan@medical.ae',
      phone: '+971-52-456-7890',
      organization: 'Mediclinic Middle East',
      attributes: { specialty: 'Administration', years_experience: 20 },
      created_at: '2024-02-01T09:15:00Z'
    }
  ];

  const handleExport = () => {
    if (!canExport()) {
      toast.error('You do not have permission to export contacts');
      return;
    }

    // Log the export action
    const exportData = {
      user_id: user?.id,
      action: 'export_contacts',
      table_name: 'contacts',
      timestamp: new Date().toISOString(),
      details: { 
        contact_count: selectedContacts.length || contacts.length,
        export_type: 'csv'
      }
    };

    console.log('Export logged:', exportData);
    toast.success(`Exported ${selectedContacts.length || contacts.length} contacts`);
  };

  const requestContactAccess = () => {
    toast.success('Access request sent to admin for approval');
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasFullAccess = canAccessContacts();
  const isMarketing = user?.role === 'marketing';

  if (!hasFullAccess && !isMarketing) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You do not have permission to view the contact directory.
          </p>
          <button
            onClick={requestContactAccess}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="h-4 w-4 mr-2" />
            Request Access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="h-6 w-6 mr-2 text-blue-600" />
            Contact Directory
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {hasFullAccess ? 'Healthcare professionals database' : 'Limited view - name and position only'}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {hasFullAccess && (
            <button
              onClick={() => setShowEncrypted(!showEncrypted)}
              className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showEncrypted 
                  ? 'bg-accent-100 text-accent-800 hover:bg-accent-200 border border-accent-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showEncrypted ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
              {showEncrypted ? 'Hide' : 'Show'} Contact Info
            </button>
          )}
          {canExport() && (
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {contact.position}
                  </p>
                  <div className="flex items-center mt-1">
                    <Building className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {contact.organization}
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedContacts([...selectedContacts, contact.id]);
                    } else {
                      setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                {hasFullAccess && showEncrypted ? (
                  <>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="font-mono text-xs bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                        {contact.email}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="font-mono text-xs bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                        {contact.phone}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Shield className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {hasFullAccess ? 'Click "Show Contact Info" to view encrypted details' : 'Contact details restricted'}
                    </p>
                  </div>
                )}
              </div>

              {/* Attributes */}
              {contact.attributes && Object.keys(contact.attributes).length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(contact.attributes).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No contacts found matching your search</p>
        </div>
      )}
    </div>
  );
}