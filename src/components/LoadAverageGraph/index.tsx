import { Box, Paper } from '@mui/material';
import { FC } from 'react';
import { selectCurrentLoadAverage } from '../../store/cpuUsage';
import { useAppSelector } from '../../store/hooks';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import Title from '../Title';
import { LoadAverageGraphProps } from './types';

export const LoadAverageGraph: FC<LoadAverageGraphProps> = () => {
  const currentCpuLoad = useAppSelector(selectCurrentLoadAverage) || 0;

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <Title>CPU Load Average</Title>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgressWithLabel label={currentCpuLoad.toFixed(2)} value={currentCpuLoad * 100} size={100} />
      </Box>
    </Paper>
  );
};

export default LoadAverageGraph;
