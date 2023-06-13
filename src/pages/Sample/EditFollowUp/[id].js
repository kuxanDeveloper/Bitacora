import React, { useEffect, useState } from "react";
import Head from "next/head";
import ComponentEditNote from "../../../components/Body/NoteCrud/Edit";
import { InfoteNoteEditApi } from "../../api/Sample/ViewDetails/[id]";
function PageEditFollowup({ cookie, id }) {
  const [InfoNote, setInfoNote] = useState([]);
  useEffect(() => {
    InfoteNoteEditApi(cookie, id, setInfoNote);
  }, []);
  return (
    <>
      <Head>
        <title>{`Editar nota de sticker N° ${id} | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Edita una nota de seguimiento del sticker`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Editar nota de sticker N° ${id} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Edita una nota de seguimiento del sticker`}
        ></meta>
        <meta
          property="og:title"
          content={`Editar nota de sticker N° ${id} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Edita una nota de seguimiento del sticker`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <ComponentEditNote InfoNote={InfoNote} id={id} />
    </>
  );
}

export default PageEditFollowup;

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
