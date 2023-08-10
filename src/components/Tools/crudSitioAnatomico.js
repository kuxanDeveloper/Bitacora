import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreateSitioAnat = ({ DESCRIPCION, ESTADO }) => {
  return userService
    .CreateSitioAnatomico(DESCRIPCION, ESTADO)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El Sitio anatomico se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/SitioAnatomico/IndexSitio",
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

      console.log(error, "error al crear Sitio anatomico");
    });
};

export const onSubmitEditSitioAnat = ({ ID, DESCRIPCION, ESTADO }) => {
  return userService
    .EditSitioAnatomico(ID, DESCRIPCION, ESTADO)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El Sitio anatomico se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/SitioAnatomico/IndexSitio",
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

      console.log(error, "error al editar Sitio anatomico");
    });
};

export const GetlistSitiosAnatomicos = (cookie, ID, ESTADO, page) => {
  return userService
    .GetlistSitiosAnatomicos(
      cookie,
      ID == null ? "" : ID,
      ESTADO == null ? "" : ESTADO,
      page
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
        "error al obtener la informacion de sitios anatomicos"
      );
    });
};
