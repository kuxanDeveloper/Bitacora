import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { ApiQueryGeneralSample } from "../../pages/api/[id]";
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

export const useEffectIndexPerfomance = (setisTrueActive) => {
  const router = useRouter();
  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let hashs2 = router.asPath.split("#")[1];
      if (
        hashs2 == "Cactive" ||
        hashs2 == "" ||
        hashs2 == null ||
        hashs2 == undefined
      ) {
        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
    }

    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      if (
        hash == "Cactive" ||
        hash == "" ||
        hash == null ||
        hash == undefined
      ) {
        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);
};

export const useEffecIDPerformance = (
  cookie,
  id,
  Numstiker,
  DateAdmission,
  result,
  URS,
  setGrupoNombre,
  setListadoGrupo,
  setListadoMuestraActivo,
  setListadoMuestraInactivo,
  setisTrueActive,
  setisUserInterno,
  setisSampleGeneral
) => {
  const router = useRouter();

  useEffect(() => {
    ApiQueryGeneralSample(
      cookie,
      id,
      Numstiker,
      DateAdmission,
      result,
      URS,
      setGrupoNombre,
      setListadoGrupo,
      setListadoMuestraActivo,
      setListadoMuestraInactivo
    );
  }, []);

  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let urlHref = window.location.href;
      let hashs2 = router.asPath.split("#")[1];
      let hashs3 = router.asPath.split("#")[2];
      let hashs4 = router.asPath.split("#")[3];

      //#region Muestras Activas
      if (
        hashs2 == "Cactive" ||
        hashs2 == "" ||
        hashs2 == null ||
        hashs2 == undefined
      ) {
        if (hashs2 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#Cactive` },
            "",
            `${urlHref}#Cactive`
          );
          urlHref = window.location.href;
        }

        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
      //#endregion

      //#region Usuario Interno o externo
      if (
        hashs3 == "UserInter" ||
        hashs3 == "" ||
        hashs3 == null ||
        hashs3 == undefined
      ) {
        if (hashs3 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#UserInter` },
            "",
            `${urlHref}#UserInter`
          );
          urlHref = window.location.href;
        }
        setisUserInterno(true);
      } else {
        setisUserInterno(false);
      }
      //#endregion

      //#region Muestras generales o de urgencia
      if (
        hashs4 == "OverallSample" ||
        hashs4 == "" ||
        hashs4 == null ||
        hashs4 == undefined
      ) {
        if (hashs4 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#OverallSample` },
            "",
            `${urlHref}#OverallSample`
          );
          urlHref = window.location.href;
        }
        setisSampleGeneral(true);
      } else {
        setisSampleGeneral(false);
      }
      //#endregion
    }

    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      let hashs3 = url.split("#")[2];
      let hashs4 = url.split("#")[3];
      let urlHref = window.location.href;

      //#region Muestras activas/inactivas
      if (
        hash == "Cactive" ||
        hash == "" ||
        hash == null ||
        hash == undefined
      ) {
        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
      //#endregion

      //#region usuario interno/usuario externo

      if (
        hashs3 == "UserInter" ||
        hashs3 == "" ||
        hashs3 == null ||
        hashs3 == undefined
      ) {
        if (hashs3 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#UserInter` },
            "",
            `${urlHref}#UserInter`
          );
          urlHref = window.location.href;
        }
        setisUserInterno(true);
      } else {
        setisUserInterno(false);
      }
      //#endregion

      //#region Muestras generales /urgencias
      if (
        hashs4 == "OverallSample" ||
        hashs4 == "" ||
        hashs4 == null ||
        hashs4 == undefined
      ) {
        if (hashs4 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#OverallSample` },
            "",
            `${urlHref}#OverallSample`
          );
          urlHref = window.location.href;
        }
        setisSampleGeneral(true);
      } else {
        setisSampleGeneral(false);
      }
      //#endregion
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);
};

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

export const useEffecPerformancePruResultado = (setPruebas) => {
  const router = useRouter();
  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let hashs2 = router.asPath.split("#")[1];
      if (
        hashs2 == "Pruebas" ||
        hashs2 == "" ||
        hashs2 == null ||
        hashs2 == undefined
      ) {
        setPruebas(true);
      } else {
        setPruebas(false);
      }
    }

    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      if (
        hash == "Pruebas" ||
        hash == "" ||
        hash == null ||
        hash == undefined
      ) {
        setPruebas(true);
      } else {
        setPruebas(false);
      }
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);
};

export const EstadoFunction = (InforSampleDetails) => {
  if (
    InforSampleDetails.infoBitacora != null &&
    InforSampleDetails.infoBitacora != undefined
  ) {
    return InforSampleDetails.infoBitacora[0].ESTADO_STICKER;
  }
};