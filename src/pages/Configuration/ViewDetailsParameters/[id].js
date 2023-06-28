// import { empty } from "rxjs";
// import {
//     getListGroup
//   } from "../../../components/Tools/crudGroup";

//   export const SampleDetailsGroup = async (setLInforSampleDetails,cookie,Id) => {
//     let inforSample = await getListGroup("",Id,cookie);
//     setLInforSampleDetails(inforSample);
//   };

import React from "react";

function PageDateilsParameters() {
  return <div>[id]</div>;
}

  import {
    getListUsers
  } from "../../../components/Tools/crudUsers";

export default PageDateilsParameters;

  export const SampleDetailsUsers = async (setLInforSampleDetails,cookie,IdUsuario) => {    
    let inforSample = await getListUsers(cookie,IdUsuario);          
    setLInforSampleDetails(inforSample);
  };

  