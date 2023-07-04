import {
  queryTestListxGroup,
  queryResultListxTests,
  queryOptionesListxPlantilla,
  QueryObserva,
} from "../../../components/Tools/Security";

export const ListPruebaxGroupApi = async (
  cookie,
  setListPruebas,
  idGroup,
  idBitacora
) => {
  let ListTest = await queryTestListxGroup(cookie, idGroup, idBitacora);
  setListPruebas(ListTest);
};

export const ListObservacion = async (cookie, setLstObservacionesPrede) => {
  let lstObservaPrete = await QueryObserva(cookie);
  setLstObservacionesPrede(lstObservaPrete);
};

export const ListPlanResultadosxPru = async (
  cookie,
  setListResultados,
  idPrueba,
  idBitacora
) => {
  let ListResult = await queryResultListxTests(cookie, idPrueba, idBitacora);
  setListResultados(ListResult);
};

export const ListOptionesxPlantilla = async (
  cookie,
  setListOptiones,
  idPlantilla,
  idBitacora
) => {
  let ListOptiones = await queryOptionesListxPlantilla(
    cookie,
    idPlantilla,
    idBitacora
  );
  setListOptiones(ListOptiones);
};
