import { QueryActiveInactivegroup_GetUsers } from "../../../../components/Tools/Security";

export const queryGroupGetUsers = async (
  cookie,
  idAncst,
  setListadoGrupoActivo,
  setListadoGrupoInactivo,
  setListadoSufijosxGroupAll,
  setListaAncestros
) => {
  let consultaGeneral = await QueryActiveInactivegroup_GetUsers(
    cookie,
    idAncst
  );
  setListadoGrupoActivo(consultaGeneral.lstGroupActive);
  setListadoGrupoInactivo(consultaGeneral.lstGroupInactive);
  setListadoSufijosxGroupAll(consultaGeneral.ListaSufijoGetAll);
  setListaAncestros(consultaGeneral.ListaAncestros);
};
