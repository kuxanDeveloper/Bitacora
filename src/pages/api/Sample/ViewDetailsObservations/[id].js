import {
    getListObservations
   } from "../../../../components/Tools/crudObservations";

   export const SampleDetailsObservations = async (setLInforSampleDetails,cookie,Id, page) => {
     let inforSample = await getListObservations(Id,cookie, page);
     setLInforSampleDetails(inforSample);
   };