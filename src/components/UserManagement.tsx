import React, { useState } from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth';
import { mockUsers, mockTeams, MockUser } from '../lib/mockData';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Filter,
  UserPlus,
  Crown,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

export function UserManagement() {
  const { currentUser } = useDemoAuth();
  const [users, setUsers] = useState<MockUser[]>(mockUsers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<MockUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    role: 'designer' as const,
    team_id: 'team1',
    avatar_url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      setUsers(prev =>
        prev.map(user =>
          user.id === editingUser.id
            ? { ...user, ...formData }
            : user
        )
      );
      toast.success('User updated successfully');
    } else {
      const newUser: MockUser = {
        id: `user-${Date.now()}`,
        ...formData,
        avatar_url: formData.avatar_url || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`
      };
      setUsers(prev => [...prev, newUser]);
      toast.success('User created successfully');
    }

    resetForm();
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('User deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      full_name: '',
      role: 'designer',
      team_id: 'team1',
      avatar_url: ''
    });
    setShowCreateModal(false);
    setEditingUser(null);
  };

  const startEdit = (user: MockUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      full_name: user.full_name,
      role: user.role,
      team_id: user.team_id,
      avatar_url: user.avatar_url || ''
    });
    setShowCreateModal(true);
  };

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'it': return Settings;
      case 'admin': return Crown;
      case 'event_coordinator': return Calendar;
      case 'designer': return Edit;
      case 'sales': return Phone;
      case 'logistics': return Users;
      default: return Users;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const canManageUsers = ['it', 'admin'].includes(currentUser?.role || '');

  if (!canManageUsers) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 font-semibold">Access Denied</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            User management is restricted to IT and Admin users only.
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
            <Users className="h-6 w-6 mr-2 text-blue-600" />
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage system users and their permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="it">IT</option>
              <option value="admin">Admin</option>
              <option value="event_coordinator">Event Coordinator</option>
              <option value="designer">Designer</option>
              <option value="sales">Sales</option>
              <option value="logistics">Logistics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const RoleIcon = getRoleIcon(user.role);
          return (
            <div key={user.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop'}
                      alt={user.full_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.full_name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(user)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColor(user.role)}`}>
                      <RoleIcon className="h-3 w-3 mr-1" />
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>Team: {mockTeams.find(t => t.id === user.team_id)?.name || 'Unknown'}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <button className="flex-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        View Profile
                      </button>
                      <button className="flex-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-2 px-3 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria</p>
        </div>
      )}

      {/* Create/Edit User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="designer">Designer</option>
                    <option value="event_coordinator">Event Coordinator</option>
                    <option value="sales">Sales</option>
                    <option value="logistics">Logistics</option>
                    <option value="admin">Admin</option>
                    {currentUser?.role === 'it' && <option value="it">IT</option>}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Team
                  </label>
                  <select
                    value={formData.team_id}
                    onChange={(e) => setFormData({ ...formData, team_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {mockTeams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Avatar URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingUser ? 'Update User' : 'Create User'}
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