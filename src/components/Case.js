import React, { useEffect, useState } from "react";
import CaseNav from "./CaseNav";
import {
  UserActiveGenerales,
  UserActiveUrgencias,
  SelectAllCheck,
  AddListCodBitacora,
} from "./Tools/functiones";
import CaseComponent from "./Body/Casecomponents/CaseComponent";
import caseStyles from "../styles/case.module.scss";
import styleTable from "../styles/StickerTable.module.scss";
import Link from "next/link";
import ImageOptimize from "./Tools/ImageOptimize";
import StickersTable from "./Body/StickersTable";
import { useRouter } from "next/router";
import Pagination from "./Tools/Pagination";
export default function Case({
  ListadoGrupo,
  ListadoMuestraActivo,
  ListadoMuestraInactivo,
  isTrueActive,
  idGruop,
  isSampleGeneral,
  HrefArmado,
  Options,
  ListadoResultadoxMuestra,
  LstObservacionesPrede,
  setHasValueSample,
  hrefhash,
  query
}) {
  console.log(ListadoMuestraActivo, "activo");
  console.log(ListadoMuestraInactivo, "inactivo");
  const router = useRouter();
  const [List, SetList] = useState(false);

  const [urlImagenDinamyc, seturlImagenDinamyc] = useState(null);

  const [listMuestrasPendientes, setListMuestrasPendientes] = useState([]);
  const [listMuestrasActivas, setListMuestrasActivas] = useState([]);
  const [listMuestrasInactivas, setListMuestrasInactivas] = useState([]);

  const ListadoMuestraActiveGenerals = UserActiveGenerales(
    ListadoMuestraActivo,
    ListadoResultadoxMuestra
  );
  const ListadoMuestrasActivePendiente = UserActiveUrgencias(
    ListadoMuestraActivo,
    ListadoResultadoxMuestra
  );

  //#region funciones para ordenar de manera ascendente y descendente
  const orderByAlphabeticalAsc = (array, getter, order = "asc") => {
    array.sort((a, b) => {
      const first = getter(a);
      const second = getter(b);

      const compare = first.localeCompare(second);
      return order == "asc" ? compare : -compare;
    });
    return array;
  };

  const orderByAlphabeticalDesc = (array, getter, order = "Desc") => {
    array.sort((a, b) => {
      const first = getter(a);
      const second = getter(b);

      const compare = first.localeCompare(second);
      return order == "Desc" ? -compare : compare;
    });
    return array;
  };

  //#endregion

  //#region Funciones que se ejecutan para ordenar de manera asendente y descendente las muestras PENDIENTES
  function orderByDateAsc() {
    let lstPendientesFecha = orderByAlphabeticalAsc(
      ListadoMuestrasActivePendiente,
      (ord) => ord.FECHA_FORMAT_CREADO_BITACORA
    );

    setListMuestrasPendientes(lstPendientesFecha);
  }

  function orderByDateDesc() {
    let lstPendientesFecha = orderByAlphabeticalDesc(
      ListadoMuestrasActivePendiente,
      (ord) => ord.FECHA_FORMAT_CREADO_BITACORA
    );

    setListMuestrasPendientes(lstPendientesFecha);
  }

  function orderByStickereAsc() {
    let lstPendientesSticker = orderByAlphabeticalAsc(
      ListadoMuestrasActivePendiente,
      (ord) => ord.NUMERO_STICKER
    );

    setListMuestrasPendientes(lstPendientesSticker);
  }

  function orderByStickerDesc() {
    let lstPendientesSticker = orderByAlphabeticalDesc(
      ListadoMuestrasActivePendiente,
      (ord) => ord.NUMERO_STICKER
    );

    setListMuestrasPendientes(lstPendientesSticker);
  }

  //#endregion

  //#region Funciones que se ejecutan para ordenar de manera asendente y descendente las muestras ACTIVAS GENERALES
  function orderActiveByDateAsc() {
    let lstActivasFecha = orderByAlphabeticalAsc(
      ListadoMuestraActiveGenerals,
      (ord) => ord.FECHA_FORMAT_CREADO_BITACORA
    );

    setListMuestrasActivas(lstActivasFecha);
  }

  function orderActiveByDateDesc() {
    let lstActivasFecha = orderByAlphabeticalDesc(
      ListadoMuestraActiveGenerals,
      (ord) => ord.FECHA_FORMAT_CREADO_BITACORA
    );

    setListMuestrasActivas(lstActivasFecha);
  }

  function orderActiveByStickereAsc() {
    // alert("entra");
    let lstActivasSticker = orderByAlphabeticalAsc(
      ListadoMuestraActiveGenerals,
      (ord) => ord.NUMERO_STICKER
    );

    setListMuestrasActivas(lstActivasSticker);
  }

  function orderActiveByStickerDesc() {
    let lstActivasSticker = orderByAlphabeticalDesc(
      ListadoMuestraActiveGenerals,
      (ord) => ord.NUMERO_STICKER
    );

    setListMuestrasActivas(lstActivasSticker);
  }

  //#endregion

  //#region Funciones que se ejecutan para ordenar de manera asendente y descendente las muestras INACTIVAS
  function orderInactiveByDateAsc() {
    let lstActivasFecha = orderByAlphabeticalAsc(
      ListadoMuestraInactivo,
      (ord) => ord.FECHA_FORMAT_CREADO_BITACORA
    );

    setListMuestrasActivas(lstActivasFecha);
  }

  function orderInactiveByDateDesc() {
    let lstActivasFecha = orderByAlphabeticalDesc(
      ListadoMuestraInactivo,
      (ord) => ord.FECHA_FORMAT_CREADO_BITACORA
    );

    setListMuestrasActivas(lstActivasFecha);
  }

  function orderInactiveByStickereAsc() {
    // alert("entra");
    let lstActivasSticker = orderByAlphabeticalAsc(
      ListadoMuestraInactivo,
      (ord) => ord.NUMERO_STICKER
    );

    setListMuestrasActivas(lstActivasSticker);
  }

  function orderInactiveByStickerDesc() {
    let lstActivasSticker = orderByAlphabeticalDesc(
      ListadoMuestraInactivo,
      (ord) => ord.NUMERO_STICKER
    );

    setListMuestrasActivas(lstActivasSticker);
  }

  //#endregion

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

  useEffect(() => {
    setListMuestrasPendientes(ListadoMuestrasActivePendiente);
    setListMuestrasActivas(ListadoMuestraActiveGenerals);
    setListMuestrasInactivas(ListadoMuestraInactivo);
  }, [ListadoResultadoxMuestra, ListadoMuestraInactivo]);

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
      <section className={caseStyles.cases}>
        <div>
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
                  onClick={() => {
                    setHasValueSample("OverallSample");
                  }}
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
                  onClick={() => {
                    setHasValueSample("UrgentSamples");
                  }}
                >
                  Ordenes pendientes
                </Link>
              </p>
              <p className={`${caseStyles.status} `}>
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
              <p className={`${caseStyles.status} `}>
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
                  <th className={styleTable.alineadoIzq}>
                    <span className={styleTable.th_title}>
                      Seleccionar todos
                    </span>
                    {"  "}
                    <input
                      id="CheckMasivoResult"
                      type="checkbox"
                      onClick={() =>
                        SelectAllCheck(
                          "CheckMasivoResult",
                          "inputCheckoutResult"
                        )
                      }
                    />
                  </th>
                  <th>
                    <span className={styleTable.th_title}>
                      N° sticker
                      <button
                        onClick={
                          isTrueActive
                            ? isSampleGeneral
                              ? () => orderActiveByStickereAsc()
                              : () => orderByStickereAsc()
                            : listMuestrasInactivas.length > 0
                            ? () => orderInactiveByStickereAsc()
                            : () => {}
                        }
                        className={styleTable.btn_arrow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-arrow-badge-up-filled"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#ffffff"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M11.375 6.22l-5 4a1 1 0 0 0 -.375 .78v6l.006 .112a1 1 0 0 0 1.619 .669l4.375 -3.501l4.375 3.5a1 1 0 0 0 1.625 -.78v-6a1 1 0 0 0 -.375 -.78l-5 -4a1 1 0 0 0 -1.25 0z"
                            stroke-width="0"
                            fill="#e57d00"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={
                          isTrueActive
                            ? isSampleGeneral
                              ? () => orderActiveByStickerDesc()
                              : () => orderByStickerDesc()
                            : listMuestrasInactivas.length > 0
                            ? () => orderInactiveByStickerDesc()
                            : () => {}
                        }
                        className={styleTable.btn_arrow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-arrow-badge-down-filled"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#ffffff"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z"
                            stroke-width="0"
                            fill="#e57d00"
                          />
                        </svg>
                      </button>
                    </span>
                  </th>
                  <th>
                    <span className={styleTable.th_title}>
                      Fecha Ingreso
                      <button
                        onClick={
                          isTrueActive
                            ? isSampleGeneral
                              ? () => orderActiveByDateAsc()
                              : () => orderByDateAsc()
                            : listMuestrasInactivas.length > 0
                            ? () => orderInactiveByDateAsc()
                            : () => {}
                        }
                        className={styleTable.btn_arrow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-arrow-badge-up-filled"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#ffffff"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M11.375 6.22l-5 4a1 1 0 0 0 -.375 .78v6l.006 .112a1 1 0 0 0 1.619 .669l4.375 -3.501l4.375 3.5a1 1 0 0 0 1.625 -.78v-6a1 1 0 0 0 -.375 -.78l-5 -4a1 1 0 0 0 -1.25 0z"
                            stroke-width="0"
                            fill="#e57d00"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={
                          isTrueActive
                            ? isSampleGeneral
                              ? () => orderActiveByDateDesc()
                              : () => orderByDateDesc()
                            : listMuestrasInactivas.length > 0
                            ? () => orderInactiveByDateDesc()
                            : () => {}
                        }
                        className={styleTable.btn_arrow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-arrow-badge-down-filled"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#ffffff"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z"
                            stroke-width="0"
                            fill="#e57d00"
                          />
                        </svg>
                      </button>
                    </span>
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
                    ? listMuestrasActivas.map((data, index) => (
                        <StickersTable
                          key={index}
                          data={data}
                          isActive={true}
                          Options={Options}
                          isSampleGeneral={isSampleGeneral}
                          LstObservacionesPrede={LstObservacionesPrede}
                        ></StickersTable>
                      ))
                    : listMuestrasPendientes.map((data, index) => (
                        <StickersTable
                          key={index}
                          data={data}
                          isActive={true}
                          Options={Options}
                          isSampleGeneral={isSampleGeneral}
                          LstObservacionesPrede={LstObservacionesPrede}
                        ></StickersTable>
                      ))
                  : listMuestrasInactivas.length > 0
                  ? listMuestrasInactivas.map((data, index) => (
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
                <tr className={`${styleTable.table_btn} checkListResult`}>
                  <td colSpan={5} className={styleTable.btn_options}>
                    <button
                      onClick={() => {
                        AddListCodBitacora(
                          "inputCheckoutResult",
                          idGruop,
                          ListadoMuestraActivo[0].NOMBRE_GRUPO_ASIGNADO,
                          hrefhash,
                          HrefArmado
                        );
                      }}
                      className={styleTable.btn_sticker}
                    >
                      <span>&#10010; </span>
                      Agregar estatus masivo
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <>
              <br></br>
              {isTrueActive ? (
                ListadoMuestraActivo != null &&
                ListadoMuestraActivo != undefined &&
                ListadoMuestraActivo.length > 0 ? (
                  <Pagination
                    TotalPage={ListadoMuestraActivo[0].TotalPage}
                    page={query.page}
                    pathname={router.pathname}
                    queryArme={{ page: "1" }}
                    hash={null}
                    CountPage={ListadoMuestraActivo[0].Per_PAge}
                  ></Pagination>
                ) : (
                  ""
                )
              ) : ListadoMuestraInactivo != null &&
                ListadoMuestraInactivo != undefined &&
                ListadoMuestraInactivo.length > 0 ? (
                <Pagination
                  TotalPage={ListadoMuestraInactivo[0].TotalPage}
                  page={query.page}
                  pathname={router.pathname}
                  queryArme={{ page: "1" }}
                  hash={null}
                  CountPage={ListadoMuestraInactivo[0].Per_PAge}
                ></Pagination>
              ) : (
                ""
              )}
            </>
          </div>
        ) : (
          <div className={caseStyles.cases_container}>
            {isTrueActive
              ? isSampleGeneral
                ? listMuestrasActivas.map((data, index) => (
                    <CaseComponent
                      key={index}
                      data={data}
                      isActive={true}
                      Options={Options}
                      isSampleGeneral={isSampleGeneral}
                      LstObservacionesPrede={LstObservacionesPrede}
                    ></CaseComponent>
                  ))
                : listMuestrasPendientes.map((data, index) => (
                    <CaseComponent
                      key={index}
                      data={data}
                      isActive={true}
                      Options={Options}
                      isSampleGeneral={isSampleGeneral}
                      LstObservacionesPrede={LstObservacionesPrede}
                    ></CaseComponent>
                  ))
              : listMuestrasInactivas.length > 0
              ? listMuestrasInactivas.map((data, index) => (
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

            <>
              <br></br>
              {isTrueActive ? (
                ListadoMuestraActivo != null &&
                ListadoMuestraActivo != undefined &&
                ListadoMuestraActivo.length > 0 ? (
                  <Pagination
                    TotalPage={ListadoMuestraActivo[0].TotalPage}
                    page={query.page}
                    pathname={router.pathname}
                    queryArme={{ page: "1" }}
                    hash={null}
                    CountPage={ListadoMuestraActivo[0].Per_PAge}
                  ></Pagination>
                ) : (
                  ""
                )
              ) : ListadoMuestraInactivo != null &&
                ListadoMuestraInactivo != undefined &&
                ListadoMuestraInactivo.length > 0 ? (
                <Pagination
                  TotalPage={ListadoMuestraInactivo[0].TotalPage}
                  page={query.page}
                  pathname={router.pathname}
                  queryArme={{ page: "1" }}
                  hash={null}
                  CountPage={ListadoMuestraInactivo[0].Per_PAge}
                ></Pagination>
              ) : (
                ""
              )}
            </>
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
