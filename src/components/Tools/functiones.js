import { set } from "react-hook-form";
import Swal from "sweetalert2";
Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};

const fechaformatActualGeneralUrgencia = (Fecha, DaysMore) => {
  let d = new Date(Fecha).addDays(DaysMore);

  return d.getTime();
};

// export const UserInternosActive = (query) => {
//   let RetornoQuery = [];
//   if (query != null && query != undefined) {
//     RetornoQuery = query.filter(
//       (data) => data.CLIENTE_INTERNO == true && data.CLIENTE_EXTERNO == false
//     );
//   }
//   return RetornoQuery;
// };

// export const UserExternosActive = (query) => {
//   let RetornoQuery = [];
//   if (query != null && query != undefined) {
//     RetornoQuery = query.filter(
//       (data) => data.CLIENTE_EXTERNO == true && data.CLIENTE_INTERNO == false
//     );
//   }
//   return RetornoQuery;
// };

// export const UserInternosInactive = (query) => {
//   let RetornoQuery = [];
//   if (query != null && query != undefined) {
//     RetornoQuery = query.filter(
//       (data) => data.CLIENTE_INTERNO == true && data.CLIENTE_EXTERNO == false
//     );
//   }
//   return RetornoQuery;
// };

// export const UserExternosInactive = (query) => {
//   let RetornoQuery = [];
//   if (query != null && query != undefined) {
//     RetornoQuery = query.filter(
//       (data) => data.CLIENTE_EXTERNO == true && data.CLIENTE_INTERNO == false
//     );
//   }
//   return RetornoQuery;
// };

//Muestras generales y Urgencias
// export const UserInternosActiveGenerales = (query) => {
//   let ListadoNewRetorno = [];
//   let fechaActual = new Date();
//   query.forEach((element) => {
//     let FechaRegistro = fechaformatActualGeneralUrgencia(
//       element.FECHA_ORIGINAL_CREADO_BITACORA,
//       element.DIAS_PARA_ALERTA_GRUPO == undefined &&
//         element.DIAS_PARA_ALERTA_GRUPO == null
//         ? 0
//         : element.DIAS_PARA_ALERTA_GRUPO
//     );
//     let diferencia = fechaActual.getTime() - FechaRegistro;
//     let diasDeDiferencia = diferencia / 1000 / 60 / 60 / 24;
//     ////todavia no ha superado los dias permitidos por ende los diferencias de dias debe ser negativo
//     if (diasDeDiferencia < 0) {
//       ListadoNewRetorno.push(element);
//     }
//     // if ()
//     // ListadoNewRetorno.push
//   });
//   return ListadoNewRetorno;
// };

// export const UserInternosActiveUrgencias = (query) => {
//   let fechaActual = new Date();
//   let ListadoNewRetorno = [];
//   query.forEach((element) => {
//     let FechaRegistro = fechaformatActualGeneralUrgencia(
//       element.FECHA_ORIGINAL_CREADO_BITACORA,
//       element.DIAS_PARA_ALERTA_GRUPO == undefined &&
//         element.DIAS_PARA_ALERTA_GRUPO == null
//         ? 0
//         : element.DIAS_PARA_ALERTA_GRUPO
//     );
//     let diferencia = fechaActual.getTime() - FechaRegistro;
//     let diasDeDiferencia = Math.round(diferencia / 1000 / 60 / 60 / 24);
//     ////ya supero los dias para colocar en orden de urgencia y los dias que de son los dias que va sumando y pasando en urgencia
//     if (diasDeDiferencia >= 0) {
//       ListadoNewRetorno.push(element);
//     }

//     // if ()
//     // ListadoNewRetorno.push
//   });
//   return ListadoNewRetorno;
// };

// export const UserExternosActiveGenerales = (query) => {
//   let ListadoNewRetorno = [];
//   let fechaActual = new Date();
//   query.forEach((element) => {
//     let FechaRegistro = fechaformatActualGeneralUrgencia(
//       element.FECHA_ORIGINAL_CREADO_BITACORA,
//       element.DIAS_PARA_ALERTA_GRUPO == undefined &&
//         element.DIAS_PARA_ALERTA_GRUPO == null
//         ? 0
//         : element.DIAS_PARA_ALERTA_GRUPO
//     );
//     let diferencia = fechaActual.getTime() - FechaRegistro;
//     let diasDeDiferencia = diferencia / 1000 / 60 / 60 / 24;
//     ////todavia no ha superado los dias permitidos por ende los diferencias de dias debe ser negativo
//     if (diasDeDiferencia < 0) {
//       ListadoNewRetorno.push(element);
//     }
//     // if ()
//     // ListadoNewRetorno.push
//   });
//   return ListadoNewRetorno;
// };

