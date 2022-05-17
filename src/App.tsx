import { ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import NotificationProvider from './components/NotificationProvider';
import Router from './router/Router';

// TODO - A user should be able to view your application to answer the following questions about their computer:

// - What is my computer's current average CPU load?
// - How did the average CPU load change over a 10 minute window?
// - Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
// - Has my computer recovered from heavy CPU load? When? How many times?

// ## Product requirements:

// - The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
// - The front-end application should retrieve CPU load information every 10 seconds.
// - The front-end application should maintain a 10 minute window of historical CPU load information.
// - The front-end application should alert the user to high CPU load.
// - The front-end application should alert the user when CPU load has recovered.

// ## Engineering requirements:

// - The alerting logic in your application should have tests.
// - Please write up a small explanation of how you would extend or improve your application design if you were building this for production.

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palletType
    }
  });

  useEffect(() => {
    setDarkState(false);
  }, [darkState]);

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
