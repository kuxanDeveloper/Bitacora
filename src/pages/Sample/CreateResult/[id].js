import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  ListPruebaxGroupApi,
  ListPlanResultadosxPru,
} from "../../api/Sample/CreateResultApi";
import ComponentCreateResult from "../../../components/Body/ResultCrud/Create";

function PageCreateResult({ id, cookie, group }) {
  const [ListResultados, setListResultados] = useState([]);
  const [ListPruebas, setListPruebas] = useState([]);
  const [valuePruebachange, setvaluePruebachange] = useState("1");
  useEffect(() => {
    ListPruebaxGroupApi(cookie, setListPruebas, group);
  }, []);

  useEffect(() => {
    ListPlanResultadosxPru(cookie, setListResultados, valuePruebachange);
  }, [valuePruebachange]);

  return (
    <>
      <Head>
        <title>{`Agregar resultado al sticker N° ${id} | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Agrega una prueba con un resultado realizado al sticker con su grupo perteneciente`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Agregar resultado al sticker N° ${id} | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Agrega una prueba con un resultado realizado al sticker con su grupo perteneciente`}
        ></meta>
        <meta
          property="og:title"
          content={`Agregar resultado al sticker N° ${id} | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Agrega una prueba con un resultado realizado al sticker con su grupo perteneciente`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <ComponentCreateResult
        ListPruebas={ListPruebas}
        ListResultados={ListResultados}
        setvaluePruebachange={setvaluePruebachange}
        id={id}
        group={group}
      />
    </>
  );
}

export default PageCreateResult;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    if (
      ctx.query.id == undefined ||
      ctx.query.id == null ||
      ctx.query.group == null ||
      ctx.query.group == undefined
    ) {
      return { notFound: true };
    }

    // const InforSampleDetails = await QueryMuestraEdit(cookie, ctx.query.id);

    return {
      props: {
        cookie: cookie,
        id: ctx.query.id,
        group: ctx.query.group,
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
