import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchCpuStats } from '../../api/cpuStatsQueries';
import { CPU_FETCHING_STATUS, MIN_LOG_ALERT_LENGTH } from './constants';
import { reduceAlertMonitoringHandler, reduceCoreStatsHandler, reduceLogEntryHandler } from './handlers';
import { CpuUsageStore } from './types';

const initialState: CpuUsageStore = {
  currentUsage: undefined,
  currentLoadAverage: undefined,
  loadLog: [],
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
  reducers: {
    moveCurrentAlertToLog: (state) => {
      if (state.currentAlert) {
        state.highLoadAlertsLog.push(state.currentAlert);
        state.currentAlert = undefined;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCpuStatsAsync.pending, (state) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.FETCHING;
      })
      .addCase(fetchCpuStatsAsync.fulfilled, (state, action) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.IDLE;

        reduceCoreStatsHandler(state, action);

        reduceLogEntryHandler(state, action);

        //* This logic ensures we only look for alerts if we have enough log data
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
export const { moveCurrentAlertToLog } = cpuUsageSlice.actions;

export const selectCurrentUsage = (state: RootState) => state.cpuUsage.currentUsage;
export const selectCurrentLoadAverage = (state: RootState) => state.cpuUsage.currentLoadAverage;
export const selectIsLoading = (state: RootState) => state.cpuUsage.fetchingStatus === CPU_FETCHING_STATUS.FETCHING;
export const selectCpuLoadLog = (state: RootState) => state.cpuUsage.loadLog;
export const selectCurrentAlert = (state: RootState) => state.cpuUsage.currentAlert;
export const selectAlertLog = (state: RootState) => state.cpuUsage.highLoadAlertsLog;
