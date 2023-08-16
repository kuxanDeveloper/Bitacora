import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreatePrueba = ({
  Nombre_prueba,
  Estado_prueba,
  Orden_prueba,
  Lst_plantillas,
}) => {
  return userService
    .CreatePruebaResult(
      Nombre_prueba,
      Estado_prueba,
      Orden_prueba,
      Lst_plantillas
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El estatus se creo satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/PruebaResultado/IndexPrueba",
        query:{page:"1"}
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

      console.log(error, "error al crear el estatus de resultado");
    });
};

export const onSubmitUpdatePrueba = ({
  Codigo_prueba,
  Nombre_prueba,
  Estado_prueba,
  Orden_prueba,
  Lst_plantillas,
}) => {
  return userService
    .EditPruebaResult(
      Codigo_prueba,
      Nombre_prueba,
      Estado_prueba,
      Orden_prueba,
      Lst_plantillas
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El estatus se edito satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/PruebaResultado/IndexPrueba",
        query:{page:"1"}
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

      console.log(error, "error al editar el estatus de resultado");
    });
};

export const getListPrueba = (cookie, Codprueba, page) => {
  return userService
    .GetlistPruebas(
      cookie,
      Codprueba == null ? "" : Codprueba,
      page == null || page == undefined ? "1" : page
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

      console.log(
        error,
        "error al obterner la inforamcion de los estatus de resultado"
      );
    });
};

export const getCmbPrueba = (cookie) => {
  return userService
    .CombopruebaActivo(
      cookie
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

      console.log(
        error,
        "error al obterner la inforamcion de los estatus combo"
      );
    });
};

export const getInfoPlantillasXPrueba = (cookie, Id_prueba) => {
  return userService
    .InfoPlantillasXPrueba(cookie, Id_prueba == null ? "" : Id_prueba)
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

      console.log(
        error,
        "error al obtener la inforamcion de plantillas X prueba"
      );
    });
};
