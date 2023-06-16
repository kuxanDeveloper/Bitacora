import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import Cookies from "universal-cookie";
import { fetchWrapper } from "../helpers/fetch-wrapper";

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
  CrearResult,
  CrearNote,
  EditSticker,
  InfoSampleNote,
  UpdateNote,
};

async function login(username, password) {
  let TokenUserLogin;
  //#region keyToken Password
  const utf8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const tokenPassword = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");

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
    TokenUserLogin = await fetchWrapper.post(
      `${baseUrl}/LoginBitacora/loginByToken`,
      formDataUserSing
    );
  }

  if (TokenUserLogin != undefined && TokenUserLogin != null) {
    cookies.set("tokenUserCookie", TokenUserLogin, {
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    localStorage.setItem("tokenUserLS", TokenUserLogin);
    userSubject.next(TokenUserLogin);
  }
  //#endregion
}

function logout() {
  cookies.remove("tokenUserCookie", { path: "/" });
  localStorage.removeItem("tokenUserLS");
  userSubject.next(null);
  Router.push("/account/Login");
}

function logoutLogin() {
  cookies.remove("tokenUserCookie", { path: "/" });
  localStorage.removeItem("tokenUserLS");
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
  UserLoginSticker
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

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/InformacionBitacoraMuestra`,
    cookie,
    formData
  );
}

function InfoSample(cookie, idSticker) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InformacionBitacoraXSeguimientoXresultadoFullDatils?Numero_Sticker=${idSticker}`,
    cookie
  );
}

function ListTests(cookie, idGroup) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ComboPruebas?Id_grupo=${idGroup}`,
    cookie
  );
}

function ListResults(cookie, idPrueba) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/ComboResultados?idPrueba=${idPrueba}`,
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
  file2
) {
  const formData = new FormData();

  formData.append("Numero_Stickers", NumSticker);
  formData.append("Grupo_sticker", GrupoSticker);
  // formData.append("Usuario_interno", UserCheckinter);
  // formData.append("Usuario_externo", UserCheckexter);
  formData.append("Observaciones_iniciales", ObservaInici);
  formData.append("file", file);
  formData.append("file2", file2);
  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraMuestra`,
    null,
    formData
  );
}

function CrearResult(
  Codigo_prueba,
  Codigo_resultado_preliminar_1,
  Codigo_resultado_preliminar_2,
  Codigo_resultado_preliminar_3,
  Codigo_resultado_final,
  NumSticker
) {
  const formData = new FormData();
  formData.append("Numero_Stickers", NumSticker);
  formData.append("Codigo_prueba", Codigo_prueba);
  formData.append(
    "Codigo_resultado_preliminar_1",
    Codigo_resultado_preliminar_1
  );
  formData.append(
    "Codigo_resultado_preliminar_2",
    Codigo_resultado_preliminar_2
  );
  formData.append(
    "Codigo_resultado_preliminar_3",
    Codigo_resultado_preliminar_3
  );
  formData.append("Codigo_resultado_final", Codigo_resultado_final);

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/GuardBitacoraResultado`,
    null,
    formData
  );
}

function CrearNote(Observaciones_detalle, NumSticker, file) {
  const formData = new FormData();
  formData.append("Numero_Stickers", NumSticker);
  formData.append("Observaciones_detalle", Observaciones_detalle);
  formData.append("file", file);
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
  Cod_Imagen2
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

  return fetchWrapper.postHeader(
    `${baseUrl}/Stickers/EditBitacoraMuestra`,
    null,
    formData
  );
}

function InfoSampleNote(cookie, idNote) {
  return fetchWrapper.get(
    `${baseUrl}/Stickers/InformacionDetalleBitacora?Numero_Sticker=&Codigo_Detalle=${idNote}`,
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
