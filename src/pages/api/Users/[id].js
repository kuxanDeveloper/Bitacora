import { onSubmitChangePassword } from "../../../components/Tools/crudUsers";

export const ChangeForgotPasswordUser = ({
  CurrentPassword,
  NewPassword,
  //   ConfirmNewPassword,
}) => {
  return onSubmitChangePassword(CurrentPassword, NewPassword);
};
