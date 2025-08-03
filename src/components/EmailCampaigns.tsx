import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Mail, 
  Plus, 
  Send, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: 'draft' | 'sending' | 'completed' | 'failed';
  created_by: string;
  sent_count: number;
  failed_count: number;
  bounced_count: number;
  created_at: string;
}

export function EmailCampaigns() {
  const { user, canSendEmails } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    target_attributes: {} as Record<string, any>
  });

  // Mock campaigns data
  const campaigns: EmailCampaign[] = [
    {
      id: '1',
      name: 'Healthcare Innovation Summit 2024',
      subject: 'Join us for the premier healthcare event in the UAE',
      content: 'Dear healthcare professional...',
      status: 'completed',
      created_by: user?.id || '',
      sent_count: 1247,
      failed_count: 23,
      bounced_count: 8,
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Cardiology Conference Invitation',
      subject: 'Exclusive invitation to Cardiology Excellence 2024',
      content: 'We are pleased to invite you...',
      status: 'sending',
      created_by: user?.id || '',
      sent_count: 456,
      failed_count: 5,
      bounced_count: 2,
      created_at: '2024-02-01T14:30:00Z'
    },
    {
      id: '3',
      name: 'Neurology Symposium Draft',
      subject: 'Advanced Neurology Techniques Symposium',
      content: 'Join leading neurologists...',
      status: 'draft',
      created_by: user?.id || '',
      sent_count: 0,
      failed_count: 0,
      bounced_count: 0,
      created_at: '2024-02-10T09:15:00Z'
    }
  ];

  const handleCreateCampaign = () => {
    if (!canSendEmails()) {
      toast.error('You do not have permission to create email campaigns');
      return;
    }

    // Log the campaign creation
    const logData = {
      user_id: user?.id,
      action: 'create_email_campaign',
      table_name: 'email_campaigns',
      timestamp: new Date().toISOString(),
      details: { 
        campaign_name: formData.name,
        subject: formData.subject
      }
    };

    console.log('Campaign creation logged:', logData);
    toast.success('Email campaign created successfully');
    setShowCreateModal(false);
    setFormData({ name: '', subject: '', content: '', target_attributes: {} });
  };

  const handleSendCampaign = (campaignId: string) => {
    if (!canSendEmails()) {
      toast.error('You do not have permission to send email campaigns');
      return;
    }

    toast.success('Email campaign sent successfully');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="h-4 w-4 text-gray-500" />;
      case 'sending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!canSendEmails()) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Email campaigns are restricted to Marketing, CEO, GM, and Admin roles.
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
            <Mail className="h-6 w-6 mr-2 text-blue-600" />
            Email Campaigns
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage healthcare professional email campaigns
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaigns.length}</p>
            </div>
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Emails Sent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {campaigns.reduce((sum, c) => sum + c.sent_count, 0).toLocaleString()}
              </p>
            </div>
            <Send className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">96.2%</p>
            </div>
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {campaigns.filter(c => c.status === 'sending').length}
              </p>
            </div>
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Campaigns
            </h2>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Failed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {campaign.subject}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(campaign.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {campaign.sent_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {campaign.failed_count + campaign.bounced_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(campaign.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {campaign.status === 'draft' && (
                        <button
                          onClick={() => handleSendCampaign(campaign.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create Email Campaign
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); handleCreateCampaign(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Healthcare Innovation Summit 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter email subject line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Content
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter email content..."
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex">
                    <Users className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        Target Audience
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        This campaign will be sent to healthcare professionals based on the contact attributes and filters you specify.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Campaign
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
    </div>
  );
}