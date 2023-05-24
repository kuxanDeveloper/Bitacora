import {
  QueryGroupList,
  queryTestListxGroup,
  queryResultListxTests,
} from "../../../components/Tools/Security";

export const ListgroupApi = async (cookie, setListGroup) => {
  let group = await QueryGroupList(cookie, "1");
  setListGroup(group);
};

export const ListPruebaxGroupApi = async (cookie, setListPruebas, idGroup) => {
  let ListTest = await queryTestListxGroup(cookie, idGroup);
  setListPruebas(ListTest);
};

export const ListPlanResultadosxPru = async (
  cookie,
  setListResultados,
  idPrueba
) => {
  let ListResult = await queryResultListxTests(cookie, idPrueba);
  setListResultados(ListResult);
};
