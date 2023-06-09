import {
  QueryMuestraEdit,
  QueryNoteEdit,
  QueryCloseCaseSample,
  QueryObserva,
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
