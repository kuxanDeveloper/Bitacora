import React from "react";
import Head from "next/head";
// import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

function Login() {
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
        <meta property="og:description" content="Inicio de sesion - Bitácora" />
        <meta property="og:description" content="Inicia sesion en bitácora" />
        <meta property="og:site_name" content="Bitácora" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <div>Hola1</div>
    </>
  );
}

export default Login;

export async function getStaticProps() {
  return {
    props: {
      path: null,
    },
    revalidate: 10,
  };
}
