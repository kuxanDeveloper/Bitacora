import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreateAncestro = ({
  nombre_Ancestro,
  Estado_Ancestro,
  Orden_ancestro,
  Lst_grupos,
}) => {
  return userService
    .CreateAncestro(
      nombre_Ancestro,
      Estado_Ancestro,
      Orden_ancestro,
      Lst_grupos
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El grupo principal se creo satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Ancestros/IndexAncestros",
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

      console.log(error, "error al crear el ancestro");
    });
};

export const onSubmitUpdateAncestro = ({
  COD_ANCESTRO,
  nombre_Ancestro,
  Estado_Ancestro,
  Orden_ancestro,
  Lst_grupos,
}) => {
  return userService
    .EditAncestro(
      COD_ANCESTRO,
      nombre_Ancestro,
      Estado_Ancestro,
      Orden_ancestro,
      Lst_grupos
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El grupo principal se edito satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Ancestros/IndexAncestros",
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

      console.log(error, "error al editar el ancestro");
    });
};

export const GetlistAncestro = (cookie, COD_ANCESTRO, page) => {
  return userService
    .GetlistAncestro(cookie, COD_ANCESTRO == null ? "" : COD_ANCESTRO, page)
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

      console.log(error, "error al obterner la informacion de ancestro");
    });
};

export const getInfoGruposXAncestro = (cookie, COD_ANCESTRO) => {
  return userService
    .GetlistGruposXAncestro(cookie, COD_ANCESTRO == null ? "" : COD_ANCESTRO)
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

      console.log(error, "error al obtener la inforamcion de grupo X ancestro");
    });
};
