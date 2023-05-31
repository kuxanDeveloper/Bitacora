import React, { useState, useEffect } from "react";
import Head from "next/head";
import EditStickerComponents from "../../../components/Body/EditStiker";
import { QueryActivegroup } from "../../../components/Tools/CRUD";
import { SampleDetailsEdit } from "../../api/Sample/ViewDetails/[id]";
function EditPage({ ListadoGrupoActivo, id, group, cookie }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsEdit(cookie, id, setLInforSampleDetails);
  }, []);

  return (
    <>
      <Head>
        <title>{`Edición de sticker N° ${id} | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Se puede editar el sticker`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Edición de sticker N° ${id} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Se puede editar el sticker`}
        ></meta>
        <meta
          property="og:title"
          content={`Edición de sticker N° ${id} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Se puede editar el sticker`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <EditStickerComponents
        ListadoGrupoActivo={ListadoGrupoActivo}
        InforSampleDetails={InforSampleDetails}
        group={group}
        id={id}
      ></EditStickerComponents>
    </>
  );
}

export default EditPage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    if (
      ctx.query.id == undefined ||
      ctx.query.id == null ||
      ctx.query.group == null ||
      ctx.query.group == undefined
    ) {
      return { notFound: true };
    }

    const ListadoGrupoActivo = await QueryActivegroup(cookie);

    return {
      props: {
        cookie: cookie,
        ListadoGrupoActivo: ListadoGrupoActivo,
        id: ctx.query.id,
        group: ctx.query.group,
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
