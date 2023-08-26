import React, { useEffect, useState } from "react";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";
import Head from "next/head";
import { GetListNumber } from "../../api/Number/Crud";
import IndexNumber from "../../../components/Body/Number/Index";

function PageHome({ cookie, query }) {
  const [InfoNumber, SetInfoNumber] = useState([]);

  useEffect(() => {
    GetListNumber(cookie, query.page, SetInfoNumber);
  }, []);

  return (
    <>
      <Head>
        <title>{`Listado de números | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde se listan los numeros de los combos dinámicos`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Listado de números | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde se listan los numeros de los combos dinámicos`}
        ></meta>
        <meta
          property="og:title"
          content={`Listado de números | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde se listan los numeros de los combos dinámicos`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <IndexNumber InfoNumber={InfoNumber} query={query}></IndexNumber>
    </>
  );
}

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
      !Options.NumberCreateAndUrl ||
      ctx.query.page == undefined ||
      ctx.query.page == null
    ) {
      return { notFound: true };
    }

    return { props: { query: ctx.query, cookie: cookie } };
  } else {
    return {
      redirect: {
        destination: "/account/Login",
      },
    };
  }
}

export default PageHome;
