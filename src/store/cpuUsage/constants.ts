export enum CPU_FETCHING_STATUS {
  IDLE = 'idle',
  FETCHING = 'fetching',
  FAILED = 'failed'
}

export enum ALERT_STATUS {
  RESOLVED = 'resolved',
  PENDING = 'pending'
}

export const POLLING_INTERVAL = 10000; //milliseconds interval for each fetch request
export const GRAPH_WINDOW = 600000; //milliseconds for graph view of CPU usage

export const LOAD_ALERT_THRESHOLD = 1; //% of cpu usage considered high load
export const LOAD_ALERT_WINDOW = 120000; //milliseconds for time of cpu usage above threshold to be considered an alert

export const LOAD_ALERT_RECOVERY_THRESHOLD = 1; //% of cpu usage considered high load
export const LOAD_ALERT_RECOVERY_WINDOW = 120000; //milliseconds for time of cpu usage above threshold to be considered an alert

export const MAX_LOG_LENGTH = GRAPH_WINDOW / POLLING_INTERVAL;
export const MIN_LOG_ALERT_LENGTH = LOAD_ALERT_WINDOW / POLLING_INTERVAL; //calculates the minimum log length for potential load alerts
