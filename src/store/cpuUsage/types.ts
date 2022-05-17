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
  currentUsage?: number;
  currentLoadAverage?: number;
  loadLog: LogEntry[];
  osUptime?: number;
  currentAlert?: AlertState;
  highLoadAlertsLog: AlertState[];
  fetchingStatus: ValueOf<CPU_FETCHING_STATUS>;
};
