import "../styles/css500.css";
import dynamic from "next/dynamic";

import { BicatoraContexProvider } from "../context/BitacoraContext";

import { usePageLoading } from "../components/Tools/usePageloading";
import { VerifyAccount } from "../components/Tools/useCheckedAcount";
export default function App({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
  const { user, authorized } = VerifyAccount();
  const Loading = dynamic(() => import("../components/Tools/Loading"));

  const ErrorBoundary = dynamic(() =>
    import("../components/Tools/ErrorBoundary")
  );

  const Layout = dynamic(() => import("../layout/Index"));

  return (
    <ErrorBoundary>
      <BicatoraContexProvider>
        {isPageLoading ? (
          <Loading></Loading>
        ) : authorized ? (
          <Layout>
            <div id="fb-root"></div>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        ) : (
          <>
            <div id="fb-root"></div>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </>
        )}
      </BicatoraContexProvider>
    </ErrorBoundary>
  );
}
