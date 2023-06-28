import { empty } from "rxjs";
import {
    getListGroup
  } from "../../../components/Tools/crudGroup";

  import {
    getListUsers
  } from "../../../components/Tools/crudUsers";
  
  export const SampleDetailsGroup = async (setLInforSampleDetails,cookie,Id) => {    
    let inforSample = await getListGroup("",Id,cookie);          
    setLInforSampleDetails(inforSample);
  };
  
  export const SampleDetailsUsers = async (setLInforSampleDetails,cookie,IdUsuario) => {    
    let inforSample = await getListUsers(cookie,IdUsuario);          
    setLInforSampleDetails(inforSample);
  };

  