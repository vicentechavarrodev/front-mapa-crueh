import React from "react";
import { connect } from "react-redux";
import { incrementar } from "./slices";
import { abrir_dialogo } from "../dialogs/slices";
import { obtener_mesas } from "./services";
import AlertCustomDialog from "../dialogs/index";

const Mapa = ({ contador, incrementar, obtener_mesas, abrir_dialogo }) => {
  const Enviar = () => {
    //incrementar(1);
    //obtener_session();
    abrir_dialogo({
      mostrar_dialogo: true,
      descripcion: "Prueba general ",
      titulo: "titulo de prueba",
    });
  };

  const EnviarDatos = () => {
    console.log("enviando...");

    return abrir_dialogo({
      mostrar_dialogo: false,
      descripcion: "",
      titulo: "",
    });
  };

  return (
    <div>
      <p>Contador: {contador}</p>

      <button className="button" onClick={Enviar}>
        Incrementar
      </button>
      <AlertCustomDialog EnviarDatos={EnviarDatos}></AlertCustomDialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contador: state.map.contador,
  opciones: state.map.opciones,
});

const mapDispatchToProps = (dispatch) => ({
  incrementar: (valor) => dispatch(incrementar(valor)),
  obtener_mesas: () => dispatch(obtener_mesas()),
  obtener_session: () => dispatch(obtener_session()),
  abrir_dialogo: (value) => dispatch(abrir_dialogo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mapa);
