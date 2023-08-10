import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreateObservations = ({
  DescripcionObservacion,
  obs_cierre,
  obs_reapertura,
  obs_bitacora,
  Estado_observacion,
}) => {
  return userService
    .CreatObservations(
      DescripcionObservacion,
      obs_cierre,
      obs_reapertura,
      obs_bitacora,
      Estado_observacion
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "La observacion predeterminada se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/DefaultObservations/IndexObservations",
        query: { page: "1" },
      });
    })
    .catch((error) => {
      if (
        error == "Límite de tiempo excedido" ||
        error == "Usuario o clave incorrectos"
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

      console.log(error, "error al crear observacion predeterminada");
    });
};

export const onSubmitUpdateObservations = ({
  Cod_Observacion,
  DescripcionObservacion,
  obs_cierre,
  obs_reapertura,
  obs_bitacora,
  Estado_observacion,
}) => {
  return userService
    .EditObservations(
      Cod_Observacion,
      DescripcionObservacion,
      obs_cierre,
      obs_reapertura,
      obs_bitacora,
      Estado_observacion
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "La observacion predeterminada se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/DefaultObservations/IndexObservations",
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

      console.log(error, "error al editar observacion predeterminada");
    });
};

export const getListObservations = (Cod_Observacion, cookie, page) => {
  return userService
    .InfoObservations(
      Cod_Observacion == null ? "" : Cod_Observacion,
      cookie,
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

      console.log(
        error,
        "error al traer informacion observaciobes predeterminadas"
      );
    });
};
