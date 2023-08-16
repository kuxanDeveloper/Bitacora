import {
  GetlistAncestro,getInfoGruposXAncestro
   } from "../../../../components/Tools/crudAncestro";

   import {
    getListGroup,
    getCmbGroup
  } from "../../../../components/Tools/crudGroup";

   export const SampleDetailsAncestro = async (setInfoAncestro,cookie,COD_ANCESTRO, page,ESTADO_ANCESTRO) => {
     let inforSample = await GetlistAncestro(cookie,COD_ANCESTRO, page,ESTADO_ANCESTRO);
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

  export const SampleListGroupCombo = async (setInforOptionsSelc,cookie) => {
    let inforSample = await getCmbGroup(cookie);
    setInforOptionsSelc(inforSample);
  };
  