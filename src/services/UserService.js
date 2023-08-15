import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import Cookies from "universal-cookie";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import CryptoJS from "crypto-js";
const baseUrl = `${
  process.env.NEXT_PUBLIC_NODE_ENV == "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION
}`;
const userSubject = new BehaviorSubject(
  process.browser && localStorage.getItem("tokenUserLS")
);
const cookies = new Cookies();

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  ListGroupActiveeInactive_ListUsers,
  ListGroup,
  ListGroupForMue,
  logoutLogin,
  InfoSample,
  CreatSticker,
  ListTests,
  ListResults,
  ListoptionPlantilla,
  CrearResult,
  CrearNote,
  EditSticker,
  InfoSampleNote,
  CreatGroup,
  EditGroup,
  InfoGroup,
  UpdateNote,
  InfoSampleResult,
  EditResult,
  CloseCaseSample,
  listUserGetAll,
  ListGroupActive,
  lstObservall,
  InfoSampleUsers,
  CreateUser,
  InfoSampleRoles,
  InfoSampleTips,
  EditUser,
  CreatObservations,
  EditObservations,
  InfoObservations,
  ChangePasswordUser,
  ChangePasswordAdmin,
  InfoTrazabilidadBitacora,
  InfoTrazabilidadTablas,
  lstSufijoGetall,
  lstAncestros,
  InfoGroupAndUserxGroup,
  ExportcsvTrazabilidadBitacora,
  CreateOptionsResult,
  EditOptionsResult,
  InfoOptionsResult,
  CreatePlantillaResult,
  EditPlantillaResult,
  InfoPlantillaResult,
  CreatePruebaResult,
  EditPruebaResult,
  GetlistPruebas,
  InfoOpcionesXPlantilla,
  InfoPlantillasXPrueba,
  InfoPruebasXGrupo,
  ExportcsvTrazabilidadSistema,
  CreateAncestro,
  EditAncestro,
  GetlistAncestro,
  GetlistGruposXAncestro,
  lstTipoMuestra,
  lstLaboratorio,
  lstSitioAnatomico,
  GetlistJefeLaboratorio,
  GetlistSitiosAnatomicos,
  GetlistTiposMuestra,
  CreateJefeLaboratorio,
  EditJefeLaboratorio,
  CreateSitioAnatomico,
  EditSitioAnatomico,
  CreateTipoMuestra,
  EditTipoMuestra,
  guardFechasbitacora,
  ListMultipleMixPruxNum,
  DeleteResult,
  CreateMicroorganismo,
  EditMicroorganismo,
  GetlistMicroorganismo,
  CrearResultBloq,
  ListStatisticsGeneral,
  ListPruebasxGruposSample,
  ListUpdatePanelSecundary,
  ListUpdatePanelTertiary,
  InfoFechaBitac,
  InfoGroupCombo,
  ExportcsvFechas
};

