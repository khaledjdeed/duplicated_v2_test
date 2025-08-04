import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Search,
  UserPlus,
  Crown,
  Settings,
  TrendingUp,
  BarChart3,
  Activity,
  Mail,
  Phone
} from 'lucide-react';
import { BackButton } from './BackButton';
import { LoadingSpinner } from './LoadingSpinner';
import toast from 'react-hot-toast';

interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  department: string;
  email: string;
  avatar_url?: string;
  status: 'active' | 'inactive';
  last_login?: string;
  created_at: string;
}

interface Team {
  id: string;
  name: string;
  description?: string;
  member_count: number;
  performance_score: number;
  created_at: string;
}

export function TeamManagement() {
  const { user, hasPermission } = useAuth();
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'team-1',
      name: 'Healthcare Events Team',
      description: 'Primary team managing healthcare conferences and medical events',
      member_count: 8,
      performance_score: 94,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: 'team-2', 
      name: 'Marketing & Outreach Team',
      description: 'Responsible for event promotion and stakeholder engagement',
      member_count: 5,
      performance_score: 87,
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 'team-3',
      name: 'Operations & Logistics Team', 
      description: 'Handles event operations, logistics, and technical support',
      member_count: 6,
      performance_score: 91,
      created_at: '2024-02-01T00:00:00Z'
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'member-1',
      full_name: 'Dr. Ahmed Al-Rashid',
      role: 'ceo',
      department: 'Executive',
      email: 'ahmed.rashid@mco.com',
      avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      status: 'active',
      last_login: '2024-12-01T14:30:00Z',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: 'member-2',
      full_name: 'Mariam Wael',
      role: 'admin',
      department: 'Administration',
      email: 'mariam.wael@mco.com',
      avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      status: 'active',
      last_login: '2024-12-01T12:15:00Z',
      created_at: '2024-01-05T00:00:00Z'
    },
    {
      id: 'member-3',
      full_name: 'Joel Mutia',
      role: 'designer',
      department: 'Design',
      email: 'joel.mutia@mco.com',
      avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      status: 'active',
      last_login: '2024-12-01T10:45:00Z',
      created_at: '2024-01-10T00:00:00Z'
    }
  ]);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'performance'>('overview');

  const [memberFormData, setMemberFormData] = useState({
    full_name: '',
    email: '',
    role: 'designer' as const,
    department: ''
  });

  const canManageTeams = hasPermission('manage_teams') || ['ceo', 'admin'].includes(user?.role || '');
  const canAddMembers = hasPermission('add_members') || ['ceo', 'admin'].includes(user?.role || '');

  const getRoleColor = (role: string) => {
    const colors = {
      'ceo': 'bg-purple-100 text-purple-800 border-purple-200',
      'admin': 'bg-red-100 text-red-800 border-red-200',
      'marketing': 'bg-blue-100 text-blue-800 border-blue-200',
      'ae': 'bg-green-100 text-green-800 border-green-200',
      'designer': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'logistics': 'bg-orange-100 text-orange-800 border-orange-200',
      'it': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'team_lead': 'bg-pink-100 text-pink-800 border-pink-200',
      'finance': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ceo': return Crown;
      case 'admin': return Shield;
      case 'it': return Settings;
      case 'designer': return Edit;
      default: return Users;
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMember: TeamMember = {
        id: `member-${Date.now()}`,
        ...memberFormData,
        status: 'active',
        created_at: new Date().toISOString()
      };
      
      setTeamMembers(prev => [...prev, newMember]);
      toast.success('Team member added successfully');
      setShowAddMemberModal(false);
      setMemberFormData({ full_name: '', email: '', role: 'designer', department: '' });
    } catch (error) {
      toast.error('Failed to add team member');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTeamMembers(prev => prev.filter(m => m.id !== memberId));
      toast.success('Team member removed successfully');
    } catch (error) {
      toast.error('Failed to remove team member');
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!canManageTeams) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You do not have permission to manage teams.
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
              <Users className="h-6 w-6 mr-2 text-blue-600" />
              Team Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage teams, members, and organizational structure
            </p>
          </div>
        </div>
        {canAddMembers && (
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Team Overview', icon: BarChart3 },
              { id: 'members', label: 'Team Members', icon: Users },
              { id: 'performance', label: 'Performance', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {team.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        {team.member_count}
                      </div>
                    </div>
                    
                    {team.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {team.description}
                      </p>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {team.performance_score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${team.performance_score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Team Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Total Members</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                        {teamMembers.length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-300">Active Members</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                        {teamMembers.filter(m => m.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-purple-900 dark:text-purple-300">Avg Performance</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                        {Math.round(teams.reduce((sum, t) => sum + t.performance_score, 0) / teams.length)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search team members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => {
                  const RoleIcon = getRoleIcon(member.role);
                  return (
                    <div key={member.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.avatar_url}
                            alt={member.full_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {member.full_name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {member.department}
                            </p>
                          </div>
                        </div>
                        {canAddMembers && (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                            <RoleIcon className="h-3 w-3 mr-1" />
                            {member.role.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            member.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.status}
                          </span>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-2" />
                            {member.email}
                          </div>
                          {member.last_login && (
                            <div className="text-xs">
                              Last login: {new Date(member.last_login).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No team members found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Team Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    {teams.map((team) => (
                      <div key={team.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {team.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${team.performance_score}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {team.performance_score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Role Distribution
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(
                      teamMembers.reduce((acc, member) => {
                        acc[member.role] = (acc[member.role] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([role, count]) => {
                      const percentage = (count / teamMembers.length) * 100;
                      return (
                        <div key={role} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {role.replace('_', ' ')}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white w-6">
                              {count}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add Team Member
              </h2>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberFormData.full_name}
                    onChange={(e) => setMemberFormData({ ...memberFormData, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={memberFormData.email}
                    onChange={(e) => setMemberFormData({ ...memberFormData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role *
                  </label>
                  <select
                    required
                    value={memberFormData.role}
                    onChange={(e) => setMemberFormData({ ...memberFormData, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="designer">Designer</option>
                    <option value="ae">Account Executive</option>
                    <option value="marketing">Marketing</option>
                    <option value="logistics">Logistics</option>
                    <option value="team_lead">Team Lead</option>
                    {user?.role === 'ceo' && (
                      <>
                        <option value="admin">Admin</option>
                        <option value="it">IT</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department *
                  </label>
                  <select
                    required
                    value={memberFormData.department}
                    onChange={(e) => setMemberFormData({ ...memberFormData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Department</option>
                    <option value="Executive">Executive</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Operations">Operations</option>
                    <option value="Technical & IT">Technical & IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : 'Add Member'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
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