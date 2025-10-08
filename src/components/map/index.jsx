import { connect } from "react-redux";
import { incrementar } from './slices';
import {   obtener_mesas } from './services';
import { loader } from "../../utils/loader";


const Contador = ({ contador,incrementar,obtener_mesas }) => {

const enviar= (e) => {
  loader.show();
  incrementar(1);
  obtener_mesas();
}
  return (
    <div>
      <p >Contador: {contador}</p>
      <button className="button" onClick={enviar}>
        Incrementar
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contador: state.map.contador 
});

const mapDispatchToProps = (dispatch) => ({
   incrementar: (valor) => dispatch(incrementar(valor)),
   obtener_mesas: () => dispatch(obtener_mesas()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contador);
