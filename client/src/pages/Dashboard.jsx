import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogsStart, fetchLogsSuccess, fetchStatsSuccess } from '../store/slices/logsSlice';
import { fetchPredictionsStart, fetchPredictionsSuccess } from '../store/slices/rcaSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { logs, stats } = useSelector((state) => state.logs);
  const { predictions } = useSelector((state) => state.rca);

  useEffect(() => {
    // Simulate fetching data
    const dummyLogs = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      timestamp: new Date(Date.now() - i * 3600000),
      severity: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'][Math.floor(Math.random() * 4)],
      component: ['Network', 'Database', 'API', 'Security', 'Storage'][Math.floor(Math.random() * 5)],
      message: `Sample log message ${i}`,
    }));

    const dummyStats = {
      severityStats: [
        { _id: 'INFO', count: 45 },
        { _id: 'WARNING', count: 25 },
        { _id: 'ERROR', count: 20 },
        { _id: 'CRITICAL', count: 10 },
      ],
      componentStats: [
        { _id: 'Network', count: 30, errors: 5 },
        { _id: 'Database', count: 25, errors: 8 },
        { _id: 'API', count: 20, errors: 3 },
        { _id: 'Security', count: 15, errors: 2 },
        { _id: 'Storage', count: 10, errors: 1 },
      ],
    };

    const dummyPredictions = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      timestamp: new Date(Date.now() - i * 86400000),
      prediction: ['Network Congestion', 'Hardware Failure', 'Configuration Error', 'Software Bug'][Math.floor(Math.random() * 4)],
      confidence: Math.random() * 0.5 + 0.5,
    }));

    dispatch(fetchLogsSuccess(dummyLogs));
    dispatch(fetchStatsSuccess(dummyStats));
    dispatch(fetchPredictionsSuccess(dummyPredictions));
  }, [dispatch]);

  const severityData = stats.severityStats.map(stat => ({
    name: stat._id,
    value: stat.count,
  }));

  const componentData = stats.componentStats.map(stat => ({
    name: stat._id,
    total: stat.count,
    errors: stat.errors,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Logs</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{logs.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Critical Issues</dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {logs.filter(log => log.severity === 'CRITICAL').length}
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
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">RCA Predictions</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{predictions.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

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
                  <dt className="text-sm font-medium text-gray-500 truncate">Components</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{stats.componentStats.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Log Severity Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Component Statistics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={componentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Total Logs" fill="#8884d8" />
                <Bar dataKey="errors" name="Errors" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent RCA Predictions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {predictions.slice(0, 5).map((prediction) => (
                <tr key={prediction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(prediction.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prediction.prediction}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 