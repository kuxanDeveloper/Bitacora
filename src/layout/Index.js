import React, { Suspense } from "react";
import dynamic from "next/dynamic";

function Index({ children }) {
  const HeaderIndex = dynamic(() => import("../components/Header/HeaderIndex"));
  const FooterIndex = dynamic(() => import("../components/Footer/FooterIndex"));
  const Loader = dynamic(() => import("../components/Body/Loader"));
  return (
    <>
      <Loader></Loader>

      {/*Header */}
      <HeaderIndex />
      {/*body */}

      <Suspense fallback={<Loader />}>
        <main>{children}</main>
      </Suspense>
      <FooterIndex />
    </>
  );
}

export default Index;
