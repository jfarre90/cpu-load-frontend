import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchCpuStats } from '../../api/cpuStatsQueries';
import { CPU_FETCHING_STATUS, MIN_LOG_ALERT_LENGTH } from './constants';
import { reduceAlertMonitoringHandler, reduceCoreStatsHandler, reduceLogEntryHandler } from './handlers';
import { CpuUsageStore } from './types';

const initialState: CpuUsageStore = {
  loadLog: [],
  currentLoad: undefined,
  averageUsage15minutes: undefined,
  osUptime: undefined,
  highLoadAlertsLog: [],
  currentAlert: undefined,
  fetchingStatus: CPU_FETCHING_STATUS.IDLE
};

export const fetchCpuStatsAsync = createAsyncThunk('cpuUsage/fetchCpuStats', async () => {
  const response = await fetchCpuStats();

  return response.data;
});

export const cpuUsageSlice = createSlice({
  name: 'cpuUsage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCpuStatsAsync.pending, (state) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.FETCHING;
      })
      .addCase(fetchCpuStatsAsync.fulfilled, (state, action) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.IDLE;

        reduceCoreStatsHandler(state, action);

        reduceLogEntryHandler(state, action);

        //* Avoid unnecessary checks of this logic if not enough data collected yet
        if (state.loadLog.length > MIN_LOG_ALERT_LENGTH) {
          reduceAlertMonitoringHandler(state, action);
        }
      })
      .addCase(fetchCpuStatsAsync.rejected, (state) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.FAILED;
      });
  }
});

export const cpuUsageReducer = cpuUsageSlice.reducer;

// export const {  } = cpuUsageSlice.actions;

export const selectCurrentLoad = (state: RootState) => state.cpuUsage.currentLoad;
export const selectIsLoading = (state: RootState) => state.cpuUsage.fetchingStatus === CPU_FETCHING_STATUS.FETCHING;
export const selectCpuLoadLog = (state: RootState) => state.cpuUsage.loadLog;
