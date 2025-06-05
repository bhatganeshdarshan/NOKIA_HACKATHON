import express from 'express';
import NetworkLog from '../models/NetworkLog.js';

const router = express.Router();

// @route   GET api/logs
// @desc    Get all logs with optional filtering
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { severity, component, startDate, endDate, limit = 100 } = req.query;
    
    const query = {};
    
    if (severity) query.severity = severity;
    if (component) query.component = component;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const logs = await NetworkLog.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/logs
// @desc    Create a new log entry
// @access  Private
router.post('/', async (req, res) => {
  try {
    const newLog = new NetworkLog(req.body);
    const log = await newLog.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/logs/stats
// @desc    Get log statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const stats = await NetworkLog.aggregate([
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    const componentStats = await NetworkLog.aggregate([
      {
        $group: {
          _id: '$component',
          count: { $sum: 1 },
          errors: {
            $sum: {
              $cond: [{ $eq: ['$severity', 'ERROR'] }, 1, 0]
            }
          }
        }
      }
    ]);

    res.json({
      severityStats: stats,
      componentStats: componentStats
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/logs/:id
// @desc    Get log by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const log = await NetworkLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }
    res.json(log);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Log not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router; 