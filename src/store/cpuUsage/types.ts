import { ValueOf } from '../../types/declarations';
import { ALERT_STATUS, CPU_FETCHING_STATUS } from './constants';

export type AlertState = {
  time: number;
  status: ValueOf<ALERT_STATUS>;
  resolvedTime?: number;
};

export type LogEntry = {
  time: number;
  load: number;
};

export type CpuUsageStore = {
  loadLog: LogEntry[];
  currentLoad?: number;
  averageUsage15minutes?: number;
  osUptime?: number;
  currentAlert?: AlertState;
  highLoadAlertsLog: AlertState[];
  fetchingStatus: ValueOf<CPU_FETCHING_STATUS>;
};
