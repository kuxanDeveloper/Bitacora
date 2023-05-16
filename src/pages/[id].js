import React, { useEffect, useState } from "react";
import { QueryGroupList, QueryMueForGroup } from "../components/Tools/Security";
import { userService } from "../services/UserService";
import Case from "@/components/Case";
import Head from "next/head";
import CaseStatus from "@/components/CaseStatus";
import Filters from "@/components/Body/Filters";
import { useRouter } from "next/router";
function HomeMuestraxGrupo({
  ListadoGrupo,
  GrupoNombre,
  ListadoMuestraActivo,
  ListadoMuestraInactivo,
  query,
}) {
  const [isTrueActive, setisTrueActive] = useState(false);
  const [isUserInterno, setisUserInterno] = useState(false);
  const [isSampleGeneral, setisSampleGeneral] = useState(false);

  const router = useRouter();
  if (
    ListadoGrupo == "401: Token incorrecto o vencido" ||
    ListadoMuestraActivo == "401: Token incorrecto o vencido" ||
    ListadoMuestraInactivo == "401: Token incorrecto o vencido"
  ) {
    userService.logout();
    return "";
  }

  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let urlHref = window.location.href;
      let hashs2 = router.asPath.split("#")[1];
      let hashs3 = router.asPath.split("#")[2];
      let hashs4 = router.asPath.split("#")[3];

      //#region Muestras Activas
      if (
        hashs2 == "Cactive" ||
        hashs2 == "" ||
        hashs2 == null ||
        hashs2 == undefined
      ) {
        if (hashs2 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#Cactive` },
            "",
            `${urlHref}#Cactive`
          );
          urlHref = window.location.href;
        }

        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
      //#endregion

      //#region Usuario Interno o externo
      if (
        hashs3 == "UserInter" ||
        hashs3 == "" ||
        hashs3 == null ||
        hashs3 == undefined
      ) {
        if (hashs3 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#UserInter` },
            "",
            `${urlHref}#UserInter`
          );
          urlHref = window.location.href;
        }
        setisUserInterno(true);
      } else {
        setisUserInterno(false);
      }
      //#endregion

      //#region Muestras generales o de urgencia
      if (
        hashs4 == "OverallSample" ||
        hashs4 == "" ||
        hashs4 == null ||
        hashs4 == undefined
      ) {
        if (hashs4 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#OverallSample` },
            "",
            `${urlHref}#OverallSample`
          );
          urlHref = window.location.href;
        }
        setisSampleGeneral(true);
      } else {
        setisSampleGeneral(false);
      }
      //#endregion
    }

    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      let hashs3 = url.split("#")[2];
      let hashs4 = url.split("#")[3];
      let urlHref = window.location.href;

      //#region Muestras activas/inactivas
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
      //#endregion

      //#region usuario interno/usuario externo

      if (
        hashs3 == "UserInter" ||
        hashs3 == "" ||
        hashs3 == null ||
        hashs3 == undefined
      ) {
        if (hashs3 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#UserInter` },
            "",
            `${urlHref}#UserInter`
          );
          urlHref = window.location.href;
        }
        setisUserInterno(true);
      } else {
        setisUserInterno(false);
      }
      //#endregion
    
      //#region Muestras generales /urgencias
      if (
        hashs4 == "OverallSample" ||
        hashs4 == "" ||
        hashs4 == null ||
        hashs4 == undefined
      ) {
        if (hashs4 == undefined) {
          window.history.pushState(
            { path: `${urlHref}#OverallSample` },
            "",
            `${urlHref}#OverallSample`
          );
          urlHref = window.location.href;
        }
        setisSampleGeneral(true);
      } else {
        setisSampleGeneral(false);
      }
      //#endregion
    
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
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
      <Filters></Filters>
      <CaseStatus
        HrefArmado={{ pathname: "/[id]", query: query }}
        isTrueActive={isTrueActive}
        isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
      ></CaseStatus>
      <Case
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
  let GroupName = "";
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
      return { notFound: true };
    }
    const ListadoGrupo = await QueryGroupList(cookie);
    const ListadoMuestraActivo = await QueryMueForGroup(
      cookie,
      "1",
      ctx.query.id
    );
    const ListadoMuestraInactivo = await QueryMueForGroup(
      cookie,
      "0",
      ctx.query.id
    );

    GroupName = ListadoGrupo.find(
      (data) => data.Id_grupo == ctx.query.id
    ).NOMBRE_GRUPO;
    return {
      props: {
        ListadoGrupo: ListadoGrupo == undefined ? null : ListadoGrupo,
        /*null*/
        ListadoMuestraActivo:
          ListadoMuestraActivo == undefined ? null : ListadoMuestraActivo,
        /*null*/
        ListadoMuestraInactivo:
          ListadoMuestraInactivo == undefined ? null : ListadoMuestraInactivo,
        GrupoNombre: GroupName,
        query: ctx.query,
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
