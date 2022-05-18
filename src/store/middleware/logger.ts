import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '..';

export const logger: Middleware<{}, RootState> = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('### Dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};
