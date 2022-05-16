import { useContext } from 'react';
import { NotificationContext } from './NotificationProvider';

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('"useNotification" must be inside "NotificationProvider"');
  }

  return context;
};
