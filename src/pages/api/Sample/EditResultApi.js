import {
  queryTestListxGroup,
  queryResultListxTests,
  queryOptionesListxPlantilla,
  queryInfoEditResult
} from "../../../components/Tools/Security";

export const InfoResultEdiApi = async (cookie, id, setInfoResul) => {
  let InfoEdit = await queryInfoEditResult(cookie, id);
  setInfoResul(InfoEdit);
};

export const ListPruebaxGroupApi = async (cookie, setListPruebas, idGroup) => {
  let ListTest = await queryTestListxGroup(cookie, idGroup);
  setListPruebas(ListTest);
};

export const ListPlanResultadosxPru = async (
  cookie,
  setListResultados,
  idPrueba
) => {
  let ListResult = await queryResultListxTests(cookie, idPrueba);
  setListResultados(ListResult);
};

export const ListOptionesxPlantilla = async (
  cookie,
  setListOptiones,
  idPlantilla
) => {
  let ListOptiones = await queryOptionesListxPlantilla(cookie, idPlantilla);
  setListOptiones(ListOptiones);
};
