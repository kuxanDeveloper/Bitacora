import { empty } from "rxjs";
import {
    getListOption,
   } from "../../../../components/Tools/crudOptionResult";

   export const SampleDetailsOptionResult = async (setLInforSampleDetails,cookie,IdOpcion) => {
     let inforSample = await getListOption(cookie,IdOpcion);
     setLInforSampleDetails(inforSample);
   };