async function login(username, password) {
  let TokenUserLogin;
  //#region keyToken Password

  let hashBuffer = CryptoJS.SHA256(password);
  const tokenPassword = hashBuffer.toString(CryptoJS.enc.Hex);

  const formDataLogin = await new FormData();

  formDataLogin.append("Num_Identidad", username);
  formDataLogin.append("pass", tokenPassword);

  let tokenGenerateLogin = await fetchWrapper.post(
    `${baseUrl}/LoginBitacora/tokenComprobarUsuario`,
    formDataLogin
  );

  //#endregion
  //#region ValidateuserLogin
  if (tokenGenerateLogin != "") {
    const formDataUserSing = await new FormData();
    formDataUserSing.append("loginToken", tokenGenerateLogin);
    let UserLogin = await fetchWrapper.post(
      `${baseUrl}/LoginBitacora/loginByToken`,
      formDataUserSing
    );

    if (UserLogin.token != undefined && UserLogin.token != null) {
      cookies.set("tokenUserCookie", UserLogin.token, {
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      let dateNow = new Date();
      localStorage.setItem("tokenUserLS", UserLogin.token);
      localStorage.setItem("dateLogin", dateNow);
      userSubject.next(UserLogin.token);
    }

    if (UserLogin.lstRoles != undefined && UserLogin.lstRoles != null) {
      let arrayObject = [];
      if (UserLogin.lstRoles.length > 0) {
        UserLogin.lstRoles.map((data) => arrayObject.push(data.Id));
      }
      cookies.set("RolUserCookie", arrayObject, {
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      localStorage.setItem("RolUser", JSON.stringify(arrayObject));
    }

    if (UserLogin.Emailusu != undefined && UserLogin.Emailusu != null) {
      const usu = UserLogin.Emailusu.toString();
      localStorage.setItem("UserEmail", usu);
    }
  }

  //#endregion
}

function logout() {
  cookies.remove("tokenUserCookie", { path: "/" });
  cookies.remove("RolUserCookie", { path: "/" });
  localStorage.removeItem("tokenUserLS");
  localStorage.removeItem("RolUser");
  localStorage.removeItem("dateLogin");
  userSubject.next(null);
  Router.push("/account/Login");
}

function logoutLogin() {
  cookies.remove("tokenUserCookie", { path: "/" });
  cookies.remove("RolUserCookie", { path: "/" });
  localStorage.removeItem("tokenUserLS");
  localStorage.removeItem("RolUser");
  localStorage.removeItem("dateLogin");
  userSubject.next(null);
}

function ListGroupActiveeInactive_ListUsers(cookie, idAncestro) {
  return fetchWrapper.get(
    `${baseUrl}/IndexBitacora/ListGroupTrueeFalse_ListGetAllUser?COD_ANCESTRO=${idAncestro}`,
    cookie
  );
}

function ListGroupActive(cookie, idAncestro) {
  return fetchWrapper.get(
    `${baseUrl}/IndexBitacora/ListGroupTrue?COD_ANCESTRO=${idAncestro}`,
    cookie
  );
}

function ListGroup(cookie, idAncestro, estado) {
  const formData = new FormData();

  formData.append("ESTADO", estado);

  return fetchWrapper.postHeader(
    `${baseUrl}/IndexBitacora/ListGroupViewOrdenes?COD_ANCESTRO=${idAncestro}`,
    cookie,
    formData
  );
}

function ListGroupForMue(
  cookie,
  Estado,
  idGroup,
  NumeroSticker,
  FechaINgreso,
  Cod_sticker,
  page
) {
  const formData = new FormData();
  formData.append("Estado_sticker", Estado);
  formData.append("Grupo_sticker", idGroup);
  formData.append(
    "Numero_Stickers",
    NumeroSticker !== null && NumeroSticker !== undefined ? NumeroSticker : ""
  );
  formData.append("Resultado_Final", "");

  formData.append(
    "Fecha_Sticker",
    FechaINgreso !== null && FechaINgreso !== undefined ? FechaINgreso : ""
  );

  formData.append("Usuario_Sticker", "");

  formData.append("COD_BITACORA", Cod_sticker);

  formData.append("page", page);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/InformacionBitacoraMuestra`,
    cookie,
    formData
  );
}

function InfoFechaBitac(cookie, DateIni,
  DateFin,
  page,
  grupo) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InformacionFechasBitacora?Fecha_ingreso=${DateIni}&Fecha_final=${DateFin}&page=${page}&idgrupo=${grupo}`,
    cookie
  );
}

function InfoSample(cookie, idSticker) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InformacionBitacoraXSeguimientoXresultadoFullDatils?Numero_Sticker=&CODIGO_BITACORA=${idSticker}`,
    cookie
  );
}

function ListTests(cookie, idGroup, idBitacora) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ComboPruebas?Id_grupo=${idGroup}&COD_BITACORA=${idBitacora}&COD_RESULTADO=`,
    cookie
  );
}

function ListMultipleMixPruxNum(cookie, idGroup) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InfoMultipleComboTestxMicroxNumber?Id_grupo=${idGroup}`,
    cookie
  );
}

function ListResults(cookie, idPrueba, idBitacora) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ComboResultados?idPrueba=${idPrueba}&COD_BITACORA=${idBitacora}&COD_RESULTADO=`,
    cookie
  );
}

function ListoptionPlantilla(cookie, idResult, idBitacora) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ComboOptionesPlantilla?Id_plantilla=${idResult}&COD_BITACORA=${idBitacora}&COD_RESULTADO=`,
    cookie
  );
}

function listUserGetAll(cookie) {
  return fetchWrapper.get(`${baseUrl}/IndexBitacora/ListUserGetAll`, cookie);
}

function CreatSticker(
  NumSticker,
  GrupoSticker,
  ObservaInici,
  file,
  file2,
  Sufijo,
  SitioAnatomico,
  jefelaboratorio,
  tipoMuestra,
  FechaHoraRecogida
) {
  const formData = new FormData();

  formData.append("Numero_Stickers", NumSticker);
  formData.append("Grupo_sticker", GrupoSticker);
  formData.append("Observaciones_iniciales", ObservaInici);
  formData.append("file", file);
  formData.append("file2", file2);
  formData.append("Sufijo", Sufijo);

  formData.append("SitioAnatomico", SitioAnatomico);
  formData.append("jefelaboratorio", jefelaboratorio);
  formData.append("tipoMuestra", tipoMuestra);
  formData.append("FechaHoraRecogida", FechaHoraRecogida);
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraMuestra`,
    null,
    formData
  );
}

