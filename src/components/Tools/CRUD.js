import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreate = ({
  NumSticker,
  GrupoSticker,
  ObservaInici,
  // estado,
  UserCheckinter,
  UserCheckexter,
  file,
  file2
}) => {
  const StickerRetorno = NumSticker;
  return userService
    .CreatSticker(
      NumSticker,
      GrupoSticker,
      ObservaInici,
      UserCheckinter,
      UserCheckexter,
      file,
      file2
    )
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push({
        pathname: "/Sample/FullDetails/[id]",
        query: { id: StickerRetorno },
        hash: "#Pruebas",
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

      console.log(error, "erro in crear");
    });
};

export const onSubmitUpdate = ({
  NumSticker,
  GrupoSticker,
  ObservaInici,
  UserCheckinter,
  UserCheckexter,
  file,
  file2,
  Cod_Imagen1,
  Cod_Imagen2
}) => {
  const StickerRetorno = NumSticker;
  debugger;
  return userService
    .EditSticker(
      NumSticker,
      GrupoSticker,
      ObservaInici,
      UserCheckinter,
      UserCheckexter,
      file,
      file2,
      Cod_Imagen1,
      Cod_Imagen2
    )
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push({
        pathname: "/Sample/FullDetails/[id]",
        query: { id: StickerRetorno },
        hash: "#Pruebas",
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

      console.log(error, "erro in editar sticker");
    });
};

export const QueryActivegroup = (cookie) => {
  return userService.ListGroupActive(cookie).catch((error) => {
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
        text: "Porfavor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in Activo grupo");
    return error;
  });
};

export const onSubmitCreateResult = ({
  Codigo_prueba,
  Codigo_resultado_preliminar_1,
  Codigo_resultado_preliminar_2,
  Codigo_resultado_preliminar_3,
  Codigo_resultado_final,
  NumSticker,
}) => {
  const StickerRetorno = NumSticker;
  return userService
    .CrearResult(
      Codigo_prueba,
      Codigo_resultado_preliminar_1,
      Codigo_resultado_preliminar_2,
      Codigo_resultado_preliminar_3,
      Codigo_resultado_final,
      NumSticker
    )
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push({
        pathname: "/Sample/FullDetails/[id]",
        query: { id: StickerRetorno },
        hash: "Pruebas",
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

      console.log(error, "erro in crear resultado");
    });
};

export const onSubmitCreateNote = ({ Observaciones_detalle, NumSticker, file }) => {
  const StickerRetorno = NumSticker;
  return userService
    .CrearNote(Observaciones_detalle, NumSticker, file)
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push({
        pathname: "/Sample/FullDetails/[id]",
        query: { id: StickerRetorno },
        hash: "Notas",
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

      console.log(error, "erro in crear nota");
    });
};
