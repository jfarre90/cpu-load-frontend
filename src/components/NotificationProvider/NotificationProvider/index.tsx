import { FC, useCallback, createContext, useMemo } from 'react';
import { useSnackbar, SnackbarKey } from 'notistack';
import { defaultNotificationContext } from '../constants';
import { NotificationContextProps } from '../types';
import NotificationAction from '../NotificationAction';
import { ReactChildren } from '../../../shared/types/reactTypes';

export const NotificationContext = createContext<NotificationContextProps>(defaultNotificationContext);

const NotificationProvider: FC<ReactChildren> = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = useCallback(
    (key: SnackbarKey) => <NotificationAction notificationKey={key} closeNotification={closeSnackbar} />,
    [closeSnackbar]
  );

  const showNotificationSuccess = useCallback(
    (errorMessage: string) => {
      enqueueSnackbar(errorMessage, {
        variant: 'success',
        action: action,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    },
    [action, enqueueSnackbar]
  );

  const showNotificationError = useCallback(
    (errorMessage: string) => {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        action: action,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    },
    [action, enqueueSnackbar]
  );

  const contextValue = useMemo<NotificationContextProps>(() => {
    return {
      showNotificationSuccess,
      showNotificationError
    };
  }, [showNotificationError, showNotificationSuccess]);

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};

export default NotificationProvider;
