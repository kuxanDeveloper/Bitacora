import Router from "next/router";
import { useEffect, useState } from "react";
import { userService } from "../../services/UserService";
export const VerifyAccount = () => {
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(Router.asPath, setUser, setAuthorized);
    console.log(Router.asPath);

  }, []);

  return { user, authorized };
};

function authCheck(url, setUser, setAuthorized) {
  // redirect to login page if accessing a private page and not logged in

  console.log(userService.userValue,"service")
  setUser(userService.userValue);
  // const publicPaths = ["/Account/Login", "/Account/Register"];
  // const path = url.split("?")[0];
  if (!userService.userValue) {
    setAuthorized(false);
  } else {
    setAuthorized(true);
  }
}