// export const UserExternosActiveUrgencias = (query) => {
//   let fechaActual = new Date();
//   let ListadoNewRetorno = [];
//   query.forEach((element) => {
//     let FechaRegistro = fechaformatActualGeneralUrgencia(
//       element.FECHA_ORIGINAL_CREADO_BITACORA,
//       element.DIAS_PARA_ALERTA_GRUPO == undefined &&
//         element.DIAS_PARA_ALERTA_GRUPO == null
//         ? 0
//         : element.DIAS_PARA_ALERTA_GRUPO
//     );
//     let diferencia = fechaActual.getTime() - FechaRegistro;
//     let diasDeDiferencia = Math.round(diferencia / 1000 / 60 / 60 / 24);
//     ////ya supero los dias para colocar en orden de urgencia y los dias que de son los dias que va sumando y pasando en urgencia
//     if (diasDeDiferencia >= 0) {
//       ListadoNewRetorno.push(element);
//     }

//     // if ()
//     // ListadoNewRetorno.push
//   });
//   return ListadoNewRetorno;
// };

export const UserActiveGenerales = (query) => {
  let ListadoNewRetorno = [];
  let fechaActual = new Date();

  if (query != null && query != undefined) {
    query.forEach((element) => {
      let FechaRegistro = fechaformatActualGeneralUrgencia(
        element.FECHA_ORIGINAL_CREADO_BITACORA,
        element.DIAS_PARA_ALERTA_GRUPO == undefined &&
          element.DIAS_PARA_ALERTA_GRUPO == null
          ? 0
          : element.DIAS_PARA_ALERTA_GRUPO
      );
      let diferencia = fechaActual.getTime() - FechaRegistro;
      let diasDeDiferencia = diferencia / 1000 / 60 / 60 / 24;
      ////todavia no ha superado los dias permitidos por ende los diferencias de dias debe ser negativo
      if (diasDeDiferencia < 0) {
        ListadoNewRetorno.push(element);
      }
    });
  }
  return ListadoNewRetorno;
};

export const UserActiveUrgencias = (query) => {
  let ListadoNewRetorno = [];
  let fechaActual = new Date();

  if (query != null && query != undefined) {
    query.forEach((element) => {
      let FechaRegistro = fechaformatActualGeneralUrgencia(
        element.FECHA_ORIGINAL_CREADO_BITACORA,
        element.DIAS_PARA_ALERTA_GRUPO == undefined &&
          element.DIAS_PARA_ALERTA_GRUPO == null
          ? 0
          : element.DIAS_PARA_ALERTA_GRUPO
      );
      let diferencia = fechaActual.getTime() - FechaRegistro;
      let diasDeDiferencia = Math.round(diferencia / 1000 / 60 / 60 / 24);
      ////ya supero los dias para colocar en orden de urgencia y los dias que de son los dias que va sumando y pasando en urgencia
      if (diasDeDiferencia >= 0) {
        ListadoNewRetorno.push(element);
      }
    });
  }

  return ListadoNewRetorno;
};

export const backhistory = () => {
  window.history.back();
};

export const FilterQuerySearch = (
  event,
  router,
  id,
  Numstiker,
  DateAdmission,
  result,
  URS,
  CasosActivo_Inactivos
) => {
  event.preventDefault();

  if (Numstiker == "" && DateAdmission == "" && result == "" && URS == "") {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe indicar el valor de algunos de los filtros disponible para realizar la búsqueda avanzada",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  router.push({
    pathname: `/[id]`,
    query: {
      id: id,
      Numstiker: Numstiker,
      DateAdmission: DateAdmission,
      result: result,
      URS: URS,
    },
  });
};

export const ClearFilter = (e, router, idGrupo) => {
  e.preventDefault();
  let urlHref = window.location.href;
  let hashs2 = urlHref.split("#")[1];
  // let hashs3 = urlHref.split("#")[2];
  let hashs4 = urlHref.split("#")[2];
  if (router.pathname === "/") {
    router.push({ pathname: router.pathname, hash: `${hashs2}` });
  } else {
    router.push({
      pathname: router.pathname,
      query: { id: idGrupo },
      hash: `${hashs2}#${hashs4}`,
    });
  }
};

export const OnclickNAvToggle = (MenuShow, setMenuShow) => {
  if (MenuShow) {
    setMenuShow(false);
  } else {
    setMenuShow(true);
  }
};

export const EstadoFunction = (InforSampleDetails) => {
  if (
    InforSampleDetails.infoBitacora != null &&
    InforSampleDetails.infoBitacora != undefined
  ) {
    return InforSampleDetails.infoBitacora[0].ESTADO_STICKER;
  }
};

export const OnclickComboEstadoCase = (
  value,
  router,
  hrefarmado,
  // isUserInterno,
  isSampleGeneral
) => {
  if (value.toLowerCase() === "true") {
    if (hrefarmado.query != undefined && hrefarmado.query != null) {
      router.push({
        pathname: hrefarmado.pathname,
        query: hrefarmado.query,
        hash: `Cactive${isSampleGeneral ? "#OverallSample" : "#UrgentSamples"}`,
      });
    } else {
      router.push({ pathname: hrefarmado.pathname, hash: "Cactive" });
    }
  } else {
    if (hrefarmado.query != undefined && hrefarmado.query != null) {
      router.push({
        pathname: hrefarmado.pathname,
        query: hrefarmado.query,
        hash: `Cinactvie${
          isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
        }`,
      });
    } else {
      router.push({ pathname: hrefarmado.pathname, hash: "Cactive" });
    }
  }
};

