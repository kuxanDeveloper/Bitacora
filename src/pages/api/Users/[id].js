import { onSubmitChangePassword, onSubmitChangePasswordAdmin } from "../../../components/Tools/crudUsers";

export const ChangeForgotPasswordUser = ({
  CurrentPassword,
  NewPassword,
  //   ConfirmNewPassword,
}) => {
  return onSubmitChangePassword(CurrentPassword, NewPassword);
};

export const ChangeForgotPasswordAdmin = ({
  CurrentPassword,
  NewPassword,
  Iduser,
}) => {
  return onSubmitChangePasswordAdmin(CurrentPassword, NewPassword, Iduser);
};
