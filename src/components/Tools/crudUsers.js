import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreateUser = ({
  Email,
  NumIdentidad,
  TipoIdentidad,
  Nombres,
  Apellidos,
  Password,
  Celular,
  Rol,
  Telefono,
  Extencion,
  EstadoUsuario,
  ListGroupArray,
}) => {
  return userService
    .CreateUser(
      Email,
      NumIdentidad,
      TipoIdentidad,
      Nombres,
      Apellidos,
      Password,
      Celular == null ? "" : Celular,
      Rol,
      Telefono == null ? "" : Telefono,
      Extencion == null ? "" : Extencion,
      EstadoUsuario,
      ListGroupArray
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El usuario se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Users/IndexUsers",
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

      console.log(error, "error al crear usuario");
    });
};

export const onSubmitCreateEdit = ({
  Id_Usuario,
  Email,
  NumIdentidad,
  TipoIdentidad,
  Nombres,
  Apellidos,
  Celular,
  Rol,
  Telefono,
  Extencion,
  EstadoUsuario,
  ListGroupArray,
}) => {
  return userService
    .EditUser(
      Id_Usuario,
      Email,
      NumIdentidad,
      TipoIdentidad,
      Nombres,
      Apellidos,
      Celular == null ? "" : Celular,
      Rol,
      Telefono == null ? "" : Telefono,
      Extencion == null ? "" : Extencion,
      EstadoUsuario,
      ListGroupArray
    )
    .then(() => {
      Swal.fire({
        title: "¡Correcto!",
        text: "El usuario se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Users/IndexUsers",
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

      console.log(error, "error al editar usuario");
    });
};

export const getListUsers = (cookie, IdUser, page) => {
  return userService
    .InfoSampleUsers(cookie, IdUser == null ? "" : IdUser, page)
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

      console.log(error, "error al traer informacion usuario");
    });
};

export const getListRoles = (cookie) => {
  return userService.InfoSampleRoles(cookie).catch((error) => {
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

    console.log(error, "error al traer informacion roles");
  });
};

export const getListTiposIdentificacion = (cookie) => {
  return userService.InfoSampleTips(cookie).catch((error) => {
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

    console.log(error, "error al traer informacion de tipos de identificacion");
  });
};

export const onSubmitChangePassword = (CurrentPassword, NewPassword) => {
  return userService
    .ChangePasswordUser(CurrentPassword, NewPassword)
    .then(() => {
      Swal.fire({
        title: "Contraseña!",
        text: "cambio de contraseña exitoso",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push("/#Cactive");
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

      console.log(error, "error al cambiar contraseña de usuario");
    });
};

export const onSubmitChangePasswordAdmin = (
  CurrentPassword,
  NewPassword,
  Iduser
) => {
  return userService
    .ChangePasswordAdmin(CurrentPassword, NewPassword, Iduser)
    .then(() => {
      Swal.fire({
        title: "Contraseña!",
        text: "cambio de contraseña exitoso",
        icon: "success",
        confirmButtonText: "Ok",
      });

      Router.push({
        pathname: "/Configuration/Users/IndexUsers",
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

      console.log(error, "error al cambiar contraseña administrador");
    });
};

export const getListGroupAndUserxGroup = (cookie, IdUser) => {
  return userService.InfoGroupAndUserxGroup(cookie, IdUser).catch((error) => {
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

    console.log(error, "error al traer Listado grupo y grupos por usuarios");
  });
};
