import React, { useEffect } from "react";
import Head from "next/head";
import Logincomponents from "@/components/Account/Logincomponents";
import Router from "next/router";
import { userService } from "../../services/UserService";
import StickerInfo from "@/components/Body/StickerInfo";
import Pop_up from "@/components/Body/Pop_up";
function Login({ cookie }) {
  if (cookie) {
    useEffect(() => {
      userService.logoutLogin();
    }, []);
  }

  return (
    <>
      <Head>
        <title>{"Inicio de sesión | Bitácora"}</title>
        <meta name="description" content={"Inicia sesion en bitácora"} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta name="twitter:title" content="Inicio de sesión - Bitácora" />
        <meta
          name="twitter:description"
          content="Inicia sesión en bitácora"
        ></meta>
        <meta property="og:title" content="Inicio de sesion - Bitácora" />
        <meta property="og:description" content="Inicia sesion en bitácora" />
        <meta property="og:site_name" content="Bitácora" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>

      <Pop_up></Pop_up>
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
