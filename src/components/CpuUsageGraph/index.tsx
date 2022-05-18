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
    <Paper sx={{ height: '100%', width: '100%' }}>
      <Box
        sx={{
          height: '100%',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Title>CPU Usage</Title>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
          <CircularProgressWithLabel label={`${Math.round(currentCpuUsage)}%`} value={currentCpuUsage} size={100} />
        </Box>
      </Box>
    </Paper>
  );
};

export default CpuUsageGraph;
