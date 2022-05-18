import { unix } from 'moment';
import { FC } from 'react';
import { selectOsUptime } from '../../store/cpuUsage';
import { useAppSelector } from '../../store/hooks';
import { OSUptimeProps } from './types';

export const OSUptime: FC<OSUptimeProps> = () => {
  const osUptime = useAppSelector(selectOsUptime); //ms that server has been running

  const formattedUptime = unix(osUptime).format('HH:mm:ss');
  return <h1>Uptime placeholder: {formattedUptime}</h1>;
};

export default OSUptime;
