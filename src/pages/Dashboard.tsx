import { Box, Button } from '@mui/material';
import moment from 'moment';
import { FC, useEffect } from 'react';
import CpuUsageGraph from '../components/CpuUsageGraph';
import LoadAverageGraph from '../components/LoadAverageGraph';
import LogChart from '../components/LogChart';
import { LogsTable } from '../components/LogsTable';
import { useNotification } from '../components/NotificationProvider';
import MainLayout from '../layouts/Main';
import { generateErrorStateSample } from '../shared/utils/manualTesting';
import {
  addManualAlert,
  addManualLoadLogs,
  emptyCurrentLog,
  fetchCpuStatsAsync,
  moveCurrentAlertToLog,
  selectCurrentAlert
} from '../store/cpuUsage';
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
    if (currentAlert?.status === ALERT_STATUS.RESOLVED) {
      showNotificationSuccess('CPU Load recovered');
      dispatch(moveCurrentAlertToLog());
    } else {
      currentAlert && showNotificationError('CPU High Load');
    }
  }, [currentAlert]);

  const handleTriggerAlertClick = () => {
    dispatch(addManualAlert({ status: ALERT_STATUS.PENDING, time: moment().unix() }));
  };

  const handleAddFakeLoadLogsClick = () => {
    dispatch(emptyCurrentLog());
    dispatch(addManualLoadLogs(generateErrorStateSample()));
  };

  return (
    <MainLayout pageTitle={'Dashboard'}>
      <Box>
        <Button
          sx={{ marginBottom: 5, marginRight: 3 }}
          disabled={!!currentAlert}
          color='primary'
          variant='outlined'
          onClick={handleTriggerAlertClick}
        >
          Trigger Manual Alert
        </Button>
        <Button sx={{ marginBottom: 5 }} color='error' variant='contained' onClick={handleAddFakeLoadLogsClick}>
          Add fake Load Logs
        </Button>
      </Box>
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridTemplateRows='repeat(7,1fr)'
        alignItems='stretch'
        justifyItems='stretch'
        gap={5}
      >
        <Box
          gridColumn={{ lg: 'span 3', md: 'span 4', xs: 'span 12' }}
          gridRow={{ md: '1 / span 2', xs: '1 / span 1' }}
        >
          <LoadAverageGraph />
        </Box>
        <Box
          gridColumn={{ lg: 'span 3', md: 'span 4', xs: 'span 12' }}
          gridRow={{ md: '3 / span 2', xs: '2 / span 1' }}
        >
          <CpuUsageGraph />
        </Box>
        <Box
          gridColumn={{ lg: 'span 9', md: 'span 8', xs: 'span 12' }}
          gridRow={{ md: '1 / span 4', xs: '3 / span 1' }}
        >
          <LogChart />
        </Box>
        <Box gridColumn={{ xs: 'span 12' }} gridRow={{ md: '5 / span 2', xs: '4 / span 3' }}>
          <LogsTable />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
