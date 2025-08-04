import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  User,
  Database,
  AlertTriangle,
        <EmptyState
          icon={Shield}
          title="Access Restricted"
          description="User management is restricted to CEO, Admin, and IT users only."
        />
import toast from 'react-hot-toast';

interface AuditLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  table_name: string;
  record_id?: string;
  details?: Record<string, any>;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip_address?: string;
}

export function AuditLogsView() {
  const { user, users } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  // Mock audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: 'log1',
      user_id: 'yousef-ceo',
      user_name: 'Yousef Al-Rashid',
      action: 'export_contacts',
      table_name: 'contacts',
      record_id: 'all',
      details: { contact_count: 1234, export_format: 'csv' },
      timestamp: '2024-12-01T14:30:00Z',
      severity: 'medium',
      ip_address: '192.168.1.100'
    },
    {
      id: 'log2',
      user_id: 'mariam-admin',
      user_name: 'Mariam Wael',
      action: 'create_email_campaign',
      table_name: 'email_campaigns',
      record_id: 'campaign-123',
      details: { campaign_name: 'Healthcare Summit 2024', recipient_count: 856 },
      timestamp: '2024-12-01T13:15:00Z',
      severity: 'low',
      ip_address: '192.168.1.101'
    },
    {
      id: 'log3',
      user_id: 'imran-it',
      user_name: 'Imran Khan',
      action: 'create_event',
      table_name: 'events',
      record_id: 'event-456',
      details: { event_name: 'Cardiology Conference 2024', budget: 150000 },
      timestamp: '2024-12-01T12:45:00Z',
      severity: 'high',
      ip_address: '192.168.1.102'
    },
    {
      id: 'log4',
      user_id: 'samir-ae',
      user_name: 'Samir Hassan',
      action: 'failed_login',
      table_name: 'auth',
      details: { reason: 'invalid_password', attempts: 3 },
      timestamp: '2024-12-01T11:20:00Z',
      severity: 'critical',
      ip_address: '192.168.1.103'
    },
    {
      id: 'log5',
      user_id: 'joel-designer',
      user_name: 'Joel Mutia',
      action: 'upload_file',
      table_name: 'uploads',
      record_id: 'upload-789',
      details: { file_name: 'conference-banner.png', file_size: 2048000 },
      timestamp: '2024-12-01T10:30:00Z',
      severity: 'low',
      ip_address: '192.168.1.104'
    },
    {
      id: 'log6',
      user_id: 'layla-marketing',
      user_name: 'Layla Al-Zahra',
      action: 'send_email_campaign',
      table_name: 'email_campaigns',
      record_id: 'campaign-124',
      details: { emails_sent: 1247, success_rate: 96.2 },
      timestamp: '2024-12-01T09:15:00Z',
      severity: 'medium',
      ip_address: '192.168.1.105'
    },
    {
      id: 'log7',
      user_id: 'yousef-ceo',
      user_name: 'Yousef Al-Rashid',
      action: 'view_budget',
      table_name: 'budgets',
      record_id: 'budget-all',
      details: { total_budget_viewed: 2400000 },
      timestamp: '2024-11-30T16:45:00Z',
      severity: 'low',
      ip_address: '192.168.1.100'
    },
    {
      id: 'log8',
      user_id: 'ahmed-teamlead',
      user_name: 'Ahmed Al-Maktoum',
      action: 'assign_task',
      table_name: 'tasks',
      record_id: 'task-890',
      details: { task_title: 'Design Event Materials', assigned_to: 'Joel Mutia' },
      timestamp: '2024-11-30T15:20:00Z',
      severity: 'low',
      ip_address: '192.168.1.106'
    }
  ];

  const handleExport = () => {
    if (!['ceo', 'admin'].includes(user?.role || '')) {
      toast.error('You do not have permission to export audit logs');
      return;
    }

    // Log the export action
    const exportLogEntry: AuditLog = {
      id: `log-${Date.now()}`,
      user_id: user?.id || '',
      user_name: user?.full_name || '',
      action: 'export_audit_logs',
      table_name: 'audit_logs',
      details: { 
        log_count: selectedLogs.length || auditLogs.length,
        export_format: 'csv',
        filters: { action: actionFilter, severity: severityFilter, date_range: dateRange }
      },
      timestamp: new Date().toISOString(),
      severity: 'medium',
      ip_address: '192.168.1.100'
    };

    console.log('Audit log export:', exportLogEntry);
    toast.success(`Exported ${selectedLogs.length || auditLogs.length} audit log entries`);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.table_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    
    // Date filtering
    const logDate = new Date(log.timestamp);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let matchesDate = true;
    switch (dateRange) {
      case '1d': matchesDate = daysDiff <= 1; break;
      case '7d': matchesDate = daysDiff <= 7; break;
      case '30d': matchesDate = daysDiff <= 30; break;
      case '90d': matchesDate = daysDiff <= 90; break;
    }
    
    return matchesSearch && matchesAction && matchesSeverity && matchesDate;
  });

  const canViewAuditLogs = ['ceo', 'admin'].includes(user?.role || '');

  if (!canViewAuditLogs) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Audit logs are restricted to CEO and Admin roles only.
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
            <Shield className="h-6 w-6 mr-2 text-red-600" />
            Audit Logs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete audit trail of all system activities and data access
          </p>
        </div>
        <button
          onClick={handleExport}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Actions</option>
              <option value="export_contacts">Export Contacts</option>
              <option value="create_event">Create Event</option>
              <option value="create_email_campaign">Create Campaign</option>
              <option value="failed_login">Failed Login</option>
              <option value="upload_file">Upload File</option>
              <option value="send_email_campaign">Send Campaign</option>
              <option value="view_budget">View Budget</option>
              <option value="assign_task">Assign Task</option>
            </select>
          </div>
          <div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              System Activity Log ({filteredLogs.length} entries)
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedLogs.length} selected
              </span>
              {selectedLogs.length > 0 && (
                <button
                  onClick={() => setSelectedLogs([])}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  Clear selection
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLogs.length === filteredLogs.length && filteredLogs.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLogs(filteredLogs.map(log => log.id));
                      } else {
                        setSelectedLogs([]);
                      }
                    }}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedLogs.includes(log.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLogs([...selectedLogs, log.id]);
                        } else {
                          setSelectedLogs(selectedLogs.filter(id => id !== log.id));
                        }
                      }}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div>{format(new Date(log.timestamp), 'MMM d, yyyy')}</div>
                        <div className="text-xs text-gray-500">{format(new Date(log.timestamp), 'h:mm:ss a')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {log.user_name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {log.ip_address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {log.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 text-gray-400 mr-2" />
                      {log.table_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getSeverityIcon(log.severity)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {log.details && (
                      <div className="max-w-xs">
                        <details className="cursor-pointer">
                          <summary className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                            View details
                          </summary>
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </div>
                        </details>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No audit logs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}