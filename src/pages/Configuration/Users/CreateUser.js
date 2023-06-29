import React,{useState,useEffect} from "react";
import Head from "next/head";
import { SampleDetailsRoles,SampleDetailsTiposIDE } from "../../api/Sample/ViewDetailsUser/[id]";
import CreateUser from "../../../components/Body/Users/Create";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../../components/Tools/OpcitionHabilite";

function CreatePage(cookie) {

  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
    useEffect(() => {
      SampleDetailsRoles(setLInforSampleDetails,cookie);
    }, []);

    const [InforSampleTips, setLInforSampleTips] = useState([]);
    useEffect(() => {
      SampleDetailsTiposIDE(setLInforSampleTips,cookie);
    }, []);

  return (
    <>
      <Head>
        <title>{`Creación de usuario | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde crean los usuarios del sistema`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Creación de usuario - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde crean los usuarios del sistema`}
        ></meta>
        <meta
          property="og:title"
          content={`Creación de usuario - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde crean los usuarios del sistema`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <CreateUser InforSampleDetails={InforSampleDetails} 
      InforSampleTips={InforSampleTips}>
      </CreateUser>
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
    
    return {props:{mensaje:null}};

  } else {
    return {
      redirect: {
        destination: "/account/Login",
      },
    };
  }
}