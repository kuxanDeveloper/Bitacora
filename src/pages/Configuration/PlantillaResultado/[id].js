import React, { useState, useEffect } from "react";
import Head from "next/head";
import EditPlantilla from "../../../components/Body/PlantillaResult/Edit";
import { SampleDetailsPlantillaResult,SampleDetailsOptionsXPruebaResult, SampleListOptionCmb } from "../../api/Sample/ViewDetailsCRUDResult/[id]";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";

function CreatePage({ cookie, id }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsPlantillaResult(setLInforSampleDetails, cookie, id);
  }, []);

  const [InforOptionsXpruebas, setInforOptionsXpruebas] = useState([]);
  useEffect(() => {
    SampleDetailsOptionsXPruebaResult(setInforOptionsXpruebas, cookie, id);
  }, []);

  const [InforOptionsSelc, setLInforOptionsSelc] = useState([]);
  useEffect(() => {
    SampleListOptionCmb(setLInforOptionsSelc, cookie);   
  }, []);

  return (
    <>
      <Head>
        <title>{`Edicion de Seguimiento | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde editan los seguimientos de resultado que seleccionaran despues las bitacoras`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Edicion de Seguimiento - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde editan los seguimientos de resultado que seleccionaran despues las bitacoras`}
        ></meta>
        <meta
          property="og:title"
          content={`Edicion de Opcion - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde editan los seguimientos de resultado que seleccionaran despues las bitacoras`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <EditPlantilla
        InfoPlantilla={InforSampleDetails}
        InforOptionsSelc={InforOptionsSelc}
        InforOptionsXpruebas={InforOptionsXpruebas}
        idPlantilla={id}
      ></EditPlantilla>
    </>
  );
}

export default CreatePage;

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
      ctx.query.id == undefined ||
      ctx.query.id == null ||
      !Options.ObservacionPredeEditAndUrl
    ) {
      return { notFound: true };
    }

    return {
      props: {
        cookie: cookie,
        id: ctx.query.id,
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
