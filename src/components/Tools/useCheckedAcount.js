import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userService } from "../../services/UserService";
export const VerifyAccount = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath,setUser);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {user, authorized}
};

function authCheck(url, setUser) {
  // redirect to login page if accessing a private page and not logged in
  setUser(userService.userValue);
  const publicPaths = ["/account/login", "/account/register"];
  const path = url.split("?")[0];
  if (!userService.userValue && !publicPaths.includes(path)) {
    setAuthorized(false);

  } else {
    setAuthorized(true);
  }
}
