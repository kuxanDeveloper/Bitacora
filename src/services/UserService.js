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
  ListGroupActive,
  ListGroupInactive,
  ListGroup,
  ListGroupForMue,
  logoutLogin,
  InfoSample,
  listUserGetAll,
  CreatSticker,
  ListTests,
  ListResults,
  ListoptionPlantilla,
  CrearResult,
  CrearNote,
  EditSticker,
  InfoSampleNote,
  UpdateNote,
  InfoSampleResult,
  EditResult
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

      localStorage.setItem("tokenUserLS", UserLogin.token);
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
  userSubject.next(null);
  Router.push("/account/Login");
}

function logoutLogin() {
  cookies.remove("tokenUserCookie", { path: "/" });
  cookies.remove("RolUserCookie", { path: "/" });
  localStorage.removeItem("tokenUserLS");
  localStorage.removeItem("RolUser");
  userSubject.next(null);
}

function ListGroupActive(cookie) {
  return fetchWrapper.get(`${baseUrl}/IndexBitacora/ListGroupTrue`, cookie);
}

function ListGroupInactive(cookie) {
  return fetchWrapper.get(`${baseUrl}/IndexBitacora/ListGroupFalse`, cookie);
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
  ResultadoFinal,
  UserLoginSticker,
  Cod_sticker
) {
  const formData = new FormData();
  formData.append("Estado_sticker", Estado);
  formData.append("Grupo_sticker", idGroup);
  formData.append(
    "Numero_Stickers",
    NumeroSticker !== null && NumeroSticker !== undefined ? NumeroSticker : ""
  );
  formData.append(
    "Resultado_Final",
    ResultadoFinal !== null && ResultadoFinal !== undefined
      ? ResultadoFinal
      : ""
  );

  formData.append(
    "Fecha_Sticker",
    FechaINgreso !== null && FechaINgreso !== undefined ? FechaINgreso : ""
  );

  formData.append(
    "Usuario_Sticker",
    UserLoginSticker !== null && UserLoginSticker !== undefined
      ? UserLoginSticker
      : ""
  );

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

function ListResults(cookie, idPrueba,idBitacora) {
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
  // UserCheckinter,
  // UserCheckexter,
  file,
  file2,
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
