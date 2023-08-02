import {
  getListTrazaBitacora,
  getListTrazaTablas,
  getExportToExcelBitacora,
  getExportToExcelSistema,
} from "../../../../components/Tools/DetailsTrazabilidad";

export const SampleDetailsTrazaBit = async (
  setLInforSampleDetails,
  cookie,
  Fecha_inicial,
  Fecha_final,
  Numero_sticker,
  Sufijo,
  usuario_Traza,
  page,
  Mes
) => {
  let inforSample = await getListTrazaBitacora(
    cookie,
    Fecha_inicial,
    Fecha_final,
    Numero_sticker,
    Sufijo,
    usuario_Traza,
    page,
    Mes
  );
  setLInforSampleDetails(inforSample);
};

export const SampleDetailsTrazaTabl = async (
  setLInforSampleDetails,
  cookie,
  Fecha_inicial,
  Fecha_final,
  Tipo_tabla,
  usuario_Traza,
  page,
  Mes
) => {
  let inforSample = await getListTrazaTablas(
    cookie,
    Fecha_inicial,
    Fecha_final,
    Tipo_tabla,
    usuario_Traza,
    page,
    Mes
  );
  setLInforSampleDetails(inforSample);
};

export const ExportToExcelcsvTrazaBitacora = async (
  typeTraza,
  NumeroSticker,
  FechaIngreso,
  FechaIngresoFinal,
  UserRegisterStiker,
  sufijo,
  tipo_tabla,
  Mes
) => {
  let Result = await getExportToExcelBitacora(
    typeTraza,
    FechaIngreso,
    FechaIngresoFinal,
    NumeroSticker,
    sufijo,
    UserRegisterStiker,
    tipo_tabla,
    Mes
  );
  return Result;
};

export const ExportToExcelcsvTrazaSistema = async (
  typeTraza,
  NumeroSticker,
  FechaIngreso,
  FechaIngresoFinal,
  UserRegisterStiker,
  sufijo,
  tipo_tabla,
  Mes
) => {
  let Result = await getExportToExcelSistema(
    typeTraza,
    FechaIngreso,
    FechaIngresoFinal,
    NumeroSticker,
    sufijo,
    UserRegisterStiker,
    tipo_tabla,
    Mes
  );
  return Result;
};
