import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  predictions: [],
  analytics: [],
  loading: false,
  error: null,
  currentPrediction: null,
};

const rcaSlice = createSlice({
  name: 'rca',
  initialState,
  reducers: {
    fetchPredictionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPredictionsSuccess: (state, action) => {
      state.loading = false;
      state.predictions = action.payload;
    },
    fetchPredictionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAnalyticsSuccess: (state, action) => {
      state.analytics = action.payload;
    },
    setCurrentPrediction: (state, action) => {
      state.currentPrediction = action.payload;
    },
    submitFeedbackStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    submitFeedbackSuccess: (state, action) => {
      state.loading = false;
      // Update the prediction in the list
      const index = state.predictions.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.predictions[index] = action.payload;
      }
    },
    submitFeedbackFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPredictionsStart,
  fetchPredictionsSuccess,
  fetchPredictionsFailure,
  fetchAnalyticsSuccess,
  setCurrentPrediction,
  submitFeedbackStart,
  submitFeedbackSuccess,
  submitFeedbackFailure,
} = rcaSlice.actions;

export default rcaSlice.reducer; 