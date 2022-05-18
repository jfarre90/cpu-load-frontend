import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import { CpuStatsFetchResponse } from '../api/types';
import { store } from '../store';
import { fetchCpuStatsAsync } from '../store/cpuUsage';

const sampleCpuStatsResponse = {
  data: {
    currentUsage: 12,
    currentTime: moment().unix(),
    loadAverage: 0.8,
    uptime: 5876
  }
};

const mockNetworkResponse = () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`http://localhost:3002/api/cpu-stats`).reply(200, sampleCpuStatsResponse);
};

describe('Fetching of CPU stats', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });
  it('Should be able to fetch stats and set them to redux store', async () => {
    const result = await store.dispatch(fetchCpuStatsAsync());
    const { data } = result.payload as CpuStatsFetchResponse;

    expect(result.type).toBe('cpuUsage/fetchCpuStats/fulfilled');
    expect(data.currentUsage).toEqual(sampleCpuStatsResponse.data.currentUsage);
    expect(data.uptime).toEqual(sampleCpuStatsResponse.data.uptime);
    expect(data.loadAverage).toEqual(sampleCpuStatsResponse.data.loadAverage);
  });
});
