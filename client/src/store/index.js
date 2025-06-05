import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import logsReducer from './slices/logsSlice';
import rcaReducer from './slices/rcaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logsReducer,
    rca: rcaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['logs/fetchLogsSuccess', 'rca/fetchPredictionsSuccess'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'payload.0.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['logs.logs.timestamp', 'rca.predictions.timestamp'],
      },
    }),
}); 