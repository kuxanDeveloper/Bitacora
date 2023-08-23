import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const QueryNumber = (cookie, page) => {
  return userService.ListNumberGeneral(cookie, page).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(error, "erro in listado consulta estadisticas");
    return error;
  });
};

export const SubmitCreateNumber = (ListNumber) => {
  return userService
    .CreatNumber(ListNumber)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "Los números se crearon correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Number/IndexNumber",
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

      console.log(error, "error al crear numero");
    });
};

export const QueryEditNumner = (cookie, ID) => {
  return userService
    .GetEditNumber(cookie, ID == null ? "" : ID)
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

      console.log(error, "error al obtener la informacion de numero en editar");
    });
};


export const SubmitEditNumber = (ID, description, Estado) => {
  return userService
    .EditNumber(ID, description, Estado)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El número se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Number/IndexNumber",
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

      console.log(error, "error al editar numero");
    });
};