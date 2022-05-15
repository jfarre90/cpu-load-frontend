import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { cpuUsageReducer } from './cpuUsage';

export const store = configureStore({
  reducer: {
    cpuUsage: cpuUsageReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
