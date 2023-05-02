import React, { Suspense } from "react";
// import FooterIndex from "../components/Footer/FooterIndex";
import HeaderIndex from "../components/Header/HeaderIndex";
import Loader from "../components/Body/Loader";
import { initLogInactive } from "../components/Tools/Loginactivity";
import Filters from "@/components/Body/Filters";
import HomeCard from "@/components/Body/HomeCard";
function Index({ children }) {
  return (
    <>
      {/* <Loader></Loader> */}
      {/*Header */}
      <HeaderIndex />
      <Filters></Filters>
      <HomeCard></HomeCard>
      {/*body */}
      <Suspense fallback={<Loader />}>
        <main onLoad={initLogInactive()}>{children}</main>
      </Suspense>
      {/* <FooterIndex /> */}
    </>
  );
}

export default Index;
