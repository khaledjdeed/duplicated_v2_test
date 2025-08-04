import React, { useState } from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth';
import { 
  Settings, 
  Database, 
  Server, 
  Code, 
  Terminal, 
  Shield, 
  Users, 
  Activity,
  Zap,
  FileCode,
  GitBranch,
  Monitor
} from 'lucide-react';
import toast from 'react-hot-toast';

export function DeveloperTools() {
  const { currentUser } = useDemoAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [systemSettings, setSystemSettings] = useState({
    maintenance_mode: false,
    debug_mode: true,
    api_rate_limit: 1000,
    max_file_size: 50,
    session_timeout: 24
  });

  const handleSettingChange = (key: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Setting updated');
  };

  const systemStats = {
    uptime: '99.8%',
    active_users: 147,
    total_events: 23,
    total_tasks: 89,
    database_size: '2.3 GB',
    api_calls_hour: 1247,
    memory_usage: '76%',
    cpu_usage: '23%'
  };

  const recentLogs = [
    { time: '14:32:15', level: 'INFO', message: 'User login successful: sarah@company.com' },
    { time: '14:31:48', level: 'WARN', message: 'Rate limit exceeded for IP: 192.168.1.100' },
    { time: '14:30:22', level: 'INFO', message: 'Event created: Annual Tech Conference 2024' },
    { time: '14:29:55', level: 'ERROR', message: 'Failed to upload file: timeout after 30s' },
    { time: '14:28:17', level: 'INFO', message: 'Task assigned: Design Conference Banner' }
  ];

  if (currentUser?.role !== 'it') {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 font-semibold">Access Denied</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Developer tools are restricted to IT administrators only.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: Monitor },
    { id: 'settings', label: 'Configuration', icon: Settings },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'api', label: 'API Management', icon: Server },
    { id: 'logs', label: 'System Logs', icon: Terminal },
    { id: 'deployment', label: 'Deployment', icon: GitBranch }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Code className="h-6 w-6 mr-2 text-purple-600" />
            Developer Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced system configuration and monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            <Zap className="h-3 w-3 mr-1" />
            IT Admin Access
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(systemStats).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                      {key.replace('_', ' ')}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  System Health
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">
                        Maintenance Mode
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enable to perform system maintenance
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('maintenance_mode', !systemSettings.maintenance_mode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        systemSettings.maintenance_mode ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          systemSettings.maintenance_mode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">
                        Debug Mode
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Show detailed error messages
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('debug_mode', !systemSettings.debug_mode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        systemSettings.debug_mode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          systemSettings.debug_mode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                      API Rate Limit (per hour)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.api_rate_limit}
                      onChange={(e) => handleSettingChange('api_rate_limit', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Max File Size (MB)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.max_file_size}
                      onChange={(e) => handleSettingChange('max_file_size', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Session Timeout (hours)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.session_timeout}
                      onChange={(e) => handleSettingChange('session_timeout', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Logs</h3>
                <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors">
                  Export Logs
                </button>
              </div>
              
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                {recentLogs.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-gray-500">[{log.time}]</span>{' '}
                    <span className={
                      log.level === 'ERROR' ? 'text-red-400' :
                      log.level === 'WARN' ? 'text-yellow-400' :
                      'text-green-400'
                    }>
                      {log.level}
                    </span>{' '}
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Database Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg text-left transition-colors">
                  <Database className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-900 dark:text-white">Backup Database</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Create full backup</p>
                </button>
                
                <button className="p-4 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg text-left transition-colors">
                  <FileCode className="h-6 w-6 text-green-600 mb-2" />
                  <p className="font-medium text-gray-900 dark:text-white">Run Migrations</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Apply pending changes</p>
                </button>
                
                <button className="p-4 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg text-left transition-colors">
                  <Activity className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="font-medium text-gray-900 dark:text-white">Performance Stats</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Query performance</p>
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'api' || activeTab === 'deployment') && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Feature In Development
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                This section will be available in the next release.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}