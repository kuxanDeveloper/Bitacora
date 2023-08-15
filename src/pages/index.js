import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../components/Tools/OpcitionHabilite";
import { SampleDetailsAncestro } from "./api/Sample/ViewDetailsAncestro/[id]";
import IndexComponentAdmin from "../components/RolesComponents/Ancestro/IndexComponent";

export default function Home({ cookie }) {
  const [InfoAncestro, setInfoAncestro] = useState([]);
  useEffect(() => {
    SampleDetailsAncestro(setInfoAncestro, cookie, "", "1");
  }, []);
  return (
    <>
      <Head>
        <title>{"Inicio | Bitácora BD"}</title>
        <meta
          name="description"
          content={
            "Inicio donde se muestra los prupos principales de los laboratorio de la Bitacora"
          }
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta name="twitter:title" content="Inicio - Bitácora BD" />
        <meta
          name="twitter:description"
          content="Inicio donde se muestra los prupos principales de los laboratorio de la Bitacora"
        ></meta>
        <meta property="og:title" content="Inicio - Bitácora BD" />
        <meta
          property="og:description"
          content="Inicio donde se muestra los prupos principales de los laboratorio de la Bitacora"
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>

      <div className="cases_container">
        <IndexComponentAdmin InfoAncestro={InfoAncestro}></IndexComponentAdmin>
      </div>
    </>
  );
}

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




    return {
      props: {
        cookie: cookie,
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
