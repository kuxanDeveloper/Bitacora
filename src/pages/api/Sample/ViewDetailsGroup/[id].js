import { empty } from "rxjs";
import {
     getListGroup
   } from "../../../../components/Tools/crudGroup";

   export const SampleDetailsGroup = async (setLInforSampleDetails,cookie,Id) => {
     let inforSample = await getListGroup("",Id,cookie);
     setLInforSampleDetails(inforSample);
   };
