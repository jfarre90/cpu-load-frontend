import { SnackbarKey, ProviderContext } from 'notistack';

export type NotificationContextProps = {
  showNotificationSuccess: (message: string) => void;
  showNotificationError: (message: string) => void;
};

export type NotificationActionProps = {
  notificationKey: SnackbarKey;
  closeNotification: ProviderContext['closeSnackbar'];
};
