import React, { useState, useEffect } from "react";
import Head from "next/head";
import IndexOption from "../../../components/Body/OptionResult/index";
import { SampleDetailsOptionResult } from "../../api/Sample/ViewDetailsCRUDResult/[id]";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";

function CreatePage({ cookie, query }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsOptionResult(setLInforSampleDetails, cookie, "", query.page);
  }, []);

  return (
    <>
      <Head>
        <title>{`Listado de opciones | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde se listan las opciones para los resultados del sistema`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Listado de opciones - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde se listan las opciones para los resultados del sistema`}
        ></meta>
        <meta
          property="og:title"
          content={`Listado de opciones - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde se listan las opciones para los resultados del sistema`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <IndexOption InforSampleDetails={InforSampleDetails} query={query}></IndexOption>
    </>
  );
}

export default CreatePage;

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

    if (
      !Options.OptionCreateAndUrl ||
      ctx.query.page == undefined ||
      ctx.query.page == null
    ) {
      return { notFound: true };
    }

    return { props: { cookie: cookie, query: ctx.query } };
  } else {
    return {
      redirect: {
        destination: "/account/Login",
      },
    };
  }
}
