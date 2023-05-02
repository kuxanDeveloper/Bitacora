import React, { Suspense } from "react";
import FooterIndex from "../components/Footer/FooterIndex";
import HeaderIndex from "../components/Header/HeaderIndex";
import Loader from "../components/Body/Loader";
import { initLogInactive } from "../components/Tools/Loginactivity";
function Index({ children }) {
  return (
    <>
      {/* <Loader></Loader> */}
      {/*Header */}
      <HeaderIndex />
      {/*body */}
      <Suspense fallback={<Loader />}>
        <main onLoad={initLogInactive()}>{children}</main>
      </Suspense>
      <FooterIndex />
    </>
  );
}

export default Index;
