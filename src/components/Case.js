import React, { useEffect, useState } from "react";
import CaseNav from "./CaseNav";
import { UserActiveGenerales, UserActiveUrgencias } from "./Tools/functiones";
import CaseComponent from "./Body/Casecomponents/CaseComponent";
import caseStyles from "../styles/case.module.scss";
import styleTable from "../styles/StickerTable.module.scss";
import Link from "next/link";
import ImageOptimize from "./Tools/ImageOptimize";
import { Button } from "react-scroll";
import { setLazyProp } from "next/dist/server/api-utils";
import StickersTable from "./Body/StickersTable";
import styled from "@emotion/styled";
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

  const [List, SetList] = useState(false);

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
        seturlImagenDinamyc("/img/photo-1614935151651-0bea6508db6b.avif");
      }
    }
  }, [ListadoGrupo]);

  function changeModeVew() {
    List ? SetList(false) : SetList(true);
  }

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
              <p
                className={`${caseStyles.status} `}
              >
                <button
                  onClick={changeModeVew}
                  href={"#"}
                  style={{
                    background: "none",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  title="Ver tabla"
                  className={caseStyles.status_link}
                >
                  {List ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-id"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                      <path d="M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M15 8l2 0" />
                      <path d="M15 12l2 0" />
                      <path d="M7 16l10 0" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-table-filled"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M4 11h4a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-2a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-6a1 1 0 0 1 1 -1z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M21 12v6a3 3 0 0 1 -2.824 2.995l-.176 .005h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v2a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h6z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M9 4v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a3 3 0 0 1 2.824 -2.995l.176 -.005h2a1 1 0 0 1 1 1z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className={caseStyles.cases_nav}>
            <div className={caseStyles.state}>
             
              <p
                className={`${caseStyles.status} `}
              >
                <button
                  onClick={changeModeVew}
                  href={"#"}
                  style={{
                    background: "none",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  title="Ver tabla"
                  className={caseStyles.status_link}
                >
                  {List ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-id"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                      <path d="M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M15 8l2 0" />
                      <path d="M15 12l2 0" />
                      <path d="M7 16l10 0" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-table-filled"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M4 11h4a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-2a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-6a1 1 0 0 1 1 -1z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M21 12v6a3 3 0 0 1 -2.824 2.995l-.176 .005h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v2a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h6z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M9 4v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a3 3 0 0 1 2.824 -2.995l.176 -.005h2a1 1 0 0 1 1 1z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </button>
              </p>
            </div>
          </div>
        )}

        {List ? (
          <div
            style={{ display: "block", overflow: "auto" }}
            className={caseStyles.cases_container}
          >
            <table
              className={styleTable.table}
              style={{ width: "100%", position: "relative" }}
            >
              <thead className={styleTable.thead}>
                <tr className={styleTable.tr}>
                  <th>
                    <span className={styleTable.th_title}>N° sticker</span>
                  </th>
                  <th>
                    <span className={styleTable.th_title}>Fecha Ingreso</span>
                  </th>
                  <th>
                    <span className={styleTable.th_title}>Estado</span>
                  </th>
                  <th>
                    <span className={styleTable.th_title}>Opciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isTrueActive
                  ? isSampleGeneral
                    ? ListadoMuestraActiveGenerals.map((data, index) => (
                        <StickersTable
                          key={index}
                          data={data}
                          isActive={true}
                          Options={Options}
                          isSampleGeneral={isSampleGeneral}
                          LstObservacionesPrede={LstObservacionesPrede}
                        ></StickersTable>
                      ))
                    : ListadoMuestrasActivePendiente.map((data, index) => (
                        <StickersTable
                          key={index}
                          data={data}
                          isActive={true}
                          Options={Options}
                          isSampleGeneral={isSampleGeneral}
                          LstObservacionesPrede={LstObservacionesPrede}
                        ></StickersTable>
                      ))
                  : ListadoMuestraInactivo.length > 0
                  ? ListadoMuestraInactivo.map((data, index) => (
                      <StickersTable
                        key={index}
                        data={data}
                        isActive={false}
                        Options={Options}
                        isSampleGeneral={true}
                        LstObservacionesPrede={LstObservacionesPrede}
                      ></StickersTable>
                    ))
                  : "Sin Stickers inactivos"}
              </tbody>
            </table>
          </div>
        ) : (
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
        )}
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
