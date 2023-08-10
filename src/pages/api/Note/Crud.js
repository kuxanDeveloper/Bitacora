import { onSubmitUpdateNote } from "../../../components/Tools/CRUD";
import { QueryObserva } from "../../../components/Tools/Security";
export const UpdateNote = ({
  codigo_detalle_bitacora,
  Cod_Imagen1,
  Observaciones_detalle,
  CODIGO_BITACORA,
  file,
}) => {
  return onSubmitUpdateNote(
    codigo_detalle_bitacora,
    Cod_Imagen1,
    Observaciones_detalle,
    CODIGO_BITACORA,
    file
  );
};

export const ListObservacion = async (cookie, setLstObservacionesPrede) => {
  let lstObservaPrete = await QueryObserva(cookie);
  setLstObservacionesPrede(lstObservaPrete.listadoObservacion);
};
