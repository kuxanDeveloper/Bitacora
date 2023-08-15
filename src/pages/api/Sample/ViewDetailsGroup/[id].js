import {
  getListGroup,
  getGroupCombo,
} from "../../../../components/Tools/crudGroup";
import { CsvFechaBit } from "../../../../components/Tools/Security";

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

export const SampleComboGroup = async (setInforGroupCombo, cookie) => {
  let inforSample = await getGroupCombo(cookie);
  setInforGroupCombo(inforSample);
};

export const ExportToExcelcsvFechasBit = async (
  Fecha_inicial,
  Fecha_final,
  Id_grupo
) => {
  let Result = await CsvFechaBit(Fecha_inicial, Fecha_final, Id_grupo);
  return Result;
};
