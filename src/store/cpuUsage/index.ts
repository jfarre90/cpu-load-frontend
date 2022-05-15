import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchCpuStats } from '../../api/cpuStatsQueries';
import { CPU_FETCHING_STATUS } from './constants';
import { CpuUsageStore } from './types';

const initialState: CpuUsageStore = {
  loadLog: [],
  currentLoad: 0,
  averageUsage15minutes: 0,
  osUptime: 0,
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
  reducers: {
    addToLog: (state, action: PayloadAction<number>) => {
      state.loadLog.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCpuStatsAsync.pending, (state) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.FETCHING;
      })
      .addCase(fetchCpuStatsAsync.fulfilled, (state, action) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.IDLE;

        const { currentUsage, averageUsage15min, uptime } = action.payload.data;

        state.currentLoad = currentUsage;
        state.averageUsage15minutes = averageUsage15min;
        state.osUptime = uptime;
      })
      .addCase(fetchCpuStatsAsync.rejected, (state) => {
        state.fetchingStatus = CPU_FETCHING_STATUS.FAILED;
      });
  }
});

export const cpuUsageReducer = cpuUsageSlice.reducer;

export const { addToLog } = cpuUsageSlice.actions;

export const selectCurrentLoad = (state: RootState) => state.cpuUsage.currentLoad;
export const selectIsLoading = (state: RootState) => state.cpuUsage.fetchingStatus === CPU_FETCHING_STATUS.FETCHING;
