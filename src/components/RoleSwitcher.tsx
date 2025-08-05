import React from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth';
import { ChevronDown, User } from 'lucide-react';

export function RoleSwitcher() {
  const { currentUser, switchRole, availableUsers } = useDemoAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'it': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'event_coordinator': return 'bg-blue-100 text-blue-800';
      case 'designer': return 'bg-green-100 text-green-800';
      case 'sales': return 'bg-yellow-100 text-yellow-800';
      case 'logistics': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRole = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-2">
          <img
            src={currentUser?.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
            alt={currentUser?.full_name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {currentUser?.full_name}
            </p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(currentUser?.role || '')}`}>
              {formatRole(currentUser?.role || '')}
            </span>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute top-full left-0 mt-1 w-full min-w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            Switch Demo Role
          </div>
          {availableUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => switchRole(user.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-md text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                currentUser?.id === user.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <img
                src={user.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop'}
                alt={user.full_name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.full_name}
                </p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {formatRole(user.role)}
                </span>
              </div>
              {currentUser?.id === user.id && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}