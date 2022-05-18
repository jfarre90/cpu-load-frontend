import { POLLING_INTERVAL } from './../../store/cpuUsage/constants';
import moment from 'moment';
import { LOAD_ALERT_WINDOW } from '../../store/cpuUsage/constants';
import { LogEntry } from '../../store/cpuUsage/types';
import { getRandomNumber } from './getRandomNumber';

export const generateErrorStateSample = () => {
  const currentTime = moment().unix() * 1000; //current unix timestamp in miliseconds
  let targetTime = currentTime - (LOAD_ALERT_WINDOW + POLLING_INTERVAL); //minimum time window for alert logic

  const result: LogEntry[] = [];
  for (let time = targetTime; time <= currentTime; time += POLLING_INTERVAL) {
    result.push({
      load: getRandomNumber(1.5, 2.5),
      time: time / 1000
    });
  }

  return result;
};
