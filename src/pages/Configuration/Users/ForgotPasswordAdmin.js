import React from "react";
import Recovery from "../../../components/Account/Recovery";
import Head from "next/head";
function ForgotPassword() {
  return (
    <>
      <Head>
        <title>{"¿Has olvidado la contraseña? | Bitácora BD"}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <Recovery></Recovery>;
    </>
  );
}

export default ForgotPassword;

export async function getStaticProps() {
  return {
    props: {
      path: null,
    },
    revalidate: 3600,
  };
}
