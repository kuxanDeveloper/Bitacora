import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
export const initLogInactive = () => {
  var t;
  document.onkeypress = reiniciarTiempo;
  document.onload = reiniciarTiempo;
  document.onmousemove = reiniciarTiempo;
  document.onmousedown = reiniciarTiempo; // aplica para una pantalla touch
  document.ontouchstart = reiniciarTiempo;
  document.onclick = reiniciarTiempo; // aplica para un clic del touchpad
  document.onscroll = reiniciarTiempo; // navegando con flechas del teclado
  document.ondblclick = reiniciarTiempo;
  document.onresize = reiniciarTiempo;
  document.onmouseup = reiniciarTiempo;
  document.onmouseenter = reiniciarTiempo;
  document.onchange = reiniciarTiempo;
  document.onsubmit = reiniciarTiempo;

  function tiempoExcedido() {
    let timerInterval;
    Swal.fire({
      showConfirmButton: true,
      icon: "warning",
      confirmButtonText: "Seguir...",
      title: "Usuario inactivo",
      html: "La sesión se cerrara en <b>60</b>",
      timer: 60000,
      timerProgressBar: true,
      didOpen: () => {
        // Swal.showLoading();
        let segundo = 60;
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          if (segundo > 0) segundo--;
          b.textContent = segundo;
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        reiniciarTiempo;
      } else if (result.dismiss === Swal.DismissReason.timer) {
        /* Read more about handling dismissals below */
        userService.logout();
      }
    });
  }

  function reiniciarTiempo() {
    clearTimeout(t);
    t = setTimeout(tiempoExcedido, 900000);
    // 1000 milisegundos = 1 segundo
  }
};
