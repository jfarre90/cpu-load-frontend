import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import {
  generateErrorStateSample,
  generateSampleWithSpikes,
  generateStableSample
} from '../shared/utils/manualTesting';
import { store } from '../store';
import { addManualLoadLogs, emptyCurrentLog, fetchCpuStatsAsync, moveCurrentAlertToLog } from '../store/cpuUsage';
import { ALERT_STATUS } from './../store/cpuUsage/constants';

const sampleCpuStatsResponse = {
  data: {
    currentUsage: 80,
    currentTime: moment().unix(),
    loadAverage: 1.4,
    uptime: 5876
  }
};

const mockNetworkResponse = () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`http://localhost:3002/api/cpu-stats`).reply(200, sampleCpuStatsResponse);
};

describe('CPU load average alert', () => {
  beforeAll(() => {
    mockNetworkResponse();
  });
  it('Should detect alert state if load average above 1 for at least 2 minutes', async () => {
    store.dispatch(emptyCurrentLog());
    store.dispatch(addManualLoadLogs(generateErrorStateSample()));

    await store.dispatch(fetchCpuStatsAsync());

    let state = store.getState();
    expect(state.cpuUsage.currentLoadAverage).toBe(sampleCpuStatsResponse.data.loadAverage);
    expect(state.cpuUsage.currentAlert?.status).toBe(ALERT_STATUS.PENDING); // checks if an alert is set
    expect(state.cpuUsage.currentAlert?.time).toBe(sampleCpuStatsResponse.data.currentTime);
  });

  it('Should keep the alert if not all of the loadAverage is under 1 for at least 2 minutes', async () => {
    store.dispatch(emptyCurrentLog());
    store.dispatch(addManualLoadLogs(generateSampleWithSpikes()));

    await store.dispatch(fetchCpuStatsAsync());

    let state = store.getState();
    expect(state.cpuUsage.currentLoadAverage).toBe(sampleCpuStatsResponse.data.loadAverage);
    expect(state.cpuUsage.currentAlert?.status).toBe(ALERT_STATUS.PENDING); // checks if an alert is still pending to resolve
  });

  it('Should detect the alert resolved if loadAversage is under 1 for at least 2 minutes', async () => {
    store.dispatch(emptyCurrentLog());
    store.dispatch(addManualLoadLogs(generateStableSample()));

    await store.dispatch(fetchCpuStatsAsync());

    let state = store.getState();
    expect(state.cpuUsage.currentLoadAverage).toBe(sampleCpuStatsResponse.data.loadAverage);
    expect(state.cpuUsage.currentAlert?.status).toBe(ALERT_STATUS.RESOLVED); // checks if the alert is resolved

    store.dispatch(moveCurrentAlertToLog());

    state = store.getState();
    expect(state.cpuUsage.currentAlert).toBe(undefined);
  });
});
