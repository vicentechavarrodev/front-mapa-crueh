import { connect } from "react-redux";
import { incrementar } from "./slices";
import { obtener_mesas } from "./services";
import {
  wsConnected,
  wsDisconnected,
  wsMessageReceived,
  wsError,
} from "../sockets/slices";

const Mapa = ({
  contador,
  incrementar,
  obtener_mesas,
  wsConnected,
  wsMessageReceived,
}) => {
  const enviar = (e) => {
    incrementar(1);
    const socket = new WebSocket("wss://localhost:7286/gpssocket");

    socket.onopen = () => {
      wsConnected();
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      wsMessageReceived(event.data);
    };

    socket.onclose = () => {
      wsDisconnected();
      console.log("WebSocket Disconnected");
    };

    socket.onerror = (error) => {
      wsError(error.message);
      console.error("WebSocket Error:", error);
    };
  };

  return (
    <div>
      <p>Contador: {contador}</p>
      <button className="button" onClick={enviar}>
        Incrementar
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contador: state.map.contador,
});

const mapDispatchToProps = (dispatch) => ({
  incrementar: (valor) => dispatch(incrementar(valor)),
  obtener_mesas: () => dispatch(obtener_mesas()),
  wsConnected: () => dispatch(wsConnected()),
  wsMessageReceived: (valor) => dispatch(wsMessageReceived(valor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mapa);
