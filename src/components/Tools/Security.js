// import { useRouter } from "next/router";
import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmit = ({ username, password }) => {


  return userService
    .login(username, password)
    .then(() => {
      //   const returnUrl = router.query.returnUrl || "/";
      Router.push("/");
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
