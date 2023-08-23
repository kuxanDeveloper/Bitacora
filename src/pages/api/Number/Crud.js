import {
  QueryNumber,
  SubmitCreateNumber,
} from "../../../components/Tools/crudNumber";

export const GetListNumber = async (cookie, page, SetInfoNumber) => {
  let infoNumber = await QueryNumber(cookie, page);
  SetInfoNumber(infoNumber);
};

export const onSubmitCreateNumber = ({
  ListNumber
}) => {
  return SubmitCreateNumber(
    ListNumber
  );
};
