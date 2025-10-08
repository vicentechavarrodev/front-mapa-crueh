import { createLogger } from 'redux-logger';
import { configureStore ,combineReducers  } from '@reduxjs/toolkit';
import mapReducers from "../components/map/slices.jsx";

const loggerMiddleware = createLogger();
const rootReduc = combineReducers({
    map :  mapReducers
});

 const store = configureStore({
  reducer: rootReduc,
  middleware: (getDefaultMiddleware) =>
               getDefaultMiddleware()
              .concat(loggerMiddleware) ,
});

export default store;

