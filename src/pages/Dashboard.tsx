import { FC, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Label, Line, ResponsiveContainer } from 'recharts';
import { useNotification } from '../components/NotificationProvider';
import MainLayout from '../layouts/Main';
import { fetchCpuStatsAsync, selectCpuLoadLog, selectCurrentLoad } from '../store/cpuUsage';
import { POLLING_INTERVAL } from '../store/cpuUsage/constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const cpuLoad = useAppSelector(selectCurrentLoad);
  const loadLog = useAppSelector(selectCpuLoadLog);
  const { showNotificationSuccess, showNotificationError } = useNotification();

  //TODO - use the available alerts from the store to trigger the notification messages or not.

  // current notification in useEffect is just for testing that it works fine

  useEffect(() => {
    //! initial load renders twice because of strict mode. Would not happen in prod
    dispatch(fetchCpuStatsAsync());
    const interval = setInterval(() => {
      setTimeout(() => {
        showNotificationSuccess('Notification set up');
      }, 2000);
      setTimeout(() => {
        showNotificationError('Errors will look like this');
      }, 6000);

      dispatch(fetchCpuStatsAsync());
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <h1>I&apos;m the dashboard</h1>
      <h2>CPU Load: {cpuLoad}</h2>
      <ResponsiveContainer aspect={3}>
        <LineChart
          data={loadLog}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
          width={500}
          height={500}
        >
          <XAxis dataKey='time' interval='preserveStartEnd' stroke={'red'} />
          <YAxis stroke={'blue'}>
            <Label angle={270} position='left' style={{ textAnchor: 'middle', fill: 'green' }}>
              %
            </Label>
          </YAxis>
          <Line dataKey='load' stroke={'green'} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </MainLayout>
  );
};

export default Dashboard;
