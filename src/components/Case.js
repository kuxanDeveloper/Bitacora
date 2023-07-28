import React, { useEffect, useState } from "react";
import CaseNav from "./CaseNav";
import { UserActiveGenerales, UserActiveUrgencias } from "./Tools/functiones";
import CaseComponent from "./Body/Casecomponents/CaseComponent";
import caseStyles from "../styles/case.module.scss";
import Link from "next/link";
import ImageOptimize from "./Tools/ImageOptimize";
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
  setHasValueSample,
}) {
  const [urlImagenDinamyc, seturlImagenDinamyc] = useState(null);
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
        seturlImagenDinamyc("/img/photo-1614935151651-0bea6508db6b.avif");
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
          {/* <img className={caseStyles.cases_bg} src={urlImagenDinamyc} alt="" /> */}

          {urlImagenDinamyc != null &&
          urlImagenDinamyc != undefined &&
          urlImagenDinamyc != "" ? (
            <ImageOptimize
              Values={{
                src: urlImagenDinamyc,
                alt: "grupo",
                title: "Imagen background",
                classValue: caseStyles.cases_bg,
                width: 1920,
                height: 1080,
              }}
            ></ImageOptimize>
          ) : (
            ""
          )}
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
                  onClick={()=>{setHasValueSample("OverallSample")}}
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
                  onClick={()=>{setHasValueSample("UrgentSamples")}}
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
            : ""}
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
