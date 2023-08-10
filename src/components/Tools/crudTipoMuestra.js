import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreateTipoMue = ({
  NOMBRE_TIPO_MUESTRA,
  ESTADO,
  ID_GRUPO,
}) => {
  return userService
    .CreateTipoMuestra(NOMBRE_TIPO_MUESTRA, ESTADO, ID_GRUPO)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El Tipo de muestra se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/TiposMuestras/IndexTipo",
        query: { page: "1" },
      });
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

      console.log(error, "error al crear Tipo de muestra");
    });
};

export const onSubmitEditTipoMue = ({
  ID,
  NOMBRE_TIPO_MUESTRA,
  ESTADO,
  ID_GRUPO,
}) => {
  return userService
    .EditTipoMuestra(ID, NOMBRE_TIPO_MUESTRA, ESTADO, ID_GRUPO)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El Tipo de muestra se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/TiposMuestras/IndexTipo",
        query: { page: "1" },
      });
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

      console.log(error, "error al editar Tipo de muestra");
    });
};

export const GetlistTiposMuestra = (cookie, ID, ESTADO, page) => {
  return userService
    .GetlistTiposMuestra(
      cookie,
      ID == null ? "" : ID,
      ESTADO == null ? "" : ESTADO,
      page == undefined || page == null ? "1" : page
    )
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

      console.log(error, "error al obtener la informacion de tipos de muestra");
    });
};
