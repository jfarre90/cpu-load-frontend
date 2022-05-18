import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { duration, unix } from 'moment';
import { CpuStatsFetchResponse } from '../../api/types';
import {
  ALERT_STATUS,
  LOAD_ALERT_RECOVERY_THRESHOLD,
  LOAD_ALERT_RECOVERY_WINDOW,
  LOAD_ALERT_THRESHOLD,
  LOAD_ALERT_WINDOW,
  MAX_LOG_LENGTH
} from './constants';
import { CpuUsageStore, LogEntry } from './types';

export const reduceCoreStatsHandler = (
  draftState: Draft<CpuUsageStore>,
  action: PayloadAction<CpuStatsFetchResponse>
): void => {
  const { currentUsage, loadAverage, uptime } = action.payload.data;

  draftState.currentUsage = currentUsage;
  draftState.currentLoadAverage = loadAverage;
  draftState.osUptime = uptime;
};

export const reduceLogEntryHandler = (
  draftState: Draft<CpuUsageStore>,
  action: PayloadAction<CpuStatsFetchResponse>
): void => {
  const { loadAverage, currentTime } = action.payload.data;
  const nextLogEntry = { load: loadAverage, time: currentTime };

  //* This logic truncates the log data if max graph window is filled, to avoid keeping unnecessary logs
  draftState.loadLog =
    draftState.loadLog.length >= MAX_LOG_LENGTH
      ? [...draftState.loadLog.slice(1, draftState.loadLog.length), nextLogEntry]
      : [...draftState.loadLog, nextLogEntry];
};

const checkAlert = (
  draftState: Draft<CpuUsageStore>,
  action: PayloadAction<CpuStatsFetchResponse>,
  windowTime: number,
  condition: (logEntry: Draft<LogEntry>) => boolean
) => {
  const { currentTime } = action.payload.data;

  //* Logic filters the log to only include logs withing the windowTime
  const alertLogWindow = draftState.loadLog.filter((logEntry) => {
    const milliseconds = duration(unix(currentTime).diff(unix(logEntry.time))).asMilliseconds();

    return milliseconds <= windowTime;
  });

  return alertLogWindow.every(condition);
};

const isAlertState = (draftState: Draft<CpuUsageStore>, action: PayloadAction<CpuStatsFetchResponse>) => {
  return checkAlert(draftState, action, LOAD_ALERT_WINDOW, (logEntry) => logEntry.load > LOAD_ALERT_THRESHOLD);
};

const isCurrentAlertResolved = (draftState: Draft<CpuUsageStore>, action: PayloadAction<CpuStatsFetchResponse>) => {
  return checkAlert(
    draftState,
    action,
    LOAD_ALERT_RECOVERY_WINDOW,
    (logEntry) => logEntry.load < LOAD_ALERT_RECOVERY_THRESHOLD
  );
};

export const reduceAlertMonitoringHandler = (
  draftState: Draft<CpuUsageStore>,
  action: PayloadAction<CpuStatsFetchResponse>
): void => {
  const { currentTime } = action.payload.data;

  if (draftState.currentAlert && isCurrentAlertResolved(draftState, action)) {
    draftState.currentAlert = { ...draftState.currentAlert, status: ALERT_STATUS.RESOLVED, resolvedTime: currentTime };
  } else if (!draftState.currentAlert && isAlertState(draftState, action)) {
    draftState.currentAlert = { status: ALERT_STATUS.PENDING, time: currentTime };
  }
};
