import { useEffect } from "react";
import {
  QueryActivegroup,
  QueryInactivegroup,
} from "../components/Tools//Security";
import { userService } from "../services/UserService";
import Filters from "@/components/Body/Filters";
import HomeCard from "@/components/Body/HomeCard";
import Head from "next/head";
import CaseStatus from "@/components/CaseStatus";
import Case from "@/components/Case";

export default function Home({ ListadoGrupoActivo, ListadoGrupoInactivo }) {
  debugger;
  if (
    ListadoGrupoActivo == "401: Token incorrecto o vencido" ||
    ListadoGrupoInactivo == "401: Token incorrecto o vencido"
  ) {
    debugger;
    userService.logout();
    return "";
  }



  return (
    <>
      <Head>
        <title>{"Inicio | Bitácora"}</title>
        <meta
          name="description"
          content={
            "Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la Bitacora"
          }
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta name="twitter:title" content="Inicio - Bitácora" />
        <meta
          name="twitter:description"
          content="Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la bitácora"
        ></meta>
        <meta property="og:title" content="Inicio - Bitácora" />
        <meta
          property="og:description"
          content="Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la bitácora"
        />
        <meta property="og:site_name" content="Bitácora" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <Filters></Filters>
      <CaseStatus></CaseStatus>
      <HomeCard
        ListadoGrupoActivo={ListadoGrupoActivo}
        ListadoGrupoInactivo={ListadoGrupoInactivo}
      ></HomeCard>
      {/* <Case></Case> */}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    debugger;
    const ListadoGrupoActivo = await QueryActivegroup(cookie);
    const ListadoGrupoInactivo = await QueryInactivegroup(cookie);

    return {
      props: {
        ListadoGrupoActivo:
          ListadoGrupoActivo == undefined ? null : ListadoGrupoActivo,
        ListadoGrupoInactivo:
          ListadoGrupoInactivo == undefined ? null : ListadoGrupoActivo,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/Account/Login",
      },
    };
  }
}
