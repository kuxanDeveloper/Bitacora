import React, { useEffect } from "react";
import Head from "next/head";
import Logincomponents from "@/components/Account/Logincomponents";
import { userService } from "../../services/UserService";
function Login({ cookie }) {
  if (cookie) {
    useEffect(() => {
      userService.logoutLogin();
    }, []);
  }

  return (
    <>
      <Head>
        <title>{"Inicio de sesión | Bitácora BD"}</title>
        <meta name="description" content={"Inicia sesion en bitácora BD"} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta name="twitter:title" content="Inicio de sesión - Bitácora BD" />
        <meta
          name="twitter:description"
          content="Inicia sesión en bitácora"
        ></meta>
        <meta property="og:title" content="Inicio de sesion - Bitácora BD" />
        <meta property="og:description" content="Inicia sesion en bitácora BD" />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <Logincomponents />
    </>
  );
}

export default Login;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (!cookie) {
    return {
      props: {
        cookie: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/#Cactive",
      },
    };
  }
}
