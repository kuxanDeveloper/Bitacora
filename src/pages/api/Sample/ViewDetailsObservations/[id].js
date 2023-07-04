import { empty } from "rxjs";
import {
    getListObservations
   } from "../../../../components/Tools/crudObservations";

   export const SampleDetailsObservations = async (setLInforSampleDetails,cookie,Id) => {
     let inforSample = await getListObservations(Id,cookie);
     setLInforSampleDetails(inforSample);
   };