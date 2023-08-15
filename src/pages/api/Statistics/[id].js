import { requestAsyncStorage } from "next/dist/client/components/request-async-storage";
import {
  QueryStatistics,
  QueryPruebasSimple,
  QueryUpdatePanelsecundary,
} from "../../../components/Tools/Security";

export const ApiQueryStatistics = async (
  cookie,
  FechaIni,
  FechaFin,
  SetListDashboardPrinpal,
  SetListDashboardSecundario,
  SetListDashboardTerciario,
  SetListGroup
) => {
  let QueryGeneral = await QueryStatistics(cookie, FechaIni, FechaFin);

  SetListDashboardPrinpal(QueryGeneral.ListDasboarMain);
  SetListDashboardSecundario(QueryGeneral.ListDasboarMinor);

  SetListDashboardTerciario(QueryGeneral.ListDasboarTertiary);
  SetListGroup(QueryGeneral.ListGrupo);
};

export const ApiQueryListpruebaxGroup = async (
  cookie,
  idGroup,
  SetListStatus
) => {
  let QueryConsulta = await QueryPruebasSimple(cookie, idGroup);
  SetListStatus(QueryConsulta.Listadopruebas);
};

export const ApiQueryUpdateDataStatus = async (
  cookie,
  idGroup,
  fechaini,
  fechafin,
  SetListDashboardSecundario
) => {
  let QueryConsulta = await QueryUpdatePanelsecundary(
    cookie,
    idGroup,
    fechaini,
    fechafin
  );
  SetListDashboardSecundario(QueryConsulta.ListDasboarMinor);
};
