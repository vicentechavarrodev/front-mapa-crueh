import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mapReducers from "../components/map/slices.jsx";
import ws_reducers from "../components/sockets/slices.jsx";
import websocket_middleware from "./websocket_middleware.jsx";
import { listener_middleware } from "./listener_middleware.jsx";

const rootReduc = combineReducers({
  map: mapReducers,
  web_socket: ws_reducers,
});

const store = configureStore({
  reducer: rootReduc,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(websocket_middleware)
      .prepend(listener_middleware.middleware),
});

export default store;
