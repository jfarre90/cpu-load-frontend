import { ValueOf } from '../../types/declarations';
import { ALERT_STATUS, CPU_FETCHING_STATUS } from './constants';

export type AlertState = {
  time: number;
  status: ValueOf<ALERT_STATUS>;
};
export type CpuUsageStore = {
  loadLog: number[];
  currentLoad: number;
  averageUsage15minutes: number;
  osUptime: number;
  highLoadAlerts: AlertState[];
  fetchingStatus: ValueOf<CPU_FETCHING_STATUS>;
};
