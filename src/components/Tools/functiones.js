import Swal from "sweetalert2";
import { useEffect } from "react";
// import { ApiQueryGeneralSample } from "../../pages/api/[id]";
import { useRouter } from "next/router";
Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};

const fechaformatActualGeneralUrgencia = (Fecha, DaysMore) => {
  let d = new Date(Fecha).addDays(DaysMore);

  return d.getTime();
};

export const UserInternosActive = (query) => {
  let RetornoQuery = [];
  if (query != null && query != undefined) {
    RetornoQuery = query.filter(
      (data) => data.CLIENTE_INTERNO == true && data.CLIENTE_EXTERNO == false
    );
  }
  return RetornoQuery;
};

export const UserExternosActive = (query) => {
  let RetornoQuery = [];
  if (query != null && query != undefined) {
    RetornoQuery = query.filter(
      (data) => data.CLIENTE_EXTERNO == true && data.CLIENTE_INTERNO == false
    );
  }
  return RetornoQuery;
};

export const UserInternosInactive = (query) => {
  let RetornoQuery = [];
  if (query != null && query != undefined) {
    RetornoQuery = query.filter(
      (data) => data.CLIENTE_INTERNO == true && data.CLIENTE_EXTERNO == false
    );
  }
  return RetornoQuery;
};

export const UserExternosInactive = (query) => {
  let RetornoQuery = [];
  if (query != null && query != undefined) {
    RetornoQuery = query.filter(
      (data) => data.CLIENTE_EXTERNO == true && data.CLIENTE_INTERNO == false
    );
  }
  return RetornoQuery;
};

//Muestras generales y Urgencias
export const UserInternosActiveGenerales = (query) => {
  let ListadoNewRetorno = [];
  let fechaActual = new Date();
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
    // if ()
    // ListadoNewRetorno.push
  });
  return ListadoNewRetorno;
};

export const UserInternosActiveUrgencias = (query) => {
  let fechaActual = new Date();
  let ListadoNewRetorno = [];
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

    // if ()
    // ListadoNewRetorno.push
  });
  return ListadoNewRetorno;
};

export const UserExternosActiveGenerales = (query) => {
  let ListadoNewRetorno = [];
  let fechaActual = new Date();
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
    // if ()
    // ListadoNewRetorno.push
  });
  return ListadoNewRetorno;
};

export const UserExternosActiveUrgencias = (query) => {
  let fechaActual = new Date();
  let ListadoNewRetorno = [];
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

    // if ()
    // ListadoNewRetorno.push
  });
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

// export const useEffecIDPerformance = (
//   cookie,
//   id,
//   Numstiker,
//   DateAdmission,
//   result,
//   URS,
//   setGrupoNombre,
//   setListadoGrupo,
//   setListadoMuestraActivo,
//   setListadoMuestraInactivo
// ) => {
//   ApiQueryGeneralSample(
//     cookie,
//     id,
//     Numstiker,
//     DateAdmission,
//     result,
//     URS,
//     setGrupoNombre,
//     setListadoGrupo,
//     setListadoMuestraActivo,
//     setListadoMuestraInactivo
//   );
// };

// export const useEffecIDPerformanceRouterEvents = (
//   setisTrueActive,
//   setisUserInterno,
//   setisSampleGeneral,
//   router
// ) => {

// };

export const ClearFilter = (e, router, idGrupo) => {
  e.preventDefault();
  let urlHref = window.location.href;
  let hashs2 = urlHref.split("#")[1];
  let hashs3 = urlHref.split("#")[2];
  let hashs4 = urlHref.split("#")[3];
  if (router.pathname === "/") {
    router.push({ pathname: router.pathname, hash: `${hashs2}` });
  } else {
    router.push({
      pathname: router.pathname,
      query: { id: idGrupo },
      hash: `${hashs2}#${hashs3}#${hashs4}`,
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

// export const useEffecPerformancePruResultado = (setPruebas, router) => {

// };

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
  isUserInterno,
  isSampleGeneral
) => {
  if (value.toLowerCase() === "true") {
    if (hrefarmado.query != undefined && hrefarmado.query != null) {
      router.push({
        pathname: hrefarmado.pathname,
        query: hrefarmado.query,
        hash: `Cactive${isUserInterno ? "#UserInter" : "#UserExter"}${
          isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
        }`,
      });
    } else {
      router.push({ pathname: hrefarmado.pathname, hash: "Cactive" });
    }
  } else {
    if (hrefarmado.query != undefined && hrefarmado.query != null) {
      router.push({
        pathname: hrefarmado.pathname,
        query: hrefarmado.query,
        hash: `Cinactvie${isUserInterno ? "#UserInter" : "#UserExter"}${
          isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
        }`,
      });
    } else {
      router.push({ pathname: hrefarmado.pathname, hash: "Cactive" });
    }
  }
};

export const onclickPruebaTarget = (valor, setvalueGroupchange) => {
  document.getElementById("Codigo_resultado_preliminar_1").value = "";
  document.getElementById("Codigo_resultado_preliminar_2").value = "";
  document.getElementById("Codigo_resultado_preliminar_3").value = "";
  document.getElementById("Codigo_resultado_final").value = "";
};
