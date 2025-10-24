import { connect } from "react-redux";
import { incrementar } from "./slices";
import { obtener_mesas } from "./services";
import { obtener_session } from "../sockets/services";
import React from "react";

const Mapa = ({ contador, incrementar, obtener_mesas, obtener_session }) => {
  const enviar = () => {
    incrementar(1);
    obtener_session();
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
  obtener_session: () => dispatch(obtener_session()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mapa);
