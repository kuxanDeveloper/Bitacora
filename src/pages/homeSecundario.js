import React, { useState, useEffect } from "react";

import { userService } from "../services/UserService";
import Filters from "../components/Body/Filters";
import Head from "next/head";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../components/Tools/OpcitionHabilite";
import Link from "next/link";
import { SampleDetailsWhitAncestro } from "./api/Ancestro/[id]";
import CardStyles from "../styles/homeCard.module.scss";
import IndexComponentAdmin from "../components/RolesComponents/Administrator/IndexComponent";
import IndexComponentTechni from "../components/RolesComponents/Technical/IndexComponent";
import ImageOptimize from "../components/Tools/ImageOptimize";
import IndexComponentAssis from "../components/RolesComponents/Assistant/IndexComponent";
import IndexComponentConsul from "../components/RolesComponents/Consultation/IndexComponent";
import {queryGroupGetUsers} from "./api/Sample/ViewHomeSecondary/[id]"

export default function Home({
  Options,
  Roles,
  cookie,
  idAncst,
}) {
  const [HasValue, setHasValue] = useState("");
  const [isTrueActive, setisTrueActive] = useState(false);
  const [ListadoGrupoActivo, setListadoGrupoActivo] = useState([]);
  const [ListadoGrupoInactivo, setListadoGrupoInactivo] = useState([]);
  const [ListadoSufijosxGroupAll, setListadoSufijosxGroupAll] = useState([]);
  const [ListaAncestros, setListaAncestros] = useState([]);
  const [idAncestro, setidAncestro] = useState("");
  const [cmbFiltroCambio, setcmbFiltroCambio] = useState("");

  useEffect(() => {
    setidAncestro(idAncst);
    queryGroupGetUsers(
      cookie,
      idAncst,
      setListadoGrupoActivo,
      setListadoGrupoInactivo,
      setListadoSufijosxGroupAll,
      setListaAncestros
    );
  }, []);

  useEffect(() => {
    if (Options.OrdersInactive) {
      if (
        window.performance.navigation.type ==
          window.performance.navigation.TYPE_RELOAD ||
        window.performance.navigation.type ==
          window.performance.navigation.TYPE_NAVIGATE
      ) {
        if (HasValue == "") {
          let hashs2 = window.location.hash.split("#")[1];

          if (
            hashs2 == "Cactive" ||
            hashs2 == "" ||
            hashs2 == null ||
            hashs2 == undefined
          ) {
            setHasValue("Cactive");
            setisTrueActive(true);
          } else {
            setisTrueActive(false);
            setHasValue("Cinactvie");
          }
        } else {
          if (HasValue == "Cactive") {
            setHasValue("Cactive");
            setisTrueActive(true);
          } else {
            setisTrueActive(false);
            setHasValue("Cinactvie");
          }
        }
      }
    } else {
      setisTrueActive(true);
      setHasValue("Cactive");
    }
  }, [HasValue]);

  useEffect(() => {
    if (idAncestro != null && idAncestro != "" && idAncestro != undefined) {
      SampleDetailsWhitAncestro(
        setListadoGrupoActivo,
        setListadoGrupoInactivo,
        cookie,
        idAncestro
      );
    }
  }, [idAncestro]);


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
        <title>{"Inicio | Bitácora BD"}</title>
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
        <meta name="twitter:title" content="Inicio - Bitácora BD" />
        <meta
          name="twitter:description"
          content="Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la bitácora"
        ></meta>
        <meta property="og:title" content="Inicio - Bitácora BD" />
        <meta
          property="og:description"
          content="Inicio donde se muestra los cultivos y demas grupos que utilizan en los laboratorio de la bitácora"
        />
        <meta property="og:site_name" content="Bitácora BD" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:locale:alternate" content="es_CO" />
      </Head>

      {ListadoGrupoActivo != undefined &&
      ListadoGrupoActivo.length > 0 &&
      ListadoGrupoInactivo != undefined &&
      ListadoGrupoInactivo.length > 0 ? (
        <Filters
          ListadoGrupoActivo={ListadoGrupoActivo}
          isActiveGroup={true}
          isActiveCase={false}
          ListadoSufijosxGroupAll={ListadoSufijosxGroupAll}
          ListaAncestros={ListaAncestros}
          CasosActivo_Inactivos={isTrueActive}
          Options={Options}
          setidAncestro={setidAncestro}
          setcmbFiltroCambio={setcmbFiltroCambio}
          idAncestro={idAncst}
          HasValue={HasValue}
          setHasValue={setHasValue}
          cookie={cookie}
        ></Filters>
      ) : (
        ""
      )}

      <div className="cases_container">
        {
         ListadoGrupoActivo != undefined &&
         ListadoGrupoActivo.length > 0 &&
         ListadoGrupoInactivo != undefined &&
         ListadoGrupoInactivo.length > 0  && 
         ListadoSufijosxGroupAll != undefined &&
         ListadoSufijosxGroupAll.length > 0 &&
         ListaAncestros != undefined &&
         ListaAncestros.length > 0 ?
         <section className={CardStyles.home_card}>
          {/* ACTIVE */}
          <div className={CardStyles.card_content}>
            <figure className={CardStyles.card_figure}>
              <ImageOptimize
                Values={{
                  src: "/img/premium_photo-1676325102583-0839e57d7a1f.avif",
                  classValue: CardStyles.card_img,
                  width: 500,
                  height: 109,
                  style: {},
                }}
              />
            </figure>

            <div className={CardStyles.card_body}>
              <Link
                href={{
                  pathname: "/[id]",
                  query: { id: 0, idAncestro: (idAncestro == "" || idAncestro == null ? 0 : idAncestro), page:"1" },
                  hash: isTrueActive == true ? "Cactive#OverallSample" : "Cinactvie#OverallSample",
                }}
                className={CardStyles.body_container}
              >
                <h3 className={CardStyles.card_name}>
                  Todos
                  <i className={CardStyles.arrow_icon}></i>
                </h3>
              </Link>
            </div>
          </div>
        </section>:"Cargando..."
        }
        
        {Roles.map((data, index) => {
          switch (data) {
            case 1:
              return (
                <IndexComponentAdmin
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                  idAncestro={
                    idAncestro == "" || idAncestro == null ? 0 : idAncestro
                  }
                  HasValue={HasValue}
                  setHasValue={setHasValue}
                ></IndexComponentAdmin>
              );

            case 2:
              return (
                <IndexComponentTechni
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                  idAncestro={
                    idAncestro == "" || idAncestro == null ? 0 : idAncestro
                  }
                  HasValue={HasValue}
                  setHasValue={setHasValue}
                ></IndexComponentTechni>
              );

            case 3:
              return (
                <IndexComponentAssis
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                  idAncestro={
                    idAncestro == "" || idAncestro == null ? 0 : idAncestro
                  }
                  HasValue={HasValue}
                  setHasValue={setHasValue}
                ></IndexComponentAssis>
              );

            case 4:
              return (
                <IndexComponentConsul
                  key={index}
                  HabilitarActive={isTrueActive}
                  ListadoGrupoActivo={ListadoGrupoActivo}
                  ListadoGrupoInactivo={ListadoGrupoInactivo}
                  idAncestro={
                    idAncestro == "" || idAncestro == null ? 0 : idAncestro
                  }
                  HasValue={HasValue}
                  setHasValue={setHasValue}
                ></IndexComponentConsul>
              );

            default:
              return "El usuario no tiene un rol asignado o el rol que tiene asignado no existe en los registros";
          }
        })}
      </div>
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

    const idAnc = ctx.query.idAncest;
   

    return {
      props: {
        // ListadoGrupoActivossr:
        //   ListadoGrupoActivo == undefined ? null : ListadoGrupoActivo,
        // ListadoGrupoInactivossr:
        //   ListadoGrupoInactivo == undefined ? null : ListadoGrupoInactivo,
        // ListadoSufijosxGroupAll:
        //   ListadoSufijosxGroupAll == undefined ? null : ListadoSufijosxGroupAll,
        // ListaAncestros: ListaAncestros == undefined ? null : ListaAncestros,
        Options,
        Roles,
        cookie: cookie,
        idAncst: idAnc,
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
