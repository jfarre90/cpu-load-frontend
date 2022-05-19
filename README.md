# CPU Load Dashboard POC - by Javier Farre

Project was initialised with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Running instructions

Ensure your node version is >=16.0.0 and npm version is >= 8.0.0.

Once you have installed the dependencies **and the API**, you can start the App with `npm run start`

## Design Decisions

- The Project was setup with Typescript, Eslint and Prettier to ensure a good code quality accross the app.

- Material UI has been used for providing the style of the app.

- The graph component is from the Recharts library.

- Current setup uses constants for the different limits for the monitoring. i.e. POLLING_INTERVAL, GRAPH_WINDOW, LOAD_ALERT_THRESHOLD, ... This makes it easy to quickly update the conditions to test different scenarios, like if we want to change the log window to 20 minutes instead 10, or triggering alerts for different thersholds.

- Jest tests have been added to test the different scenarios with the logs and alert detection.

- The Redux store is setup leveraging the Redux toolkit, which gives a much cleaner way of defining the actions and reducers, while also avoiding the potential error of state mutable updates.

## Dashboard View

The user can view the following stats from the Dashboard:

- Live CPU Load average
- Live CPU usage percentage
- 10 minute view graph of the CPU load average.
- Table with all the alerts detected
- If an alert is triggered, a notification will be received on the top right corner, and the alert table will show an entry in red.
- Once the alert is resolved, a notification confirming it has been resolved is triggered, and the entry on the table changes to the "resolved" status.

The Dashboard also contains 2 buttons used for manual testing:

- **Trigger manual alert**: will add an alert to th system. If the load average has been under 1 for the last 2 minutes, the alert should be cleared on the next polling interval. Please note that there need to be at least 2 minutes worth of logs for it to be cleared, as per the instructions.

- **Add fake load logs**: Will add fake logs of high CPU load for the last 2 minutes from the current time. This should trigger the CPU high load upon the next polling interval, and it should be cleared after 2 minutes go by with the load average under 1.

## Further improvements

The app has been set up with scalability in mind. From here on, the app could grow in different directions, like adding more pages for the app, with a navigation bar menu, offering more detailed view of the different cpu stats or other visualisation models (i.e. different graphs). The main improvements I would do next:

- Update the API to persist data. This would allow us to fetch historical data so that the user is not only limited to a "live view".

- Consider showing more stats. You might have noticed that I added the OS Uptime stat but its not currently used, this could be shown on a separate page. Or we could also look at showing stats for Memory usage. The way the Redux store has been set up, we could easily add a separate reducer for any additional data retrieved from any other endpoint, so it allows for a lot of scalability.

- Updating the theme to a desired design, to avoid the default Material UI look.

- Allowing the option for a user to modify the polling interval or log window.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