function CrearResult(COD_BITACORA, ListResultMultiple) {
  let variable = JSON.stringify(ListResultMultiple);
  const formData = new FormData();
  formData.append("COD_BITACORA", COD_BITACORA);
  formData.append("ListResultMultiple", JSON.stringify(ListResultMultiple));
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraResultado`,
    null,
    formData
  );
}

function CrearResultBloq(ListadoBitacoras, ListResultMultiple) {
  const formData = new FormData();
  formData.append("Listado_Num_Bitacoras", JSON.stringify(ListadoBitacoras));
  formData.append("ListResultMultiple", JSON.stringify(ListResultMultiple));
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraResultadoBloque`,
    null,
    formData
  );
}

function EditResult(
  Codigo_prueba,
  Codigo_resultado_preliminar_1,
  Codigo_opcion,
  Codigo_resultado_bitacora
) {
  const formData = new FormData();
  formData.append("Codigo_resultado_bitacora", Codigo_resultado_bitacora);
  formData.append("Codigo_prueba", Codigo_prueba);
  formData.append(
    "Codigo_resultado_preliminar_1",
    Codigo_resultado_preliminar_1
  );
  formData.append("Codigo_opcion", Codigo_opcion);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditarBitacoraResultado`,
    null,
    formData
  );
}

function CrearNote(Observaciones_detalle, file, COD_BITACORA) {
  const formData = new FormData();
  formData.append("Observaciones_detalle", Observaciones_detalle);
  formData.append("file", file);
  formData.append("COD_BITACORA", COD_BITACORA);
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraDetalle`,
    null,
    formData
  );
}

function EditSticker(
  NumSticker,
  GrupoSticker,
  ObservaInici,
  // UserCheckinter,
  // UserCheckexter,
  file,
  file2,
  Cod_Imagen1,
  Cod_Imagen2,
  COD_BITACORA,
  Sufijo,
  SitioAnatomico,
  jefelaboratorio,
  tipoMuestra,
  FechaHoraRecogida
) {
  const formData = new FormData();
  formData.append("Numero_Stickers", NumSticker);
  formData.append("Grupo_sticker", GrupoSticker);
  // formData.append("Usuario_interno", UserCheckinter);
  // formData.append("Usuario_externo", UserCheckexter);
  formData.append("Observaciones_iniciales", ObservaInici);
  formData.append("file", file);
  formData.append("file2", file2);
  formData.append("Cod_Imagen1", Cod_Imagen1);
  formData.append("Cod_Imagen2", Cod_Imagen2);
  formData.append("COD_BITACORA", COD_BITACORA);
  formData.append("Sufijo", Sufijo);

  formData.append("SitioAnatomico", SitioAnatomico);
  formData.append("jefelaboratorio", jefelaboratorio);
  formData.append("tipoMuestra", tipoMuestra);
  formData.append("FechaHoraRecogida", FechaHoraRecogida);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditBitacoraMuestra`,
    null,
    formData
  );
}

function InfoSampleNote(cookie, idNote) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InformacionDetalleBitacora?CODIGO_BITACORA=&Codigo_Detalle=${idNote}`,
    cookie
  );
}

function CreatGroup(
  NombreGrupo,
  EstadoGrupo,
  AdmiteSufijo,
  AlertaHoras,
  OrdenGrupo,
  ListSufijo,
  Lst_Pruebas
) {
  const formData = new FormData();
  formData.append("nombre_Grupo", NombreGrupo);
  formData.append("estado_Grupo", EstadoGrupo);
  formData.append("admite_sufijo", AdmiteSufijo);
  formData.append("alerta_horas", AlertaHoras);
  formData.append("Orden_Grupo", OrdenGrupo);
  formData.append("Lst_Sufijos", ListSufijo);
  formData.append("Lst_Pruebas", Lst_Pruebas);

  return fetchWrapper.postHeader(
    `${baseUrl}/Grupos/GuardGrupos`,
    null,
    formData
  );
}

function EditGroup(
  IdGrupo,
  NombreGrupo,
  EstadoGrupo,
  AdmiteSufijo,
  AlertaHoras,
  OrdenGrupo,
  ListSufijo,
  Lst_Pruebas
) {
  const formData = new FormData();

  formData.append("Id_Grupo", IdGrupo);
  formData.append("nombre_Grupo", NombreGrupo);
  formData.append("estado_Grupo", EstadoGrupo);
  formData.append("admite_sufijo", AdmiteSufijo);
  formData.append("alerta_horas", AlertaHoras);
  formData.append("Orden_Grupo", OrdenGrupo);
  formData.append("Lst_Sufijos", ListSufijo);
  formData.append("Lst_Pruebas", Lst_Pruebas);

  return fetchWrapper.postHeader(
    `${baseUrl}/Grupos/EditarGrupos`,
    null,
    formData
  );
}

