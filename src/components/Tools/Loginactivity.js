import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
let t = null;
export const initLogInactive = () => {
  document.onkeypress = reiniciarTiempo;
  window.onload = reiniciarTiempo;
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
};

function tiempoExcedido(interval) {
  let timerInterval = null;
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
      t = null;
      clearInterval(interval);
      let dateNowRegisterLocals = new Date();
      localStorage.setItem("dateLogin", dateNowRegisterLocals);
      reiniciarTiempo;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      clearInterval(interval);
      t = null;
      let dateNowRegisterLocals = new Date();
      localStorage.setItem("dateLogin", dateNowRegisterLocals);
      reiniciarTiempo;
    } else if (result.dismiss === Swal.DismissReason.timer) {
      clearInterval(interval);
      t = null;
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
  let interval = null;
  let dateLogin = localStorage.getItem("dateLogin");
  let TpExce = false;
  if (dateLogin != null && dateLogin != undefined) {
    let dateNowRegisterLocals = new Date();
    localStorage.setItem("dateLogin", dateNowRegisterLocals);
    interval = setInterval(() => {
      let dateNow = new Date();
      dateLogin = localStorage.getItem("dateLogin");
      if (dateLogin != undefined && dateLogin != null) {
        let dateCast = new Date(dateLogin);
        const hoursDifferent = dateNow.getTime() - dateCast.getTime();

        let Minutodiferencia = Math.round(hoursDifferent / 1000 / 60);

        if (Minutodiferencia > 20 && !TpExce) {
          tiempoExcedido(interval);
          TpExce = true;
        }
      } else {
        clearInterval(interval);
      }
    }, 60000);
  } else {
    clearInterval(t);
    t = null;
  }

  // 1000 milisegundos = 1 segundo
}
