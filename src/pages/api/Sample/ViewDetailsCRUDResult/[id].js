import { empty } from "rxjs";
import {
    getListOption,
   } from "../../../../components/Tools/crudOptionResult";

   import {
    getListPlantilla,
    getInfoOpcionesXPlantilla
   } from "../../../../components/Tools/crudPlantillaResult";

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