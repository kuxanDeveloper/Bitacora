import "../styles/css500.css";
import "../styles/globals.css";
import React from "react";
import { BicatoraContexProvider } from "../context/BitacoraContext";
import Loading from "../components/Tools/Loading";
import Layout from "../layout/Index";
import ErrorBoundary from "../components/Tools/ErrorBoundary";
import { usePageLoading } from "../components/Tools/usePageloading";

function MyApp({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
  // urlIsauthorized = urlAuthorized();

  // debugger;
  return (
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
          // <Component {...pageProps} />
        )}
      </BicatoraContexProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
