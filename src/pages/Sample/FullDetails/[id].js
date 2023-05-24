import React, { useState, useEffect } from "react";
import { SampleDetailsEdit } from "../../api/Sample/ViewDetails/[id]";
import StickerDetails from "../../../components/Body/StickerDetails";
import { useEffecPerformancePruResultado } from "../../../components/Tools/functiones";
import Head from "next/head";
import { useRouter } from "next/router";
function FullDetailsPage({ cookie, query }) {
  const router = useRouter();
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  const [Pruebas, setPruebas] = useState(false);

  useEffect(() => {
    SampleDetailsEdit(cookie, query.id, setLInforSampleDetails);
  }, []);

  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let hashs2 = router.asPath.split("#")[1];
      if (
        hashs2 == "Pruebas" ||
        hashs2 == "" ||
        hashs2 == null ||
        hashs2 == undefined
      ) {
        setPruebas(true);
      } else {
        setPruebas(false);
      }
    }

    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      if (
        hash == "Pruebas" ||
        hash == "" ||
        hash == null ||
        hash == undefined
      ) {
        setPruebas(true);
      } else {
        setPruebas(false);
      }
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{`Detalles sticker N° ${query.id} | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Detalles generales del sticker como su resultados y sus notas`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Detalles sticker N° ${query.id} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Detalles generales del sticker como su resultados y sus notas`}
        ></meta>
        <meta
          property="og:title"
          content={`Información sticker N° ${query.id} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Detalles generales del sticker como su resultados y sus notas`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <StickerDetails
        InforSampleDetails={InforSampleDetails}
        query={query}
        Pruebas={Pruebas}
      />
    </>
  );
}

export default FullDetailsPage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
      return { notFound: true };
    }
    return {
      props: {
        cookie: cookie,
        query: ctx.query,
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
