import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsSuccess } from '../store/slices/rcaSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Analytics() {
  const dispatch = useDispatch();
  const { analytics } = useSelector((state) => state.rca);

  useEffect(() => {
    // Simulate fetching analytics data
    const dummyAnalytics = {
      predictionAccuracy: [
        { prediction: 'Network Congestion', accuracy: 0.85, totalPredictions: 120 },
        { prediction: 'Hardware Failure', accuracy: 0.92, totalPredictions: 85 },
        { prediction: 'Configuration Error', accuracy: 0.78, totalPredictions: 95 },
        { prediction: 'Software Bug', accuracy: 0.88, totalPredictions: 110 },
      ],
      dailyPredictions: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
        predictions: Math.floor(Math.random() * 50) + 20,
        accuracy: Math.random() * 0.3 + 0.7,
      })),
      severityDistribution: [
        { severity: 'Critical', count: 15 },
        { severity: 'Error', count: 45 },
        { severity: 'Warning', count: 80 },
        { severity: 'Info', count: 120 },
      ],
      componentPerformance: [
        { component: 'Network', accuracy: 0.92, responseTime: 150 },
        { component: 'Database', accuracy: 0.88, responseTime: 200 },
        { component: 'API', accuracy: 0.95, responseTime: 120 },
        { component: 'Security', accuracy: 0.90, responseTime: 180 },
        { component: 'Storage', accuracy: 0.85, responseTime: 250 },
      ],
    };

    dispatch(fetchAnalyticsSuccess(dummyAnalytics));
  }, [dispatch]);

  const calculateAverageAccuracy = () => {
    if (!analytics?.predictionAccuracy) return 0;
    const total = analytics.predictionAccuracy.reduce((sum, item) => sum + item.accuracy, 0);
    return (total / analytics.predictionAccuracy.length * 100).toFixed(1);
  };

  const calculateTotalPredictions = () => {
    if (!analytics?.predictionAccuracy) return 0;
    return analytics.predictionAccuracy.reduce((sum, item) => sum + item.totalPredictions, 0);
  };

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Accuracy</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{calculateAverageAccuracy()}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Predictions</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{calculateTotalPredictions()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg Response Time</dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {analytics?.componentPerformance
                      ? Math.round(
                          analytics.componentPerformance.reduce((sum, item) => sum + item.responseTime, 0) /
                            analytics.componentPerformance.length
                        )
                      : 0}
                    ms
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Components Monitored</dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {analytics?.componentPerformance?.length || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Prediction Accuracy by Type</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.predictionAccuracy || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="prediction" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" name="Accuracy" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Prediction Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.dailyPredictions || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="predictions" name="Predictions" stroke="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="accuracy" name="Accuracy" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Severity Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.severityDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(analytics.severityDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Component Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.componentPerformance || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="component" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="accuracy" name="Accuracy" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="responseTime" name="Response Time (ms)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 