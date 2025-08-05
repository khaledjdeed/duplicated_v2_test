import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
import { 
  Calendar,
  Users,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Building2,
  BarChart3,
  Brain,
  Shield,
  Upload,
  Target,
  Award,
  Settings,
  FileText,
  Activity,
  CheckCircle
} from 'lucide-react';
import { 
  mockEvents, 
  mockTasks, 
  mockBudgets, 
  mockSponsorships,
  mockUploads,
  mockEventRequests,
  getTasksByUserId,
  getTasksByTeamId,
  getSponsorshipsByAssignedTo,
  getEventsByTeamId,
  getBudgetsForSponsorships
} from '../lib/mockData';

export function Dashboard() {
  const { user } = useAuth();
  const { navigateTo } = useNavigation();

  if (!user) return null;

  // Move variable declarations to component level to make them accessible in JSX
  const userTasks = getTasksByUserId(user.id);
  const teamTasks = user.team_id ? getTasksByTeamId(user.team_id) : [];
  const teamEvents = user.team_id ? getEventsByTeamId(user.team_id) : [];
  const userSponsorships = getSponsorshipsByAssignedTo(user.id);
  const userUploads = mockUploads.filter(u => u.uploaded_by === user.id);

  const getDashboardData = () => {
    switch (user.role) {
      case 'ceo':
        return {
          title: 'CEO Dashboard',
          subtitle: 'Executive overview and strategic insights',
          stats: [
            { label: 'Total Events', value: mockEvents.length.toString(), icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Total Budget', value: `AED ${(mockBudgets.reduce((sum, b) => sum + b.allocated_amount, 0) / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Total Attendees', value: mockEvents.reduce((sum, e) => sum + (e.attendee_count || 0), 0).toLocaleString(), icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Active Tasks', value: mockTasks.filter(t => t.status !== 'completed').length.toString(), icon: ClipboardList, color: 'text-orange-600', bgColor: 'bg-orange-50' }
          ],
          quickActions: [
            { label: 'Manage Tasks & Teams', action: () => navigateTo('teams'), icon: Building2 },
            { label: 'Request Event', action: () => navigateTo('event-requests'), icon: Calendar },
            { label: 'View Budgets', action: () => navigateTo('budgets'), icon: DollarSign },
            { label: 'Manage Uploads', action: () => navigateTo('uploads'), icon: Upload },
            { label: 'Analytics Dashboard', action: () => navigateTo('analytics'), icon: BarChart3 }
          ]
        };

      case 'administrator':
        return {
          title: 'Administrator Dashboard',
          subtitle: 'System administration and user management',
          stats: [
            { label: 'Users & Events', value: `${mockUsers.length} users`, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Tasks & Budget', value: `${mockTasks.length} tasks`, icon: ClipboardList, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'System Health', value: '99.8%', icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-50' },
            { label: 'Audit Logs', value: '156', icon: Shield, color: 'text-red-600', bgColor: 'bg-red-50' }
          ],
          quickActions: [
            { label: 'Manage Users & Logs', action: () => navigateTo('teams'), icon: Users },
            { label: 'Create & Assign Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Manage Teams', action: () => navigateTo('teams'), icon: Building2 },
            { label: 'View Audit Logs', action: () => navigateTo('audit-logs'), icon: Shield }
          ]
        };

      case 'accountant':
        return {
          title: 'Finance Dashboard',
          subtitle: 'Financial oversight and budget management',
          stats: [
            { label: 'Total Budget', value: `AED ${(mockBudgets.reduce((sum, b) => sum + b.allocated_amount, 0) / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Invoices & Payments', value: '24 pending', icon: FileText, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
            { label: 'Budget Utilization', value: `${Math.round((mockBudgets.reduce((sum, b) => sum + b.spent_amount, 0) / mockBudgets.reduce((sum, b) => sum + b.allocated_amount, 0)) * 100)}%`, icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Budget Tasks', action: () => navigateTo('budgets'), icon: DollarSign },
            { label: 'View Invoices', action: () => navigateTo('budgets'), icon: FileText }
          ]
        };

      case 'head_of_design':
        return {
          title: 'Head of Design Dashboard',
          subtitle: 'Design team leadership and project oversight',
          stats: [
            { label: 'Design Tasks', value: mockTasks.filter(t => t.task_type === 'design').length.toString(), icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Uploads & Deadlines', value: mockUploads.filter(u => u.uploaded_by.includes('designer')).length.toString(), icon: Upload, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Team Performance', value: '94%', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Assign Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Manage Uploads', action: () => navigateTo('uploads'), icon: Upload },
            { label: 'Create Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'View Kanban', action: () => navigateTo('tasks'), icon: BarChart3 }
          ]
        };

      case 'designer':
        return {
          title: 'Designer Dashboard',
          subtitle: 'Your creative tasks and projects',
          stats: [
            { label: 'My Tasks', value: userTasks.length.toString(), icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Uploads & Deadlines', value: userUploads.length.toString(), icon: Upload, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Completion Rate', value: `${Math.round((userTasks.filter(t => t.status === 'completed').length / Math.max(userTasks.length, 1)) * 100)}%`, icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Update Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Upload Files', action: () => navigateTo('uploads'), icon: Upload },
            { label: 'View Kanban', action: () => navigateTo('tasks'), icon: BarChart3 }
          ]
        };

      case 'it_manager':
        return {
          title: 'IT Manager Dashboard',
          subtitle: 'System management and event oversight',
          stats: [
            { label: 'Health & Approvals', value: `${mockEventRequests.filter(r => r.status === 'pending').length} pending`, icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Users & Tasks', value: `${mockUsers.length} users`, icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'System Status', value: '99.8%', icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Approve Events (2/day)', action: () => navigateTo('event-requests'), icon: Calendar },
            { label: 'Manage Users & Roles', action: () => navigateTo('teams'), icon: Users },
            { label: 'Manage Uploads', action: () => navigateTo('uploads'), icon: Upload }
          ]
        };

      case 'it_technical_staff':
        return {
          title: 'IT Technical Dashboard',
          subtitle: 'Technical support and system maintenance',
          stats: [
            { label: 'Health & Approvals', value: `${mockEventRequests.filter(r => r.status === 'pending').length} pending`, icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Tasks & Users', value: `${mockTasks.filter(t => t.status !== 'completed').length} active`, icon: ClipboardList, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'System Health', value: '99.8%', icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Approve Events (2/day)', action: () => navigateTo('event-requests'), icon: Calendar },
            { label: 'View Tasks', action: () => navigateTo('tasks'), icon: ClipboardList }
          ]
        };

      case 'team_lead':
        return {
          title: 'Team Lead Dashboard',
          subtitle: 'Team management and performance oversight',
          stats: [
            { label: 'Team Tasks', value: teamTasks.length.toString(), icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Team Events', value: teamEvents.length.toString(), icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Team Performance', value: '91%', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Create & Assign Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Manage Team Events', action: () => navigateTo('events'), icon: Calendar },
            { label: 'Manage Uploads', action: () => navigateTo('uploads'), icon: Upload }
          ]
        };

      case 'event_coordinator':
        return {
          title: 'Event Coordinator Dashboard',
          subtitle: 'Event planning and coordination',
          stats: [
            { label: 'Tasks & Attendees', value: `${teamTasks.length} tasks`, icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Budgets', value: `${teamEvents.length} events`, icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Team Activity', value: `${teamTasks.filter(t => t.status === 'in_progress').length} active`, icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Manage Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Request Event', action: () => navigateTo('event-requests'), icon: Calendar },
            { label: 'Manage Uploads', action: () => navigateTo('uploads'), icon: Upload },
            { label: 'Assign Tasks', action: () => navigateTo('tasks'), icon: ClipboardList }
          ]
        };

      case 'marketing_staff':
        return {
          title: 'Marketing Dashboard',
          subtitle: 'Campaign management and engagement',
          stats: [
            { label: 'Campaigns & Tasks', value: `${userTasks.length} tasks`, icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Engagement', value: '24.3%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Reach', value: '50K', icon: Target, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Plan Campaigns', action: () => navigateTo('analytics'), icon: BarChart3 },
            { label: 'Update Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'View Analytics', action: () => navigateTo('analytics'), icon: BarChart3 }
          ]
        };

      case 'logistics_staff':
        return {
          title: 'Logistics Dashboard',
          subtitle: 'Operations and coordination',
          stats: [
            { label: 'My Tasks', value: userTasks.length.toString(), icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Shipments', value: '12 pending', icon: Target, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
            { label: 'Completion Rate', value: `${Math.round((userTasks.filter(t => t.status === 'completed').length / Math.max(userTasks.length, 1)) * 100)}%`, icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' }
          ],
          quickActions: [
            { label: 'Update Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Manage Logistics', action: () => navigateTo('tasks'), icon: Target },
            { label: 'View Shipments', action: () => navigateTo('tasks'), icon: Activity }
          ]
        };

      case 'sales_representative':
        return {
          title: 'Sales Dashboard',
          subtitle: 'Sponsorship management and revenue tracking',
          stats: [
            { label: 'My Sponsorships', value: userSponsorships.length.toString(), icon: Target, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Tasks & Budgets', value: `${userTasks.length} tasks`, icon: ClipboardList, color: 'text-green-600', bgColor: 'bg-green-50' },
            { label: 'Pipeline Value', value: `AED ${(userSponsorships.reduce((sum, s) => sum + (s.amount || 0), 0) / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-purple-600', bgColor: 'bg-purple-50' }
          ],
          quickActions: [
            { label: 'Update Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'View Sponsorships', action: () => navigateTo('sponsorships'), icon: Target },
            { label: 'Request Budgets', action: () => navigateTo('budgets'), icon: DollarSign }
          ]
        };

      case 'production_staff':
        return {
          title: 'Production Dashboard',
          subtitle: 'Event production and technical setup',
          stats: [
            { label: 'My Tasks', value: userTasks.length.toString(), icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Deadlines', value: `${userTasks.filter(t => t.due_date && new Date(t.due_date) < new Date(Date.now() + 7*24*60*60*1000)).length} this week`, icon: Calendar, color: 'text-orange-600', bgColor: 'bg-orange-50' },
            { label: 'Completion Rate', value: `${Math.round((userTasks.filter(t => t.status === 'completed').length / Math.max(userTasks.length, 1)) * 100)}%`, icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' }
          ],
          quickActions: [
            { label: 'Update Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Manage Production', action: () => navigateTo('tasks'), icon: Settings }
          ]
        };

      case 'accreditation_staff':
        return {
          title: 'Accreditation Dashboard',
          subtitle: 'Quality assurance and compliance',
          stats: [
            { label: 'My Tasks', value: userTasks.length.toString(), icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Deadlines', value: `${userTasks.filter(t => t.due_date && new Date(t.due_date) < new Date(Date.now() + 7*24*60*60*1000)).length} this week`, icon: Calendar, color: 'text-orange-600', bgColor: 'bg-orange-50' },
            { label: 'Accreditation Status', value: `${mockEvents.filter(e => e.cme_credits && e.cme_credits > 0).length} accredited`, icon: Award, color: 'text-green-600', bgColor: 'bg-green-50' }
          ],
          quickActions: [
            { label: 'Update Tasks', action: () => navigateTo('tasks'), icon: ClipboardList },
            { label: 'Manage Accreditation', action: () => navigateTo('tasks'), icon: Award }
          ]
        };

      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome to MCO',
          stats: [],
          quickActions: []
        };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {dashboardData.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {dashboardData.subtitle}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
              {formatRole(user.role)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.department}
            </span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            System Active
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      {dashboardData.stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      {dashboardData.quickActions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardData.quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`p-4 rounded-lg text-left transition-colors hover:shadow-md ${
                      index === 0 
                        ? 'bg-accent-50 hover:bg-accent-100 dark:bg-accent-900/20 dark:hover:bg-accent-800/30 border border-accent-200 dark:border-accent-700' 
                        : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className={`h-6 w-6 mb-2 ${index === 0 ? 'text-accent-600' : 'text-blue-600'}`} />
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {action.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {/* Show recent activities based on role */}
            {user.role === 'designer' && userTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <ClipboardList className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status: {task.status}</p>
                </div>
              </div>
            ))}
            
            {['ceo', 'administrator', 'it_manager'].includes(user.role) && mockEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{event.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status: {event.status}</p>
                </div>
              </div>
            ))}

            {user.role === 'sales_representative' && userSponsorships.slice(0, 3).map((sponsor) => (
              <div key={sponsor.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Target className="h-5 w-5 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{sponsor.company_name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Stage: {sponsor.stage}</p>
                </div>
              </div>
            ))}

            {(userTasks.length === 0 && userSponsorships.length === 0 && !['ceo', 'administrator', 'it_manager'].includes(user.role)) && (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No recent activity to display
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoleColor(role: string) {
  const colors = {
    'ceo': 'bg-purple-100 text-purple-800 border-purple-200',
    'administrator': 'bg-red-100 text-red-800 border-red-200',
    'accountant': 'bg-green-100 text-green-800 border-green-200',
    'head_of_design': 'bg-pink-100 text-pink-800 border-pink-200',
    'designer': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'it_manager': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'it_technical_staff': 'bg-blue-100 text-blue-800 border-blue-200',
    'team_lead': 'bg-orange-100 text-orange-800 border-orange-200',
    'event_coordinator': 'bg-teal-100 text-teal-800 border-teal-200',
    'marketing_staff': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'logistics_staff': 'bg-amber-100 text-amber-800 border-amber-200',
    'sales_representative': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'production_staff': 'bg-slate-100 text-slate-800 border-slate-200',
    'accreditation_staff': 'bg-violet-100 text-violet-800 border-violet-200'
  };
  return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
}

function formatRole(role: string) {
  return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}