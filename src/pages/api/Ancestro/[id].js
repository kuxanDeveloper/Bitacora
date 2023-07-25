import { empty } from "rxjs";
import { QueryActiveInactivegroup_GetUsers,QueryGroupList } from "../../../components/Tools/Security";

   export const SampleDetailsWhitAncestro = async (setListadoGrupoActivo,setListadoGrupoInactivo,cookie,idAncestro) => {
     let inforGroups = await QueryActiveInactivegroup_GetUsers(cookie,idAncestro);
     setListadoGrupoActivo(inforGroups.lstGroupActive);
     setListadoGrupoInactivo(inforGroups.lstGroupInactive);
   };

   export const SampleDetailsWhitAncestroTabs = async (cookie,idAncestro,setIdGrupAncest) => {
    let Lisgrupo = await QueryGroupList(cookie,idAncestro);
  setIdGrupAncest(Lisgrupo[0].Id_grupo);
  };