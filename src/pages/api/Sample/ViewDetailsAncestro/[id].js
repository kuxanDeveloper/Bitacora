import {
  GetlistAncestro,getInfoGruposXAncestro
   } from "../../../../components/Tools/crudAncestro";

   export const SampleDetailsAncestro = async (setInfoAncestro,cookie,COD_ANCESTRO) => {
     let inforSample = await GetlistAncestro(cookie,COD_ANCESTRO);
     setInfoAncestro(inforSample);
   };

   export const SampleDetailsGruposXAncestro = async (setInfoGrupXAncs,cookie,COD_ANCESTRO) => {
    let inforSample = await getInfoGruposXAncestro(cookie,COD_ANCESTRO);
    setInfoGrupXAncs(inforSample);
  };