import React, { useState, useEffect } from "react";
import Head from "next/head";
import IndexTrazaBit from "../../components/Body/TrazabilidadBitacora/index";
import FilterTrazaBit from "../../components/Body/TrazabilidadBitacora/FilterBitacora";
import { SampleDetailsTrazaBit } from "../api/Sample/ViewDetailsTrazabilidad/[id]";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../components/Tools/OpcitionHabilite";
import { queryListUserAll } from "../../components/Tools//Security";

function CreatePage({ cookie, ListadoUsuariosRegistrados, query }) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsTrazaBit(
      setLInforSampleDetails,
      cookie,
      query.dateAdmision,
      query.dateFinal,
      query.NumSticker,
      query.Sufijo,
      query.URS,
      "1"
    );
  }, []);

  const [NumeroSticker, setNumeroSticker] = useState(
    query.NumSticker != undefined && query.NumSticker != null
      ? query.NumSticker
      : ""
  );

  const [FechaIngreso, setFechaIngreso] = useState(
    query.dateAdmision != undefined && query.dateAdmision != null
      ? query.dateAdmision
      : ""
  );

  const [FechaIngresoFinal, setFechaFinal] = useState(
    query.dateFinal != undefined && query.dateFinal != null
      ? query.dateFinal
      : ""
  );

  const [UserRegisterStiker, setUserRegisterStiker] = useState(
    query.URS != undefined && query.URS != null ? query.URS : ""
  );

  const [Sufijo, setSufijo] = useState(
    query.Sufij != undefined && query.Sufij != null ? query.Sufij : ""
  );

  return (
    <>
      <Head>
        <title>{`Trazabilidad de bitacoras | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde se lista la trazabilidad de lectura de stickers, guardado de notas y guardado de resultados`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Trazabilidad de bitacoras - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde se lista la trazabilidad de lectura de stickers, guardado de notas y guardado de resultados`}
        ></meta>
        <meta
          property="og:title"
          content={`Trazabilidad de bitacoras - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde se lista la trazabilidad de lectura de stickers, guardado de notas y guardado de resultados`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <FilterTrazaBit
        ListadoUsuariosRegistrados={ListadoUsuariosRegistrados}
        NumeroSticker={NumeroSticker}
        setNumeroSticker={setNumeroSticker}
        FechaIngreso={FechaIngreso}
        setFechaIngreso={setFechaIngreso}
        FechaIngresoFinal={FechaIngresoFinal}
        setFechaFinal={setFechaFinal}
        UserRegisterStiker={UserRegisterStiker}
        setUserRegisterStiker={setUserRegisterStiker}
        Sufijo={Sufijo}
        setSufijo={setSufijo}
      ></FilterTrazaBit>
      <IndexTrazaBit 
      InforSampleDetails={InforSampleDetails}
      NumeroSticker={NumeroSticker}
      FechaIngreso={FechaIngreso}
      FechaIngresoFinal={FechaIngresoFinal}
      UserRegisterStiker={UserRegisterStiker}
      Sufijo={Sufijo}
      >
     
      </IndexTrazaBit>
    </>
  );
}

export default CreatePage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  debugger;
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

    if (!Options.BtnEditStickerAndUrl) {
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
        destination: "/account/Login",
      },
    };
  }
}
