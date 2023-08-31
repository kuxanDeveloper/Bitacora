import React from "react";
import Head from "next/head";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";
import CreateComponent from "../../../components/Body/Number/CreateComponent";

function Create() {
  return (
    <>
      <Head>
        <title>{`Creación de número | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde crean los números que seleccionaran despues las bitacoras`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Creación de número | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde crean los números que seleccionaran despues las bitacoras`}
        ></meta>
        <meta
          property="og:title"
          content={`Creación de número | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde crean los números que seleccionaran despues las bitacoras`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <CreateComponent></CreateComponent>
    </>
  );
}

export default Create;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  if (cookie && RolUser) {
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

    if (!Options.NumberCreateAndUrl) {
      return { notFound: true };
    }

    return { props: { mensaje: null } };
  } else {
    return {
      redirect: {
        destination: "/account/Login",
      },
    };
  }
}
