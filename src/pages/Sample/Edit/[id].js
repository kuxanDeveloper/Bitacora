import React, { useState, useEffect } from "react";
import Head from "next/head";
import EditStickerComponents from "../../../components/Body/EditStiker";
import { QueryActivegroup } from "../../../components/Tools/CRUD";
import { SampleDetailsEdit } from "../../api/Sample/ViewDetails/[id]";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";

function EditPage({ ListadoGrupoActivo, id, group, cookie, isHabilteGroup }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsEdit(cookie, id, setLInforSampleDetails);
  }, []);

  return (
    <>
      <Head>
        <title>{`Edición de sticker N° ${
          InforSampleDetails.infoBitacora != null &&
          InforSampleDetails.infoBitacora != undefined
            ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
              "-" +
              InforSampleDetails.infoBitacora[0].SUFIJO
            : ""
        } | Bitácora BD`}</title>
        <meta name="description" content={`Se puede editar el sticker`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Edición de sticker N° ${
            InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                "-" +
                InforSampleDetails.infoBitacora[0].SUFIJO
              : ""
          } | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Se puede editar el sticker`}
        ></meta>
        <meta
          property="og:title"
          content={`Edición de sticker N° ${
            InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                "-" +
                InforSampleDetails.infoBitacora[0].SUFIJO
              : ""
          } | Bitácora BD`}
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
        isHabilteGroup={isHabilteGroup}
      ></EditStickerComponents>
    </>
  );
}

export default EditPage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;

  if (cookie && RolUser) {
    if (RolUser != null && RolUser != undefined && RolUser != "") {
      // RolUser.map((data)=>()){
      // }
      Roles = JSON.parse(RolUser);
      Roles.map((data) => {
        if (data == 1) {
          Options = OptionAdministrator;
        } else if (data == 2) {
          Options = OptionTecnichal;
        } else if (data == 3) {
          Options = OptionAsiste;
        } else if (data == 4) {
          Options = OptionConsult;
        } else {
          Options = OptionDefault;
        }
      });
    }

    if (
      ctx.query.id == undefined ||
      ctx.query.id == null ||
      ctx.query.group == null ||
      ctx.query.group == undefined ||
      ctx.query.isHabilteGroup == undefined ||
      ctx.query.isHabilteGroup == null ||
      !Options.BtnEditStickerAndUrl
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
        isHabilteGroup: ctx.query.isHabilteGroup,
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
