import "../styles/css500.css";
import React, { useEffect } from "react";
import { BicatoraContexProvider } from "../context/BitacoraContext";
import Loading from "../components/Tools/Loading";
import Layout from "../layout/Index";
import ErrorBoundary from "../components/Tools/ErrorBoundary";
import { usePageLoading } from "../components/Tools/usePageloading";
import { VerifyAccount } from "../components/Tools/useCheckedAcount";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
  const { user, authorized } = VerifyAccount();
  const router = useRouter();

  useEffect(() => {
    if (!authorized) {
      router.push({
        pathname: `/Account/Login`,
      });
    }
  }, []);

  return !authorized ? (
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
