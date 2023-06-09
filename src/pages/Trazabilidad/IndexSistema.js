import React,{useState,useEffect} from "react";
import Head from "next/head";
import IndexTrazaSis from "../../components/Body/TrazabilidadSistema/index";
import FilterTrazaSis from "../../components/Body/TrazabilidadSistema/FilterSistema";
import { SampleDetailsTrazaTabl } from "../api/Sample/ViewDetailsTrazabilidad/[id]";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../components/Tools/OpcitionHabilite";
import { queryListUserAll } from "../../components/Tools//Security";

function CreatePage({cookie,ListadoUsuariosRegistrados,query}) {

    const [InforSampleDetails, setLInforSampleDetails] = useState([]);
    useEffect(() => {
        SampleDetailsTrazaTabl(setLInforSampleDetails,cookie,query.dateAdmision,query.dateFinal,query.Tipo_tabla,query.URS,"1");
    }, []);

  return (
    <>
      <Head>
        <title>{`Trazabilidad del sistema | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde se lista la trazabilidad del sistema, usuarios, observaciones predeterminadas, estatus, seguimientos, opciones`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Trazabilidad del sistema - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde se lista la trazabilidad del sistema, usuarios, observaciones predeterminadas, estatus, seguimientos, opciones`}
        ></meta>
        <meta
          property="og:title"
          content={`Trazabilidad del sistema - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde se lista la trazabilidad del sistema, usuarios, observaciones predeterminadas, estatus, seguimientos, opciones`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <FilterTrazaSis
      ListadoUsuariosRegistrados={ListadoUsuariosRegistrados} 
      dateAdmision={query.dateAdmision} 
      dateFinal={query.dateFinal} 
      URS={query.URS} 
      Tipo_tabla={query.Tipo_tabla} 
      ></FilterTrazaSis>
      <IndexTrazaSis
      InforSampleDetails={InforSampleDetails}>        
      </IndexTrazaSis>
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

    if (     
      !Options.BtnEditStickerAndUrl
    ) {
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
