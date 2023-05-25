import React from "react";
import Head from "next/head";
import ComponentsCreateNote from "../../../components/Body/NoteCrud/Create";
function PageCreateFollowup({id}) {

  return (
    <>
      <Head>
        <title>{`Agregar nota al sticker N° ${id} | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Agrega una nota de seguimiento al sticker con su grupo perteneciente`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Agregar nota al sticker N° ${id} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Agrega una nota de seguimiento al sticker con su grupo perteneciente`}
        ></meta>
        <meta
          property="og:title"
          content={`Agregar nota al sticker N° ${id} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Agrega una nota de seguimiento al sticker con su grupo perteneciente`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <ComponentsCreateNote id={id} />
    </>
  );
}

export default PageCreateFollowup;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
      return { notFound: true };
    }

    return {
      props: {
        cookie: cookie,
        id: ctx.query.id,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/account/Login",
      },
    };
  }
}
