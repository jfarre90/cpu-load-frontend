/* eslint-disable no-unused-vars */
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
export const MAX_LOG_LENGTH = GRAPH_WINDOW / POLLING_INTERVAL;
