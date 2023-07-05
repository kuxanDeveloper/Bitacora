import React from "react";
import ComponentRecoveryUser from "../../../components/Body/Users/RecoveryUser";
import Head from "next/head";

function PageForgotPassword() {
  return (
    <>
      <Head>
        <title>{"Cambiar contraseña | Bitácora BD"}</title>
        <meta
          name="description"
          content={`Bicátora BD sistema de registro de sticker y trazabilidad de los casos`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Cambiar contraseña - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Bicátora BD sistema de registro de sticker y trazabilidad de los casos`}
        ></meta>
        <meta
          property="og:title"
          content={`Cambiar contraseña - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Bicátora BD sistema de registro de sticker y trazabilidad de los casos`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <ComponentRecoveryUser></ComponentRecoveryUser>
    </>
  );
}

export default PageForgotPassword;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    return {
      props: { cookie: cookie },
    };
  } else {
    return {
      redirect: {
        destination: "/account/Login",
      },
    };
  }
}
