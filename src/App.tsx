import { createTheme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import NotificationProvider from './components/NotificationProvider';
import Router from './router/Router';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} preventDuplicate autoHideDuration={10000}>
        <NotificationProvider>
          <Router />
        </NotificationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
