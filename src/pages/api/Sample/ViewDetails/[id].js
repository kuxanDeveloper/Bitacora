import { QueryMuestraEdit } from "../../../../components/Tools/Security";

export const SampleDetailsEdit = async (cookie, id, setLInforSampleDetails) => {
  let inforSample = await QueryMuestraEdit(cookie, id);
  setLInforSampleDetails(inforSample);
};
