import { empty } from "rxjs";
import {
     getListUsers,getListRoles,getListTiposIdentificacion
   } from "../../../../components/Tools/crudUsers";

   export const SampleDetailsUsers = async (setLInforSampleDetails,cookie,Id) => {
     let inforSample = await getListUsers(cookie,Id);
     setLInforSampleDetails(inforSample);
   };

   export const SampleDetailsRoles = async (setLInforSampleDetails,cookie) => {
    let inforSample = await getListRoles(cookie);
    setLInforSampleDetails(inforSample);
  };

  export const SampleDetailsTiposIDE = async (setLInforSampleTips,cookie) => {
    let inforSample = await getListTiposIdentificacion(cookie);
    setLInforSampleTips(inforSample);
  };

  
