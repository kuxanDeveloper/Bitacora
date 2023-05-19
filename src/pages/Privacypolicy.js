import React from "react";
import Legal from "@/components/Body/Legal";
import Head from "next/head";
function Privacypolicy() {
  return (
    <>
      <Head>
        <title>{`Políticas de privacidad y condiciones de uso | Bitácora BD`}</title>
        <meta name="description" content={`Políticas de privacidad y condiciones de uso`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Políticas de privacidad y condiciones de uso | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Políticas de privacidad y condiciones de uso`}
        ></meta>
        <meta
          property="og:title"
          content={`Políticas de privacidad y condiciones de uso | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Políticas de privacidad y condiciones de uso`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <Legal></Legal>
    </>
  );
}

export default Privacypolicy;

export async function getStaticProps() {
  return {
    props: {
      path: null,
    },
    revalidate: 86400,
  };
}