function InfoGroup(estado, idGrupo, cookie, page) {
  return fetchWrapper.get(
    `${baseUrl}/Grupos/ObtenerGruposFiltro?estado=${estado}&Id_GRUPO=${idGrupo}&page=${page}`,
    cookie
  );
}

function InfoGroupCombo(cookie) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ComboGrupoFech`,
    cookie
  );
}

function UpdateNote(
  codigo_detalle_bitacora,
  Cod_Imagen1,
  Observaciones_detalle,
  file
) {
  const formData = new FormData();
  formData.append("codigo_detalle_bitacora", codigo_detalle_bitacora);
  formData.append("Observaciones_detalle", Observaciones_detalle);
  formData.append("file", file);
  formData.append("Cod_Imagen1", Cod_Imagen1);
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditBitacoraDetalle`,
    null,
    formData
  );
}

function InfoSampleResult(cookie, idResult) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InformacionResultadoBitacora?CODIGO_BITACORA=&Codigo_Resultado=${idResult}`,
    cookie
  );
}

function CloseCaseSample(id, observacionCaso, Estado) {
  const formData = new FormData();
  formData.append("COD_BITACORA", id);
  formData.append("Observacion_estado", observacionCaso);
  formData.append("Estado_sticker", Estado);
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/CambioEstadoBitacora`,
    null,
    formData
  );
}

function lstObservall(cookie) {
  return fetchWrapper.get(
    `${baseUrl}/Observacion/GetlistObservacionPredeterminadas?Cod_Observacion=&EstadoObservacion=1&page=1`,
    cookie
  );
}

function lstSitioAnatomico(cookie) {
  return fetchWrapper.get(`${baseUrl}/Stickers/ComboSitioAnatomico`, cookie);
}

function lstLaboratorio(cookie) {
  return fetchWrapper.get(`${baseUrl}/Stickers/ComboJefeLaboratorio`, cookie);
}

