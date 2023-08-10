import React, { useState, useEffect } from "react";
import { queryListUserAll } from "../components/Tools//Security";
import { VerSwalCargando } from "../components/Tools/functiones";
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
import { useContextBitacora } from "../context/BitacoraContext";

import { ApiQueryGeneralSample } from "./api/[id]";
import { SampleDetailsWhitAncestroTabs } from "./api/Ancestro/[id]";

function HomeMuestraxGrupo({
  cookie,
  query,
  ListadoUsuariosRegistrados,
  Options,
}) {
  const { LstObservacionesPrede, setLstObservacionesPrede } =
    useContextBitacora();
  const [isTrueActive, setisTrueActive] = useState(false);
  const [HasValue, setHasValue] = useState("");
  const [HasValueSample, setHasValueSample] = useState("");
  // const [isUserInterno, setisUserInterno] = useState(false);
  const [isSampleGeneral, setisSampleGeneral] = useState(false);
  const [IdGrupAncest, setIdGrupAncest] = useState(false);
  const [GrupoNombre, setGrupoNombre] = useState("");
  const [ListadoGrupo, setListadoGrupo] = useState([]);
  const [ListadoMuestraActivo, setListadoMuestraActivo] = useState([]);
  const [ListadoMuestraInactivo, setListadoMuestraInactivo] = useState([]);
  const [ListadoResultadoxMuestra, setListadoResultadoxMuestra] = useState([]);
  const [ListadoGetFullSufijo, setListadoGetFullSufijo] = useState([]);
  const [idAncestro, setidAncestro] = useState("");
  const [cmbFiltroCambio, setcmbFiltroCambio] = useState("");
  const [ListaAncestros, setListaAncestros] = useState([]);
  // const [idAncestroSelc, setidAncestroSelc] = useState('');

  const router = useRouter();
  useEffect(() => {
    ApiQueryGeneralSample(
      cookie,
      query.id,
      query.Numstiker,
      query.DateAdmission,
      "",
      setGrupoNombre,
      setListadoGrupo,
      setListadoMuestraActivo,
      setListadoMuestraInactivo,
      setListadoResultadoxMuestra,
      setLstObservacionesPrede,
      setListadoGetFullSufijo,
      query.idAncestro == "" ||
        query.idAncestro == null ||
        query.idAncestro == 0
        ? 1
        : query.idAncestro,
      setListaAncestros,
      query.page
    );
    setidAncestro(query.idAncestro);
  }, []);

  function QueryReturnNew(obj, idNEw) {
    let newObje = {};
    newObje.id = idNEw;
    newObje.idAncestro = idAncestro;
    newObje.page = "1";
    if (
      (obj.Numstiker !== undefined &&
        obj.Numstiker !== null &&
        obj.Numstiker !== "") ||
      (obj.DateAdmission !== "" &&
        obj.DateAdmission !== undefined &&
        obj.DateAdmission !== null) ||
      (obj.result !== "" && obj.result !== null && obj.result !== undefined) ||
      (obj.URS !== "" && obj.URS !== null && obj.URS !== undefined)
    ) {
      newObje.Numstiker = obj.Numstiker;
      newObje.DateAdmission = obj.DateAdmission;
      newObje.result = obj.result;
      newObje.URS = obj.URS;
    }

    return newObje;
  }

  useEffect(() => {
    if (
      idAncestro != null &&
      idAncestro != "" &&
      idAncestro != 0 &&
      idAncestro != undefined
    ) {
      VerSwalCargando();
      SampleDetailsWhitAncestroTabs(cookie, idAncestro, setIdGrupAncest);
    }
  }, [cmbFiltroCambio]);

  useEffect(() => {
    if (
      IdGrupAncest != null &&
      IdGrupAncest != "" &&
      IdGrupAncest != undefined
    ) {
      router.push({
        pathname: "/[id]",
        query: QueryReturnNew(query, IdGrupAncest),
        hash: `${isTrueActive ? "Cactive" : "Cinactvie"}${
          isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
        }`,
      });
      setIdGrupAncest("");
    }
  }, [IdGrupAncest]);

  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let urlHref = window.location.href;
      let hashs2 = router.asPath.split("#")[1];
      let hashs4 = router.asPath.split("#")[2];

      //#region Muestras Activas

      if (HasValue == "") {
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
          setHasValue("Cactive");
          setisTrueActive(true);
        } else {
          setHasValue("Cinactvie");
          setisTrueActive(false);
        }
      } else {
        if (
          HasValue == "Cactive" ||
          HasValue == "" ||
          HasValue == null ||
          HasValue == undefined
        ) {
          if (hashs2 == undefined) {
            window.history.pushState(
              { path: `${urlHref}#Cactive` },
              "",
              `${urlHref}#Cactive`
            );

            urlHref = window.location.href;
          }
          setHasValue("Cactive");
          setisTrueActive(true);
        } else {
          setHasValue("Cinactvie");
          setisTrueActive(false);
        }
      }

      //#endregion

      if (HasValueSample == "") {
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
          setHasValueSample("OverallSample");

          setisSampleGeneral(true);
        } else {
          setHasValueSample("UrgentSamples");
          setisSampleGeneral(false);
        }
      } else {
        if (
          HasValueSample == "OverallSample" ||
          HasValueSample == "" ||
          HasValueSample == null ||
          HasValueSample == undefined
        ) {
          if (hashs4 == undefined) {
            window.history.pushState(
              { path: `${urlHref}#OverallSample` },
              "",
              `${urlHref}#OverallSample`
            );
            urlHref = window.location.href;
          }
          setHasValueSample("OverallSample");
          setisSampleGeneral(true);
        } else {
          setHasValueSample("UrgentSamples");
          setisSampleGeneral(false);
        }
      }

      //#endregion
    }
  }, [HasValue]);

  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      let urlHref = window.location.href;
      let hashs2 = router.asPath.split("#")[1];
      let hashs4 = router.asPath.split("#")[2];

      //#region Muestras generales o de urgencia
      if (HasValueSample == "") {
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
          setHasValueSample("OverallSample");

          setisSampleGeneral(true);
        } else {
          setHasValueSample("UrgentSamples");
          setisSampleGeneral(false);
        }
      } else {
        if (
          HasValueSample == "OverallSample" ||
          HasValueSample == "" ||
          HasValueSample == null ||
          HasValueSample == undefined
        ) {
          if (hashs4 == undefined) {
            window.history.pushState(
              { path: `${urlHref}#OverallSample` },
              "",
              `${urlHref}#OverallSample`
            );
            urlHref = window.location.href;
          }
          setHasValueSample("OverallSample");
          setisSampleGeneral(true);
        } else {
          setHasValueSample("UrgentSamples");
          setisSampleGeneral(false);
        }
      }

      //#endregion
    }
  }, [HasValueSample]);

console.log(query);

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
        HrefArmado={{ pathname: "/[id]", query: query }}
        // isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
        Options={Options}
        ListaAncestros={ListaAncestros}
        ListadoSufijosxGroupAll={ListadoGetFullSufijo}
        idAncestro={idAncestro}
        setidAncestro={setidAncestro}
        setcmbFiltroCambio={setcmbFiltroCambio}
        HasValue={HasValue}
        setHasValue={setHasValue}
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
        LstObservacionesPrede={LstObservacionesPrede}
        setHasValueSample={setHasValueSample}
        hrefhash={router.asPath}
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
    if (
      ctx.query.id == undefined ||
      ctx.query.id == null ||
      (ctx.query.page == null && ctx.query.page == undefined)
    ) {
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
