import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmitCreatePlantilla = ({
    Opcion_descripcion, Estado_opcion, Orden_opcion
}) => {  
    return userService.CreateOptionsResult(
        Opcion_descripcion, Estado_opcion, Orden_opcion
    ).then(() =>
    {
      Swal.fire({
        title: "¡Correcto!",
        text: "La opcion de resultado se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

Router.push({
        pathname: "/Configuration/OptionsResult/IndexOption"
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
    
          console.log(error, "error al crear la opcion de resultado");
    });

};

export const onSubmitUpdatePlantilla = ({
    Codigo_Opciones,Opcion_descripcion, Estado_opcion, Orden_opcion
}) => {
    return userService.EditOptionsResult(
        Codigo_Opciones,Opcion_descripcion, Estado_opcion, Orden_opcion
    ).then(() =>
    {
      Swal.fire({
        title: "¡Correcto!",
        text: "La opcion de resultado se edito correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

Router.push({
    pathname: "/Configuration/OptionsResult/IndexOption"
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
    
          console.log(error, "error al editar la opcion de resultado");
    });

};

export const getListPlantilla = (cookie,IdOpcion) => {
    return userService.InfoOptionsResult(
        cookie,
        (IdOpcion == null ? "" : IdOpcion)
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
    
          console.log(error, "error al obterner la inforamcion de las opciones de resultado");
    });

};
