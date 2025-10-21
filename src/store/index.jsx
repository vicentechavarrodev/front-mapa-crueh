import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mapReducers from "../components/map/slices.jsx";
import ws_reducers from "../components/sockets/slices.jsx";

const rootReduc = combineReducers({
  map: mapReducers,
  web_socket: ws_reducers,
});

const store = configureStore({
  reducer: rootReduc,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
