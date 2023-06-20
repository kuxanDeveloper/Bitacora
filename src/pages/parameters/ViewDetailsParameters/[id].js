import { empty } from "rxjs";
import {
    getListGroup
  } from "../../../components/Tools/crudGroup";
  
  export const SampleDetailsGroup = async (setLInforSampleDetails,cookie) => {    
    let inforSample = await getListGroup("","",cookie);      
    debugger;  
    console.log(inforSample);
    setLInforSampleDetails(inforSample);
  };
  