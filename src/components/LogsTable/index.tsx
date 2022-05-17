import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { getTimeFromUnix } from '../../shared/utils/getTimeFromUnix';
import { selectAlertLog, selectCurrentAlert } from '../../store/cpuUsage';
import { useAppSelector } from '../../store/hooks';
import Title from '../Title';
import { LogsTableProps } from './types';

//TODO - list all highAlertlog entries, and current one at the top
// list should show when they were triggered and when they were resolved
export const LogsTable: FC<LogsTableProps> = () => {
  // const theme = useTheme();
  const currentAlert = useAppSelector(selectCurrentAlert);
  const alertLog = useAppSelector(selectAlertLog);

  return (
    <TableContainer component={Paper}>
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
            <TableRow>
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
    </TableContainer>
  );
};
