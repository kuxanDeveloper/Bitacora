
import {
    getListMicroorganismo,
   } from "../../../../components/Tools/crudMicroorganismos";


   export const SampleDetailsMicro = async (setLInforSampleDetails,cookie,ID, ESTADO, page) => {
     let inforSample = await getListMicroorganismo(ID, ESTADO,cookie, page);
     setLInforSampleDetails(inforSample);
   };

  