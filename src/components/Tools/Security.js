// import { useRouter } from "next/router";
import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmit = ({ username, password }) => {
  return userService
    .login(username, password)
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
          text: "Porfavor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in login");
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
    console.log(error, "erro in login");
    return error;
  });
};

export const QueryInactivegroup = (cookie) => {
  return userService.ListGroupInactive(cookie).catch((error) => {
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

export const QueryMueForGroup = (cookie, Estado, idGroup) => {
  return userService.ListGroupForMue(cookie, Estado, idGroup).catch((error) => {
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
