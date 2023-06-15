import { userService } from "../../../services/UserService";
import { onSubmitUpdateNote } from "../../../components/Tools/CRUD";

export const UpdateNote = ({
  codigo_detalle_bitacora,
  Cod_Imagen1,
  Observaciones_detalle,
  NumSticker,
  file,
}) => {
  return onSubmitUpdateNote(
    codigo_detalle_bitacora,
    Cod_Imagen1,
    Observaciones_detalle,
    NumSticker,
    file
  );
};
