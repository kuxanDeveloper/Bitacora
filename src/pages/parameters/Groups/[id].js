import React,{useState,useEffect} from "react";
import Head from "next/head";
import EditGroup from "../../../components/Body/GroupCrud/Edit";
import { SampleDetailsGroup } from "../ViewDetailsParameters/[id]";

function CreatePage({cookie,id}) {

  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    if(id != null && id != undefined)
    {
      SampleDetailsGroup(setLInforSampleDetails,cookie,id);
    }
    
  }, []);

  return (
    <>
      <Head>
        <title>{`Edición de grupo | Bitácora BD`}</title>
        <meta
          name="description"
          content={`Lugar donde edita el grupo que seleccionaran despues las bitacoras`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta
          name="twitter:title"
          content={`Edición de grupo - Bitácora BD`}
        />
        <meta
          name="twitter:description"
          content={`Lugar donde edita el grupo que seleccionaran despues las bitacoras`}
        ></meta>
        <meta
          property="og:title"
          content={`Edición de grupo - Bitácora BD`}
        />
        <meta
          property="og:description"
          content={`Lugar donde edita el grupo que seleccionaran despues las bitacoras`}
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>
      <EditGroup 
      InforGroup={InforSampleDetails}
      >
        
      </EditGroup>
    </>
  );
}

export default CreatePage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  debugger;
  if (cookie) {
    if (
      ctx.query.id == undefined ||
      ctx.query.id == null
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