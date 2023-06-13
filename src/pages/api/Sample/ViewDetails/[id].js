import {
  QueryMuestraEdit,
  QueryNoteEdit,
} from "../../../../components/Tools/Security";

export const SampleDetailsEdit = async (cookie, id, setLInforSampleDetails) => {
  let inforSample = await QueryMuestraEdit(cookie, id);
  setLInforSampleDetails(inforSample);
};

export const InfoteNoteEditApi = async (cookie, id, setInfoNote) => {
  let infoNote = await QueryNoteEdit(cookie, id);
  setInfoNote(infoNote);
};
