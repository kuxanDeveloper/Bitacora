import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import stylesNotFound from "../styles/NoFound.module.css"
function NotFound() {
  const Page404 = dynamic(() => import("../components/Tools/Page404"), {
    loading: () => <p>Loading...</p>,
  });
  return (
    <>
      <Head>
        <title>{"Página no encontrada | Bitácora"}</title>
        <meta
          name="description"
          content={"No se puede acceder a este sitio web"}
        />
        <meta property="og:type" content="website" />
      </Head>
      <Page404 stylesNotFound={stylesNotFound} />
    </>
  );
}

export default NotFound;
