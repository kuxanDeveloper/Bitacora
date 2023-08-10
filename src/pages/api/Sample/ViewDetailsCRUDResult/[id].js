import { empty } from "rxjs";
import {
    getListOption,
   } from "../../../../components/Tools/crudOptionResult";

   import {
    getListPlantilla,
    getInfoOpcionesXPlantilla
   } from "../../../../components/Tools/crudPlantillaResult";

   import {
    getListPrueba,
    getInfoPlantillasXPrueba
   } from "../../../../components/Tools/crudPruebasResult";

   import {
    getInfoPruebasXGrupo
   } from "../../../../components/Tools/crudGroup";

   export const SampleDetailsOptionResult = async (setLInforSampleDetails,cookie,IdOpcion, page) => {
     let inforSample = await getListOption(cookie,IdOpcion, page);
     setLInforSampleDetails(inforSample);
   };

   export const SampleDetailsPlantillaResult = async (setLInforSampleDetails,cookie,Idplantilla, page) => {
    let inforSample = await getListPlantilla(cookie,Idplantilla, page);
    setLInforSampleDetails(inforSample);
  };

  export const SampleDetailsOptionsXPruebaResult = async (setInforOptionsXpruebas,cookie,Id_Plantilla) => {
    let inforSample = await getInfoOpcionesXPlantilla(cookie,Id_Plantilla);
    setInforOptionsXpruebas(inforSample);
  };

  export const SampleDetailsPruebasResult = async (setLInforSampleDetails,cookie,Codprueba, page) => {
    let inforSample = await getListPrueba(cookie,Codprueba, page);
    setLInforSampleDetails(inforSample);
  };

  export const SampleDetailsPruebasGrupResult = async (setInforOptionsSelc,cookie,Codprueba) => {
    let inforSample = await getListPrueba(cookie,Codprueba);
    setInforOptionsSelc(inforSample);
  };

  export const SampleDetailsPlantillasXPruebaResult = async (setInforPlantillasXPrueba,cookie,Id_prueba) => {
    let inforSample = await getInfoPlantillasXPrueba(cookie,Id_prueba);
    setInforPlantillasXPrueba(inforSample);
  };

  export const SampleDetailsPruebasXGrupoResult = async (setInforPruebasXGrupo,cookie,Id_grupo) => {
    let inforSample = await getInfoPruebasXGrupo(cookie,Id_grupo);
    setInforPruebasXGrupo(inforSample);
  };
  