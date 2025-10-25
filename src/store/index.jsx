import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import map_reducers from "../components/map/slices.jsx";
import ws_reducers from "../components/sockets/slices.jsx";
import dialog_reducers from "../components/dialogs/slices.jsx";

import websocket_middleware from "./websocket_middleware.jsx";
import { listener_middleware } from "./listener_middleware.jsx";

const rootReduc = combineReducers({
  map: map_reducers,
  dialogs: dialog_reducers,
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
