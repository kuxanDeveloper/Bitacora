import {
  QueryStatistics,
  QueryPruebasSimple,
  QueryUpdatePanelsecundary,
  QueryUpdatePanelTerciario,
} from "../../../components/Tools/Security";

export const ApiQueryStatistics = async (
  cookie,
  FechaIni,
  FechaFin,
  SetListDashboardPrinpal,
  SetListDashboardSecundario,
  SetListGroup
) => {
  let QueryGeneral = await QueryStatistics(cookie, FechaIni, FechaFin);

  SetListDashboardPrinpal(QueryGeneral.ListDasboarMain);
  SetListDashboardSecundario(QueryGeneral.ListDasboarMinor);
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

export const ApiQueryUpdateDataStatusPanelTerciario = async (
  cookie,
  idGroup,
  idStatus,
  fechaini,
  fechafin,
  SetListDashboardTerciario
) => {

  let QueryConsulta = await QueryUpdatePanelTerciario(
    cookie,
    idGroup,
    idStatus,
    fechaini,
    fechafin
  );

  SetListDashboardTerciario(QueryConsulta.ListDasboarTertiary);
};
