import React, { useState, useEffect } from "react";
import { SampleDetailsEdit } from "../../api/Sample/ViewDetails/[id]";
import StickerDetails from "../../../components/Body/StickerDetails";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  OptionAdministrator,
  OptionTecnichal,
  OptionAsiste,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";
import { useContextBitacora } from "../../../context/BitacoraContext";
function FullDetailsPage({ cookie, query, Options }) {
  const router = useRouter();
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  const [Pruebas, setPruebas] = useState(false);
  const [HasValue, setHasValue] = useState("");

  const { LstObservacionesPrede, setLstObservacionesPrede } =
    useContextBitacora();
  useEffect(() => {
    SampleDetailsEdit(
      cookie,
      query.id,
      setLInforSampleDetails,
      setLstObservacionesPrede
    );
  }, []);

  useEffect(() => {
    if (
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_RELOAD ||
      window.performance.navigation.type ==
        window.performance.navigation.TYPE_NAVIGATE
    ) {
      if (HasValue == "") {
        let hashs2 = router.asPath.split("#")[1];

        if (
          hashs2 == "Pruebas" ||
          hashs2 == "" ||
          hashs2 == null ||
          hashs2 == undefined
        ) {
          setHasValue("Pruebas");
          setPruebas(true);
        } else {
          setHasValue("Notas");
          setPruebas(false);
        }
      } else {
        if (
          HasValue == "Pruebas" ||
          HasValue == "" ||
          HasValue == null ||
          HasValue == undefined
        ) {
          setHasValue("Pruebas");
          setPruebas(true);
        } else {
          setHasValue("Notas");
          setPruebas(false);
        }
      }
    }
  }, [HasValue]);

  return (
    <>
      <Head>
        <title>{`Detalles sticker N° ${
          InforSampleDetails.infoBitacora != null &&
          InforSampleDetails.infoBitacora != undefined
            ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
              "-" +
              InforSampleDetails.infoBitacora[0].SUFIJO
            : ""
        } | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Detalles generales del sticker como su resultados y sus notas`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Detalles sticker N° ${
            InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                "-" +
                InforSampleDetails.infoBitacora[0].SUFIJO
              : ""
          }  | Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Detalles generales del sticker como su resultados y sus notas`}
        ></meta>
        <meta
          property="og:title"
          content={`Información sticker N° ${
            InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                "-" +
                InforSampleDetails.infoBitacora[0].SUFIJO
              : ""
          }  | Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Detalles generales del sticker como su resultados y sus notas`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <StickerDetails
        InforSampleDetails={InforSampleDetails}
        query={query}
        Pruebas={Pruebas}
        Options={Options}
        setHasValue={setHasValue}
      />
    </>
  );
}

export default FullDetailsPage;

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

    return {
      props: {
        cookie: cookie,
        query: ctx.query,
        Options,
        Roles,
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
