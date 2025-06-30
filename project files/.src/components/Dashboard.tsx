import React, { useState } from 'react';
import { Users, Activity, TrendingUp, AlertCircle, Heart, Brain, Stethoscope, FileText } from 'lucide-react';
import DetailModal from './DetailModal';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const [selectedModal, setSelectedModal] = useState<'patients' | 'consultations' | 'predictions' | 'treatments' | null>(null);

  const stats = [
    {
      title: 'Active Patients',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
      modalType: 'patients' as const
    },
    {
      title: 'Health Consultations',
      value: '3,892',
      change: '+8%',
      icon: Stethoscope,
      color: 'bg-green-500',
      modalType: 'consultations' as const
    },
    {
      title: 'Predictions Made',
      value: '856',
      change: '+23%',
      icon: Brain,
      color: 'bg-purple-500',
      modalType: 'predictions' as const
    },
    {
      title: 'Treatment Plans',
      value: '432',
      change: '+15%',
      icon: FileText,
      color: 'bg-orange-500',
      modalType: 'treatments' as const
    }
  ];

  const recentActivities = [
    {
      type: 'prediction',
      message: 'Disease prediction completed for Patient #1247',
      time: '2 minutes ago',
      icon: Brain
    },
    {
      type: 'chat',
      message: 'New health consultation started',
      time: '5 minutes ago',
      icon: Stethoscope
    },
    {
      type: 'treatment',
      message: 'Treatment plan generated for diabetes management',
      time: '12 minutes ago',
      icon: FileText
    },
    {
      type: 'alert',
      message: 'Critical health metric detected',
      time: '18 minutes ago',
      icon: AlertCircle
    }
  ];

  const quickActions = [
    {
      id: 'prediction',
      title: 'New Prediction',
      description: 'Analyze symptoms for disease prediction',
      icon: Brain,
      color: 'blue',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50'
    },
    {
      id: 'chat',
      title: 'Start Consultation',
      description: 'Begin patient chat session',
      icon: Stethoscope,
      color: 'green',
      hoverColor: 'hover:border-green-500 hover:bg-green-50'
    },
    {
      id: 'treatment',
      title: 'Treatment Plan',
      description: 'Generate personalized treatment',
      icon: FileText,
      color: 'purple',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50'
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Analyze health trends and metrics',
      icon: TrendingUp,
      color: 'orange',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your intelligent healthcare assistant</p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">System Online</span>
        </div>
      </div>

      {/* Stats Grid - Now Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedModal(stat.modalType)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-3 text-xs text-blue-600 font-medium">
              Click to view details →
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Health Insights */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">AI Health Insights</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900">Trend Analysis</h3>
              <p className="text-blue-700 text-sm mt-1">
                Blood pressure readings show improvement across 78% of monitored patients this week.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-900">Medication Compliance</h3>
              <p className="text-green-700 text-sm mt-1">
                Average medication adherence rate is 94%, up 6% from last month.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-semibold text-amber-900">Risk Assessment</h3>
              <p className="text-amber-700 text-sm mt-1">
                12 patients flagged for cardiovascular risk monitoring based on recent vitals.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <activity.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onViewChange(action.id)}
              className={`p-4 text-left rounded-lg border-2 border-dashed border-gray-300 ${action.hoverColor} transition-all duration-200 transform hover:scale-105 hover:shadow-md`}
            >
              <action.icon className={`h-8 w-8 text-${action.color}-600 mb-2`} />
              <h3 className="font-semibold text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modals */}
      <DetailModal
        isOpen={selectedModal !== null}
        onClose={() => setSelectedModal(null)}
        type={selectedModal || 'patients'}
      />
    </div>
  );
};

export default Dashboard;