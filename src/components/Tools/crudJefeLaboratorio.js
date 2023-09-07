import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";


export const onSubmitCreateJefeLab = ({
  DESCRIPCION,
  ESTADO,
  DOCUMENTO,
  INF_ADICIONAL,
}) => {
  return userService
    .CreateJefeLaboratorio(DESCRIPCION, ESTADO, DOCUMENTO, INF_ADICIONAL)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El Jefe de laboratorio se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/JefeLaboratorio/IndexJefe",
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

      console.log(error, "error al crear jefe de laboratorio");
    });
};

export const CreateJefeLabActive = async (
  DESCRIPCION,
  DOCUMENTO,
  setNuvjefe,
  Nuvjefe
) => {

  return userService
    .CreateJefeLaboratorio(DESCRIPCION, "1", DOCUMENTO, "")
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El Jefe de laboratorio se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      setNuvjefe(Nuvjefe + 1);

      document.getElementById("cerrarmodalJefe").click();
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

      console.log(error, "error al crear jefe de laboratorio");
    });
};


export const onSubmitEditJefeLab = ({
  ID,
  DESCRIPCION,
  ESTADO,
  DOCUMENTO,
  INF_ADICIONAL,
}) => {
  return userService
    .EditJefeLaboratorio(ID, DESCRIPCION, ESTADO, DOCUMENTO, INF_ADICIONAL)
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El Jefe de laboratorio se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/JefeLaboratorio/IndexJefe",
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

      console.log(error, "error al editar Jefe de laboratorio");
    });
};

export const GetlistJefeLaboratorio = (cookie, ID, ESTADO, page) => {
  return userService
    .GetlistJefeLaboratorio(
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
        "error al obtener la informacion de jefes de laboratorio"
      );
    });
};
