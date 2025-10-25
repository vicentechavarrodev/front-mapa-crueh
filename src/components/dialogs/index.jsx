import React from "react";
import { connect } from "react-redux";
import { abrir_dialogo } from "./slices";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AlertCustomDialog = ({ opciones, abrir_dialogo, EnviarDatos }) => {
  const CancelarClick = () => {
    abrir_dialogo({
      mostrar_dialogo: false,
      descripcion: "",
      titulo: "",
    });
  };
  return (
    <AlertDialog open={opciones.mostrar_dialogo}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{opciones.titulo}</AlertDialogTitle>
          <AlertDialogDescription>
            {opciones.descripcion}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={CancelarClick}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={EnviarDatos}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const mapStateToProps = (state) => ({
  opciones: state.dialogs.opciones,
});

const mapDispatchToProps = (dispatch) => ({
  abrir_dialogo: (value) => dispatch(abrir_dialogo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertCustomDialog);
