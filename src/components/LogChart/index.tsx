import { Paper } from '@mui/material';
import { FC } from 'react';
import { Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getTimeFromUnix } from '../../shared/utils/getTimeFromUnix';
import { selectCpuLoadLog } from '../../store/cpuUsage';
import { useAppSelector } from '../../store/hooks';
import Title from '../Title';
import { LogChartProps } from './types';

const LogChart: FC<LogChartProps> = () => {
  const loadLog = useAppSelector(selectCpuLoadLog);

  const graphData = loadLog.map((entry) => ({
    load: entry.load,
    time: getTimeFromUnix(entry.time)
  }));

  //TODO - refactor sizing and styling info
  return (
    <Paper>
      <Title>CPU Load Monitoring</Title>
      <ResponsiveContainer aspect={2}>
        <LineChart
          data={graphData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey='time' interval='preserveEnd' stroke={'red'} />
          <YAxis stroke={'blue'}>
            <Label angle={270} position='left' style={{ textAnchor: 'middle', fill: 'green' }}>
              Load Average
            </Label>
          </YAxis>
          <Line dataKey='load' stroke={'green'} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default LogChart;
