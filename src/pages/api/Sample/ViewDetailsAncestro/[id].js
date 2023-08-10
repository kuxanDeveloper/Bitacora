import {
  GetlistAncestro,getInfoGruposXAncestro
   } from "../../../../components/Tools/crudAncestro";

   import {
    getListGroup
  } from "../../../../components/Tools/crudGroup";

   export const SampleDetailsAncestro = async (setInfoAncestro,cookie,COD_ANCESTRO, page) => {
     let inforSample = await GetlistAncestro(cookie,COD_ANCESTRO, page);
     setInfoAncestro(inforSample);
   };

   export const SampleDetailsGruposXAncestro = async (setInfoGrupXAncs,cookie,COD_ANCESTRO) => {
    let inforSample = await getInfoGruposXAncestro(cookie,COD_ANCESTRO);
    setInfoGrupXAncs(inforSample);
  };

  export const SampleDetailsGroup = async (setInforOptionsSelc,cookie,Id) => {
    let inforSample = await getListGroup("",Id,cookie);
    setInforOptionsSelc(inforSample.EdicionGrupo);
  };