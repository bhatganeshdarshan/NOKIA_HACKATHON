import mongoose from 'mongoose';

const networkLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  source: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  component: {
    type: String,
    required: true
  },
  metrics: {
    type: Map,
    of: Number
  },
  tags: [{
    type: String
  }],
  rcaPrediction: {
    type: String,
    default: null
  },
  rcaConfidence: {
    type: Number,
    default: 0
  },
  feedback: {
    isCorrect: {
      type: Boolean,
      default: null
    },
    comment: String,
    timestamp: Date
  }
});

// Index for efficient querying
networkLogSchema.index({ timestamp: -1 });
networkLogSchema.index({ severity: 1 });
networkLogSchema.index({ component: 1 });

export default mongoose.model('NetworkLog', networkLogSchema); 