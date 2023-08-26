
import {
  QueryNumber,
  SubmitCreateNumber,
  QueryEditNumner,
  SubmitEditNumber
} from "../../../components/Tools/crudNumber";

export const GetListNumber = async (cookie, page, SetInfoNumber) => {
  let infoNumber = await QueryNumber(cookie, page);
  SetInfoNumber(infoNumber);
};

export const onSubmitCreateNumber = ({ ListNumber }) => {
  return SubmitCreateNumber(ListNumber);
};

export const onSubmitEditNumber = ({ ID, description, ESTADO  }) => {
  return SubmitEditNumber(ID, description, ESTADO);
};

export const GetEditNumber = async (setInfoNumber, cookie, id) => {
  let InfoNumber = await QueryEditNumner(cookie, id);
  setInfoNumber(InfoNumber);
};
