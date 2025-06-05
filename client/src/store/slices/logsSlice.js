import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  filteredLogs: [],
  stats: {
    severityStats: [],
    componentStats: [],
  },
  loading: false,
  error: null,
  filters: {
    severity: '',
    component: '',
    startDate: '',
    endDate: '',
  },
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    fetchLogsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLogsSuccess: (state, action) => {
      state.loading = false;
      state.logs = action.payload;
      state.filteredLogs = action.payload;
    },
    fetchLogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchStatsSuccess: (state, action) => {
      state.stats = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters to logs
      state.filteredLogs = state.logs.filter(log => {
        if (state.filters.severity && log.severity !== state.filters.severity) return false;
        if (state.filters.component && log.component !== state.filters.component) return false;
        if (state.filters.startDate && new Date(log.timestamp) < new Date(state.filters.startDate)) return false;
        if (state.filters.endDate && new Date(log.timestamp) > new Date(state.filters.endDate)) return false;
        return true;
      });
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredLogs = state.logs;
    },
  },
});

export const {
  fetchLogsStart,
  fetchLogsSuccess,
  fetchLogsFailure,
  fetchStatsSuccess,
  setFilters,
  clearFilters,
} = logsSlice.actions;

export default logsSlice.reducer; 