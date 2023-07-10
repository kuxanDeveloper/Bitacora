import { CloseCaseSample } from "../../pages/api/Sample/ViewDetails/[id]";
import IndexComponentAdmin from "../RolesComponents/Administrator/IndexComponent";
import IndexComponentTechni from "../RolesComponents/Technical/IndexComponent";

import IndexComponentAssis from "../RolesComponents/Assistant/IndexComponent";

import IndexComponentConsul from "../RolesComponents/Consultation/IndexComponent";
import Router from "next/router";

import Swal from "sweetalert2";
Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};

const fechaformatActualGeneralUrgencia = (Fecha, DaysMore) => {
  let d = new Date(Fecha).addDays(DaysMore);

  return d.getTime();
};

export const UserActiveGenerales = (query, ListadoResultadoxMuestra) => {
  let ListadoNewRetorno = [];
  let fechaActual = new Date();

  if (query != null && query != undefined) {
    query.forEach((element) => {
      let FechaOrden = new Date(element.FECHA_ORIGINAL_CREADO_BITACORA);
      const hoursDifferent = fechaActual.getTime() - FechaOrden.getTime();
      let horasdiferencia = Math.round(hoursDifferent / 1000 / (60 * 60));
      if (horasdiferencia <= element.ALARMA_HORAS) {
        ListadoNewRetorno.push(element);
      }
    });
  }
  return ListadoNewRetorno;
};

