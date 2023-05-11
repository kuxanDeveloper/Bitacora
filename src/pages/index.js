import React, { useEffect, useState } from "react";
import {
  QueryActivegroup,
  QueryInactivegroup,
} from "../components/Tools//Security";
import { userService } from "../services/UserService";
import Filters from "@/components/Body/Filters";
import HomeCard from "@/components/Body/HomeCard";
import Head from "next/head";
import CaseStatus from "@/components/CaseStatus";
import { useRouter } from "next/router";

export default function Home({ ListadoGrupoActivo, ListadoGrupoInactivo }) {
  const [isTrueActive, setisTrueActive] = useState(false);

  if (
    ListadoGrupoActivo == "401: Token incorrecto o vencido" ||
    ListadoGrupoInactivo == "401: Token incorrecto o vencido"
  ) {
    userService.logout();
    return "";
  }

  const router = useRouter();
  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let hashs2 = router.asPath.split("#")[1];
      if (
        hashs2 == "Cactive" ||
        hashs2 == "" ||
        hashs2 == null ||
        hashs2 == undefined
      ) {
        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
    }

    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      if (
        hash == "Cactive" ||
        hash == "" ||
        hash == null ||
        hash == undefined
      ) {
        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

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
      <CaseStatus
        HrefArmado={{ pathname: "/" }}
        isTrueActive={isTrueActive}
      ></CaseStatus>
      <HomeCard
        HabilitarActive={isTrueActive}
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
