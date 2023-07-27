import { userService } from "../../services/UserService";
import Swal from "sweetalert2";

export const GetlistTiposMuestra = (cookie,
    ID,ESTADO) => {
    return userService.GetlistTiposMuestra(
        cookie,
        (ID == null ? "" : ID),
        (ESTADO == null ? "" : ESTADO)
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
    
          console.log(error, "error al obtener la informacion de tipos de muestra");
    });

};

