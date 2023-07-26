import {
  QueryMuestraEdit,
  QueryNoteEdit,
  QueryCloseCaseSample,
  QueryObserva,
  QueryJefeLaboratorio,
  QuerySitioAnatomico,
  QueryTipoMuestra,
} from "../../../../components/Tools/Security";

export const SampleDetailsEdit = async (
  cookie,
  id,
  setLInforSampleDetails,
  setLstObservacionesPrede
) => {
  let inforSample = await QueryMuestraEdit(cookie, id);
  let lstObervsa = await QueryObserva(cookie);
  setLInforSampleDetails(inforSample);
  setLstObservacionesPrede(lstObervsa);
};

export const InfoteNoteEditApi = async (
  cookie,
  id,
  setInfoNote,
) => {
  let infoNote = await QueryNoteEdit(cookie, id);
  setInfoNote(infoNote);
};

export const CloseCaseSample = async (id, observacionCaso, Estado) => {
  let infoNote = await QueryCloseCaseSample(id, observacionCaso, Estado);
  return infoNote;
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