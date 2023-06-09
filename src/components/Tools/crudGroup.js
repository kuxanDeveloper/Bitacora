import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreateGroup = ({
    NombreGrupo,
    EstadoGrupo,
    AdmiteSufijo,
    AlertaHoras,
    OrdenGrupo,
    ListSufijo
}) => {  
    return userService.CreatGroup(
        NombreGrupo,
        EstadoGrupo,
        AdmiteSufijo,
        AlertaHoras,
        OrdenGrupo,
        ListSufijo
    ).then(() =>
    {
      Swal.fire({
        title: "¡Correcto!",
        text: "El grupo se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

Router.push({
        pathname: "/Configuration/Groups/IndexGroup"
});
    }    
    ).catch((error) => {

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
    
          console.log(error, "error al crear grupo");
    });

};

export const onSubmitUpdateGroup = ({
    IdGrupo,
    NombreGrupo,
    EstadoGrupo,
    AdmiteSufijo,
    AlertaHoras,
    OrdenGrupo
}) => {
    return userService.EditGroup(
        IdGrupo,
        NombreGrupo,
        EstadoGrupo,
        AdmiteSufijo,
        AlertaHoras,
        OrdenGrupo
    ).then(() =>
    {
      Swal.fire({
        title: "¡Correcto!",
        text: "El grupo se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

Router.push({
        pathname: "/Configuration/Groups/IndexGroup"
});
    }    
    ).catch((error) => {

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
    
          console.log(error, "error al editar grupo");
    });

};

export const getListGroup = (estado, idGrupo, cookie) => {
    return userService.InfoGroup(
        (estado == null ? "" : estado), 
        (idGrupo == null ? "" : idGrupo),
        cookie
    ).catch((error) => {

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
    
          console.log(error, "error al editar grupo");
    });

};
