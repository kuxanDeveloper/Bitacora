import React from "react";
import StickerInfo from "../../../components/Body/StickerInfo";
function ViewDetails() {
  return (
    <>
      <StickerInfo></StickerInfo>
    </>
  );
}

export default ViewDetails;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    return {
      props:{
        valor:null
      }
    }
    // const ListadoGrupoActivo = await QueryActivegroup(cookie);
    // const ListadoGrupoInactivo = await QueryInactivegroup(cookie);
    // debugger;
    // return {
    //   props: {
    //     ListadoGrupoActivo:
    //       ListadoGrupoActivo == undefined ? null : ListadoGrupoActivo,
    //     ListadoGrupoInactivo:
    //       ListadoGrupoInactivo == undefined ? null : ListadoGrupoInactivo,
    //   },
    // };
  } else {
    return {
      redirect: {
        destination: "/Account/Login",
      },
    };
  }
}
