import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitMicroorganismo = ({ DESCRIPCION, ESTADO }) => {
  return userService
    .CreateMicroorganismo(DESCRIPCION, ESTADO)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El microorganismo se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Microorganismos/IndexMicroorganismo",
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

      console.log(error, "error al crear Microorganismos");
    });
};

export const onSubmitUpdateMicroorganismo = ({ ID, DESCRIPCION, ESTADO }) => {
  return userService
    .EditMicroorganismo(ID, DESCRIPCION, ESTADO)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El microorganismo se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Microorganismos/IndexMicroorganismo",
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

      console.log(error, "error al editar Microorganismos");
    });
};

export const getListMicroorganismo = (ID, ESTADO, cookie, page) => {
  return userService
    .GetlistMicroorganismo(
      ID == null ? "" : ID,
      ESTADO == null ? "" : ESTADO,
      cookie,
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

      console.log(error, "error al traer informacion de Microorganismos");
    });
};
