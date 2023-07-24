import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreate = ({
  NumSticker,
  GrupoSticker,
  ObservaInici,
  // estado,
  // UserCheckinter,
  // UserCheckexter,
  file,
  file2,
  Sufijo,
}) => {
  const StickerRetorno = NumSticker;
  return userService
    .CreatSticker(
      NumSticker,
      GrupoSticker,
      ObservaInici,
      // UserCheckinter,
      // UserCheckexter,
      file,
      file2,
      Sufijo
    )
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push({
        pathname: "/[id]",
        query: { id: GrupoSticker },
        hash: "Cactive#OverallSample",
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
  // UserCheckinter,
  // UserCheckexter,
  file,
  file2,
  Cod_Imagen1,
  Cod_Imagen2,
  COD_BITACORA,
  Sufijo,
}) => {
  const StickerRetorno = COD_BITACORA;
  return userService
    .EditSticker(
      NumSticker,
      GrupoSticker,
      ObservaInici,
      // UserCheckinter,
      // UserCheckexter,
      file,
      file2,
      Cod_Imagen1,
      Cod_Imagen2,
      COD_BITACORA,
      Sufijo
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

export const QueryActivegroup = (cookie,idAncestro) => {
  return userService.ListGroupActive(cookie,idAncestro).catch((error) => {
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
  Codigo_opcion,
  COD_BITACORA,
}) => {
  const StickerRetorno = COD_BITACORA;
  return userService
    .CrearResult(
      Codigo_prueba,
      Codigo_resultado_preliminar_1,
      Codigo_opcion,
      COD_BITACORA
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

export const onSubmitEditResult = ({
  Codigo_resultado_bitacora,
  Codigo_prueba,
  Codigo_resultado_preliminar_1,
  Codigo_opcion,
  COD_BITACORA,
}) => {
  const StickerRetorno = COD_BITACORA;
  return userService
    .EditResult(
      Codigo_prueba,
      Codigo_resultado_preliminar_1,
      Codigo_opcion,
      Codigo_resultado_bitacora
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

      console.log(error, "erro in editar resultado");
    });
};

export const onSubmitCreateNote = ({
  Observaciones_detalle,
  file,
  COD_BITACORA,
}) => {
  const StickerRetorno = COD_BITACORA;
  return userService
    .CrearNote(Observaciones_detalle, file, COD_BITACORA)
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

export const onSubmitUpdateNote = (
  codigo_detalle_bitacora,
  Cod_Imagen1,
  Observaciones_detalle,
  CODIGO_BITACORA,
  file
) => {
  return userService
    .UpdateNote(
      codigo_detalle_bitacora,
      Cod_Imagen1,
      Observaciones_detalle,
      file
    )
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push({
        pathname: "/Sample/FullDetails/[id]",
        query: { id: CODIGO_BITACORA },
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
