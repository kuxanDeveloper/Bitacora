import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const guardFechasbitacora = ({
    COD_BITACORAv,
    FECHA_HORA_INGRESO,
    FECHA_HORA_VERIFICACION,
    FECHA_INGRESO_BOTELLA,
    FECHA_HORA_SUENA_POSITIVO,
    FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO,
    FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA,
    FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL,
    FECHA_HORA_VALIDACION_ANTIBIOGRAMA
}) => {
  return userService
    .guardFechasbitacora(
        COD_BITACORAv,
        FECHA_HORA_INGRESO,
        FECHA_HORA_VERIFICACION,
        FECHA_INGRESO_BOTELLA,
        FECHA_HORA_SUENA_POSITIVO,
        FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO,
        FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA,
        FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL,
        FECHA_HORA_VALIDACION_ANTIBIOGRAMA
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "Las fechas del sticker se agregaron satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Sample/ViewDetails/[id]",
        query: { id: COD_BITACORAv },
      });

      const btnCierre = document.getElementById("botonCierreModal");
      btnCierre.click();

    })
    .catch((error) => {
      if (
        error == "Límite de tiempo excedido" ||
        error == "Usuario o clave incorrectos" ||
        error == "No se pudo hacer el login, revise los datos enviados"
      ) {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: error,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "error al crear grupo");
    });
};