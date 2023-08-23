import {
  CloseCaseSample,
  CierreMasiveCaseSample,
  DeleteResultSegm,
  ValidNumeroSticker,
} from "../../pages/api/Sample/ViewDetails/[id]";
import Router from "next/router";
import "dayjs/locale/en-gb";
import styles from "../../styles/Results.module.scss";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import Select from "react-select";

Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};

Date.prototype.RemoveDays = function (days) {
  this.setDate(this.getDate() - days);
  return this;
};

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

export const FechaInitSearchDiffDays = (LessDays) => {
  let DatimeInit = new Date().RemoveDays(LessDays);

  let DateFormat =
    [
      DatimeInit.getDate().padLeft(),
      (DatimeInit.getMonth() + 1).padLeft(),
      DatimeInit.getFullYear(),
    ].join("/") +
    " " +
    [DatimeInit.getHours().padLeft(), DatimeInit.getMinutes().padLeft()].join(
      ":"
    );

  return DateFormat;
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
  // id,
  Numstiker,
  DateAdmission,
  idAncest,
  cookie,
  estd
) => {
  event.preventDefault();
  // if (id == "") {
  //   Swal.fire({
  //     title: "¡Advertencia!",
  //     text: "Debes seleccionar un grupo para poder realizar la búsqueda...",
  //     icon: "warning",
  //     confirmButtonText: "Cerrar",
  //   });
  //   return;
  // }

  if (Numstiker == "" && DateAdmission == "") {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe indicar el valor de algunos de los filtros disponible para realizar la búsqueda avanzada",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  idAncest =
    idAncest == 0 || idAncest == undefined || idAncest == "" ? 1 : idAncest;

  const rpt = ValidNumeroSticker(cookie, Numstiker, estd, idAncest);

  // Router.push({
  //   pathname: "/[id]",
  //   query: {
  //     id: id,
  //     Numstiker: Numstiker,
  //     DateAdmission: DateAdmission,
  //     idAncestro: idAncest,
  //     page: "1",
  //   },
  // });
};

export const Recharge_home_ancestro = (event, router, idAncestro) => {
  event.preventDefault();
  router.push({
    pathname: `/`,
    query: {
      idAncestro: idAncestro,
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
  URS,
  MesAnio
) => {
  event.preventDefault();

  if (
    Numstiker == "" &&
    DateAdmission == "" &&
    FechaIngresoFinal == "" &&
    Sufijo == "" &&
    URS == "" &&
    MesAnio == ""
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
    if (MesAnio != "") {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Recuerde seleccionar solo un tipo de filtro de fecha ya sea en bloque o por mes",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }

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
      page: "1",
      Mes: MesAnio,
    },
  });
};

export const FilterSearchTrazaTables = (
  event,
  router,
  DateAdmission,
  FechaIngresoFinal,
  URS,
  TipoTable,
  MesAnio
) => {
  event.preventDefault();

  if (
    DateAdmission == "" &&
    FechaIngresoFinal == "" &&
    TipoTable == "" &&
    URS == "" &&
    MesAnio == ""
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
    if (MesAnio != "") {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Recuerde seleccionar solo un tipo de filtro de fecha ya sea en bloque o por mes",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }

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
      page: "1",
      Mes: MesAnio,
    },
  });
};

export const FilterSearchCsvTables = (
  event,
  router,
  DateAdmission,
  FechaIngresoFinal,
  valueGrupo
) => {
  event.preventDefault();

  if (DateAdmission == "" && FechaIngresoFinal == "" && valueGrupo == "") {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe seleccionar un filtro para iniciar la busqueda",
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
    pathname: `/Statistics/IndexCsv`,
    query: {
      dateinicial: DateAdmission,
      dateFinal: FechaIngresoFinal,
      page: "1",
      grupo: valueGrupo,
    },
  });
};

export const ClearFilter = (e, router, idGrupo, idAncestro) => {
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
      query: { id: idGrupo, page: "1", idAncest: idAncestro },
      hash: `${hashs2}#${hashs4}`,
    });
  }
};

