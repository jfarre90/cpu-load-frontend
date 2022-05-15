import axios from 'axios';
import { env } from 'process';
import { API_URL } from './constants';
import { CpuStatsFetchResponse } from './types';

export const fetchCpuStats = async () => {
  return axios.get<CpuStatsFetchResponse>(`${env.API_URL || API_URL}/cpu-stats`);
};
