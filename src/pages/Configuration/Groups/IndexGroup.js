import React, { useState, useEffect } from "react";
import Head from "next/head";
import IndexGroup from "../../../components/Body/GroupCrud/Index";
import { SampleDetailsGroup } from "../../api/Sample/ViewDetailsGroup/[id]";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";

function CreatePage({ cookie, query }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  const [InforSufijos, setInforSufijos] = useState([]);
  useEffect(() => {
    SampleDetailsGroup(
      setLInforSampleDetails,
      setInforSufijos,
      cookie,
      "",
      query.page
    );
  }, []);

  return (
    <>
      <Head>
        <title>{`Listado de grupos | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde se listan los grupos de el sistema`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Listado de grupos - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde se listan los grupos de el sistema`}
        ></meta>
        <meta property="og:title" content={`Listado de grupos - Bitácora BD`} />
        <meta
          property="og:description"
          content={`Lugar donde se listan los grupos de el sistema`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <IndexGroup
        InforSampleDetails={InforSampleDetails}
        query={query}
      ></IndexGroup>
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
      !Options.GroupConfigCreateAndUrl ||
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
