import React, { useEffect, useState } from "react";
import Head from "next/head";
import ComponentEditNote from "../../../components/Body/NoteCrudXSegum/Edit";
import { InfoteNoteEditApi } from "../../api/Sample/ViewDetails/[id]";
import {
  OptionAdministrator,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";
import { ListObservacion } from "../../api/Note/Crud";
import { useContextBitacora } from "../../../context/BitacoraContext";

function PageEditFollowup({ cookie, id, sticker, name_group,
    estatus, seguimiento, opcion, group }) {
  const { LstObservacionesPrede, setLstObservacionesPrede } =
    useContextBitacora();
  const [InfoNote, setInfoNote] = useState([]);
  useEffect(() => {
    InfoteNoteEditApi(cookie, id, setInfoNote);
    ListObservacion(cookie, setLstObservacionesPrede);
  }, []);

  return (
    <>
      <Head>
        <title>{`Editar nota al seguimiento del sticker N° ${sticker} | Bitácora BD`}</title>
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
          content={`Editar nota al seguimiento del sticker N° ${sticker} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Edita una nota de seguimiento del sticker`}
        ></meta>
        <meta
          property="og:title"
          content={`Editar nota al seguimiento del sticker N° ${sticker} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Edita una nota de seguimiento del sticker`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <ComponentEditNote
        InfoNote={InfoNote}
        id={id}
        sticker={sticker}
        name_group={name_group}
        LstObservacionesPrede={LstObservacionesPrede}
        estatus={estatus}
        seguimiento={seguimiento}
        opcion={opcion}
        group={group}
      />
    </>
  );
}

export default PageEditFollowup;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  if (cookie) {
    if (RolUser != null && RolUser != undefined && RolUser != "") {
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
      ctx.query.name_group == undefined ||
      ctx.query.name_group == null ||
      ctx.query.sticker == null ||
      ctx.query.sticker == null ||
      ctx.query.estatus == undefined ||
      ctx.query.estatus == null ||
      ctx.query.seguimiento == undefined ||
      ctx.query.seguimiento == null ||
      ctx.query.opcion == undefined ||
      ctx.query.opcion == null ||
      ctx.query.group == undefined ||
      ctx.query.group == null ||
      !Options.BtnEditNotaAndUrl
    ) {
      return { notFound: true };
    }

    return {
      props: {
        cookie: cookie,
        id: ctx.query.id,
        sticker: ctx.query.sticker,
        name_group: ctx.query.name_group,
        group: ctx.query.group,
        estatus: ctx.query.estatus,
        seguimiento: ctx.query.seguimiento,
        opcion: ctx.query.opcion
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