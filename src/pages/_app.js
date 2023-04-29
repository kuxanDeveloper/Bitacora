import "../styles/css500.css";
import React, { useEffect, useState } from "react";
import { BicatoraContexProvider } from "../context/BitacoraContext";
import Loading from "../components/Tools/Loading";
import Layout from "../layout/Index";
import ErrorBoundary from "../components/Tools/ErrorBoundary";
import { usePageLoading } from "../components/Tools/usePageloading";

import { useRouter } from "next/router";
import { userService } from "../services/UserService";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { isPageLoading } = usePageLoading();
  const [authorized, setAuthorized] = useState(false);
  const [Urlauthorized, setUrlauthorized] = useState(false);
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
  }, []);

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

  // urlIsauthorized = urlAuthorized();

  debugger;
  return !authorized || Urlauthorized ? (
    <ErrorBoundary>
      <div id="fb-root"></div>
      <Component {...pageProps} />
    </ErrorBoundary>
  ) : (
    <ErrorBoundary>
      <BicatoraContexProvider>
        {isPageLoading ? (
          <Loading></Loading>
        ) : (
          <Layout>
            <div id="fb-root"></div>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        )}
      </BicatoraContexProvider>
    </ErrorBoundary>
  );
}