function lstTipoMuestra(cookie, idGrupo) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ComboTipoMuestra?Id_Grupo=${idGrupo}`,
    cookie
  );
}

function lstSufijoGetall(cookie) {
  return fetchWrapper.get(`${baseUrl}/IndexBitacora/LstGetallSufijo`, cookie);
}

function InfoSampleUsers(cookie, IdUser, page) {
  return fetchWrapper.get(
    `${baseUrl}/Usus/GetInfoUsu?IdUsu=${IdUser}&page=${page}`,
    cookie
  );
}
function InfoGroupAndUserxGroup(cookie, idUser) {
  return fetchWrapper.get(
    `${baseUrl}/Usus/GetGroupListAndListRegisterValue?IdUSer=` + idUser,
    cookie
  );
}

function CreateUser(
  Email,
  NumIdentidad,
  TipoIdentidad,
  Nombres,
  Apellidos,
  Password,
  Celular,
  Rol,
  Telefono,
  Extencion,
  EstadoUsuario,
  ListGroupArray
) {
  const formData = new FormData();
  formData.append("email", Email);
  formData.append("Num_Identidad", NumIdentidad);
  formData.append("Tipo_documento", TipoIdentidad);
  formData.append("nombres", Nombres);
  formData.append("apellidos", Apellidos);
  formData.append("password", Password);
  formData.append("telf", Celular);
  formData.append("roles", Rol);
  formData.append("Telefono_fijo", Telefono);
  formData.append("EXTENCION", Extencion);
  formData.append("estado_usuario", EstadoUsuario);
  formData.append("ListGroupxUser", ListGroupArray);

  return fetchWrapper.postHeader(
    `${baseUrl}/Usus/GuardUsuario`,
    null,
    formData
  );
}

function EditUser(
  Id_Usuario,
  Email,
  NumIdentidad,
  TipoIdentidad,
  Nombres,
  Apellidos,
  Celular,
  Rol,
  Telefono,
  Extencion,
  EstadoUsuario,
  ListGroupArray
) {
  const formData = new FormData();
  formData.append("Id", Id_Usuario);
  formData.append("email", Email);
  formData.append("Num_Identidad", NumIdentidad);
  formData.append("Tipo_documento", TipoIdentidad);
  formData.append("nombres", Nombres);
  formData.append("apellidos", Apellidos);
  formData.append("telf", Celular);
  formData.append("roles", Rol);
  formData.append("Telefono_fijo", Telefono);
  formData.append("EXTENCION", Extencion);
  formData.append("estado_usuario", EstadoUsuario);
  formData.append("ListGroupxUser", ListGroupArray);

  return fetchWrapper.postHeader(
    `${baseUrl}/Usus/EditarUsuario`,
    null,
    formData
  );
}

function InfoSampleRoles(cookie) {
  return fetchWrapper.get(`${baseUrl}/Usus/GetInfoRol`, cookie);
}

function InfoSampleTips(cookie) {
  return fetchWrapper.get(`${baseUrl}/Usus/GetTiposIdentificacion`, cookie);
}

function CreatObservations(
  DescripcionObservacion,
  obs_cierre,
  obs_reapertura,
  obs_bitacora,
  Estado_observacion
) {
  const formData = new FormData();
  formData.append("DescripcionObservacion", DescripcionObservacion);
  formData.append("obs_cierre", obs_cierre);
  formData.append("obs_reapertura", obs_reapertura);
  formData.append("obs_bitacora", obs_bitacora);
  formData.append("estado_observacion", Estado_observacion);

  return fetchWrapper.postHeader(
    `${baseUrl}/Observacion/GuardarObservacionPredeterminada`,
    null,
    formData
  );
}

function EditObservations(
  Cod_Observacion,
  DescripcionObservacion,
  obs_cierre,
  obs_reapertura,
  obs_bitacora,
  Estado_observacion
) {
  const formData = new FormData();

  formData.append("Cod_Observacion", Cod_Observacion);
  formData.append("DescripcionObservacion", DescripcionObservacion);
  formData.append("obs_cierre", obs_cierre);
  formData.append("obs_reapertura", obs_reapertura);
  formData.append("obs_bitacora", obs_bitacora);
  formData.append("estado_observacion", Estado_observacion);

  return fetchWrapper.postHeader(
    `${baseUrl}/Observacion/EditadaObservacionBitacora`,
    null,
    formData
  );
}

function InfoObservations(Cod_Observacion, cookie, page) {
  return fetchWrapper.get(
    `${baseUrl}/Observacion/GetlistObservacionPredeterminadas?Cod_Observacion=${Cod_Observacion}&EstadoObservacion=&page=${page}`,
    cookie
  );
}

function ChangePasswordUser(CurrentPassword, NewPassword) {
  const formData = new FormData();

  let hashBuffer = CryptoJS.SHA256(CurrentPassword);
  let hashBufferNewPassword = CryptoJS.SHA256(NewPassword);
  const CurrentPasswordHas = "0x" + hashBuffer.toString(CryptoJS.enc.Hex);
  const NewPasswordHas =
    "0x" + hashBufferNewPassword.toString(CryptoJS.enc.Hex);
  formData.append("Newpassword", NewPasswordHas);
  formData.append("Oldpassword", CurrentPasswordHas);
  return fetchWrapper.postHeader(
    `${baseUrl}/Usus/CambiarContraseniaUsuario`,
    null,
    formData
  );
}

function ChangePasswordAdmin(CurrentPassword, NewPassword, Iduser) {
  const formData = new FormData();

  // let hashBufferNewPassword = CryptoJS.SHA256(NewPassword);
  // const NewPasswordHas =
  //   "0x" + hashBufferNewPassword.toString(CryptoJS.enc.Hex);

  formData.append("Newpassword", NewPassword);
  formData.append("IdUsuario", Iduser);
  return fetchWrapper.postHeader(
    `${baseUrl}/Usus/CambiarContraseniaAdmin`,
    null,
    formData
  );
}

function InfoTrazabilidadBitacora(
  cookie,
  Fecha_inicial,
  Fecha_final,
  Numero_sticker,
  Sufijo,
  usuario_Traza,
  page,
  Mes
) {
  return fetchWrapper.get(
    `${baseUrl}/TrazaBit/LstBitacoraTraza?Fecha_inicial=${Fecha_inicial}&Fecha_final=${Fecha_final}&Numero_sticker=${Numero_sticker}&Sufijo=${Sufijo}&usuario_Traza=${usuario_Traza}&page=${page}&MesAnio=${Mes}`,
    cookie
  );
}

function ExportcsvTrazabilidadBitacora(
  typeTraza,
  Fecha_inicial,
  Fecha_final,
  Numero_sticker,
  Sufijo,
  usuario_Traza,
  tipo_tabla,
  Mes
) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ExportFileCsvExcel?typeTraza=${typeTraza}&FechaInicial=${Fecha_inicial}&Fecha_final=${Fecha_final}&Numero_sticker=${Numero_sticker}&sufijo=${Sufijo}&usuario_Traza=${usuario_Traza}&Tipo_tabla=${tipo_tabla}&MesAnio=${Mes}`,
    null
  );
}