export const UserActiveUrgencias = (query, ListadoResultadoxMuestra) => {
  let ListadoNewRetorno = [];
  let fechaActual = new Date();
  if (query != null && query != undefined) {
    query.forEach((element) => {
      let FechaOrden = new Date(element.FECHA_ORIGINAL_CREADO_BITACORA);
      const hoursDifferent = fechaActual.getTime() - FechaOrden.getTime();

      let horasdiferencia = Math.round(hoursDifferent / 1000 / (60 * 60));
      if (horasdiferencia > element.ALARMA_HORAS) {
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
  DateAdmission
) => {
  event.preventDefault();

  if (id == "") {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debes seleccionar un grupo para poder realizar la búsqueda...",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  if (Numstiker == "" && DateAdmission == "") {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe indicar el valor de algunos de los filtros disponible para realizar la búsqueda avanzada",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  Router.push({
    pathname: "/[id]",
    query: {
      id: id,
      Numstiker: Numstiker,
      DateAdmission: DateAdmission,
    },
  });
};

export const FilterSearchTrazaBitacora = (
  event,
  router,
  Numstiker,
  Sufijo,
  DateAdmission,
  FechaIngresoFinal,
  URS
) => {
  event.preventDefault();

  if (
    Numstiker == "" &&
    DateAdmission == "" &&
    FechaIngresoFinal == "" &&
    Sufijo == "" &&
    URS == ""
  ) {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe seleccionar algun filtro para iniciar la busqueda",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  if (DateAdmission != "" || FechaIngresoFinal != "") {
    if (DateAdmission == "" && FechaIngresoFinal != "") {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar la fecha inicial si desea realizar la busqueda de fechas en bloque",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    if (DateAdmission != "" && FechaIngresoFinal == "") {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar la fecha final si desea realizar la busqueda de fechas en bloque",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }
  }
  
  router.push({
    pathname: `/Trazabilidad/IndexBitacora`,
    query: {
      NumSticker: Numstiker,
      dateAdmision: DateAdmission,
      dateFinal: FechaIngresoFinal,
      URS: URS,
      Sufijo: Sufijo,
    },
  });
};

export const FilterSearchTrazaTables = (
  event,
  router,
  DateAdmission,
  FechaIngresoFinal,
  URS,
  TipoTable
) => {
  event.preventDefault();

  if (
    DateAdmission == "" &&
    FechaIngresoFinal == "" &&
    TipoTable == "" &&
    URS == ""
  ) {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe seleccionar algun filtro para iniciar la busqueda",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  if (DateAdmission != "" || FechaIngresoFinal != "") {
    if (DateAdmission == "" && FechaIngresoFinal != "") {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar la fecha inicial si desea realizar la busqueda de fechas en bloque",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    if (DateAdmission != "" && FechaIngresoFinal == "") {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar la fecha final si desea realizar la busqueda de fechas en bloque",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }
  }

  router.push({
    pathname: `/Trazabilidad/IndexSistema`,
    query: {
      dateAdmision: DateAdmission,
      dateFinal: FechaIngresoFinal,
      URS: URS,
      Tipo_tabla: TipoTable,
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

export const ClearFilterTrazaBitacora = (e, router) => {
  e.preventDefault();
  let urlHref = window.location.href;
  if (router.pathname === "/") {
    router.push({ pathname: router.pathname });
  } else {
    router.push({
      pathname: router.pathname,
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

export const onclickPruebaTarget = (setvaluePlantillachange, setValue) => {
  document.getElementById("Codigo_resultado_preliminar_1").value = "";
  setvaluePlantillachange([]);
  setValue("Codigo_opcion", "");
  let option = document.getElementById("Codigo_opcion");
  if (option != null && option != undefined) {
    document.getElementById("Codigo_opcion").value = "";
  }
};

export const onclickPlantillaTarget = (setValue) => {
  let option = document.getElementById("Codigo_opcion");
  setValue("Codigo_opcion", "");
  if (option != null && option != undefined) {
    document.getElementById("Codigo_opcion").value = "";
  }
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

  var checbox2 = document.getElementById("AdmiteSufijo");

  if (
    checbox2.checked == null ||
    checbox2.checked == undefined ||
    checbox2.checked == false
  ) {
    setValue("AdmiteSufijo", "0");
  } else {
    setValue("AdmiteSufijo", "1");
  }
};

export const setCheckUsuEstado = (setValue) => {
  var checbox1 = document.getElementById("EstadoUsu");

  if (
    checbox1.checked == null ||
    checbox1.checked == undefined ||
    checbox1.checked == false
  ) {
    setValue("EstadoUsuario", "0");
  } else {
    setValue("EstadoUsuario", "1");
  }
};

export const setCheckObservations = (setValue) => {
  var checbox1 = document.getElementById("ObsCierre");

  if (
    checbox1.checked == null ||
    checbox1.checked == undefined ||
    checbox1.checked == false
  ) {
    setValue("obs_cierre", "0");
  } else {
    setValue("obs_cierre", "1");
  }

  var checbox2 = document.getElementById("ObsReapertura");

  if (
    checbox2.checked == null ||
    checbox2.checked == undefined ||
    checbox2.checked == false
  ) {
    setValue("obs_reapertura", "0");
  } else {
    setValue("obs_reapertura", "1");
  }

  var checbox3 = document.getElementById("ObsBitacora");

  if (
    checbox3.checked == null ||
    checbox3.checked == undefined ||
    checbox3.checked == false
  ) {
    setValue("obs_bitacora", "0");
  } else {
    setValue("obs_bitacora", "1");
  }

  var checbox4 = document.getElementById("EstadoObs");

  if (
    checbox4.checked == null ||
    checbox4.checked == undefined ||
    checbox4.checked == false
  ) {
    setValue("Estado_observacion", "0");
  } else {
    setValue("Estado_observacion", "1");
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
      if (sizebyte > 5001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 5 MB`,
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
      if (sizebyte > 5001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 5 MB`,
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
      if (sizebyte > 5001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 5 MB`,
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
      if (sizebyte > 5001) {
        Swal.fire({
          title: "Tamaño",
          text: `la imagen que intentas agregar supero el límite máximo de 5 MB`,
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

export const LocationUrl = (router, value) => {
  let aciteMenuClass = false;
  if (router.pathname.toLowerCase().includes(value.toLowerCase())) {
    aciteMenuClass = true;
  }

  return aciteMenuClass;
};

// export const LocationSubMenuUrl = (router, value) => {
//   let aciteMenuClass = false;

//   if (router.pathname.toLowerCase().includes(value)) {
//     aciteMenuClass = true;
//   }

//   return aciteMenuClass;
// };

export const AperturaandCierre = (data, LstObservacionesPrede) => {
  window.OnchangeValueSelect = function (value) {
    let valueGetId = document.getElementById("Observacionother");

    if (valueGetId != undefined && valueGetId != null) {
      if (value == "5") {
        valueGetId.style.display = "";
      } else {
        valueGetId.style.display = "none";
      }
    }
  };

  Swal.fire({
    title: data.ESTADO_STICKER
      ? `Cerrar orden ${data.NUMERO_STICKER}-${data.SUFIJO}`
      : `Abrir orden ${data.NUMERO_STICKER}-${data.SUFIJO}`,
    text: data.ESTADO_STICKER
      ? "¿Estás seguro de que deseas cerrar el caso de esta orden?"
      : "¿Estás seguro de que deseas abrir el caso de esta orden?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e57d00",
    cancelButtonColor: "#767676",
    confirmButtonText: data.ESTADO_STICKER
      ? "Si,cerrar orden"
      : "Si,abrir orden",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: data.ESTADO_STICKER
          ? "Observación de cierre"
          : "Observación de apertura",
        html:
          `<select id='sltObservcaciones' onchange="window.OnchangeValueSelect(
          this.value)" class="swal2-input">
          <option disabled selected value="">Seleccione una observación</option>
         ${LstObservacionesPrede.map((info) => {
           if (data.ESTADO_STICKER) {
             if (info.Observacion_cierre) {
               return `<option value="${info.Codigo_observacion}">${info.Descripcion_Observacion}</option>`;
             }
           } else {
             if (info.Observacion_reapertura) {
               return `<option value="${info.Codigo_observacion}">${info.Descripcion_Observacion}</option>`;
             }
           }
         })}
          </select>` +
          `<textarea style="display:none" class="swal2-input" id="Observacionother"  maxLength="1000"
          placeholder="${
            data.ESTADO_STICKER
              ? "Deje una observación para el cierre de la orden..."
              : "Deje una observación del porqué abre la orden..."
          }"                         cols="30"
          rows="10"></textarea>`,

        customClass: {
          cancelButton: "HidenLoaderCancel",
        },
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#e57d00",
        cancelButtonColor: "#767676",
        showLoaderOnConfirm: true,
        // inputValidator: (value) => {
        //   let classCancel =
        //     document.getElementsByClassName("HidenLoaderCancel")[0];

        //   classCancel.style.display = "none";

        //   if (!value) {
        //     return data.ESTADO_STICKER
        //       ? "Es obligatorio la observación de la orden de cierre"
        //       : "Es obligatorio la observación del porqué abre la orden";
        //   }
        // },
        preConfirm: () => {
          let selectObserva = document.getElementById("sltObservcaciones");
          let TextAreaObservacion = document.getElementById("Observacionother");
          // Validate input
          if (
            selectObserva.value == "" ||
            (selectObserva.value == "5" && TextAreaObservacion.value == "")
          ) {
            Swal.showValidationMessage(
              data.ESTADO_STICKER
                ? "Es obligatorio la observación de la orden de cierre"
                : "Es obligatorio la observación del porqué abre la orden"
            );
            Swal.hideLoading();
            Swal.enableButtons();
          } else {
            Swal.resetValidationMessage();

            return CloseCaseSample(
              data.CODIGO_BITACORA,
              selectObserva.value == "5"
                ? TextAreaObservacion.value
                : selectObserva.options[selectObserva.selectedIndex].text,
              data.ESTADO_STICKER ? "0" : "1"
            );
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          data.ESTADO_STICKER
            ? Swal.fire({
                icon: "success",
                title: "Orden cerrada",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                allowOutsideClick: false,
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  window.location.reload();
                }
              })
            : Swal.fire({
                icon: "success",
                title: "Orden abierta",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                allowOutsideClick: false,
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  window.location.reload();
                }
              });
        }
      });
    }
  });
};

export const OnchangeObservaCrearEdit = (value, setShowobservaTextare) => {
  if (value == "5") {
    setShowobservaTextare(true);
  } else {
    setShowobservaTextare(false);
  }
};

export const RegisterStickerObservaciones = (setvalue) => {
  let slt = document.getElementById("sltObservaIni");

  if (slt.value != "") {
    if (slt.value != "5") {
      setvalue("ObservaInici", slt.options[slt.selectedIndex].text);
    }
  }
};

export const RegisterEditNoteObservaciones = (setvalue) => {
  let slt = document.getElementById("sltObservaIni");

  if (slt.value != "") {
    if (slt.value != "5") {
      setvalue("Observaciones_detalle", slt.options[slt.selectedIndex].text);
    }
  }
};

export const SwitchUseStateRol = (
  setReturncomponent,
  Roles,
  ListadoGrupoActivo,
  ListadoGrupoInactivo,
  isTrueActive
) => {
  Roles.map((data, index) => {
    switch (data) {
      case 1:
        setReturncomponent(
          <IndexComponentAdmin
            key={index}
            HabilitarActive={isTrueActive}
            ListadoGrupoActivo={ListadoGrupoActivo}
            ListadoGrupoInactivo={ListadoGrupoInactivo}
          ></IndexComponentAdmin>
        );
        break;
      case 2:
        setReturncomponent(
          <IndexComponentTechni
            key={index}
            HabilitarActive={isTrueActive}
            ListadoGrupoActivo={ListadoGrupoActivo}
            ListadoGrupoInactivo={ListadoGrupoInactivo}
          ></IndexComponentTechni>
        );
        break;
      case 3:
        setReturncomponent(
          <IndexComponentAssis
            key={index}
            HabilitarActive={isTrueActive}
            ListadoGrupoActivo={ListadoGrupoActivo}
            ListadoGrupoInactivo={ListadoGrupoInactivo}
          ></IndexComponentAssis>
        );
        break;
      case 4:
        setReturncomponent(
          <IndexComponentConsul
            key={index}
            HabilitarActive={isTrueActive}
            ListadoGrupoActivo={ListadoGrupoActivo}
            ListadoGrupoInactivo={ListadoGrupoInactivo}
          ></IndexComponentConsul>
        );
        break;
      default:
        setReturncomponent(
          "El usuario no tiene un rol asignado o el rol que tiene asignado no existe en los registros"
        );
        break;
    }
  });
};

export const OnkeyDowNumberOneCharater = (e) => {
  let tecla = document.all ? e.keyCode : e.which;
  let patron = /[0-9-]/;
  let teclaFinal = String.fromCharCode(tecla);
  return !patron.test(teclaFinal)
    ? e.preventDefault()
    : patron.test(teclaFinal);
};

export const OnPasteNumberOneCharater = (e, id, SetValue) => {
  setTimeout(() => {
    console.log("aqui");
    let tecla =
      e.target.value ||
      (e.originalEvent.clipboardData || window.clipboardData).getData("text");
    let patron = /[0-9-]/;
    tecla = tecla.replace(/[^0-9-]/g, "");
    SetValue(tecla);
    return patron.test(tecla);
  }, 4);
};
