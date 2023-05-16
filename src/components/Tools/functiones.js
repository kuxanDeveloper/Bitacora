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
    debugger;
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
    debugger;
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
