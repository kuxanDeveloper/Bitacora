import { BehaviorSubject, async } from "rxjs";
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
  InfoSample
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
  Router.push("/Account/Login");
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
  ResultadoFinal,
  FechaINgreso,
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
    `${baseUrl}/Stickers/InformacionBitacoraXSeguimientoXresultado?Numero_Sticker=${idSticker}`,
    cookie
  );
}
