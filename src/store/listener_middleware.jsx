import { createListenerMiddleware } from "@reduxjs/toolkit";
export const listener_middleware = createListenerMiddleware();

listener_middleware.startListening({
  predicate: (action, currentState, previousState) => {
    return currentState.web_socket.token !== previousState.web_socket.token;
  },
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch({ type: "WEBSOCKET_CONNECT" });
  },
});
