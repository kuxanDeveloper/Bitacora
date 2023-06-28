import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const getListUsers = (cookie,IdUser) => {
    return userService.InfoSampleUsers(
        cookie,
        (IdUser == null ? "" : IdUser)
    ).catch((error) => {
  
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