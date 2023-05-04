import {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { useMediaQuery } from "react-responsive";
export const BitacoraContext = createContext();
import { useRouter } from "next/router";
import { userService } from "../services/UserService";
export const useContextBitacora = () => useContext(BitacoraContext);

export const BicatoraContexProvider = ({ children }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [authorized, setAuthorized] = useState(false);
  const [Urlauthorized, setUrlauthorized] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}`;


  function authCheck() {
    // redirect to login page if accessing a private page and not logged in
    let url = router.asPath;
    const path = url.split("?")[0];
    const publicPaths = [
      "/Account/Register",
      "/Account/Login",
      "/Account/ForgotPassword",
      "/Privacypolicy",
    ];

    if (userService.userValue) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }

    if (publicPaths.includes(path)) {
      setUrlauthorized(true);
    } else {
      setUrlauthorized(false);
    }
  }

  useEffect(() => {
    // on initial load - run auth check
    authCheck();

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
  }, [authorized]);

  return (
    <BitacoraContext.Provider value={{ isMobile, URL, authorized, Urlauthorized }}>
      {children}
    </BitacoraContext.Provider>
  );
};
