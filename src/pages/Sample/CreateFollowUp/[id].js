import React from "react";
import Head from "next/head";
import ComponentsCreateNote from "../../../components/Body/NoteCrud/Create";
import {
  OptionAdministrator,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";
import { ListObservacion } from "../../api/Note/Crud";
import { useContextBitacora } from "../../../context/BitacoraContext";
import { useEffect } from "react";

function PageCreateFollowup({ id, sticker, name_group, cookie, group }) {
  const { LstObservacionesPrede, setLstObservacionesPrede } =
    useContextBitacora();

  useEffect(() => {
    ListObservacion(cookie, setLstObservacionesPrede);
  }, []);

  return (
    <>
      <Head>
        <title>{`Agregar nota al sticker N° ${sticker} | Bitácora BD`}</title>
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
          content={`Agregar nota al sticker N° ${sticker} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Agrega una nota de seguimiento al sticker con su grupo perteneciente`}
        ></meta>
        <meta
          property="og:title"
          content={`Agregar nota al sticker N° ${sticker} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Agrega una nota de seguimiento al sticker con su grupo perteneciente`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <ComponentsCreateNote
        id={id}
        sticker={sticker}
        name_group={name_group}
        group={group}
        LstObservacionesPrede={LstObservacionesPrede}
      />
    </>
  );
}

export default PageCreateFollowup;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  if (cookie) {
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
      ctx.query.name_group == undefined ||
      ctx.query.name_group == null ||
      ctx.query.group == undefined ||
      ctx.query.group == null ||
      ctx.query.sticker == null ||
      ctx.query.sticker == null ||
      !Options.BtnCrearNotaAndUrl
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
