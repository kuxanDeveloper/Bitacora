import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  ListPruebaxGroupApi,
  ListPlanResultadosxPru,
  ListOptionesxPlantilla,
  InfoResultEdiApi,
} from "../../api/Sample/EditResultApi";
import ComponentEditResult from "../../../components/Body/ResultCrud/Edit";
import {
  OptionAdministrator,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";

function PageCreateResult({ id, cookie, group, name_group, sticker }) {
  const [InfoResul, setInfoResul] = useState([]);
  const [ListResultados, setListResultados] = useState([]);
  const [ListOptiones, setListOptiones] = useState([]);
  const [ListPruebas, setListPruebas] = useState([]);
  const [valuePruebachange, setvaluePruebachange] = useState("");
  const [valuePlantillachange, setvaluePlantillachange] = useState("");
  useEffect(() => {
    InfoResultEdiApi(cookie, id, setInfoResul);
    ListPruebaxGroupApi(cookie, setListPruebas, group);
  }, []);

  useEffect(() => {
    ListPlanResultadosxPru(cookie, setListResultados, valuePruebachange);
  }, [valuePruebachange]);

  useEffect(() => {
    ListOptionesxPlantilla(cookie, setListOptiones, valuePlantillachange);
  }, [valuePlantillachange]);

  useEffect(() => {
    if (InfoResul != null && InfoResul != undefined) {
      if (InfoResul.length > 0) {
        setvaluePruebachange(InfoResul[0].CODIGO_PRUEBA);
        setvaluePlantillachange(InfoResul[0].CODIGO_RESULTADO_PLANILLA);
      }
    }
  }, [InfoResul]);

  return (
    <>
      <Head>
        <title>{`Editar resultado del sticker N° ${sticker} | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Edita la prueba realizada al sticker con su grupo perteneciente`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Editar resultado del sticker N° ${sticker} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Edita la prueba realizada al sticker con su grupo perteneciente`}
        ></meta>
        <meta
          property="og:title"
          content={`Editar resultado del sticker N° ${sticker} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Edita la prueba realizada al sticker con su grupo perteneciente`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <ComponentEditResult
        InfoResul={InfoResul}
        ListPruebas={ListPruebas}
        ListResultados={ListResultados}
        ListOptiones={ListOptiones}
        setvaluePruebachange={setvaluePruebachange}
        setvaluePlantillachange={setvaluePlantillachange}
        id={id}
        group={group}
        name_group={name_group}
        sticker={sticker}
      />
    </>
  );
}

export default PageCreateResult;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  if (cookie) {
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
      ctx.query.id == undefined ||
      ctx.query.id == null ||
      ctx.query.group == null ||
      ctx.query.group == undefined ||
      ctx.query.name_group == undefined ||
      ctx.query.name_group == null ||
      ctx.query.sticker == null ||
      ctx.query.sticker == null ||
      !Options.BtnEditResultAndUrl
    ) {
      return { notFound: true };
    }

    return {
      props: {
        cookie: cookie,
        id: ctx.query.id,
        group: ctx.query.group,
        name_group: ctx.query.name_group,
        sticker: ctx.query.sticker,
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
