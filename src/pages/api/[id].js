// import React, { useEffect, useState } from "react";
// import { apiHandler } from "helpers/api";
import {
  QueryGroupList,
  QueryMueForGroup,
  QueryObserva,
} from "../../components/Tools/Security";
import { userService } from "../../services/UserService";

export const ApiQueryGeneralSample = async (
  cookie,
  id,
  Numstiker,
  DateAdmission,
  Cod_sticker,
  setGrupoNombre,
  setListadoGrupo,
  setListadoMuestraActivo,
  setListadoMuestraInactivo,
  setListadoResultadoxMuestra,
  setLstObservacionesPrede
) => {
  let Lisgrupo = await QueryGroupList(cookie);
  setListadoGrupo(Lisgrupo);
  let listActivoMue = await QueryMueForGroup(
    cookie,
    "1",
    id,
    Numstiker,
    DateAdmission,
    Cod_sticker
  );
  setListadoMuestraActivo(listActivoMue.LstBitacora);
  setListadoResultadoxMuestra(listActivoMue.ListResultxBitacora);

  let listInactimue = await QueryMueForGroup(
    cookie,
    "0",
    id,
    Numstiker,
    DateAdmission,
    Cod_sticker
  );
  setListadoMuestraInactivo(listInactimue.LstBitacora);
  setListadoResultadoxMuestra(listInactimue.ListResultxBitacora);
  if (Lisgrupo != null && Lisgrupo != undefined) {
    try {
      let nombreGrupo = await Lisgrupo.find((data) => data.Id_grupo == id)
        .NOMBRE_GRUPO;
      setGrupoNombre(nombreGrupo);
    } catch (error) {
      console.log(error);
    }
  }

  let lstObsevraPredeter = await QueryObserva(cookie);
  setLstObservacionesPrede(lstObsevraPredeter);
  if (
    Lisgrupo == "401: Token incorrecto o vencido" ||
    listActivoMue == "401: Token incorrecto o vencido" ||
    listInactimue == "401: Token incorrecto o vencido" ||
    lstObsevraPredeter == "401: Token incorrecto o vencido"
  ) {
    userService.logout();
    return "";
  }
};
