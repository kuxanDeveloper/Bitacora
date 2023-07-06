import React, { useState, useEffect } from "react";
import { QueryActiveInactivegroup_GetUsers } from "../components/Tools//Security";
import { userService } from "../services/UserService";
import Filters from "../components/Body/Filters";
import Head from "next/head";
import CaseStatus from "../components/CaseStatus";
import { useRouter } from "next/router";
import Skeleton from "@/components/Tools/Skeleton";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../components/Tools/OpcitionHabilite";

import IndexComponentAdmin from "../components/RolesComponents/Administrator/IndexComponent";
import IndexComponentTechni from "../components/RolesComponents/Technical/IndexComponent";

import IndexComponentAssis from "../components/RolesComponents/Assistant/IndexComponent";

import IndexComponentConsul from "../components/RolesComponents/Consultation/IndexComponent";

export default function Home({
  ListadoGrupoActivo,
  ListadoGrupoInactivo,
  ListadoUsuariosRegistrados,
  Options,
  Roles,
}) {
  const [isTrueActive, setisTrueActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (Options.OrdersInactive) {
      if (
        window.performance.navigation.type ==
          window.performance.navigation.TYPE_RELOAD ||
        window.performance.navigation.type ==
          window.performance.navigation.TYPE_NAVIGATE
      ) {
        let hashs2 = router.asPath.split("#")[1];
        if (
          hashs2 == "Cactive" ||
          hashs2 == "" ||
          hashs2 == null ||
          hashs2 == undefined
        ) {
          setisTrueActive(true);
        } else {
          setisTrueActive(false);
        }
      }
    } else {
      setisTrueActive(true);
    }

    const onHashChangeStart = (url) => {
      if (Options.OrdersInactive) {
        let hash = url.split("#")[1];
        if (
          hash == "Cactive" ||
          hash == "" ||
          hash == null ||
          hash == undefined
        ) {
          setisTrueActive(true);
        } else {
          setisTrueActive(false);
        }
      } else {
        setisTrueActive(true);
      }
    };

    router.events.on("hashChangeStart", onHashChangeStart);
    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  if (
    ListadoGrupoActivo == "401: Token incorrecto o vencido" ||
    ListadoGrupoInactivo == "401: Token incorrecto o vencido"
  ) {
    userService.logout();
    return "";
  }

  return (
    <>
      <Head>
        <title>{"Inicio | Bitácora"}</title>
        <meta
          name="description"
          content={
            "Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la Bitacora"
          }
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta name="language" content="spanish" />
        <meta name="geo.region" content="CO" />
        <meta name="twitter:title" content="Inicio - Bitácora" />
        <meta
          name="twitter:description"
          content="Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la bitácora"
        ></meta>
        <meta property="og:title" content="Inicio - Bitácora" />
        <meta
          property="og:description"
          content="Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la bitácora"
        />
        <meta property="og:site_name" content="Bitácora" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>


      {ListadoGrupoActivo != undefined &&
      ListadoGrupoActivo != null &&
      ListadoGrupoInactivo != undefined &&
      ListadoGrupoInactivo != null ? (
        <Filters
          ListadoGrupoActivo={ListadoGrupoActivo}
          isActiveGroup={true}
          isActiveCase={false}
          ListadoUsuariosRegistrados={ListadoUsuariosRegistrados}
          CasosActivo_Inactivos={isTrueActive}
          Options={Options}
        ></Filters>
      ) : (
        ""
      )}

      <div className="cases_container">
        {Roles.map((data, index) => {
          let ValorRetorno = null;
          switch (data) {
            case 1:
              ValorRetorno = (
                <IndexComponentAdmin
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                ></IndexComponentAdmin>
              );
              break;
            case 2:
              ValorRetorno = (
                <IndexComponentTechni
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                ></IndexComponentTechni>
              );
              break;
            case 3:
              ValorRetorno = (
                <IndexComponentAssis
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                ></IndexComponentAssis>
              );
              break;
            case 4:
              ValorRetorno = (
                <IndexComponentConsul
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                ></IndexComponentConsul>
              );
              break;
            default:
              ValorRetorno =
                "El usuario no tiene un rol asignado o el rol que tiene asignado no existe en los registros";
              break;
          }
          return ValorRetorno;
        })}
      </div>

      {/* <Skeleton></Skeleton> */}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  const RolUser = ctx.req.cookies["RolUserCookie"];
  let Roles = null;
  let Options = null;
  if (cookie) {
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
    const consultataGeneral = await QueryActiveInactivegroup_GetUsers(cookie);

    const ListadoGrupoActivo = await consultataGeneral.lstGroupActive;
    const ListadoGrupoInactivo = await consultataGeneral.lstGroupInactive;
    const ListadoUsuariosRegistrados = consultataGeneral.ListaUsuario;

    return {
      props: {
        ListadoGrupoActivo:
          ListadoGrupoActivo == undefined ? null : ListadoGrupoActivo,
        ListadoGrupoInactivo:
          ListadoGrupoInactivo == undefined ? null : ListadoGrupoInactivo,
        ListadoUsuariosRegistrados:
          ListadoUsuariosRegistrados == undefined
            ? null
            : ListadoUsuariosRegistrados,
        Options,
        Roles,
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
