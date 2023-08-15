import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../components/Tools/OpcitionHabilite";
import Componentindex from "../../components/Body/Statistics/Componentindex";
import {
  ApiQueryStatistics,
  ApiQueryListpruebaxGroup,
  ApiQueryUpdateDataStatus,
  ApiQueryUpdateDataStatusPanelTerciario,
} from "../api/Statistics/[id]";
import { strToDate } from "../../components/Tools/functiones";
export default function Index({ cookie, query }) {
  const [fechaIni, SetfechaIni] = useState("");
  const [fechaFin, Setfechafin] = useState("");
  const [ValueChangeGrupoBarras, SetValueChangeGrupoBarras] = useState("");
  const [ValueChangePruebaBarras, SetValueChangePruebaBarras] = useState("");
  const [ValueChangeGrupoTorta, SetValueChangeGrupoTorta] = useState("");

  const [ListDashboardPrinpal, SetListDashboardPrinpal] = useState([]);
  const [ListDashboardSecundario, SetListDashboardSecundario] = useState([]);
  const [
    ListDashboardSecundarioFilterComponent,
    SetListDashboardSecundarioFilterComponent,
  ] = useState([["Estatus", "Total"]]);

  const [
    ListDashboardTerciarioFilterComponent,
    SetListDashboardTerciarioFilterComponent,
  ] = useState([]);

  const [ListDashboardTerciario, SetListDashboardTerciario] = useState([]);
  const [ListGroup, SetListGroup] = useState([]);
  const [ListStatus, SetListStatus] = useState([]);

  useEffect(() => {
    ApiQueryStatistics(
      cookie,
      query.DateIni,
      query.DateEnd,
      SetListDashboardPrinpal,
      SetListDashboardSecundario,
      SetListGroup
    );
    SetfechaIni(strToDate(query.DateIni).toISOString());
    Setfechafin(strToDate(query.DateEnd).toISOString());

    if (
      ListDashboardSecundario != undefined &&
      ListDashboardSecundario != null
    ) {
      if (ListDashboardSecundario.length > 0) {
        if (ListDashboardSecundarioFilterComponent.length > 1) {
          SetListDashboardSecundarioFilterComponent([["Estatus", "Total"]]);
        }

        ListDashboardSecundario.map((data) =>
          SetListDashboardSecundarioFilterComponent((preventArray) => [
            ...preventArray,
            ...[[data.NOMBRE_PRUEBA, data.CANTIDAD_TOTAL]],
          ])
        );
      }
    }
  }, [fechaIni, fechaFin]);

  /* efecto para ejecutar el cambio de la data Torta */
  useEffect(() => {
    if (ValueChangeGrupoTorta != "") {
      ApiQueryUpdateDataStatus(
        cookie,
        ValueChangeGrupoTorta,
        query.DateIni,
        query.DateEnd,
        SetListDashboardSecundario
      );
    }
  }, [ValueChangeGrupoTorta]);

  useEffect(() => {
    if (
      ListDashboardSecundario != undefined &&
      ListDashboardSecundario != null
    ) {
      if (ListDashboardSecundario.length > 0) {
        if (ListDashboardSecundarioFilterComponent.length > 1) {
          SetListDashboardSecundarioFilterComponent([["Estatus", "Total"]]);
        }

        ListDashboardSecundario.map((data) =>
          SetListDashboardSecundarioFilterComponent((preventArray) => [
            ...preventArray,
            ...[[data.NOMBRE_PRUEBA, data.CANTIDAD_TOTAL]],
          ])
        );
      }
    }
  }, [ListDashboardSecundario]);

  /* efecto para ejecutar el cambio de la data de la barra */
  useEffect(() => {
    if (ValueChangeGrupoBarras != "") {
      ApiQueryListpruebaxGroup(cookie, ValueChangeGrupoBarras, SetListStatus);
    }
  }, [ValueChangeGrupoBarras]);

  useEffect(() => {
    if (ValueChangePruebaBarras != "") {
      ApiQueryUpdateDataStatusPanelTerciario(
        cookie,
        ValueChangeGrupoBarras,
        ValueChangePruebaBarras,
        query.DateIni,
        query.DateEnd,
        SetListDashboardTerciario
      );
    } else {
      SetListDashboardTerciarioFilterComponent([]);
    }
  }, [ValueChangePruebaBarras]);

  useEffect(() => {
    if (ListDashboardTerciario != null && ListDashboardTerciario != undefined) {
      if (ListDashboardTerciario.length > 0) {
        if (ListDashboardTerciarioFilterComponent.length > 0) {
          SetListDashboardTerciarioFilterComponent([]);
        }
        let contador = 1;
        let arrayComplete = [];
        ListDashboardTerciario.map((data) => {
          if (contador === 1) {
            let variables = [];
            variables.push("Estatus");
            ListDashboardTerciario.map((item) => {
              if (!variables.some((d) => d == item.RESULTADO_PLANTILLA)) {
                variables.push(item.RESULTADO_PLANTILLA);
              }
            });
            arrayComplete.push(variables);
          }else{
            
          }
          contador++;
        });
        console.log(arrayComplete);
        SetListDashboardTerciarioFilterComponent(arrayComplete);
      }
    }
  }, [ListDashboardTerciario]);

  return (
    <>
      <Head>
        <title>{"Estadística | Bitácora BD"}</title>
        <meta
          name="description"
          content={
            "Proporciona información, a partir del análisis de un grupo relativamente pequeño de datos, que refleja la naturaleza de un grupo mayor"
          }
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta name="twitter:title" content="Estadística - Bitácora BD" />
        <meta
          name="twitter:description"
          content="Proporciona información, a partir del análisis de un grupo relativamente pequeño de datos, que refleja la naturaleza de un grupo mayor"
        ></meta>
        <meta property="og:title" content="Estadística - Bitácora BD" />
        <meta
          property="og:description"
          content="Proporciona información, a partir del análisis de un grupo relativamente pequeño de datos, que refleja la naturaleza de un grupo mayor"
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>

      <Componentindex
        fechaIni={fechaIni}
        fechaFin={fechaFin}
        ListDashboardPrinpal={ListDashboardPrinpal}
        ListGroup={ListGroup}
        ListStatus={ListStatus}
        SetValueChangeGrupoTorta={SetValueChangeGrupoTorta}
        SetValueChangeGrupoBarras={SetValueChangeGrupoBarras}
        ValueChangeGrupoTorta={ValueChangeGrupoTorta}
        ListDashboardSecundarioFilterComponent={
          ListDashboardSecundarioFilterComponent
        }
        SetValueChangePruebaBarras={SetValueChangePruebaBarras}
        fechaFormatIni={query.DateIni}
        fechaFormatFin={query.DateEnd}
        ValueChangePruebaBarras={ValueChangePruebaBarras}
      ></Componentindex>
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

    if (
      ctx.query.DateIni == null ||
      ctx.query.DateIni == undefined ||
      ctx.query.DateEnd == null ||
      ctx.query.DateEnd == undefined
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
