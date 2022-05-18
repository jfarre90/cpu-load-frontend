import { CircularProgressProps } from '@mui/material';

export type CircularProgressWithLabelProps = Pick<CircularProgressProps, 'size' | 'value'> & { label: string };
