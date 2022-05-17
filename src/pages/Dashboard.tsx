import { FC, useEffect } from 'react';
import LogChart from '../components/LogChart';
import { LogsTable } from '../components/LogsTable';
import { useNotification } from '../components/NotificationProvider';
import MainLayout from '../layouts/Main';
import {
  fetchCpuStatsAsync,
  moveCurrentAlertToLog,
  selectCurrentAlert,
  selectCurrentLoadAverage,
  selectCurrentUsage
} from '../store/cpuUsage';
import { ALERT_STATUS, POLLING_INTERVAL } from '../store/cpuUsage/constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const currentCpuUsage = useAppSelector(selectCurrentUsage);
  const currentCpuLoad = useAppSelector(selectCurrentLoadAverage);
  const currentAlert = useAppSelector(selectCurrentAlert);
  const { showNotificationError, showNotificationSuccess } = useNotification();

  useEffect(() => {
    //! initial load renders twice because of strict mode. Would not happen in prod
    dispatch(fetchCpuStatsAsync());
    const interval = setInterval(() => {
      dispatch(fetchCpuStatsAsync());
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    currentAlert && showNotificationError('CPU High Load');

    if (currentAlert?.status === ALERT_STATUS.RESOLVED) {
      showNotificationSuccess('CPU Load recovered');
      dispatch(moveCurrentAlertToLog);
    }
  }, [currentAlert]);

  return (
    <MainLayout>
      <h1>I&apos;m the dashboard</h1>
      <h2>Current CPU Usage: {currentCpuUsage}</h2>
      <h2>Current CPU Load: {currentCpuLoad}</h2>

      <LogChart />
      <LogsTable />
    </MainLayout>
  );
};

export default Dashboard;
