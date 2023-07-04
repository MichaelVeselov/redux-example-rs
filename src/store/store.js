import { configureStore, combineReducers } from '@reduxjs/toolkit';

import taskReducer from './task';
import errorReducer from './errors';

import { logger } from './middleware/logger';

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDeafaultMiddleware) =>
      getDeafaultMiddleware({
        serializableCheck: false,
      }).concat(logger),
  });
}

export default createStore;
