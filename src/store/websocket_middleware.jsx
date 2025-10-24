import { socket_constants } from "../components/sockets/constants";
import {
  ws_mensaje,
  ws_conectado,
  ws_desconectado,
  ws_error,
} from "../components/sockets/slices";
import { api_config } from "../services/api_config";

const websocketMiddleware = (store) => (next) => (action) => {
  if (action.type === "WEBSOCKET_CONNECT") {
    const currentState = store.getState();
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_TRACCAR_URL}/${api_config.PREFIX}/${
        socket_constants.API_URLS.SOCKET_TRACCAR
      }${currentState.web_socket.token}`
    );
    socket.onopen = () => {
      store.dispatch({
        type: ws_conectado().type,
        payload: currentState,
      });
    };

    socket.onmessage = (event) => {
      store.dispatch({
        type: ws_mensaje().type,
        payload: event.data,
      });
    };

    socket.onclose = () => {
      store.dispatch({
        type: ws_desconectado().type,
        payload: currentState,
      });
    };

    socket.onerror = (error) => {
      store.dispatch({ type: ws_error.type, payload: error.message });
    };
  }
  return next(action);
};

export default websocketMiddleware;
