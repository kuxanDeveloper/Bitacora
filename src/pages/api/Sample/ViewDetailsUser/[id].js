import { empty } from "rxjs";
import {
     getListGroup, getListUsers
   } from "../../../../components/Tools/crudUsers";

   export const SampleDetailsUsers = async (setLInforSampleDetails,cookie,Id) => {
     let inforSample = await getListUsers(cookie,Id);
     setLInforSampleDetails(inforSample);
   };