function ExportcsvTrazabilidadSistema(
  typeTraza,
  Fecha_inicial,
  Fecha_final,
  Numero_sticker,
  Sufijo,
  usuario_Traza,
  tipo_tabla,
  Mes
) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ExportFileCsvExcel?typeTraza=${typeTraza}&FechaInicial=${Fecha_inicial}&Fecha_final=${Fecha_final}&Numero_sticker=${Numero_sticker}&sufijo=${Sufijo}&usuario_Traza=${usuario_Traza}&Tipo_tabla=${tipo_tabla}&MesAnio=${Mes}`,
    null
  );
}

function InfoTrazabilidadTablas(
  cookie,
  Fecha_inicial,
  Fecha_final,
  Tipo_tabla,
  usuario_Traza,
  page,
  Mes
) {
  return fetchWrapper.get(
    `${baseUrl}/TrazaTabla/LstTablasTraza?Fecha_inicial=${Fecha_inicial}&Fecha_final=${Fecha_final}&Tipo_tabla=${Tipo_tabla}&usuario_Traza=${usuario_Traza}&page=${page}&MesAnio=${Mes}`,
    cookie
  );
}

function lstAncestros(cookie) {
  return fetchWrapper.get(`${baseUrl}/IndexBitacora/GetListAncestros`, cookie);
}

function CreateOptionsResult(Opcion_descripcion, Estado_opcion, Orden_opcion) {
  const formData = new FormData();

  formData.append("Opcion_descripcion", Opcion_descripcion);
  formData.append("Estado_opcion", Estado_opcion);
  formData.append("Orden_opcion", Orden_opcion);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarOpcionesResultado`,
    null,
    formData
  );
}

function EditOptionsResult(
  Codigo_Opciones,
  Opcion_descripcion,
  Estado_opcion,
  Orden_opcion
) {
  const formData = new FormData();

  formData.append("Codigo_Opciones", Codigo_Opciones);
  formData.append("Opcion_descripcion", Opcion_descripcion);
  formData.append("Estado_opcion", Estado_opcion);
  formData.append("Orden_opcion", Orden_opcion);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditadaOpcionBitacoras`,
    null,
    formData
  );
}

function InfoOptionsResult(cookie, IdOpcion, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistOpcion?IdOpcion=${IdOpcion}&estado_opcion=&page=${page}`,
    cookie
  );
}

function CreatePlantillaResult(
  Plantilla_resultado,
  Estado_plantilla,
  Orden_plantilla,
  Lista_opciones
) {
  const formData = new FormData();

  formData.append("Plantilla_resultado", Plantilla_resultado);
  formData.append("Estado_plantilla", Estado_plantilla);
  formData.append("Orden_plantilla", Orden_plantilla);
  formData.append("Lst_Opciones", Lista_opciones);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarPlantillasBitacoras`,
    null,
    formData
  );
}

function EditPlantillaResult(
  Codigo_Plantilla,
  Plantilla_resultado,
  Estado_plantilla,
  Orden_plantilla,
  Lista_opciones
) {
  const formData = new FormData();

  formData.append("Codigo_Plantilla", Codigo_Plantilla);
  formData.append("Plantilla_resultado", Plantilla_resultado);
  formData.append("Estado_plantilla", Estado_plantilla);
  formData.append("Orden_plantilla", Orden_plantilla);
  formData.append("Lst_Opciones", Lista_opciones);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditadaPlantillasBitacoras`,
    null,
    formData
  );
}

function InfoPlantillaResult(cookie, Idplantilla, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistPlantillas?Idplantilla=${Idplantilla}&estado_plantilla=&page=${page}`,
    cookie
  );
}

function InfoOpcionesXPlantilla(cookie, Id_Plantilla) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistOpcionesXPlantilla?Id_Plantilla=${Id_Plantilla}`,
    cookie
  );
}

function CreatePruebaResult(
  Nombre_prueba,
  Estado_prueba,
  Orden_prueba,
  Lst_plantillas
) {
  const formData = new FormData();

  formData.append("Nombre_prueba", Nombre_prueba);
  formData.append("Codigo_visible", "");
  formData.append("Estado_prueba", Estado_prueba);
  formData.append("Orden_prueba", Orden_prueba);
  formData.append("Lst_plantillas", Lst_plantillas);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarPruebasBitacoras`,
    null,
    formData
  );
}

function EditPruebaResult(
  Codigo_prueba,
  Nombre_prueba,
  Estado_prueba,
  Orden_prueba,
  Lst_plantillas
) {
  const formData = new FormData();

  formData.append("Codigo_prueba", Codigo_prueba);
  formData.append("Nombre_prueba", Nombre_prueba);
  formData.append("Codigo_visible", "");
  formData.append("Estado_prueba", Estado_prueba);
  formData.append("Orden_prueba", Orden_prueba);
  formData.append("Lst_plantillas", Lst_plantillas);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditarPruebasBitacoras`,
    null,
    formData
  );
}

