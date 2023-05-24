import React from "react";
import Head from "next/head";
import CreateSticker from "../../../components/Body/CreateSticker";
import { QueryActivegroup } from "../../../components/Tools/CRUD";
function CreatePage({ ListadoGrupoActivo, cookie, id }) {
  return (
    <>
      <Head>
        <title>{`Creación de sticker | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde crea el sticker para su registro posterior de resultados`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Creación de sticker - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde crea el sticker para su registro posterior de resultados`}
        ></meta>
        <meta
          property="og:title"
          content={`Creación de sticker - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde crea el sticker para su registro posterior de resultados`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <CreateSticker
        ListadoGrupoActivo={ListadoGrupoActivo}
        id={id}
      ></CreateSticker>
    </>
  );
}

export default CreatePage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    const ListadoGrupoActivo = await QueryActivegroup(cookie);

    return {
      props: {
        cookie: cookie,
        ListadoGrupoActivo: ListadoGrupoActivo,
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
