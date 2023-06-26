import React, { useState, useEffect } from "react";
import { queryListUserAll } from "../components/Tools//Security";
import Case from "../components/Case";
import Head from "next/head";
import CaseStatus from "../components/CaseStatus";
import Filters from "../components/Body/Filters";
import { useRouter } from "next/router";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../components/Tools/OpcitionHabilite";

import { ApiQueryGeneralSample } from "./api/[id]";
function HomeMuestraxGrupo({
  cookie,
  query,
  ListadoUsuariosRegistrados,
  Options,
}) {
  const [isTrueActive, setisTrueActive] = useState(false);
  // const [isUserInterno, setisUserInterno] = useState(false);
  const [isSampleGeneral, setisSampleGeneral] = useState(false);
  const [GrupoNombre, setGrupoNombre] = useState("");
  const [ListadoGrupo, setListadoGrupo] = useState([]);
  const [ListadoMuestraActivo, setListadoMuestraActivo] = useState([]);
  const [ListadoMuestraInactivo, setListadoMuestraInactivo] = useState([]);
  const [ListadoResultadoxMuestra, setListadoResultadoxMuestra] = useState([]);
  const router = useRouter();
  useEffect(() => {
    ApiQueryGeneralSample(
      cookie,
      query.id,
      query.Numstiker,
      query.DateAdmission,
      query.result,
      query.URS,
      "",
      setGrupoNombre,
      setListadoGrupo,
      setListadoMuestraActivo,
      setListadoMuestraInactivo,
      setListadoResultadoxMuestra
    );
  }, []);

  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let urlHref = window.location.href;
      let hashs2 = router.asPath.split("#")[1];
      // let hashs3 = router.asPath.split("#")[2];
      let hashs4 = router.asPath.split("#")[2];

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
      // if (
      //   hashs3 == "UserInter" ||
      //   hashs3 == "" ||
      //   hashs3 == null ||
      //   hashs3 == undefined
      // ) {
      //   if (hashs3 == undefined) {
      //     window.history.pushState(
      //       { path: `${urlHref}#UserInter` },
      //       "",
      //       `${urlHref}#UserInter`
      //     );
      //     urlHref = window.location.href;
      //   }
      //   setisUserInterno(true);
      // } else {
      //   setisUserInterno(false);
      // }
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
      // let hashs3 = url.split("#")[2];
      let hashs4 = url.split("#")[2];
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

      // if (
      //   hashs3 == "UserInter" ||
      //   hashs3 == "" ||
      //   hashs3 == null ||
      //   hashs3 == undefined
      // ) {
      //   if (hashs3 == undefined) {
      //     window.history.pushState(
      //       { path: `${urlHref}#UserInter` },
      //       "",
      //       `${urlHref}#UserInter`
      //     );
      //     urlHref = window.location.href;
      //   }
      //   setisUserInterno(true);
      // } else {
      //   setisUserInterno(false);
      // }
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
        // isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
        Options={Options}
      ></Filters>
      <CaseStatus
        HrefArmado={{ pathname: "/[id]", query: query }}
        isTrueActive={isTrueActive}
        isActiveCase={false}
        // isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
      ></CaseStatus>
      <Case
        HrefArmado={{ pathname: "/[id]", query: query }}
        ListadoGrupo={ListadoGrupo}
        ListadoMuestraActivo={ListadoMuestraActivo}
        ListadoMuestraInactivo={ListadoMuestraInactivo}
        ListadoResultadoxMuestra={ListadoResultadoxMuestra}
        isTrueActive={isTrueActive}
        idGruop={query.id}
        // isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
        Options={Options}
      ></Case>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
      return { notFound: true };
    }

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

    const ListadoUsuariosRegistrados = await queryListUserAll(cookie);
    return {
      props: {
        cookie: cookie,
        query: ctx.query,
        ListadoUsuariosRegistrados: ListadoUsuariosRegistrados,
        Options,
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

export default HomeMuestraxGrupo;
