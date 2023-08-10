import { empty } from "rxjs";
import { GetlistJefeLaboratorio } from "../../../../components/Tools/crudJefeLaboratorio";
import { GetlistSitiosAnatomicos } from "../../../../components/Tools/crudSitioAnatomico";
import { GetlistTiposMuestra } from "../../../../components/Tools/crudTipoMuestra";

export const SampleDetailsJefeLab = async (
  setInfoJefeLab,
  cookie,
  ID,
  ESTADO,page
) => {
  let inforSample = await GetlistJefeLaboratorio(cookie, ID, ESTADO, page);
  setInfoJefeLab(inforSample);
};

export const SampleDetailsSitioAnatm = async (
  setInfoSitioAnt,
  cookie,
  ID,
  ESTADO
) => {
  let inforSample = await GetlistSitiosAnatomicos(cookie, ID, ESTADO);
  setInfoSitioAnt(inforSample);
};

export const SampleDetailsTipoMuestra = async (
  setInfoTipoMue,
  cookie,
  ID,
  ESTADO
) => {
  let inforSample = await GetlistTiposMuestra(cookie, ID, ESTADO);
  setInfoTipoMue(inforSample);
};
