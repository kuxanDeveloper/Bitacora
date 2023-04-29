import Router from "next/router";
import { useEffect } from "react";
import { userService } from "../../services/UserService";
export const VerifyAccount = () => {
  debugger;
  let authorized = false;
  if (userService.userValue) {
    authorized = true;
  }
  return authorized;
};

export const urlAuthorized = () => {
  let urlAuthorize = false;
  useEffect(() => {
    let url = Router.asPath;
    const path = url.split("?")[0];
    const publicPaths = [
      "/Account/Register",
      "/Account/Login",
      "/Account/ForgotPassword",
      "/Privacypolicy",
    ];

    if (publicPaths.includes(path)) {
      urlAuthorize = true;
    }
  });

  return urlAuthorize;
};
