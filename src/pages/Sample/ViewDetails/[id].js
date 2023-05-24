import React, { useState, useEffect } from "react";
import StickerInfo from "../../../components/Body/StickerInfo";
import { SampleDetailsEdit } from "../../api/Sample/ViewDetails/[id]";
import Head from "next/head";
function ViewDetails({ cookie, id }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsEdit(cookie, id, setLInforSampleDetails);
  }, []);

  return (
    <>
      <Head>
        <title>{`Información sticker N° ${id} | Bitácora BD`}</title>
        <meta name="description" content={`Detalle del sticker de muestra`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Información sticker N° ${id} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Detalle del sticker de muestra`}
        ></meta>
        <meta
          property="og:title"
          content={`Información sticker N° ${id} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Detalle del sticker de muestra`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <StickerInfo
        InforSampleDetails={InforSampleDetails}
        id={id}
      ></StickerInfo>
    </>
  );
}

export default ViewDetails;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
      return { notFound: true };
    }

    // const InforSampleDetails = await QueryMuestraEdit(cookie, ctx.query.id);

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
