import React, { Suspense } from "react";
// import FooterIndex from "../components/Footer/FooterIndex";
import HeaderIndex from "../components/Header/HeaderIndex";
import Loader from "../components/Body/Loader";
import { initLogInactive } from "../components/Tools/Loginactivity";
import { useContextBitacora } from "../context/BitacoraContext";
function Index({ children }) {
  const { authorized, Urlauthorized } = useContextBitacora();
  console.log(authorized, Urlauthorized, "aaaaaa");
  return (
    <>
      {/* <Loader></Loader> */}
      {/*Header */}
      {authorized && !Urlauthorized ? <HeaderIndex /> : ""}

      {/*body */}
      {authorized && !Urlauthorized ? (
        <Suspense fallback={<Loader />}>
          <main onLoad={initLogInactive()}>{children}</main>
        </Suspense>
      ) : (
        <Suspense fallback={<Loader />}>
          <main >{children}</main>
        </Suspense>
      )}
      {/* <Suspense fallback={<Loader />}>
        <main onLoad={initLogInactive()}>{children}</main>
      </Suspense> */}
      {/* <FooterIndex /> */}
    </>
  );
}

export default Index;
