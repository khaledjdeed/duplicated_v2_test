import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Brain, 
  Send, 
  Star, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Users,
  Lightbulb
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  rating?: number;
  feedback?: string;
}

export function AIAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRating, setShowRating] = useState<string | null>(null);

  const getRoleSpecificPrompts = () => {
    switch (user?.role) {
      case 'ceo':
        return [
          'Analyze our Q1 event performance and provide strategic recommendations',
          'What are the key KPIs I should focus on for the next quarter?',
          'Forecast budget requirements for upcoming healthcare events',
          'Identify opportunities for operational efficiency improvements'
        ];
      case 'ae':
        return [
          'Help me prepare a pitch for a new healthcare client',
          'What are the latest trends in medical conference attendance?',
          'Suggest follow-up strategies for recent event leads',
          'Analyze competitor pricing for similar events'
        ];
      case 'designer':
        return [
          'Provide feedback on my latest event banner design',
          'What are current design trends for healthcare events?',
          'Suggest color schemes for a cardiology conference',
          'Help me improve the visual hierarchy of this layout'
        ];
      case 'logistics':
        return [
          'Optimize the timeline for our upcoming medical conference',
          'Analyze potential bottlenecks in our event setup process',
          'Suggest improvements for attendee registration flow',
          'Help me coordinate multi-venue event logistics'
        ];
      default:
        return [
          'How can I improve my productivity today?',
          'What are the key priorities for my role?',
          'Provide insights on team collaboration',
          'Help me understand our current projects better'
        ];
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const roleResponses = {
      'ceo': `Based on your executive perspective, here's my analysis: ${userMessage}. I recommend focusing on strategic partnerships and budget optimization for maximum ROI. Consider implementing data-driven decision making across all departments.`,
      'ae': `For account management success: ${userMessage}. I suggest leveraging relationship-building strategies and focusing on value proposition alignment with client needs. Consider personalized follow-up approaches.`,
      'designer': `From a creative standpoint: ${userMessage}. I recommend exploring modern design principles while maintaining brand consistency. Consider user experience and accessibility in all visual communications.`,
      'logistics': `For operational efficiency: ${userMessage}. I suggest implementing timeline optimization and resource allocation strategies. Consider contingency planning for potential scheduling conflicts.`,
      'marketing': `For marketing effectiveness: ${userMessage}. I recommend data-driven campaign strategies and audience segmentation. Consider multi-channel approaches for maximum reach.`,
      'admin': `For administrative excellence: ${userMessage}. I suggest process optimization and documentation improvements. Consider automation opportunities for routine tasks.`,
      'it': `For technical implementation: ${userMessage}. I recommend system integration and security best practices. Consider scalability and maintenance requirements.`,
      'team_lead': `For team leadership: ${userMessage}. I suggest focusing on team development and performance optimization. Consider delegation strategies and skill development opportunities.`
    };

    return roleResponses[user?.role as keyof typeof roleResponses] || 
           `Thank you for your question: ${userMessage}. I'm here to help you with insights and recommendations based on your role and responsibilities.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: `ai-${Date.now()}`,
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setShowRating(aiResponse.id);
    }, 1500);
  };

  const handleRating = (messageId: string, rating: number, feedback?: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating, feedback } : msg
    ));

    // Log the feedback
    const feedbackData = {
      user_id: user?.id,
      message_id: messageId,
      rating,
      feedback,
      timestamp: new Date().toISOString()
    };

    console.log('AI feedback logged:', feedbackData);
    toast.success('Thank you for your feedback!');
    setShowRating(null);
  };

  const prompts = getRoleSpecificPrompts();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-600" />
            AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Intelligent insights tailored for {user?.role?.replace('_', ' ')} role
          </p>
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Suggested Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(prompt)}
                className="text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:border-accent-200 dark:hover:border-accent-700 border border-transparent transition-all duration-200"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">{prompt}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Conversation
          </h3>
        </div>
        <div className="p-6 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Start a conversation with your AI assistant
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                    
                    {/* Rating for AI messages */}
                    {message.type === 'assistant' && showRating === message.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs mb-2">Rate this response:</p>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => handleRating(message.id, rating)}
                              className="text-yellow-400 hover:text-yellow-500"
                            >
                              <Star className="h-4 w-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.rating && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center">
                          <span className="text-xs">Rated:</span>
                          <div className="flex ml-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${star <= message.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill={star <= message.rating! ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your AI assistant anything..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}