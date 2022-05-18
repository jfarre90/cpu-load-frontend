import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { getTimeFromUnix } from '../../shared/utils/getTimeFromUnix';
import { selectAlertLog, selectCurrentAlert } from '../../store/cpuUsage';
import { useAppSelector } from '../../store/hooks';
import Title from '../Title';
import { LogsTableProps } from './types';

export const LogsTable: FC<LogsTableProps> = () => {
  const currentAlert = useAppSelector(selectCurrentAlert);
  const alertLog = useAppSelector(selectAlertLog);

  return (
    <TableContainer sx={{ height: '100%' }} component={Paper}>
      <Box
        sx={{
          padding: 3
        }}
      >
        <Title>CPU High load alerts</Title>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Time Triggered</TableCell>
              <TableCell>Time Resolved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAlert && (
              <TableRow sx={{ backgroundColor: 'red' }}>
                <TableCell>{`${currentAlert.status}`}</TableCell>
                <TableCell>{getTimeFromUnix(currentAlert.time)}</TableCell>
                <TableCell>{currentAlert.resolvedTime ? getTimeFromUnix(currentAlert.resolvedTime) : null}</TableCell>
              </TableRow>
            )}
            {alertLog.map((alert) => (
              <TableRow key={alert.time}>
                <TableCell>{`${alert.status}`}</TableCell>
                <TableCell>{getTimeFromUnix(alert.time)}</TableCell>
                <TableCell>{alert.resolvedTime ? getTimeFromUnix(alert.resolvedTime) : null}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};
