import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Settings, 
  Shield, 
  Database, 
  Mail, 
  Bell, 
  Globe, 
  Lock, 
  Server,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Monitor,
  Clock,
  HardDrive,
  Cpu
} from 'lucide-react';
import { BackButton } from './BackButton';
import { LoadingSpinner } from './LoadingSpinner';
import toast from 'react-hot-toast';

export function SystemSettings() {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      site_name: 'MCO Event Management',
      site_description: 'Professional Healthcare Event Management System for UAE Medical Professionals',
      timezone: 'Asia/Dubai',
      date_format: 'dd/MM/yyyy',
      language: 'en',
      maintenance_mode: false
    },
    security: {
      password_min_length: 8,
      require_2fa: true,
      session_timeout: 24,
      max_login_attempts: 5,
      password_expiry_days: 90,
      ip_whitelist_enabled: false,
      allowed_ips: ''
    },
    notifications: {
      email_notifications: true,
      push_notifications: true,
      task_reminders: true,
      event_updates: true,
      system_alerts: true,
      daily_digest: false
    },
    integrations: {
      smtp_host: 'smtp.gmail.com',
      smtp_port: 587,
      smtp_username: '',
      smtp_password: '',
      calendar_sync: false,
      slack_webhook: '',
      teams_webhook: ''
    },
    backup: {
      auto_backup: true,
      backup_frequency: 'daily',
      retention_days: 30,
      backup_location: 'cloud'
    },
    performance: {
      cache_enabled: true,
      cache_ttl: 3600,
      compression_enabled: true,
      cdn_enabled: false
    }
  });

  const systemStatus = {
    server_uptime: '99.8%',
    database_status: 'healthy',
    memory_usage: 76,
    cpu_usage: 23,
    disk_usage: 45,
    active_connections: 147,
    last_backup: '2024-12-01T02:00:00Z',
    backup_status: 'success'
  };

  const canManageSettings = hasPermission('manage_system') || ['ceo', 'admin', 'it'].includes(user?.role || '');

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = async (category: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${category.charAt(0).toUpperCase() + category.slice(1)} settings saved successfully`);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleBackup = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Backup completed successfully');
    } catch (error) {
      toast.error('Backup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleMaintenanceMode = async () => {
    const newValue = !settings.general.maintenance_mode;
    setSettings(prev => ({
      ...prev,
      general: { ...prev.general, maintenance_mode: newValue }
    }));
    
    if (newValue) {
      toast.success('Maintenance mode enabled - System will be unavailable to users');
    } else {
      toast.success('Maintenance mode disabled - System is now available');
    }
  };

  if (!canManageSettings) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You do not have permission to manage system settings.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'backup', label: 'Backup & Recovery', icon: Database },
    { id: 'performance', label: 'Performance', icon: Monitor },
    { id: 'status', label: 'System Status', icon: Server }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Settings className="h-6 w-6 mr-2 text-blue-600" />
              System Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure system-wide settings and preferences
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={handleMaintenanceMode}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
              settings.general.maintenance_mode 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            {settings.general.maintenance_mode ? 'Exit Maintenance' : 'Maintenance Mode'}
          </button>
        </div>
      </div>

      {/* System Status Alert */}
      {settings.general.maintenance_mode && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Maintenance Mode Active</h3>
              <p className="text-sm text-red-700">
                The system is currently in maintenance mode. Users cannot access the application.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.site_name}
                    onChange={(e) => handleSettingChange('general', 'site_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Asia/Dubai">Dubai (GMT+4)</option>
                    <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="Europe/London">London Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Format
                  </label>
                  <select
                    value={settings.general.date_format}
                    onChange={(e) => handleSettingChange('general', 'date_format', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                    <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                    <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Description
                </label>
                <textarea
                  rows={3}
                  value={settings.general.site_description}
                  onChange={(e) => handleSettingChange('general', 'site_description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                onClick={() => handleSave('general')}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4 mr-2" />}
                Save General Settings
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="20"
                    value={settings.security.password_min_length}
                    onChange={(e) => handleSettingChange('security', 'password_min_length', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Timeout (hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="168"
                    value={settings.security.session_timeout}
                    onChange={(e) => handleSettingChange('security', 'session_timeout', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={settings.security.max_login_attempts}
                    onChange={(e) => handleSettingChange('security', 'max_login_attempts', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="365"
                    value={settings.security.password_expiry_days}
                    onChange={(e) => handleSettingChange('security', 'password_expiry_days', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Require Two-Factor Authentication
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Force all users to enable 2FA for enhanced security
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('security', 'require_2fa', !settings.security.require_2fa)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.security.require_2fa ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.security.require_2fa ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      IP Whitelist
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('security', 'ip_whitelist_enabled', !settings.security.ip_whitelist_enabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.security.ip_whitelist_enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.security.ip_whitelist_enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleSave('security')}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4 mr-2" />}
                Save Security Settings
              </button>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-300">Server Uptime</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                        {systemStatus.server_uptime}
                      </p>
                    </div>
                    <Server className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Memory Usage</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                        {systemStatus.memory_usage}%
                      </p>
                    </div>
                    <Monitor className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-2 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemStatus.memory_usage}%` }}
                    />
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-900 dark:text-purple-300">CPU Usage</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                        {systemStatus.cpu_usage}%
                      </p>
                    </div>
                    <Cpu className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mt-2 w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemStatus.cpu_usage}%` }}
                    />
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-900 dark:text-orange-300">Disk Usage</p>
                      <p className="text-2xl font-bold text-orange-900 dark:text-orange-300">
                        {systemStatus.disk_usage}%
                      </p>
                    </div>
                    <HardDrive className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="mt-2 w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${systemStatus.disk_usage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Database Status</h4>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium capitalize">{systemStatus.database_status}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    All database connections are operational
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Backup Status</h4>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium capitalize">{systemStatus.backup_status}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Last backup: {format(new Date(systemStatus.last_backup), 'PPp')}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleBackup}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? <LoadingSpinner size="sm" /> : <Database className="h-4 w-4 mr-2" />}
                  Run Backup Now
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Status
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}