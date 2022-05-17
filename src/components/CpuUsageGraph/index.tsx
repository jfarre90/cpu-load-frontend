import { Box, Paper } from '@mui/material';
import { FC } from 'react';
import { selectCurrentUsage } from '../../store/cpuUsage';
import { useAppSelector } from '../../store/hooks';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import Title from '../Title';
import { CpuUsageGraphProps } from './types';

export const CpuUsageGraph: FC<CpuUsageGraphProps> = () => {
  const currentCpuUsage = useAppSelector(selectCurrentUsage) || 0;

  return (
    <Paper>
      <Title>CPU Usage</Title>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgressWithLabel label={`${Math.round(currentCpuUsage)}%`} value={currentCpuUsage} size={100} />
      </Box>
    </Paper>
  );
};

export default CpuUsageGraph;
