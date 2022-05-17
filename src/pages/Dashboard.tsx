import { Box, Paper } from '@mui/material';
import { FC, useEffect } from 'react';
import CpuUsageGraph from '../components/CpuUsageGraph';
import LoadAverageGraph from '../components/LoadAverageGraph';
import LogChart from '../components/LogChart';
import { LogsTable } from '../components/LogsTable';
import { useNotification } from '../components/NotificationProvider';
import MainLayout from '../layouts/Main';
import { fetchCpuStatsAsync, moveCurrentAlertToLog, selectCurrentAlert } from '../store/cpuUsage';
import { ALERT_STATUS, POLLING_INTERVAL } from '../store/cpuUsage/constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
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
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridTemplateRows='repeat(10,1fr)'
        alignItems='stretch'
        justifyItems='stretch'
        gap={4}
      >
        <Box
          gridColumn={{ lg: 'span 3', md: 'span 4', xs: 'span 12' }}
          gridRow={{ md: '1 / span 2', xs: '1 / span 1' }}
        >
          <Paper>
            <LoadAverageGraph />
          </Paper>
        </Box>
        <Box
          gridColumn={{ lg: 'span 3', md: 'span 4', xs: 'span 12' }}
          gridRow={{ md: '3 / span 2', xs: '2 / span 1' }}
        >
          <Paper>
            <CpuUsageGraph />
          </Paper>
        </Box>
        <Box
          gridColumn={{ lg: 'span 9', md: 'span 8', xs: 'span 12' }}
          gridRow={{ md: '1 / span 4', xs: '3 / span 3' }}
        >
          <Paper>
            <LogChart />
          </Paper>
        </Box>
        <Box gridColumn={{ xs: 'span 12' }} gridRow={{ md: '5 / span 5', xs: '6 / span 4' }}>
          <Paper>
            <LogsTable />
          </Paper>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
