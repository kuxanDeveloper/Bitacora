import {
  queryTestListxGroup,
  queryResultListxTests,
  queryOptionesListxPlantilla,
  QueryObserva,
  QuerySufijoGetAll,
  QueryJefeLaboratorio,
  QuerySitioAnatomico,
  QueryTipoMuestra,
  queryListMultipleMicroxTextxNumber,
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
  setLstObservacionesPrede(lstObservaPrete.listadoObservacion);
};

export const ListSitioAnatomico = async (cookie, setListadoSitioAna) => {
  let lstSitioAnatomico = await QuerySitioAnatomico(cookie);
  setListadoSitioAna(lstSitioAnatomico);
};

export const ListJefeLaboratorio = async (
  cookie,
  setListadoJefeLaboratorio
) => {
  let lstLabotario = await QueryJefeLaboratorio(cookie);
  setListadoJefeLaboratorio(lstLabotario);
};

export const ListTipoMuestra = async (
  cookie,
  setListadoTipoMuestra,
  idGroup
) => {
  let lstTipoMuestra = await QueryTipoMuestra(cookie, idGroup);
  setListadoTipoMuestra(lstTipoMuestra);
};

export const ListSufijoUser = async (cookie, setListadoGetFullSufijo) => {
  let lstGetallSufijo = await QuerySufijoGetAll(cookie);
  setListadoGetFullSufijo(lstGetallSufijo);
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

export const ListMultipleMicroxTestxNumber = async (
  cookie,
  idGroup,
  sticker,
  setListPruebas,
  setListMicroorganismo,
  setListNumber,
  setListResultFirst
) => {
  let ReturnValue = await queryListMultipleMicroxTextxNumber(
    cookie,
    idGroup,
    sticker
  );

  setListPruebas(ReturnValue.Listadopruebas);
  setListMicroorganismo(ReturnValue.ListadoMicroorganismo);
  setListNumber(ReturnValue.ListadoNumerosConteo);
  if (setListResultFirst != null && setListResultFirst != undefined) {
    setListResultFirst(ReturnValue.ListadoResultFirst);
  }
};
