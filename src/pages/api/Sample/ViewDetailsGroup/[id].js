import { getListGroup } from "../../../../components/Tools/crudGroup";

export const SampleDetailsGroup = async (
  setLInforSampleDetails,
  setInforSufijos,
  cookie,
  Id,
  page
) => {
  let inforSample = await getListGroup("", Id, cookie, page);
  setLInforSampleDetails(inforSample);
  setInforSufijos(inforSample.ListadoSufijosXGrupo);
};
