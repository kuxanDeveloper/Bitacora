import { empty } from "rxjs";
import { QueryActiveInactivegroup_GetUsers } from "../../../components/Tools/Security";

   export const SampleDetailsWhitAncestro = async (setListadoGrupoActivo,setListadoGrupoInactivo,cookie,idAncestro) => {
     let inforGroups = await QueryActiveInactivegroup_GetUsers(cookie,idAncestro);
     setListadoGrupoActivo(inforGroups.lstGroupActive);
     setListadoGrupoInactivo(inforGroups.lstGroupInactive);
   };