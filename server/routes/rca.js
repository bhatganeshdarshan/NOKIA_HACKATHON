import express from 'express';
import NetworkLog from '../models/NetworkLog.js';

const router = express.Router();

// @route   GET api/rca/predict
// @desc    Get RCA prediction for a log
// @access  Private
router.get('/predict', async (req, res) => {
  try {
    const { logId } = req.query;
    
    // For now, return dummy predictions
    // This will be replaced with actual ML model predictions
    const dummyPredictions = [
      'Network Congestion',
      'Hardware Failure',
      'Configuration Error',
      'Software Bug',
      'Resource Exhaustion'
    ];

    const randomPrediction = dummyPredictions[Math.floor(Math.random() * dummyPredictions.length)];
    const confidence = Math.random() * 0.5 + 0.5; // Random confidence between 0.5 and 1.0

    res.json({
      prediction: randomPrediction,
      confidence: confidence,
      timestamp: new Date()
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/rca/feedback
// @desc    Submit feedback for RCA prediction
// @access  Private
router.post('/feedback', async (req, res) => {
  try {
    const { logId, isCorrect, comment } = req.body;

    const log = await NetworkLog.findById(logId);
    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    log.feedback = {
      isCorrect,
      comment,
      timestamp: new Date()
    };

    await log.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/rca/analytics
// @desc    Get RCA analytics
// @access  Private
router.get('/analytics', async (req, res) => {
  try {
    // Get prediction accuracy stats
    const accuracyStats = await NetworkLog.aggregate([
      {
        $match: {
          'feedback.isCorrect': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$rcaPrediction',
          total: { $sum: 1 },
          correct: {
            $sum: {
              $cond: ['$feedback.isCorrect', 1, 0]
            }
          }
        }
      }
    ]);

    // Calculate accuracy for each prediction type
    const analytics = accuracyStats.map(stat => ({
      prediction: stat._id,
      accuracy: stat.correct / stat.total,
      totalPredictions: stat.total
    }));

    res.json(analytics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router; 