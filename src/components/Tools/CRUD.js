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
}) => {
  const StickerRetorno = NumSticker;
  debugger;
  return userService
    .CreatSticker(
      NumSticker,
      GrupoSticker,
      ObservaInici,
      UserCheckinter,
      UserCheckexter
    )
    .then(() => {
      debugger;
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

// export const OnSubmitForward = ({ username }) => {
//   Swal.fire({
//     title: "¡Enviado!",
//     text: `Se envio un correo al ${username} para restablecer la contraseña`,
//     icon: "success",
//     confirmButtonText: "Cerrar",
//   });

//   return Router.push({ pathname: "/Account/Login" });

//   // userService
//   //   .login(username, password)
//   //   .then(() => {
//   //     //   const returnUrl = router.query.returnUrl || "/";
//   //     Router.push({ pathname: "/", hash: "Cactive" });
//   //   })
//   //   .catch((error) => {
//   //     if (
//   //       error == "Límite de tiempo excedido" ||
//   //       error == "Usuario o clave incorrectos" ||
//   //       error == "No se pudo hacer el login, revise los datos enviados"
//   //     ) {
//   //       Swal.fire({
//   //         title: "¡Advertencia!",
//   //         text: error,
//   //         icon: "warning",
//   //         confirmButtonText: "Cerrar",
//   //       });
//   //     } else {
//   //       Swal.fire({
//   //         title: "¡Ha ocurrido un error!",
//   //         text: "Porfavor comunicarse con soporte técnico",
//   //         icon: "error",
//   //         confirmButtonText: "Cerrar",
//   //       });
//   //     }

//   //     console.log(error, "erro in login");
//   //   });
// };

// export const queryListUserAll = (cookie) => {
//   return userService.listUserGetAll(cookie).catch((error) => {
//     if (error == "401: Token incorrecto o vencido") {
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
//     console.log(error, "erro in Listado Usuario");
//     return error;
//   });
// };

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

// export const QueryInactivegroup = (cookie) => {
//   return userService.ListGroupInactive(cookie).catch((error) => {
//     if (error == "401: Token incorrecto o vencido") {
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

//     console.log(error, "erro in inactive grupo linea ");
//     return error;
//   });
// };

// export const QueryGroupList = (cookie, estado) => {
//   return userService.ListGroup(cookie, estado).catch((error) => {
//     if (error == "401: Token incorrecto o vencido") {
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
//     return error;
//   });
// };

// export const QueryMueForGroup = (
//   cookie,
//   Estado,
//   idGroup,
//   Numstiker,
//   DateAdmission,
//   result,
//   URS
// ) => {
//   return userService
//     .ListGroupForMue(
//       cookie,
//       Estado,
//       idGroup,
//       Numstiker,
//       DateAdmission,
//       result,
//       URS
//     )
//     .catch((error) => {
//       if (error == "401: Token incorrecto o vencido") {
//         Swal.fire({
//           title: "¡Advertencia!",
//           text: error,
//           icon: "warning",
//           confirmButtonText: "Cerrar",
//         });
//       } else {
//         Swal.fire({
//           title: "¡Ha ocurrido un error!",
//           text: "Porfavor comunicarse con soporte técnico",
//           icon: "error",
//           confirmButtonText: "Cerrar",
//         });
//       }

//       console.log(error, "erro in login");
//       return error;
//     });
// };

// export const QueryMuestraEdit = (cookie, idSticker) => {
//   return userService.InfoSample(cookie, idSticker).catch((error) => {
//     if (error == "401: Token incorrecto o vencido") {
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
//     return error;
//   });
// };
