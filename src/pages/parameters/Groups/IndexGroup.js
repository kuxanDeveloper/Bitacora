import React,{useState,useEffect} from "react";
import Head from "next/head";
import IndexGroup from "../../../components/Body/GroupCrud/Index";
import { SampleDetailsGroup } from "../ViewDetailsParameters/[id]";

function CreatePage(cookie) {

    const [InforSampleDetails, setLInforSampleDetails] = useState([]);
    useEffect(() => {
      debugger;
      SampleDetailsGroup(setLInforSampleDetails,cookie);
    }, []);

  return (
    <>
      <Head>
        <title>{`Listado de grupos | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde se listan los grupos de el sistema`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Listado de grupos - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde se listan los grupos de el sistema`}
        ></meta>
        <meta
          property="og:title"
          content={`Listado de grupos - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde se listan los grupos de el sistema`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <IndexGroup
      ListadoGrupo={InforSampleDetails}>
        
      </IndexGroup>
    </>
  );
}

export default CreatePage;
