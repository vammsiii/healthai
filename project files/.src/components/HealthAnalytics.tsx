import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Heart, Thermometer, Weight, Droplets } from 'lucide-react';
import { mockHealthData } from '../utils/mockData';

const HealthAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('heartRate');

  const metrics = [
    { id: 'heartRate', label: 'Heart Rate', icon: Heart, color: '#ef4444', unit: 'bpm' },
    { id: 'bloodPressure', label: 'Blood Pressure', icon: Activity, color: '#3b82f6', unit: 'mmHg' },
    { id: 'bloodGlucose', label: 'Blood Glucose', icon: Droplets, color: '#10b981', unit: 'mg/dL' },
    { id: 'weight', label: 'Weight', icon: Weight, color: '#f59e0b', unit: 'lbs' },
    { id: 'temperature', label: 'Temperature', icon: Thermometer, color: '#8b5cf6', unit: '°F' }
  ];

  const getChartData = () => {
    if (selectedMetric === 'bloodPressure') {
      return mockHealthData.map(data => ({
        date: new Date(data.date).toLocaleDateString(),
        systolic: data.bloodPressureSystolic,
        diastolic: data.bloodPressureDiastolic
      }));
    }
    
    return mockHealthData.map(data => ({
      date: new Date(data.date).toLocaleDateString(),
      value: data[selectedMetric as keyof typeof data] as number
    }));
  };

  const getMetricStats = () => {
    const values = mockHealthData.map(d => d[selectedMetric as keyof typeof d] as number);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const trend = values[values.length - 1] - values[0];
    
    return { average, min, max, trend };
  };

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#10b981' },
    { name: 'Moderate Risk', value: 25, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' }
  ];

  const selectedMetricInfo = metrics.find(m => m.id === selectedMetric);
  const stats = getMetricStats();
  const chartData = getChartData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Analytics</h1>
            <p className="text-gray-600">Comprehensive health metrics visualization and insights</p>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="flex flex-wrap gap-3">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedMetric === metric.id
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <metric.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{metric.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Average', value: stats.average.toFixed(1), icon: Activity },
          { label: 'Minimum', value: stats.min.toString(), icon: TrendingUp },
          { label: 'Maximum', value: stats.max.toString(), icon: TrendingUp },
          { label: 'Trend', value: stats.trend > 0 ? `+${stats.trend.toFixed(1)}` : stats.trend.toFixed(1), icon: TrendingUp }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value} {selectedMetricInfo?.unit}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedMetricInfo?.label} Trend
          </h2>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'bloodPressure' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Systolic"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Diastolic"
                  />
                </LineChart>
              ) : (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={selectedMetricInfo?.color} 
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 mt-4">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Health Insights</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-green-900">Positive Trend</h3>
            <p className="text-green-700 text-sm mt-1">
              Your {selectedMetricInfo?.label.toLowerCase()} readings show improvement over the past month. 
              Keep up the good work with your current health management routine.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900">Recommendation</h3>
            <p className="text-blue-700 text-sm mt-1">
              Consider maintaining regular monitoring of your vital signs and continue following 
              your healthcare provider's recommendations for optimal health outcomes.
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
            <h3 className="font-semibold text-amber-900">Monitor Closely</h3>
            <p className="text-amber-700 text-sm mt-1">
              Some fluctuations in readings are normal, but continue regular monitoring and 
              consult your healthcare provider if you notice any concerning patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAnalytics;