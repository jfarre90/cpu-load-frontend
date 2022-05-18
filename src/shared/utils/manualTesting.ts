import { POLLING_INTERVAL } from './../../store/cpuUsage/constants';
import moment from 'moment';
import { LOAD_ALERT_WINDOW } from '../../store/cpuUsage/constants';
import { LogEntry } from '../../store/cpuUsage/types';
import { getRandomNumber } from './getRandomNumber';

const getResult = (minLoad: number, maxLoad: number) => {
  const currentTime = moment().unix() * 1000; //current unix timestamp in miliseconds
  let targetTime = currentTime - (LOAD_ALERT_WINDOW + POLLING_INTERVAL * 2); //minimum time window for alert logic

  const result: LogEntry[] = [];
  for (let time = targetTime; time <= currentTime; time += POLLING_INTERVAL) {
    result.push({
      load: getRandomNumber(minLoad, maxLoad),
      time: time / 1000
    });
  }

  return result;
};

export const generateErrorStateSample = () => getResult(1.5, 2.5);

export const generateStableSample = () => getResult(0.2, 0.8);

export const generateSampleWithSpikes = () => getResult(0.5, 1.5);
