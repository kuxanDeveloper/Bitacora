import React from "react";
import Head from "next/head";
import CreateGroup from "../../../components/Body/GroupCrud/Create";
function CreatePage() {
  return (
    <>
      <Head>
        <title>{`Creación de grupo | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde crea el grupo que seleccionaran despues las bitacoras`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Creación de grupo - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde crea el grupo que seleccionaran despues las bitacoras`}
        ></meta>
        <meta
          property="og:title"
          content={`Creación de grupo - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde crea el grupo que seleccionaran despues las bitacoras`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <CreateGroup>
        
      </CreateGroup>
    </>
  );
}

export default CreatePage;
