import React, { useEffect, useState } from "react";
import CaseNav from "./CaseNav";
import { UserActiveGenerales, UserActiveUrgencias } from "./Tools/functiones";
import CaseComponent from "./Body/Casecomponents/CaseComponent";
import caseStyles from "../styles/case.module.scss";
import Link from "next/link";
import Image from "next/image";
export default function Case({
  ListadoGrupo,
  ListadoMuestraActivo,
  ListadoMuestraInactivo,
  isTrueActive,
  idGruop,
  // isUserInterno,
  isSampleGeneral,
  HrefArmado,
  Options,
  ListadoResultadoxMuestra,
  LstObservacionesPrede,
}) {
  const [urlImagenDinamyc, seturlImagenDinamyc] = useState("");
  const ListadoMuestraActiveGenerals = UserActiveGenerales(
    ListadoMuestraActivo,
    ListadoResultadoxMuestra
  );
  const ListadoMuestrasActivePendiente = UserActiveUrgencias(
    ListadoMuestraActivo,
    ListadoResultadoxMuestra
  );

  useEffect(() => {
    let objGroup = ListadoGrupo.find((e) => e.Id_grupo == idGruop);

    if (objGroup != undefined && objGroup != null) {
      if (
        objGroup.URL_IMAGEN != null &&
        objGroup.URL_IMAGEN != undefined &&
        objGroup.URL_IMAGEN != ""
      ) {
        seturlImagenDinamyc(objGroup.URL_IMAGEN);
        return;
      } else {
        seturlImagenDinamyc(
          "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=925&q=80"
        );
      }
    }
  }, [ListadoGrupo]);

  return (
    <>
      {/* grupos */}
      <CaseNav
        HrefArmado={HrefArmado}
        ListadoGrupo={ListadoGrupo}
        idGruop={idGruop}
        isTrueActive={isTrueActive}
        isSampleGeneral={isSampleGeneral}
      ></CaseNav>
      <section
        className={caseStyles.cases}
        // style={{ backgroundImage: `url('${urlImagenDinamyc}')` }}
      >
        <div>
          <img className={caseStyles.cases_bg} src={urlImagenDinamyc} alt="" />
        </div>
        {isTrueActive ? (
          <div className={caseStyles.cases_nav}>
            <div className={caseStyles.state}>
              <p
                className={`${caseStyles.status} ${
                  isSampleGeneral ? caseStyles.active : ""
                }`}
              >
                <Link
                  href={{
                    pathname: "/[id]",
                    query: HrefArmado.query,
                    hash: `${
                      isTrueActive ? "Cactive" : "Cinactvie"
                    }#OverallSample`,
                  }}
                  className={caseStyles.status_link}
                >
                  Ordenes generales
                </Link>
              </p>
              <p
                className={`${caseStyles.status} ${
                  !isSampleGeneral ? caseStyles.active : ""
                }`}
              >
                <Link
                  href={{
                    pathname: "/[id]",
                    query: HrefArmado.query,
                    hash: `${
                      isTrueActive ? "Cactive" : "Cinactvie"
                    }#UrgentSamples`,
                  }}
                  className={caseStyles.status_link}
                >
                  Ordenes pendientes
                </Link>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={caseStyles.cases_container}>
          {isTrueActive
            ? isSampleGeneral
              ? ListadoMuestraActiveGenerals.map((data, index) => (
                  <CaseComponent
                    key={index}
                    data={data}
                    isActive={true}
                    Options={Options}
                    isSampleGeneral={isSampleGeneral}
                    LstObservacionesPrede={LstObservacionesPrede}
                  ></CaseComponent>
                ))
              : ListadoMuestrasActivePendiente.map((data, index) => (
                  <CaseComponent
                    key={index}
                    data={data}
                    isActive={true}
                    Options={Options}
                    isSampleGeneral={isSampleGeneral}
                    LstObservacionesPrede={LstObservacionesPrede}
                  ></CaseComponent>
                ))
            : ListadoMuestraInactivo.length > 0
            ? ListadoMuestraInactivo.map((data, index) => (
                <CaseComponent
                  key={index}
                  data={data}
                  isActive={false}
                  Options={Options}
                  isSampleGeneral={true}
                  LstObservacionesPrede={LstObservacionesPrede}
                ></CaseComponent>
              ))
            : "Cargando..."}
        </div>
      </section>
      {/* */}
    </>
  );
}

/*isUserInterno
            ? ListadoMuestrasInactiveUserInter.map((data, index) => (
                <CaseComponent key={index} data={data} isActive={false}></CaseComponent>
              ))
            : ListadoMuestrasInactiveUserExterno.map((data, index) => (
                <CaseComponent key={index} data={data} isActive={false}></CaseComponent>
            ))*/
