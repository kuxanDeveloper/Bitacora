import React, { useState, useEffect } from "react";
import StickerInfo from "../../../components/Body/StickerInfo";
import { SampleDetailsEdit } from "../../api/Sample/ViewDetails/[id]";
import Head from "next/head";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";
function ViewDetails({ cookie, id, Options }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsEdit(cookie, id, setLInforSampleDetails);
  }, []);

  return (
    <>
      <Head>
        <title>{`Información sticker N° ${
          InforSampleDetails.infoBitacora != null &&
          InforSampleDetails.infoBitacora != undefined
            ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
              "-" +
              InforSampleDetails.infoBitacora[0].SUFIJO
            : ""
        }  | Bitácora BD`}</title>
        <meta name="description" content={`Detalle del sticker de muestra`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Información sticker N° ${
            InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                "-" +
                InforSampleDetails.infoBitacora[0].SUFIJO
              : ""
          }  | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Detalle del sticker de muestra`}
        ></meta>
        <meta
          property="og:title"
          content={`Información sticker N° ${
            InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                "-" +
                InforSampleDetails.infoBitacora[0].SUFIJO
              : ""
          }  | Bitácora BD`}
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
        Options={Options}
        InforSampleDetails={InforSampleDetails}
        id={id}
      ></StickerInfo>
    </>
  );
}

export default ViewDetails;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
      return { notFound: true };
    }

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

    // const InforSampleDetails = await QueryMuestraEdit(cookie, ctx.query.id);

    return {
      props: {
        cookie: cookie,
        id: ctx.query.id,
        Options,
        Roles,
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
