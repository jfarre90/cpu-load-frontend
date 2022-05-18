import { Typography } from '@mui/material';
import { FC } from 'react';
import { TitleProps } from './types';

const Title: FC<TitleProps> = ({ children }) => (
  <Typography component='h2' variant='h6' color='primary' gutterBottom>
    {children}
  </Typography>
);

export default Title;