function GetlistPruebas(cookie, Codprueba, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistPruebas?Codprueba=${Codprueba}&EstadoPrueba=&page=${page}`,
    cookie
  );
}

function InfoPlantillasXPrueba(cookie, Id_prueba) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistPlantillasXPrueba?Id_prueba=${Id_prueba}`,
    cookie
  );
}

function InfoPruebasXGrupo(cookie, Id_grupo) {
  return fetchWrapper.get(
    `${baseUrl}/Grupos/GetlistPruebasXGrupo?Id_grupo=${Id_grupo}`,
    cookie
  );
}

function CreateAncestro(
  nombre_Ancestro,
  Estado_Ancestro,
  Orden_ancestro,
  Lst_grupos
) {
  const formData = new FormData();

  formData.append("nombre_Ancestro", nombre_Ancestro);
  formData.append("Estado_Ancestro", Estado_Ancestro);
  formData.append("Orden_ancestro", Orden_ancestro);
  formData.append("Lst_grupos", Lst_grupos);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarAncestro`,
    null,
    formData
  );
}

function EditAncestro(
  COD_ANCESTRO,
  nombre_Ancestro,
  Estado_Ancestro,
  Orden_ancestro,
  Lst_grupos
) {
  const formData = new FormData();

  formData.append("COD_ANCESTRO", COD_ANCESTRO);
  formData.append("nombre_Ancestro", nombre_Ancestro);
  formData.append("Estado_Ancestro", Estado_Ancestro);
  formData.append("Orden_ancestro", Orden_ancestro);
  formData.append("Lst_grupos", Lst_grupos);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditadoAncestro`,
    null,
    formData
  );
}

function GetlistAncestro(cookie, COD_ANCESTRO, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistAncestro?COD_ANCESTRO=${COD_ANCESTRO}&ESTADO_ANCESTRO=&page=${page}`,
    cookie
  );
}

function GetlistGruposXAncestro(cookie, COD_ANCESTRO) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistGruposXAncestro?COD_ANCESTRO=${COD_ANCESTRO}`,
    cookie
  );
}

function CreateJefeLaboratorio(DESCRIPCION, ESTADO, DOCUMENTO, INF_ADICIONAL) {
  const formData = new FormData();

  formData.append("DESCRIPCION", DESCRIPCION);
  formData.append("ESTADO", ESTADO);
  formData.append("DOCUMENTO", DOCUMENTO);
  formData.append("INF_ADICIONAL", INF_ADICIONAL);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarJefeLaboratorio`,
    null,
    formData
  );
}

function EditJefeLaboratorio(
  ID,
  DESCRIPCION,
  ESTADO,
  DOCUMENTO,
  INF_ADICIONAL
) {
  const formData = new FormData();

  formData.append("ID", ID);
  formData.append("DESCRIPCION", DESCRIPCION);
  formData.append("ESTADO", ESTADO);
  formData.append("DOCUMENTO", DOCUMENTO);
  formData.append("INF_ADICIONAL", INF_ADICIONAL);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditarJefeLaboratorio`,
    null,
    formData
  );
}

function GetlistJefeLaboratorio(cookie, ID, ESTADO, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistJefesLaboratorio?ID=${ID}&ESTADO=${ESTADO}&page=${page}`,
    cookie
  );
}

function CreateSitioAnatomico(DESCRIPCION, ESTADO) {
  const formData = new FormData();

  formData.append("DESCRIPCION", DESCRIPCION);
  formData.append("ESTADO", ESTADO);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarSitioAnatomico`,
    null,
    formData
  );
}

function EditSitioAnatomico(ID, DESCRIPCION, ESTADO) {
  const formData = new FormData();

  formData.append("ID", ID);
  formData.append("DESCRIPCION", DESCRIPCION);
  formData.append("ESTADO", ESTADO);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditarSitioAnatomico`,
    null,
    formData
  );
}

function GetlistSitiosAnatomicos(cookie, ID, ESTADO, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistSitiosAnatomicos?ID=${ID}&ESTADO=${ESTADO}&page=${page}`,
    cookie
  );
}

