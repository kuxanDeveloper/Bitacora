import React, { useState, useEffect } from "react";
import { queryListUserAll } from "../components/Tools//Security";
import Case from "@/components/Case";
import Head from "next/head";
import CaseStatus from "@/components/CaseStatus";
import Filters from "@/components/Body/Filters";
import { useRouter } from "next/router";
import {
  useEffecIDPerformance,
  useEffecIDPerformanceRouterEvents,
} from "../components/Tools/functiones";
function HomeMuestraxGrupo({ cookie, query, ListadoUsuariosRegistrados }) {
  const [isTrueActive, setisTrueActive] = useState(false);
  const [isUserInterno, setisUserInterno] = useState(false);
  const [isSampleGeneral, setisSampleGeneral] = useState(false);
  const [GrupoNombre, setGrupoNombre] = useState("");
  const [ListadoGrupo, setListadoGrupo] = useState([]);
  const [ListadoMuestraActivo, setListadoMuestraActivo] = useState([]);
  const [ListadoMuestraInactivo, setListadoMuestraInactivo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    useEffecIDPerformance(
      cookie,
      query.id,
      query.Numstiker,
      query.DateAdmission,
      query.result,
      query.URS,
      setGrupoNombre,
      setListadoGrupo,
      setListadoMuestraActivo,
      setListadoMuestraInactivo,
      setisTrueActive,
      setisUserInterno,
      setisSampleGeneral,
      router
    );
  }, []);

  useEffect(() => {
    useEffecIDPerformanceRouterEvents(
      setisTrueActive,
      setisUserInterno,
      setisSampleGeneral,
      router
    );
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{`Muestras - ${GrupoNombre} | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Donde indicaran todas las muestras activas o inactivas del grupo ${GrupoNombre}`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Muestras - ${GrupoNombre} - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Donde indicaran todas las muestras activas o inactivas del grupo ${GrupoNombre}`}
        ></meta>
        <meta
          property="og:title"
          content={`Muestras - ${GrupoNombre} - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Donde indicaran todas las muestras activas o inactivas del grupo ${GrupoNombre}`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <Filters
        isActiveGroup={false}
        CasosActivo_Inactivos={isTrueActive}
        id={query.id}
        isActiveCase={true}
        ListadoUsuariosRegistrados={ListadoUsuariosRegistrados}
        NumSticker={query.Numstiker}
        dateAdmision={query.DateAdmission}
        result={query.result}
        URS={query.URS}
        HrefArmado={{ pathname: "/[id]", query: query }}
        isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
      ></Filters>
      <CaseStatus
        HrefArmado={{ pathname: "/[id]", query: query }}
        isTrueActive={isTrueActive}
        isActiveCase={false}
        isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
      ></CaseStatus>
      <Case
        HrefArmado={{ pathname: "/[id]", query: query }}
        ListadoGrupo={ListadoGrupo}
        ListadoMuestraActivo={ListadoMuestraActivo}
        ListadoMuestraInactivo={ListadoMuestraInactivo}
        isTrueActive={isTrueActive}
        idGruop={query.id}
        isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
      ></Case>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
      return { notFound: true };
    }

    const ListadoUsuariosRegistrados = await queryListUserAll(cookie);
    return {
      props: {
        cookie: cookie,
        query: ctx.query,
        ListadoUsuariosRegistrados: ListadoUsuariosRegistrados,
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

export default HomeMuestraxGrupo;