export const ClearFilterTrazaBitacora = (e, router) => {
  e.preventDefault();
  let urlHref = window.location.href;
  if (router.pathname === "/") {
    router.push({ pathname: router.pathname, query: { page: "1" } });
  } else {
    router.push({
      pathname: router.pathname,
      query: { page: "1" },
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

export const onclickPruebaTargetCreate = (
  setvaluePlantillachange,
  setValue
) => {
  document.getElementById("Codigo_resultado_preliminar_1").value = "";
  setvaluePlantillachange([]);
  setValue("Codigo_opcion", "");
  let option = document.getElementById("Codigo_opcion");
  if (option != null && option != undefined) {
    document.getElementById("Codigo_opcion").value = "";
  }
};

export const onclickPlantillaTargetCreate = (setValue) => {
  let option = document.getElementById("Codigo_opcion");
  if (option != null && option != undefined) {
    document.getElementById("Codigo_opcion").value = "";
  }
};

export const onclickPruebaTargetEdit = (
  setvaluePlantillachange,
  setValue,
  setcodSeguimiento,
  setcodOpciones
) => {
  setcodSeguimiento("");
  setcodOpciones("");
  setvaluePlantillachange([]);
  setValue("Codigo_opcion", "");
};

export const onclickPlantillaTargetEdit = (setValue, setcodOpciones) => {
  setValue("Codigo_opcion", "");

  setcodOpciones("");
};

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

  setValue("AdmiteSufijo", "1");
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

export const setCheckOptionReslt = (setValue) => {
  var checbox1 = document.getElementById("EstadoOpc");

  if (
    checbox1.checked == null ||
    checbox1.checked == undefined ||
    checbox1.checked == false
  ) {
    setValue("Estado_opcion", "0");
  } else {
    setValue("Estado_opcion", "1");
  }
};

export const setCheckEstadoCrud = (setValue) => {
  var checbox1 = document.getElementById("Estado");

  if (
    checbox1.checked == null ||
    checbox1.checked == undefined ||
    checbox1.checked == false
  ) {
    setValue("ESTADO", "0");
  } else {
    setValue("ESTADO", "1");
  }
};

export const setCheckPlantillaReslt = (setValue) => {
  var checbox1 = document.getElementById("EstadoPlantilla");

  if (
    checbox1.checked == null ||
    checbox1.checked == undefined ||
    checbox1.checked == false
  ) {
    setValue("Estado_plantilla", "0");
  } else {
    setValue("Estado_plantilla", "1");
  }
};

export const setCheckAncestro = (setValue) => {
  var checbox1 = document.getElementById("EstadoAncestro");

  if (
    checbox1.checked == null ||
    checbox1.checked == undefined ||
    checbox1.checked == false
  ) {
    setValue("Estado_Ancestro", "0");
  } else {
    setValue("Estado_Ancestro", "1");
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

    const btncierre = document.getElementById("botonCierreModal");
    btncierre.click();
  }
};

export const LocationUrl = (router, value) => {
  let aciteMenuClass = false;
  if (router.pathname.toLowerCase().includes(value.toLowerCase())) {
    aciteMenuClass = true;
  }

  return aciteMenuClass;
};

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
          `<br><br><textarea style="display:none" class="swal2-input" id="Observacionother"  maxLength="1000"
          placeholder="${
            data.ESTADO_STICKER
              ? "Deje una observación para el cierre de la orden..."
              : "Deje una observación del porqué abre la orden..."
          }"                         cols="30"
          rows="50"></textarea>`,

        customClass: {
          cancelButton: "HidenLoaderCancel",
        },
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#e57d00",
        cancelButtonColor: "#767676",
        showLoaderOnConfirm: true,
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

export const AperturaandCierreMasivo = (
  LstObservacionesPrede,
  estado,
  nameInput
) => {
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

  let arrayList = [];
  const element = document.getElementsByName(nameInput);

  if (element != null && element != undefined) {
    element.forEach((data) => {
      if (data.checked) {
        arrayList.push(data.value);
      }
    });
  }

  if (arrayList.length > 1) {
    const ListadoBitacoras = arrayList;

    Swal.fire({
      title: estado
        ? `Cerrar bloque de stickers`
        : `Reabrir bloque de stickers`,
      text: estado
        ? "¿Estás seguro de que deseas cerrar los stickers seleccionados?"
        : "¿Estás seguro de que deseas reabrir los stickers seleccionados?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e57d00",
      cancelButtonColor: "#767676",
      confirmButtonText: estado ? "Si,cerrar stickers" : "Si,abrir stickers",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: estado
            ? "Observación de cierre masivo"
            : "Observación de reapertura masiva",
          html:
            `<select id='sltObservcaciones' onchange="window.OnchangeValueSelect(
            this.value)" class="swal2-input">
            <option disabled selected value="">Seleccione una observación</option>
           ${LstObservacionesPrede.map((info) => {
             if (estado) {
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
            `<br><br><textarea style="display:none" class="swal2-input" id="Observacionother"  maxLength="1000"
            placeholder="${
              estado
                ? "Deje una observación para el cierre masivo para los stickers..."
                : "Deje una observación del porqué se reabren los stickers..."
            }"                         cols="30"
            rows="50"></textarea>`,

          customClass: {
            cancelButton: "HidenLoaderCancel",
          },
          showCancelButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#e57d00",
          cancelButtonColor: "#767676",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            let selectObserva = document.getElementById("sltObservcaciones");
            let TextAreaObservacion =
              document.getElementById("Observacionother");
            // Validate input
            if (
              selectObserva.value == "" ||
              (selectObserva.value == "5" && TextAreaObservacion.value == "")
            ) {
              Swal.showValidationMessage(
                estado
                  ? "Es obligatorio la observación para el cierre en bloque de los stickers"
                  : "Es obligatorio la observación para la reapertura en bloque de los stickers"
              );
              Swal.hideLoading();
              Swal.enableButtons();
            } else {
              Swal.resetValidationMessage();

              return CierreMasiveCaseSample(
                ListadoBitacoras,
                selectObserva.value == "5"
                  ? TextAreaObservacion.value
                  : selectObserva.options[selectObserva.selectedIndex].text,
                estado ? "0" : "1"
              );
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            estado
              ? Swal.fire({
                  icon: "success",
                  title: "Stickers cerrados",
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
                  title: "Stickers reabiertos",
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
  } else {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe seleccionar por lo menos dos sticker para el cierre de stickers en bloque",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
  }
};

export const ClickButtonMenuConf = () => {
  const btnMenu = document.getElementById("btnMenuPrincipal");
  btnMenu.click();
};

export const OnchangeObservaCrearEdit = (value, setShowobservaTextare) => {
  if (value == "5") {
    setShowobservaTextare(true);
  } else {
    setShowobservaTextare(false);
  }
};

export const RegisterStickerObservaciones = (
  setvalue,
  selectValue,
  codSitioAnatomico,
  codTipoMuestra,
  e,
  ValueGroup,
  codobservacionCmb,
  DescobservacionCmb
) => {
  if (ValueGroup == 8) {
    if (selectValue == null || selectValue == "") {
      Swal.fire({
        title: "Error",
        text: `Es obligatorio seleccionar el jefe de laboratorio para el grupo Hemocultivo`,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      e.preventDefault();
      return;
    }
  }

  setvalue("SitioAnatomico", codSitioAnatomico);
  setvalue("tipoMuestra", codTipoMuestra);
  setvalue("jefelaboratorio", selectValue);

  if (codobservacionCmb != "") {
    if (codobservacionCmb != "5") {
      setvalue("ObservaInici", DescobservacionCmb);
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
    let tecla =
      e.target.value ||
      (e.originalEvent.clipboardData || window.clipboardData).getData("text");
    let patron = /[0-9-]/;
    tecla = tecla.replace(/[^0-9-]/g, "");
    SetValue(tecla);
    return patron.test(tecla);
  }, 4);
};

export const OnkeyDowNumber = (e) => {
  let tecla = document.all ? e.keyCode : e.which;
  let patron = /[0-9]/;
  let teclaFinal = String.fromCharCode(tecla);
  return !patron.test(teclaFinal)
    ? e.preventDefault()
    : patron.test(teclaFinal);
};

export const OnPasteNumber = (e, id, SetValue) => {
  setTimeout(() => {
    let tecla =
      e.target.value ||
      (e.originalEvent.clipboardData || window.clipboardData).getData("text");
    let patron = /[0-9]/;
    tecla = tecla.replace(/[^0-9]/g, "");
    SetValue(tecla);
    return patron.test(tecla);
  }, 4);
};

export const VerSwalCargando = () => {
  Swal.fire({
    icon: "success",
    title: "Filtrando la informacion",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    allowOutsideClick: false,
  });
};

export const SelectAllCheck = (idMaster, nameInput) => {
  let checkMaster = document.getElementById(idMaster);

  if (checkMaster != undefined && checkMaster != null) {
    const element = document.getElementsByName(nameInput);

    if (checkMaster.checked) {
      element.forEach((data) => {
        data.checked = true;
      });
    } else {
      element.forEach((data) => {
        data.checked = false;
      });
    }
  }
};

export const AddListSetValue = (setValue, nameInput) => {
  let arrayList = [];
  const element = document.getElementsByName(nameInput);

  if (element != null && element != undefined) {
    element.forEach((data) => {
      if (data.checked) {
        arrayList.push(data.value);
      }
    });
  }
  if (arrayList.length > 0) {
    setValue("ListGroupArray", arrayList);
  }
};

export const AddListCodBitacora = (
  nameInput,
  group,
  name_group,
  hrefhash,
  HrefArmado
) => {
  let arrayList = [];
  const element = document.getElementsByName(nameInput);

  if (element != null && element != undefined) {
    element.forEach((data) => {
      if (data.checked) {
        arrayList.push(data.value);
      }
    });
  }

  if (arrayList.length > 1) {
    sessionStorage.setItem("ListadoBitacoras", JSON.stringify(arrayList));

    Router.push({
      pathname: "/Sample/CreateResultBloque/CreateBloq",
      query: {
        group: group,
        name_group: name_group,
        hrefhash: hrefhash,
      },
    });
  } else {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe seleccionar por lo menos dos sticker para el ingreso de estatus en bloque",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
  }
};

export const SearchValueArrayListGroupCheck = (ListArray, Value) => {
  let valorRetorno = ListArray.some((a) => a.Id_grupo == Value);

  return valorRetorno;
};

export const FormatPage = (totalStory, id, countPage) => {
  let cantidadPage = totalStory / countPage;
  let isInteger = false;
  if (cantidadPage % 1 !== 0 && cantidadPage >= 1 && cantidadPage < 1.5) {
    isInteger = true;
  }

  let valorEntero = Math.round(cantidadPage);

  if (cantidadPage > valorEntero) {
    valorEntero = valorEntero + 1;
  }

  let Arraypage = [];
  let contador = 0;
  let idInt = parseInt(id);

  let index = idInt <= 5 || idInt == valorEntero ? 1 : idInt;

  if (valorEntero == 0) {
    Arraypage.push(1);
    valorEntero = 1;
  } else {
    if (isInteger) valorEntero += 1;
    for (index; index <= valorEntero; index++) {
      if (contador === 5) {
        Arraypage.push("...");
      } else if (contador === 6) {
        if (valorEntero == idInt) {
          Arraypage.push(valorEntero);
        } else {
          if (index + countPage > valorEntero) {
            Arraypage.push(valorEntero);
          } else {
            Arraypage.push(index + countPage);
          }
        }
        break;
      } else {
        Arraypage.push(index);
      }

      contador++;
    }
  }

  return { array: Arraypage, final: valorEntero };
};

export const UpdateObject = (obj, valueInput) => {
  let objeNew = {};
  Object.entries(obj).forEach((e) => {
    const [key, value] = e;
    if (key == "page") {
      objeNew[key] = valueInput;
    } else {
      objeNew[key] = value;
    }
  });
  return objeNew;
  // Object.entries(obj);
  // objeNew = obj;
  // objeNew["page"] = value;
  // return objeNew;
};

export const AddResultToList = (
  Prueba,
  Seguimiento,
  Optiones,
  addListValue,
  ListAddResultMultple,
  setError,
  ListOptiones,
  setvaluePlantillachange,
  ComboDynamic,
  setListSelectDimanyc,
  setComboDynamic,
  SetselectobjeSeguimiento,
  Setselectobjeopciones
) => {
  let validadorError = false;
  let OptionIsHabilite = false;
  if (Prueba.value == null || Prueba.value == undefined || Prueba.value == "") {
    setError("Codigo_prueba", {
      type: "custom",
      message:
        "Campo estatus obligatorio, para agregar un resultado al listado",
    });
    validadorError = true;
  }
  if (Seguimiento == null || Seguimiento == undefined || Seguimiento == "") {
    setError("Codigo_resultado_preliminar_1", {
      type: "custom",
      message:
        "Campo seguimiento obligatorio, para agregar un resultado al listado",
    });
    validadorError = true;
  }

  if (ListOptiones != null && ListOptiones != undefined && ListOptiones != "") {
    OptionIsHabilite = true;
    if (Optiones == null || Optiones == undefined || Optiones == "") {
      setError("Codigo_opcion", {
        type: "custom",
        message:
          "Campo opciones obligatorio, para agregar un resultado al listado",
      });
      validadorError = true;
    }
  }

  if (ComboDynamic) {
    let selectMultip = document.querySelectorAll(".selectMultiple");
    if (selectMultip.length > 0) {
      for (let index = 0; index < selectMultip.length; index++) {
        let ValueInput = document.querySelector(
          'input[name="' + selectMultip[index].id + '"]'
        );
        if (ValueInput.value == "") {
          setError("SelectDinamyc", {
            type: "custom",
            message:
              "Debes seleccionar todos los combos dinamicos para poder agregar un estatus",
          });
          validadorError = true;
          break;
        }
      }
    }
  }

  if (!validadorError) {
    let obj = {};
    let seguimiento = Seguimiento.label;
    let opciones = OptionIsHabilite ? Optiones.label : "";
    obj.EstatusID = Prueba.value;
    obj.SegumientoId = Seguimiento.value;
    obj.OptionID = OptionIsHabilite ? Optiones.value : null;

    obj.TextoEstatus = Prueba.label;
    obj.textoSeguimiento = seguimiento;
    obj.textoOption = opciones;

    if (ComboDynamic) {
      let countPosition = 0;
      let textoPreArmado = "";
      let textSplitArray = null;
      let selectMultip = document.getElementsByClassName("selectMultiple");
      if (seguimiento.split("@").length > 1) {
        obj.Issegumiento = true;
        textSplitArray = seguimiento.split("@");
        for (let index = 0; index < textSplitArray.length; index++) {
          let ValorSearch = textSplitArray[index].toLowerCase();
          let ValueInput = document.querySelector(
            'input[name="' + selectMultip[countPosition].id + '"]'
          );
          if (ValorSearch.search("#microbio") != -1) {
            textoPreArmado += textSplitArray[index].replace(
              "#MICROBIO",
              ValueInput.value
            );
            countPosition++;
          } else if (ValorSearch.search("#numero") != -1) {
            textoPreArmado += textSplitArray[index].replace(
              "#NUMERO",
              ValueInput.value
            );

            countPosition++;
          } else {
            textoPreArmado += textSplitArray[index];
          }
        }
      } else if (opciones.split("@").length > 1) {
        textSplitArray = opciones.split("@");
        obj.Issegumiento = false;
        for (let index = 0; index < textSplitArray.length; index++) {
          let ValorSearch = textSplitArray[index].toLowerCase();
          if (ValorSearch.search("#microbio") != -1) {
            textoPreArmado += textSplitArray[index].replace(
              "#MICROBIO",
              selectMultip[countPosition].value
            );
            countPosition++;
          } else if (ValorSearch.search("#numero") != -1) {
            textoPreArmado += textSplitArray[index].replace(
              "#NUMERO",
              selectMultip[countPosition].value
            );

            countPosition++;
          } else {
            textoPreArmado += textSplitArray[index];
          }
        }
      }

      obj.ResulDinamico = textoPreArmado;
    } else {
      obj.ResulDinamico = null;
    }

    if (
      !ComboDynamic &&
      ListAddResultMultple.some(
        (a) =>
          a.EstatusID == obj.EstatusID &&
          a.SegumientoId == obj.SegumientoId &&
          a.OptionID == obj.OptionID
      )
    ) {
      Swal.fire({
        title: "¡Advertencia!",
        text: "La combinación que intentas agregar ya se encuentra registrada en el listado",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });

      return;
    } else {
      addListValue((preventArray) => [...preventArray, obj]);
      // valuePr.value = "";
      setvaluePlantillachange([]);
      setListSelectDimanyc([]);
      setComboDynamic(false);
      SetselectobjeSeguimiento(null);
      Setselectobjeopciones(null);
    }
  }
};

export const DeleteRowStatus = (
  data,
  setListAddResultMultple,
  ListAddResultMultple
) => {
  let FilterSearch =
    data.OptionID == null
      ? ListAddResultMultple.filter((item) => {
          return (
            item.EstatusID !== data.EstatusID ||
            item.SegumientoId !== data.SegumientoId
          );
        })
      : ListAddResultMultple.filter(
          (item) =>
            item.EstatusID !== data.EstatusID ||
            item.SegumientoId !== data.SegumientoId ||
            item.OptionID !== data.OptionID
        );

  setListAddResultMultple(FilterSearch);
};

export const ComboDinamyc = (
  ValueText,
  ListMicroorganismo,
  ListNumber,
  setListSelectDimanyc,
  setComboDynamic,
  clearErrors
) => {
  setListSelectDimanyc([]);
  if (ValueText != undefined && ValueText != null && ValueText != "") {
    let textoSelect = ValueText;

    let textSplitArra = textoSelect.split("@");

    if (textSplitArra.length > 1) {
      setComboDynamic(true);
      for (let index = 0; index < textSplitArra.length; index++) {
        let retorno = null;
        let ValorSearch = textSplitArra[index].toLowerCase();
        if (ValorSearch.search("#microbio") != -1) {
          let option = [];
          if (ListMicroorganismo != null && ListMicroorganismo != undefined) {
            ListMicroorganismo.map((data) =>
              option.push({
                value: data.DESCRIPCION,
                label: data.DESCRIPCION,
              })
            );
          }

          retorno = (
            <div className={styles.input_group}>
              <label className={styles.group_title}>Microorganismo</label>
              <Select
                instanceId={`microorganismoSelect_${index}`}
                name={`microorganismoSelect_${index}`}
                id={`microorganismoSelect_${index}`}
                className="selectMultiple"
                defaultValue={""}
                onChange={() => clearErrors("SelectDinamyc")}
                placeholder={"Seleccione un microorganismo"}
                options={option}
              ></Select>
            </div>
          );
        } else if (ValorSearch.search("#numero") != -1) {
          let option = [];
          if (ListNumber != null && ListNumber != undefined) {
            ListNumber.map((data) =>
              option.push({ value: data.DESCRIPCION, label: data.DESCRIPCION })
            );
          }

          retorno = (
            <div className={styles.input_group}>
              <label className={styles.group_title}>Número</label>
              <Select
                instanceId={`numberCount_${index}`}
                name={`numberCount_${index}`}
                id={`numberCount_${index}`}
                className="selectMultiple"
                defaultValue={""}
                onChange={() => clearErrors("SelectDinamyc")}
                options={option}
                placeholder={"Seleccione un número"}
              ></Select>
            </div>
          );
        }

        setListSelectDimanyc((preventArray) => [...preventArray, retorno]);
      }
    } else {
      setComboDynamic(false);
    }
  }
};

export const validateResultArmadoIsSeguimiento = (
  opcioneDescription,
  ResultadoArmado
) => {
  let Validator = false;
  if (opcioneDescription != null && ResultadoArmado != null) {
    let textArray = opcioneDescription.split("@");
    if (textArray.length > 0) {
      Validator = true;
    }
  }
  return Validator;
};

export const validateResultArmadoIsOpciones = (
  PlantillaResultado,
  ResultadoArmado
) => {
  let Validator = false;

  if (ResultadoArmado != null && PlantillaResultado != null) {
    let textArray = PlantillaResultado.split("@");
    if (textArray.length > 0) {
      Validator = true;
    }
  }
  return Validator;
};

export const DeleteRowStatusDataBase = (data, IdPrub, NombrePrub) => {
  Swal.fire({
    title: `Eliminar Estatus ${NombrePrub}`,
    text: `¿Estás seguro de que desea Eliminar el estatus ${NombrePrub}, con el seguimiento "${
      validateResultArmadoIsSeguimiento(
        data.PLANTILLA_RESULTADO,
        data.RESULTADO_ARMADO
      )
        ? data.RESULTADO_ARMADO
        : data.PLANTILLA_RESULTADO
    }"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e57d00",
    cancelButtonColor: "#767676",
    confirmButtonText: "Si, eliminar estatus",
  }).then((result) => {
    if (result.isConfirmed) {
      const rpt = DeleteResultSegm(
        data.CODIGO_RESULTADO_BITACORA,
        IdPrub,
        data.CODIGO_RESULTADO_BITACORA
      );
      return;
    }
  });
};

export const calcularDiffdate = (Fecheresult, FechaCreado) => {
  var moment = require("moment");

  var first = moment(Fecheresult);
  var second = moment(FechaCreado);
  const minutes = first.diff(second, "minutes");
  if (minutes > 9) {
    return true;
  } else {
    return false;
  }
};

export const setFechaActual = (idfecha) => {
  document.querySelector("." + idfecha + " input").value =
    dayjs().format("DD/MM/YYYY hh:mm");
};

export const setCheckPruebaReslt = (setValue) => {
  var checbox1 = document.getElementById("EstadoPrueba");

  if (
    checbox1.checked == null ||
    checbox1.checked == undefined ||
    checbox1.checked == false
  ) {
    setValue("Estado_prueba", "0");
  } else {
    setValue("Estado_prueba", "1");
  }
};

export const strToDate = (dtStr) => {
  if (!dtStr) return null;
  let dateParts = dtStr.split("/");
  let timeParts = dateParts[2].split(" ")[1].split(":");
  dateParts[2] = dateParts[2].split(" ")[0];
  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(
    +dateParts[2],
    dateParts[1] - 1,
    +dateParts[0],
    timeParts[0],
    timeParts[1]
  );
};

export const ValidateSearchStatistic = (fechaIni, fechaFin) => {
  if (
    fechaIni == undefined ||
    fechaFin == null ||
    fechaFin == null ||
    fechaFin == undefined ||
    fechaIni == "" ||
    fechaFin == ""
  ) {
    Swal.fire({
      title: "Búsqueda de información de estadística",
      text: `La fecha inicial como la fecha inicial deben tener valor para poder realizar la búsqueda`,
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
    return;
  }
  Router.push({
    pathname: "/Statistics",
    query: { DateIni: fechaIni, DateEnd: fechaFin },
  });
};

export const AddtolistNumber = (
  Description,
  estado,
  ListadoNumero,
  setListNumberAddObje,
  setError,
  setValueinput
) => {
  let validadorError = false;
  if (Description == null || Description == undefined || Description == "") {
    setError("Description", {
      type: "custom",
      message: "Campo número obligatorio, para agregar al listado",
    });
    validadorError = true;
  }

  // if (
  //   estado.checked == null ||
  //   estado.checked == undefined ||
  //   estado.checked == ""
  // ) {
  //   setError("Estado", {
  //     type: "custom",
  //     message: "Campo estado obligatorio, para agregar al listado",
  //   });
  //   validadorError = true;
  // }
  if (!validadorError) {
    let obj = {};
    obj.number = Description;
    obj.Estado = estado.checked;

    if (ListadoNumero.some((a) => a.number == obj.number)) {
      Swal.fire({
        title: "¡Advertencia!",
        text: "El número que intentas agregar ya se encuentra registrada en el listado",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      setListNumberAddObje((preventArray) => [...preventArray, obj]);
      estado.checked = false;
      setValueinput("");
    }
  }
};

export const DeleteRowNumber = (
  idRow,
  setListNumberAddObje,
  ListNumberAddObje
) => {
  setListNumberAddObje(ListNumberAddObje.filter((item) => item.number !== idRow));
};