export const onclickPruebaTarget = () => {
  document.getElementById("Codigo_resultado_preliminar_1").value = "";
  document.getElementById("Codigo_resultado_preliminar_2").value = "";
  document.getElementById("Codigo_resultado_preliminar_3").value = "";
  document.getElementById("Codigo_resultado_final").value = "";
};

// export const setCheckinvalue = (setValue) => {
//   var checbox1 = document.getElementById("UserCheckinter");
//   var checbox2 = document.getElementById("UserCheckexter");

//   if (
//     (checbox1.checked != null &&
//       checbox1.checked != undefined &&
//       checbox1.checked != false) ||
//     (checbox2.checked != null &&
//       checbox2.checked != undefined &&
//       checbox2.checked != false)
//   ) {
//     if (
//       checbox1.checked == null ||
//       checbox1.checked == undefined ||
//       checbox1.checked == false
//     ) {
//       setValue("UserCheckinter", "0");
//     } else {
//       setValue("UserCheckinter", "1");
//     }

//     if (
//       checbox2.checked == null ||
//       checbox2.checked == undefined ||
//       checbox2.checked == false
//     ) {
//       setValue("UserCheckexter", "0");
//     } else {
//       setValue("UserCheckexter", "1");
//     }
//   }
// };

export const setCheckindividual = (setValue) => {
  var checbox1 = document.getElementById("EstadoGrupo");

    if (
      checbox1.checked == null ||
      checbox1.checked == undefined ||
      checbox1.checked == false
    ) {
      setValue("EstadoGrupo", "0");
    } else {
      setValue("EstadoGrupo", "1");
    }

};

export const setImagenFile = (ValueImagesrc, ValueImagesrc2, setValue) => {
  setValue("file", ValueImagesrc);
  setValue("file2", ValueImagesrc2);
};

export const setImagenFileUpdate = (
  ValueImagesrc,
  ValueImagesrc2,
  setValue,
  cod_imagen1,
  cod_imagen2
) => {
  setValue("file", ValueImagesrc);
  setValue("file2", ValueImagesrc2);

  if (ValueImagesrc != null) {
    if (cod_imagen1 != null) {
      setValue("Cod_Imagen1", cod_imagen1);
    } else {
      setValue("Cod_Imagen1", "");
    }
  } else {
    setValue("Cod_Imagen1", "");
  }

  if (ValueImagesrc2 != null) {
    if (cod_imagen2 != null) {
      setValue("Cod_Imagen2", cod_imagen2);
    } else {
      setValue("Cod_Imagen2", "");
    }
  } else {
    setValue("Cod_Imagen2", "");
  }
};

export const setImagenfileUpdateNote = (
  ValueImagesrc,
  setValue,
  Cod_Imagen1
) => {
  setValue("file", ValueImagesrc);

  if (ValueImagesrc != null) {
    if (Cod_Imagen1 != null) {
      setValue("Cod_Imagen1", Cod_Imagen1);
    } else {
      setValue("Cod_Imagen1", "");
    }
  } else {
    setValue("Cod_Imagen1", "");
  }
};

// export const uncheckUserInterExterno = () => {
//   var checkbox1 = document.getElementById("UserCheckinter");
//   var checkbox2 = document.getElementById("UserCheckexter");

//   checkbox1.onchange = function () {
//     if (checkbox1.checked != false) {
//       checkbox2.checked = null;
//     }
//   };

//   checkbox2.onchange = function () {
//     if (checkbox2.checked != false) {
//       checkbox1.checked = null;
//     }
//   };
// };

export const UploadImageSticker = (
  event,
  setisImagenExterna,
  setValueImagesrc
) => {
  const ext = event.target.value.match(/\.(.+)$/)[1];
  const photo = document.getElementById("filePhoto");
  const photo2 = document.getElementById("filePhoto2");
  let validador = true;
  setValueImagesrc(null);
  switch (ext) {
    case "jpg":
      var sizebyte = parseInt(event.target.files[0].size / 1024);
      if (sizebyte > 3001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 3 MB`,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        photo.value = "";
        photo2.value = "";
        validador = false;
      }
      break;
    case "jpeg":
      var sizebyte = parseInt(event.target.files[0].size / 1024);
      if (sizebyte > 3001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 3 MB`,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        photo.value = "";
        photo2.value = "";
        validador = false;
      }
      break;
    case "png":
      var sizebyte = parseInt(event.target.files[0].size / 1024);
      if (sizebyte > 3001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 3 MB`,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        photo.value = "";
        photo2.value = "";
        validador = false;
      }
      break;
    case "bmp":
      var sizebyte = parseInt(event.target.files[0].size / 1024);
      if (sizebyte > 3001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 3 MB`,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        photo.value = "";
        photo2.value = "";
        validador = false;
      }
      break;
    default:
      Swal.fire({
        title: "Formato",
        text: `No se permite este tipo de formato para la imagen del sticker`,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      photo.value = "";
      photo2.value = "";
      validador = false;
  }

  if (validador) {
    setisImagenExterna(false);
    setValueImagesrc(event.target.files[0]);
    photo.value = "";
    photo2.value = "";
  }
};
