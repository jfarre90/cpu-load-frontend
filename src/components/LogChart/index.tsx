import { Box, Paper, useTheme } from '@mui/material';
import { FC } from 'react';
import { CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getTimeFromUnix } from '../../shared/utils/getTimeFromUnix';
import { selectCpuLoadLog } from '../../store/cpuUsage';
import { useAppSelector } from '../../store/hooks';
import Title from '../Title';
import { LogChartProps } from './types';

const LogChart: FC<LogChartProps> = () => {
  const loadLog = useAppSelector(selectCpuLoadLog);

  const graphData = loadLog.map((entry) => ({
    load: entry.load.toFixed(3),
    time: getTimeFromUnix(entry.time)
  }));

  const theme = useTheme();

  const style = {
    axisColor: theme.palette.secondary.main,
    lineColor: theme.palette.success.main
  };

  return (
    <Paper>
      <Box
        sx={{
          height: '100%',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Title>CPU Load Monitoring</Title>
        <ResponsiveContainer aspect={2}>
          <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' interval='preserveEnd' stroke={style.axisColor} />
            <YAxis stroke={style.axisColor}>
              <Label angle={270} position='left' style={{ textAnchor: 'middle', fill: style.axisColor }}>
                Load Average
              </Label>
            </YAxis>
            <Tooltip />
            <Line dataKey='load' stroke={style.lineColor} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default LogChart;
