import { empty } from "rxjs";
import {
    getListMicroorganismo,
   } from "../../../../components/Tools/crudMicroorganismos";


   export const SampleDetailsMicro = async (setLInforSampleDetails,cookie,ID, ESTADO) => {
     let inforSample = await getListMicroorganismo(ID, ESTADO,cookie);
     setLInforSampleDetails(inforSample);
   };

  