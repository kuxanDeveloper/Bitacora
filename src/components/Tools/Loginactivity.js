import { userService } from "../../services/UserService";
import Swal from "sweetalert2";



export const initLogInactive = () => {
  let t;
  document.onkeypress = reiniciarTiempo;
  document.onload = reiniciarTiempo;
  // document.onmousemove = reiniciarTiempo;
  // document.onmousedown = reiniciarTiempo; // aplica para una pantalla touch
  document.ontouchstart = reiniciarTiempo;
  document.onclick = reiniciarTiempo; // aplica para un clic del touchpad
  document.onscroll = reiniciarTiempo; // navegando con flechas del teclado
  document.ondblclick = reiniciarTiempo;
  document.onresize = reiniciarTiempo;
  // document.onmouseup = reiniciarTiempo;
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
        clearInterval(t);
        t="";
      },
    }).then((result) => {
      if (result.isConfirmed) {
        reiniciarTiempo;
        clearInterval(timerInterval);
        clearInterval(t);
        t="";
      } else if (result.dismiss === Swal.DismissReason.timer) {
        clearInterval(timerInterval);
        clearInterval(t);
        t="";
        document.onkeypress = "";
        document.onload = "";
        document.ontouchstart = "";
        document.onclick = ""; // aplica para un clic del touchpad
        document.onscroll = ""; // navegando con flechas del teclado
        document.ondblclick = "";
        document.onresize = "";
        document.onchange = "";
        document.onsubmit = "";
      
        /* Read more about handling dismissals below */
        userService.logout();
      }
    });
  }

  function reiniciarTiempo() {
    clearInterval(t);
    t="";
    t = setInterval(tiempoExcedido, 15 * 60 * 1000);
    // 1000 milisegundos = 1 segundo
  }
};
