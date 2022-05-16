import { FC } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { NotificationActionProps } from '../types';
import IconButton from '@mui/material/IconButton/IconButton';

const NotificationAction: FC<NotificationActionProps> = ({ notificationKey, closeNotification }) => {
  return (
    <IconButton aria-label='close' color='inherit' size='small' onClick={() => closeNotification(notificationKey)}>
      <CloseIcon />
    </IconButton>
  );
};

export default NotificationAction;
