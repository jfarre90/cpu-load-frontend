import { unix } from 'moment';

export const getTimeFromUnix = (unixNumber: number) => unix(unixNumber).format('HH:mm:ss');
