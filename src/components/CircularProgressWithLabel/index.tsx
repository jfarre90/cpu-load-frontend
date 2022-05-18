import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';
import ValueDisplay from '../ValueDisplay';
import { CircularProgressWithLabelProps } from './types';

const CircularProgressWithLabel: FC<CircularProgressWithLabelProps> = ({ value, size, label }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex', margin: '30px' }}>
    <CircularProgress variant='determinate' value={value} size={size} />
    <ValueDisplay value={label} />
  </Box>
);

export default CircularProgressWithLabel;
