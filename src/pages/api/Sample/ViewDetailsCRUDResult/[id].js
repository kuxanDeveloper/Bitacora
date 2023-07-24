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

   export const SampleDetailsOptionResult = async (setLInforSampleDetails,cookie,IdOpcion) => {
     let inforSample = await getListOption(cookie,IdOpcion);
     setLInforSampleDetails(inforSample);
   };

   export const SampleDetailsPlantillaResult = async (setLInforSampleDetails,cookie,Idplantilla) => {
    let inforSample = await getListPlantilla(cookie,Idplantilla);
    setLInforSampleDetails(inforSample);
  };

  export const SampleDetailsOptionsXPruebaResult = async (setInforOptionsXpruebas,cookie,Id_Plantilla) => {
    let inforSample = await getInfoOpcionesXPlantilla(cookie,Id_Plantilla);
    setInforOptionsXpruebas(inforSample);
  };

  export const SampleDetailsPruebasResult = async (setLInforSampleDetails,cookie,Codprueba) => {
    let inforSample = await getListPrueba(cookie,Codprueba);
    setLInforSampleDetails(inforSample);
  };

  export const SampleDetailsPlantillasXPruebaResult = async (setInforPlantillasXPrueba,cookie,Id_prueba) => {
    let inforSample = await getInfoPlantillasXPrueba(cookie,Id_prueba);
    setInforPlantillasXPrueba(inforSample);
  };