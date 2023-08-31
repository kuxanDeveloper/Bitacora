import React, { useState, useEffect } from "react";
import FilterCsv from "../../components/Body/Statistics/FilterCsv";
import TableCsv from "../../components/Body/Statistics/TableCsv";
import { SampleComboGroup } from "../api/Sample/ViewDetailsGroup/[id]";
import Head from "next/head";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../components/Tools/OpcitionHabilite";
import { SampleDetailsFechaBitc } from "../api/Sample/ViewDetailsTrazabilidad/[id]";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

function Index({ cookie, query }) {
  const [FechaIngreso, setFechaIngreso] = useState(
    query.dateinicial != undefined && query.dateinicial != null
      ? query.dateinicial
      : ""
  );

  const [FechaIngresoFinal, setFechaFinal] = useState(
    query.dateFinal != undefined && query.dateFinal != null
      ? query.dateFinal
      : ""
  );

  const [valueGrupo, setvalueGrupo] = useState(
    query.grupo != undefined && query.grupo != null ? query.grupo : ""
  );

  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  const [InforGroupCombo, setInforGroupCombo] = useState([]);

  useEffect(() => {
    SampleDetailsFechaBitc(
      setLInforSampleDetails,
      cookie,
      query.dateinicial != undefined && query.dateinicial != null
        ? query.dateinicial
        : dayjs().day(-30).format("YYYY/MM/DD"),
      query.dateFinal != undefined && query.dateFinal != null
        ? query.dateFinal
        : dayjs().format("YYYY/MM/DD"),
      query.page,
      query.grupo
    );
  }, [FechaIngresoFinal]);

  useEffect(() => {
    SampleComboGroup(setInforGroupCombo, cookie);
  }, []);
  return (
    <>
      <Head>
        <title>{`Fechas Stickers | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde se lista las Fechas Stickers`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta name="twitter:title" content={`Fechas Stickers - Bitácora BD`} />
        <meta
          name="twitter:description"
          content={`Lugar donde se lista las Fechas Stickers`}
        ></meta>
        <meta property="og:title" content={`Fechas Stickers - Bitácora BD`} />
        <meta
          property="og:description"
          content={`Lugar donde se lista las Fechas Stickers`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <FilterCsv
        FechaIngreso={FechaIngreso}
        FechaIngresoFinal={FechaIngresoFinal}
        valueGrupo={valueGrupo}
        setFechaIngreso={setFechaIngreso}
        setFechaFinal={setFechaFinal}
        setvalueGrupo={setvalueGrupo}
        InforGroupCombo={InforGroupCombo}
      ></FilterCsv>

      <TableCsv
        InforSampleDetails={InforSampleDetails}
        query={query}
      ></TableCsv>
    </>
  );
}

export default Index;

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
      !Options.BtnEditStickerAndUrl ||
      ctx.query.page == undefined ||
      ctx.query.page == null
    ) {
      return { notFound: true };
    }

    return {
      props: {
        cookie: cookie,
        query: ctx.query,
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
