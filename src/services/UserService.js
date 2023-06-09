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

function ListGroupActiveeInactive_ListUsers(cookie) {
  return fetchWrapper.get(
    `${baseUrl}/IndexBitacora/ListGroupTrueeFalse_ListGetAllUser`,
    cookie
  );
}

function ListGroupActive(cookie) {
  return fetchWrapper.get(`${baseUrl}/IndexBitacora/ListGroupTrue`, cookie);
}

function ListGroup(cookie, estado) {
  const formData = new FormData();

  formData.append("ESTADO", estado);

  return fetchWrapper.postHeader(
    `${baseUrl}/IndexBitacora/ListGroupViewOrdenes`,
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
  Cod_sticker
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

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/InformacionBitacoraMuestra`,
    cookie,
    formData
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
  Sufijo
) {
  const formData = new FormData();

  formData.append("Numero_Stickers", NumSticker);
  formData.append("Grupo_sticker", GrupoSticker);
  formData.append("Observaciones_iniciales", ObservaInici);
  formData.append("file", file);
  formData.append("file2", file2);
  formData.append("Sufijo", Sufijo);
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraMuestra`,
    null,
    formData
  );
}

function CrearResult(
  Codigo_prueba,
  Codigo_resultado_preliminar_1,
  Codigo_opcion,
  COD_BITACORA
) {
  const formData = new FormData();
  formData.append("COD_BITACORA", COD_BITACORA);
  formData.append("Codigo_prueba", Codigo_prueba);
  formData.append(
    "Codigo_resultado_preliminar_1",
    Codigo_resultado_preliminar_1
  );
  formData.append("Codigo_opcion", Codigo_opcion);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraResultado`,
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
  Sufijo
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
  ListSufijo
) {
  const formData = new FormData();
  debugger;
  formData.append("nombre_Grupo", NombreGrupo);
  formData.append("estado_Grupo", EstadoGrupo);
  formData.append("admite_sufijo", AdmiteSufijo);
  formData.append("alerta_horas", AlertaHoras);
  formData.append("Orden_Grupo", OrdenGrupo);
  formData.append("Lst_Sufijos", ListSufijo);

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
  OrdenGrupo
) {
  const formData = new FormData();

  formData.append("Id_Grupo", IdGrupo);
  formData.append("nombre_Grupo", NombreGrupo);
  formData.append("estado_Grupo", EstadoGrupo);
  formData.append("admite_sufijo", AdmiteSufijo);
  formData.append("alerta_horas", AlertaHoras);
  formData.append("Orden_Grupo", OrdenGrupo);

  return fetchWrapper.postHeader(
    `${baseUrl}/Grupos/EditarGrupos`,
    null,
    formData
  );
}

function InfoGroup(estado, idGrupo, cookie) {
  return fetchWrapper.get(
    `${baseUrl}/Grupos/ObtenerGruposFiltro?estado=${estado}&Id_GRUPO=${idGrupo}`,
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
    `${baseUrl}/Observacion/GetlistObservacionPredeterminadas?Cod_Observacion=&EstadoObservacion=1`,
    cookie
  );
}

function lstSufijoGetall(cookie) {
  return fetchWrapper.get(`${baseUrl}/IndexBitacora/LstGetallSufijo`, cookie);
}

function InfoSampleUsers(cookie, IdUser) {
  return fetchWrapper.get(`${baseUrl}/Usus/GetInfoUsu?IdUsu=${IdUser}`, cookie);
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
  EstadoUsuario
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
  EstadoUsuario
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

function InfoObservations(Cod_Observacion, cookie) {
  return fetchWrapper.get(
    `${baseUrl}/Observacion/GetlistObservacionPredeterminadas?Cod_Observacion=${Cod_Observacion}&EstadoObservacion=`,
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
  debugger;
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
  page
) {
  return fetchWrapper.get(
    `${baseUrl}/TrazaBit/LstBitacoraTraza?Fecha_inicial=${Fecha_inicial}&Fecha_final=${Fecha_final}&Numero_sticker=${Numero_sticker}&Sufijo=${Sufijo}&usuario_Traza=${usuario_Traza}&page=${page}`,
    cookie
  );
}

function InfoTrazabilidadTablas(
  cookie,
  Fecha_inicial,
  Fecha_final,
  Tipo_tabla,
  usuario_Traza,
  page
) {
  return fetchWrapper.get(
    `${baseUrl}/TrazaTabla/LstTablasTraza?Fecha_inicial=${Fecha_inicial}&Fecha_final=${Fecha_final}&Tipo_tabla=${Tipo_tabla}&usuario_Traza=${usuario_Traza}&page=${page}`,
    cookie
  );
}
