import React from "react";
import Head from "next/head";
import Page500 from "../components/Tools/Page500";
function Custom500() {
  return (
    <>
      <Head>
        <title>{"Error 500 | Bitácora BD"}</title>
        <meta
          name="description"
          content={"Apartado para mostrar los errores que indica el sistema"}
        />
        <meta property="og:type" content="website" />
      </Head>
      <Page500 />;
    </>
  );
}

export default Custom500;
