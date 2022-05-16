export type API_RESPONSE<T = unknown> = {
  data: T;
};

export type CpuStatsFetchResponse = API_RESPONSE<{
  currentUsage: number;
  currentTime: number;
  averageUsage15min: number;
  uptime: number;
}>;