function CreateTipoMuestra(NOMBRE_TIPO_MUESTRA, ESTADO, ID_GRUPO) {
  const formData = new FormData();

  formData.append("NOMBRE_TIPO_MUESTRA", NOMBRE_TIPO_MUESTRA);
  formData.append("ESTADO", ESTADO);
  formData.append("ID_GRUPO", ID_GRUPO);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarTipoMuestra`,
    null,
    formData
  );
}

function EditTipoMuestra(ID, NOMBRE_TIPO_MUESTRA, ESTADO, ID_GRUPO) {
  const formData = new FormData();

  formData.append("ID", ID);
  formData.append("NOMBRE_TIPO_MUESTRA", NOMBRE_TIPO_MUESTRA);
  formData.append("ESTADO", ESTADO);
  formData.append("ID_GRUPO", ID_GRUPO);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditarTipoMuestra`,
    null,
    formData
  );
}

function GetlistTiposMuestra(cookie, ID, ESTADO, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistTiposMuestra?ID=${ID}&ESTADO=${ESTADO}&page=${page}`,
    cookie
  );
}

function guardFechasbitacora(
  COD_BITACORAv,
  FECHA_HORA_INGRESO,
  FECHA_HORA_VERIFICACION,
  FECHA_INGRESO_BOTELLA,
  FECHA_HORA_SUENA_POSITIVO,
  FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO,
  FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA,
  FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL,
  FECHA_HORA_VALIDACION_ANTIBIOGRAMA
) {
  const formData = new FormData();
  formData.append("COD_BITACORA", COD_BITACORAv);
  formData.append("FECHA_HORA_INGRESO", FECHA_HORA_INGRESO);
  formData.append("FECHA_HORA_VERIFICACION", FECHA_HORA_VERIFICACION);
  formData.append("FECHA_INGRESO_BOTELLA", FECHA_INGRESO_BOTELLA);
  formData.append("FECHA_HORA_SUENA_POSITIVO", FECHA_HORA_SUENA_POSITIVO);
  formData.append(
    "FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO",
    FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO
  );
  formData.append(
    "FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA",
    FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA
  );
  formData.append(
    "FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL",
    FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL
  );
  formData.append(
    "FECHA_HORA_VALIDACION_ANTIBIOGRAMA",
    FECHA_HORA_VALIDACION_ANTIBIOGRAMA
  );

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditarFechasBitacoras`,
    null,
    formData
  );
}

function DeleteResult(Codigo_resultado_bitacora) {
  const formData = new FormData();
  formData.append("Codigo_resultado_bitacora", Codigo_resultado_bitacora);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/DeleteResult`,
    null,
    formData
  );
}

function CreateMicroorganismo(DESCRIPCION, ESTADO) {
  const formData = new FormData();

  formData.append("DESCRIPCION", DESCRIPCION);
  formData.append("ESTADO", ESTADO);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardarMiroOrganismo`,
    null,
    formData
  );
}

function EditMicroorganismo(ID, DESCRIPCION, ESTADO) {
  const formData = new FormData();

  formData.append("ID", ID);
  formData.append("DESCRIPCION", DESCRIPCION);
  formData.append("ESTADO", ESTADO);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditadoMiroOrganismo`,
    null,
    formData
  );
}

function GetlistMicroorganismo(ID, ESTADO, cookie, page) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/GetlistMiroOrganismo?ID=${ID}&ESTADO=${ESTADO}&page=${page}`,
    cookie
  );
}

function ListStatisticsGeneral(cookie, FechaIni, FechaFin) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/StatisticGeneral?FechaIni=${FechaIni}&FechaFin=${FechaFin}`,
    cookie
  );
}

function ListPruebasxGruposSample(cookie, idGroup) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InfoMultipleComboestatus?Id_grupo=${
      idGroup == null || idGroup == undefined ? "" : idGroup
    }`,
    cookie
  );
}

function ListUpdatePanelSecundary(cookie, idGroup, fechaini, fechafin) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/UpdatePanelSecundary?FechaIni=${fechaini}&FechaFin=${fechafin}&idGrupo=${
      idGroup == null || idGroup == undefined ? "" : idGroup
    }`,
    cookie
  );
}

function ListUpdatePanelTertiary(
  cookie,
  idGroup,
  idStatus,
  fechaini,
  fechafin
) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/UpdatePanelTertiary?FechaIni=${fechaini}&FechaFin=${fechafin}&idGrupo=${
      idGroup == null || idGroup == undefined ? "" : idGroup
    }&idStatus=${idStatus}`,
    cookie
  );
}

function ExportcsvFechas(
  Fecha_inicial,
  Fecha_final,
  Id_grupo
) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ExportCsvExcelFecha?FechaInicial=${Fecha_inicial}&Fecha_final=${Fecha_final}&Id_grupo=${Id_grupo}`,
    null
  );
}
