import React, { useState, useEffect } from "react";
import { SampleDetailsEdit } from "../../api/Sample/ViewDetails/[id]";

function FullDetailsPage({cookie,id}) {
  const [InforSampleDetails, setLInforSampleDetails] = useState([]);
  useEffect(() => {
    SampleDetailsEdit(cookie, id, setLInforSampleDetails);
  }, []);
  return <div>detalles completos</div>;
}

export default FullDetailsPage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    if (ctx.query.id == undefined || ctx.query.id == null) {
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
        destination: "/Account/Login",
      },
    };
  }
}
