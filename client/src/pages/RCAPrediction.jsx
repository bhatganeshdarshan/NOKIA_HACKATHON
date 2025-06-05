import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPredictionsSuccess,
  submitFeedbackStart,
  submitFeedbackSuccess,
} from '../store/slices/rcaSlice';

export default function RCAFullPage() {
  const dispatch = useDispatch();
  const { predictions } = useSelector((state) => state.rca);

  const [log, setLog] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [actualRootCause, setActualRootCause] = useState('');
  const [rewardMessage, setRewardMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedLog, setSelectedLog] = useState(null);
  const [feedback, setFeedback] = useState({ isCorrect: null, comment: '' });

  const API_BASE_URL = 'http://127.0.0.1:5000';

  useEffect(() => {
    // Simulated dummy predictions
    const dummyPredictions = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      timestamp: new Date(Date.now() - i * 86400000),
      prediction: ['Network Congestion', 'Hardware Failure', 'Configuration Error', 'Software Bug'][Math.floor(Math.random() * 4)],
      confidence: Math.random() * 0.5 + 0.5,
      logId: i,
      logDetails: {
        severity: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'][Math.floor(Math.random() * 4)],
        component: ['Network', 'Database', 'API', 'Security', 'Storage'][Math.floor(Math.random() * 5)],
        message: `Sample log message ${i}`,
      },
    }));

    dispatch(fetchPredictionsSuccess(dummyPredictions));
  }, [dispatch]);

  const predictRCA = async () => {
    if (!log.trim()) return alert('Please enter a log message.');
    setLoading(true);
    setRewardMessage('');
    setPredictionResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/rca`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `log=${encodeURIComponent(log)}`,
      });

      const rawText = await response.text();
      const data = JSON.parse(rawText);
      if (data.error) alert(data.error);
      else setPredictionResult({ prediction: data.prediction, confidence: data.confidence });
    } catch (err) {
      console.error(err);
      alert('Prediction error. Is Flask API running?');
    } finally {
      setLoading(false);
    }
  };

  const sendFeedback = async () => {
    if (!actualRootCause.trim()) return alert('Enter correct root cause.');

    try {
      const response = await fetch(`${API_BASE_URL}/rl`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `log=${encodeURIComponent(log)}&actual=${encodeURIComponent(actualRootCause)}`,
      });

      const rawText = await response.text();
      const data = JSON.parse(rawText);

      if (data.error) alert(data.error);
      else {
        const reward = data.reward;
        const msg = reward === 1
          ? 'Correct prediction confirmed ✅ Thanks for your input!'
          : 'Prediction differed; retraining underway 🔁';
        setRewardMessage(`Reward: ${reward} - ${msg}`);
        setActualRootCause('');
      }
    } catch (err) {
      console.error(err);
      alert('Feedback error. Is Flask API running?');
    }
  };

  const handleLogSelect = (prediction) => {
    setSelectedLog(prediction);
    setFeedback({ isCorrect: null, comment: '' });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!selectedLog) return;

    dispatch(submitFeedbackStart());
    setTimeout(() => {
      dispatch(submitFeedbackSuccess({
        ...selectedLog,
        feedback: {
          isCorrect: feedback.isCorrect,
          comment: feedback.comment,
          timestamp: new Date(),
        },
      }));
      setSelectedLog(null);
      setFeedback({ isCorrect: null, comment: '' });
    }, 500);
  };

  const getConfidenceColor = (conf) => {
    if (conf >= 0.8) return 'text-green-600';
    if (conf >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      {/* Prediction Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">RCA Prediction</h2>
        <textarea
          rows={4}
          value={log}
          onChange={(e) => setLog(e.target.value)}
          placeholder="Enter log or component..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={predictRCA}
          disabled={loading}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Predicting...' : 'Predict Root Cause'}
        </button>

        {predictionResult && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <p><strong>Prediction:</strong> {predictionResult.prediction}</p>
            <p><strong>Confidence:</strong> {predictionResult.confidence}%</p>
            <label className="block text-sm font-medium mt-3 mb-1">Correct Root Cause (Feedback):</label>
            <input
              type="text"
              value={actualRootCause}
              onChange={(e) => setActualRootCause(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter correct root cause"
            />
            <button
              onClick={sendFeedback}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Feedback
            </button>
            {rewardMessage && <p className="mt-3 text-sm text-gray-800">{rewardMessage}</p>}
          </div>
        )}
      </div>

      {/* Table Section */}
      <div>
        <h2 className="text-lg font-medium mb-4">RCA Predictions History</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium">Timestamp</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Prediction</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Confidence</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Log Details</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {predictions.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2 text-sm text-gray-500">{new Date(p.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm">{p.prediction}</td>
                <td className={`px-4 py-2 text-sm ${getConfidenceColor(p.confidence)}`}>
                  {(p.confidence * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  <div>Severity: {p.logDetails.severity}</div>
                  <div>Component: {p.logDetails.component}</div>
                  <div>Message: {p.logDetails.message}</div>
                </td>
                <td className="px-4 py-2 text-sm">
                  <button onClick={() => handleLogSelect(p)} className="text-blue-600 hover:underline">
                    Provide Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {selectedLog && (
        <div className="bg-white shadow rounded-lg p-6 mt-10 border">
          <h3 className="text-lg font-medium mb-4">Provide Feedback</h3>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Is the prediction correct?</label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isCorrect"
                    value="true"
                    checked={feedback.isCorrect === true}
                    onChange={() => setFeedback({ ...feedback, isCorrect: true })}
                    className="h-4 w-4"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isCorrect"
                    value="false"
                    checked={feedback.isCorrect === false}
                    onChange={() => setFeedback({ ...feedback, isCorrect: false })}
                    className="h-4 w-4"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                rows={3}
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={feedback.isCorrect === null}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
