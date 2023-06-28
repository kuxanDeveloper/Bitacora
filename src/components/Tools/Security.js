// import { useRouter } from "next/router";
import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmit = ({ username, pass }) => {
  return userService
    .login(username, pass)
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push({ pathname: "/", hash: "Cactive" });
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
          text: "Porfavor comunicarse con soporte técnico" + error,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in login");
    });
};

export const OnSubmitForward = ({ username }) => {
  Swal.fire({
    title: "¡Enviado!",
    text: `Se envio un correo al ${username} para restablecer la contraseña`,
    icon: "success",
    confirmButtonText: "Cerrar",
  });

  return Router.push({ pathname: "/account/Login" });

  // userService
  //   .login(username, password)
  //   .then(() => {
  //     //   const returnUrl = router.query.returnUrl || "/";
  //     Router.push({ pathname: "/", hash: "Cactive" });
  //   })
  //   .catch((error) => {
  //     if (
  //       error == "Límite de tiempo excedido" ||
  //       error == "Usuario o clave incorrectos" ||
  //       error == "No se pudo hacer el login, revise los datos enviados"
  //     ) {
  //       Swal.fire({
  //         title: "¡Advertencia!",
  //         text: error,
  //         icon: "warning",
  //         confirmButtonText: "Cerrar",
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "¡Ha ocurrido un error!",
  //         text: "Porfavor comunicarse con soporte técnico",
  //         icon: "error",
  //         confirmButtonText: "Cerrar",
  //       });
  //     }

  //     console.log(error, "erro in login");
  //   });
};

export const QueryActiveInactivegroup_GetUsers = (cookie) => {
  return userService
    .ListGroupActiveeInactive_ListUsers(cookie)
    .catch((error) => {
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
      console.log(error, "erro in Listado grupo y usuarios");
      return null;
    });
};

export const queryListUserAll = (cookie) => {
  return userService.listUserGetAll(cookie).catch((error) => {
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
    console.log(error, "erro in Listado Usuario");
    return null;
  });
};

export const QueryGroupList = (cookie, estado) => {
  return userService.ListGroup(cookie, estado).catch((error) => {
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

    console.log(error, "erro in login");
    return error;
  });
};

export const QueryMueForGroup = (
  cookie,
  Estado,
  idGroup,
  Numstiker,
  DateAdmission,
  result,
  URS,
  Cod_sticker
) => {
  return userService
    .ListGroupForMue(
      cookie,
      Estado,
      idGroup,
      Numstiker,
      DateAdmission,
      result,
      URS,
      Cod_sticker
    )
    .catch((error) => {
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

      console.log(error, "erro in active grupo");
      return error;
    });
};

export const QueryMuestraEdit = (cookie, idSticker) => {
  return userService.InfoSample(cookie, idSticker).catch((error) => {
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

    console.log(error, "erro in muestra edit");
    return error;
  });
};

export const queryTestListxGroup = (cookie, idGroup, idBitacora) => {
  return userService.ListTests(cookie, idGroup, idBitacora).catch((error) => {
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

    console.log(error, "erro in listado de prueba grupo");
    return error;
  });
};

export const queryResultListxTests = (cookie, idPrueba, idBitacora) => {
  return userService
    .ListResults(cookie, idPrueba, idBitacora)
    .catch((error) => {
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

      console.log(error, "erro in login");
      return error;
    });
};

export const queryOptionesListxPlantilla = (cookie, idPlantilla) => {
  return userService.ListoptionPlantilla(cookie, idPlantilla).catch((error) => {
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

    console.log(error, "erro in optionesPlantilla");
    return error;
  });
};

export const QueryNoteEdit = (cookie, idNote) => {
  return userService.InfoSampleNote(cookie, idNote).catch((error) => {
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

    console.log(error, "erro in editar nota");
    return error;
  });
};

export const queryInfoEditResult = (cookie, idResult) => {
  return userService.InfoSampleResult(cookie, idResult).catch((error) => {
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

    console.log(error, "erro in editar resultado");
    return error;
  });
};

export const QueryCloseCaseSample = (id, observacionCaso, Estado) => {
  return userService
    .CloseCaseSample(id, observacionCaso, Estado)
    .catch((error) => {

      console.log(error, "erro in editar resultado");
      return Swal.showValidationMessage(`Request failed: ${error}`);
    });
};

export const QueryObserva = (cookie) => {
  return userService.lstObservall(cookie).catch((error) => {
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
    console.log(error, "erro in Listado observaciones");
    return null;
  });
};
