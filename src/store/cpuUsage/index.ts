import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchCpuStats } from '../../api/cpuStatsQueries';
import { CPU_FETCHING_STATUS, MAX_LOG_LENGTH } from './constants';
import { CpuUsageStore } from './types';

const initialState: CpuUsageStore = {
  loadLog: [],
  currentLoad: undefined,
  averageUsage15minutes: undefined,
  osUptime: undefined,
  highLoadAlerts: [],
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

        const { currentUsage, averageUsage15min, uptime, currentTime } = action.payload.data;

        state.currentLoad = currentUsage;
        state.averageUsage15minutes = averageUsage15min;
        state.osUptime = uptime;

        const nextLogEntry = { load: currentUsage, time: currentTime };
        //* This check ensures we don't keep unnecessary log data. The length is calculated from the log interval and the window time view.
        if (state.loadLog.length >= MAX_LOG_LENGTH) {
          state.loadLog = [...state.loadLog.slice(1, state.loadLog.length), nextLogEntry];
        } else {
          state.loadLog.push(nextLogEntry);
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
