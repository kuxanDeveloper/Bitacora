import React, { useEffect, useState } from "react";
import Head from "next/head";
import CreateSticker from "../../../components/Body/CreateSticker";
import { QueryActivegroup } from "../../../components/Tools/CRUD";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";
import {
  ListObservacion,
  ListSufijoUser,
  ListSitioAnatomico,
  ListJefeLaboratorio,
  ListTipoMuestra,
} from "../../api/Sample/CreateResultApi";

import { useContextBitacora } from "../../../context/BitacoraContext";

function CreatePage({ ListadoGrupoActivo, id, cookie }) {
  const { LstObservacionesPrede, setLstObservacionesPrede } =
    useContextBitacora();

  const [ListadoGetFullSufijo, setListadoGetFullSufijo] = useState([]);
  const [ListadoSitioAna, setListadoSitioAna] = useState([]);
  const [ListadoJefeLaboratorio, setListadoJefeLaboratorio] = useState([]);
  const [ListadoTipoMuestra, setListadoTipoMuestra] = useState([]);
  const [valueGrupochange, setvalueGrupochange] = useState(
    id !== null && id !== undefined && id !== "" ? id : "6"
  );
  useEffect(() => {
    ListObservacion(cookie, setLstObservacionesPrede);
    ListSitioAnatomico(cookie, setListadoSitioAna);
    ListJefeLaboratorio(cookie, setListadoJefeLaboratorio);

    ListSufijoUser(cookie, setListadoGetFullSufijo);
  }, []);

  useEffect(() => {
    ListTipoMuestra(cookie, setListadoTipoMuestra, valueGrupochange);
  }, [valueGrupochange]);

  return (
    <>
      <Head>
        <title>{`Creación de sticker | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde crea el sticker para su registro posterior de resultados`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Creación de sticker - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde crea el sticker para su registro posterior de resultados`}
        ></meta>
        <meta
          property="og:title"
          content={`Creación de sticker - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde crea el sticker para su registro posterior de resultados`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <CreateSticker
        ListadoGrupoActivo={ListadoGrupoActivo}
        id={id}
        LstObservacionesPrede={LstObservacionesPrede}
        ListadoGetFullSufijo={ListadoGetFullSufijo}
        setvalueGrupochange={setvalueGrupochange}
        ListadoSitioAna={ListadoSitioAna}
        ListadoJefeLaboratorio={ListadoJefeLaboratorio}
        ListadoTipoMuestra={ListadoTipoMuestra}
      ></CreateSticker>
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

    if (!Options.BtnCrearStickerAndUrl) {
      return { notFound: true };
    }

    const ListadoGrupoActivo = await QueryActivegroup(cookie, "1");

    return {
      props: {
        cookie: cookie,
        ListadoGrupoActivo: ListadoGrupoActivo,
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
