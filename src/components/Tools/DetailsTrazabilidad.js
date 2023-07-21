import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const getListTrazaBitacora = (
  cookie,
  Fecha_inicial,
  Fecha_final,
  Numero_sticker,
  Sufijo,
  usuario_Traza,
  page
) => {
  return userService
    .InfoTrazabilidadBitacora(
      cookie,
      Fecha_inicial == null ? "" : Fecha_inicial,
      Fecha_final == null ? "" : Fecha_final,
      Numero_sticker == null ? "" : Numero_sticker,
      Sufijo == null ? "" : Sufijo,
      usuario_Traza == null ? "" : usuario_Traza,
      page == null ? "" : page
    )
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

      console.log(
        error,
        "error al traer informacion de la trazabilidad de las bitacoras"
      );
    });
};

export const getListTrazaTablas = (
  cookie,
  Fecha_inicial,
  Fecha_final,
  Tipo_tabla,
  usuario_Traza,
  page
) => {
  return userService
    .InfoTrazabilidadTablas(
      cookie,
      Fecha_inicial == null ? "" : Fecha_inicial,
      Fecha_final == null ? "" : Fecha_final,
      Tipo_tabla == null ? "" : Tipo_tabla,
      usuario_Traza == null ? "" : usuario_Traza,
      page == null ? "" : page
    )
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

      console.log(
        error,
        "error al traer informacion de la trazabilidad de las tablas"
      );
    });
};

export const getExportToExcelBitacora = (
  typeTraza,
  Fecha_inicial,
  Fecha_final,
  Numero_sticker,
  Sufijo,
  usuario_Traza,
  tipo_tabla
) => {
  return userService
    .ExportcsvTrazabilidadBitacora(
      typeTraza,
      Fecha_inicial == null ? "" : Fecha_inicial,
      Fecha_final == null ? "" : Fecha_final,
      Numero_sticker == null ? "" : Numero_sticker,
      Sufijo == null ? "" : Sufijo,
      usuario_Traza == null ? "" : usuario_Traza,
      tipo_tabla
    )
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

      console.log(
        error,
        "error al exportar archivo csv excel en bitacora"
      );
    });
};
