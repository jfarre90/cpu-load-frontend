import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { cpuUsageReducer } from './cpuUsage';

const rootReducer = combineReducers({
  cpuUsage: cpuUsageReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  // .concat(logger) //*Used for debugging
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
