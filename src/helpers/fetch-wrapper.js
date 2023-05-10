import { userService } from "../services/UserService";

const baseUrl = `${
  process.env.NEXT_PUBLIC_NODE_ENV == "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION
}`;

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
  postHeader,
};

function get(url, cookie) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url, cookie),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    body: body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postHeader(url, cookie, body) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(url, cookie),
    body: body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url, cookie) {
  // return auth header with jwt if user is logged in and request is to the api url
  let user = userService.userValue;
  let isLoggedIn = user && user.token;
  isLoggedIn =
    isLoggedIn == false
      ? cookie != null || cookie != undefined
        ? true
        : false
      : false;
  const isApiUrl = url.startsWith(baseUrl);
  if (isLoggedIn && isApiUrl) {
    return {
      Token: `${
        user.token == undefined || user.token == null ? cookie : user.token
      }`,
    };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (
        ([401, 403].includes(response.status) ||
          data.Message.indexOf("401") != -1 ||
          data.Message.indexOf("403") != -1) &&
        userService.userValue
      ) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        userService.logout();
      }

      const error = (data && data.Message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
