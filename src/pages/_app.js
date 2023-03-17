import "../styles/css500.css"
import dynamic from "next/dynamic";
import { BicatoraContexProvider } from "../Context/BitacoraContext";
import { usePageLoading } from "@/loading/usePageloading";
export default function App({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
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
