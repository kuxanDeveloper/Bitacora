import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreatePlantilla = ({
  Plantilla_resultado,
  Estado_plantilla,
  Orden_plantilla,
  Lista_opciones,
}) => {
  return userService
    .CreatePlantillaResult(
      Plantilla_resultado,
      Estado_plantilla,
      Orden_plantilla,
      Lista_opciones
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El seguimiento se creo satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/PlantillaResultado/IndexPlantilla",
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

      console.log(error, "error al crear el seguimiento de resultado");
    });
};

export const onSubmitUpdatePlantilla = ({
  Codigo_Plantilla,
  Plantilla_resultado,
  Estado_plantilla,
  Orden_plantilla,
  Lista_opciones,
}) => {
  return userService
    .EditPlantillaResult(
      Codigo_Plantilla,
      Plantilla_resultado,
      Estado_plantilla,
      Orden_plantilla,
      Lista_opciones
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El seguimiento se edito satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/PlantillaResultado/IndexPlantilla",
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

      console.log(error, "error al editar el seguimiento de resultado");
    });
};

export const getListPlantilla = (cookie, Idplantilla, page) => {
  return userService
    .InfoPlantillaResult(cookie, Idplantilla == null ? "" : Idplantilla, page)
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
        "error al obterner la inforamcion de los seguimientos de resultado"
      );
    });
};

export const getCmbPlantilla = (cookie) => {
  return userService
    .ComboplantillaActivo(cookie)
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
        "error al obterner la inforamcion de los seguimientos combo"
      );
    });
};

export const getInfoOpcionesXPlantilla = (cookie, Id_Plantilla) => {
  return userService
    .InfoOpcionesXPlantilla(cookie, Id_Plantilla == null ? "" : Id_Plantilla)
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
        "error al obtener la inforamcion de opciones X plantilla"
      );
    });
};
