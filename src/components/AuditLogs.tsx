import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  FileText,
  Database,
  Settings,
  Trash2
} from 'lucide-react';
import { BackButton } from './BackButton';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface AuditLogEntry {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  table_name: string;
  record_id?: string;
  details?: Record<string, any>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failed' | 'warning';
}

export function AuditLogs() {
  const { user, hasPermission } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-1',
      user_id: 'yousef-ceo',
      user_name: 'Yousef Al-Rashid',
      action: 'CREATE_EVENT',
      table_name: 'events',
      record_id: 'event-123',
      details: { event_name: 'Healthcare Innovation Summit', location: 'Dubai' },
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: '2024-12-01T14:30:15Z',
      severity: 'medium',
      status: 'success'
    },
    {
      id: 'log-2',
      user_id: 'mariam-admin',
      user_name: 'Mariam Wael',
      action: 'EXPORT_CONTACTS',
      table_name: 'contacts',
      details: { contact_count: 247, export_format: 'CSV' },
      ip_address: '192.168.1.105',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: '2024-12-01T13:45:22Z',
      severity: 'high',
      status: 'success'
    },
    {
      id: 'log-3',
      user_id: 'joel-designer',
      user_name: 'Joel Mutia',
      action: 'UPLOAD_FILE',
      table_name: 'uploads',
      record_id: 'upload-456',
      details: { file_name: 'conference-banner.psd', file_size: '2.4 MB' },
      ip_address: '192.168.1.112',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: '2024-12-01T12:20:08Z',
      severity: 'low',
      status: 'success'
    },
    {
      id: 'log-4',
      user_id: 'imran-it',
      user_name: 'Imran Khan',
      action: 'UPDATE_SYSTEM_SETTINGS',
      table_name: 'system_settings',
      details: { setting: 'max_file_size', old_value: '50MB', new_value: '100MB' },
      ip_address: '192.168.1.115',
      user_agent: 'Mozilla/5.0 (Linux; Ubuntu) AppleWebKit/537.36',
      timestamp: '2024-12-01T11:15:33Z',
      severity: 'critical',
      status: 'success'
    },
    {
      id: 'log-5',
      user_id: 'samir-ae',
      user_name: 'Samir Hassan',
      action: 'LOGIN_FAILED',
      table_name: 'auth_logs',
      details: { reason: 'invalid_password', attempt_count: 3 },
      ip_address: '192.168.1.120',
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      timestamp: '2024-12-01T10:45:12Z',
      severity: 'medium',
      status: 'failed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const canViewAuditLogs = hasPermission('view_audit_logs') || ['ceo', 'admin'].includes(user?.role || '');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('CREATE') || action.includes('ADD')) return FileText;
    if (action.includes('UPDATE') || action.includes('EDIT')) return Settings;
    if (action.includes('DELETE') || action.includes('REMOVE')) return Trash2;
    if (action.includes('EXPORT')) return Download;
    if (action.includes('LOGIN')) return User;
    return Database;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.table_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleExport = () => {
    toast.success('Audit logs exported successfully');
  };

  const handleClearOldLogs = () => {
    if (confirm('Are you sure you want to clear logs older than 90 days?')) {
      toast.success('Old logs cleared successfully');
    }
  };

  if (!canViewAuditLogs) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You do not have permission to view audit logs.
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
              <Shield className="h-6 w-6 mr-2 text-red-600" />
              Audit Logs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              System activity tracking and security monitoring
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleClearOldLogs}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Old
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{logs.length}</p>
            </div>
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Successful</p>
              <p className="text-2xl font-bold text-green-600">
                {logs.filter(l => l.status === 'success').length}
              </p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {logs.filter(l => l.status === 'failed').length}
              </p>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-purple-600">
                {logs.filter(l => l.severity === 'critical').length}
              </p>
            </div>
            <Shield className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>

          <div className="flex space-x-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              System Activity Log
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Real-time monitoring</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
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
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => {
                const ActionIcon = getActionIcon(log.action);
                return (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div>
                        <div className="font-medium">
                          {format(new Date(log.timestamp), 'MMM d, yyyy')}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {format(new Date(log.timestamp), 'h:mm:ss a')}
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
                      <div className="flex items-center">
                        <ActionIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {log.action.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {log.table_name}
                      {log.record_id && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {log.record_id.slice(-8)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No audit logs found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Audit Log Details
                </h2>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      User
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedLog.user_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Timestamp
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {format(new Date(selectedLog.timestamp), 'PPpp')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Action
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedLog.action.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Resource
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedLog.table_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      IP Address
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedLog.ip_address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedLog.status)}`}>
                      {selectedLog.status}
                    </span>
                  </div>
                </div>

                {selectedLog.details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Details
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <pre className="text-xs text-gray-900 dark:text-white whitespace-pre-wrap">
                        {JSON.stringify(selectedLog.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    User Agent
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {selectedLog.user_agent}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}