import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ValueDisplayProps } from './types';

const ValueDisplay: FC<ValueDisplayProps> = ({ value }) => (
  <Box
    sx={{
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Typography variant='h5' component='div' color='text.primary'>
      {value}
    </Typography>
  </Box>
);

export default ValueDisplay;
