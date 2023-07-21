import { empty } from "rxjs";
import {
     getListGroup
   } from "../../../../components/Tools/crudGroup";

   export const SampleDetailsGroup = async (setLInforSampleDetails,setInforSufijos,cookie,Id) => {
     let inforSample = await getListGroup("",Id,cookie);
     setLInforSampleDetails(inforSample.EdicionGrupo);
     setInforSufijos(inforSample.ListadoSufijosXGrupo);
   };
