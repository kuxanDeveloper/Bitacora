import React, { Suspense } from "react";
import dynamic from "next/dynamic";
function Index({ children }) {
  const HeaderIndex = dynamic(() => import("../components/Header/HeaderIndex"));
  const FooterIndex = dynamic(() => import("../components/Footer/FooterIndex"));
  const Loading = dynamic(() => import("../components/Tools/Loading"));
  return (
    <>
      {/*Header */}
      <HeaderIndex />
      {/*body */}
      <Suspense fallback={<Loading />}>
        <main>{children}</main>
      </Suspense>
      <FooterIndex />
    </>
  );
}

export default Index;
