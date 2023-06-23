import React, { useState, useEffect } from "react";
import {
  FilterQuerySearch,
  ClearFilter,
  OnclickComboEstadoCase,
} from "../Tools/functiones";
import filterStyles from "../../styles/filters.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import CaseStatus from "../CaseStatus";
export default function Filters({
  CasosActivo_Inactivos,
  isActiveGroup,
  id,
  ListadoUsuariosRegistrados,
  isActiveCase,
  ListadoGrupoActivo,
  NumSticker,
  dateAdmision,
  result,
  URS,
  // isUserInterno,
  isSampleGeneral,
  HrefArmado,
  Options,
}) {
  const router = useRouter();
  const [GruopValue, setGruopValue] = useState(
    id != undefined && id != null ? id : ""
  );

  const [NumeroSticker, setNumeroSticker] = useState(
    NumSticker != undefined && NumSticker != null ? NumSticker : ""
  );
  const [FechaIngreso, setFechaIngreso] = useState(
    dateAdmision != undefined && dateAdmision != null ? dateAdmision : ""
  );
  const [Resultado, setResultado] = useState(
    result != undefined && result != null ? result : ""
  );
  const [UserRegisterStiker, setUserRegisterStiker] = useState(
    URS != undefined && URS != null ? URS : ""
  );
  const [isTrueActive, setisTrueActive] = useState(false);

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

  return (
    <>
      <div
        className={
          isActiveGroup
            ? `${filterStyles.filters} ${filterStyles.special_filters}`
            : filterStyles.filters
        }
      >
        {Options.OrdersInactive ? (
          isActiveGroup ? (
            <CaseStatus
              Options={Options}
              HrefArmado={{ pathname: "/" }}
              isTrueActive={isTrueActive}
              isActiveCase={true}
            ></CaseStatus>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <form>
          <div className={filterStyles.filters_container}>
            <div className={filterStyles.inputs_container}>
              {isActiveGroup ? (
                <select
                  defaultValue={GruopValue}
                  name="ListGroup"
                  onClick={(e) => setGruopValue(e.target.value)}
                  className={filterStyles.filter_input_w100}
                >
                  <option value="" disabled>
                    Seleccione un Grupo (Obligatorio)
                  </option>
                  {ListadoGrupoActivo != null
                    ? ListadoGrupoActivo.map((data, index) => (
                        <option key={index} value={data.Id_grupo}>
                          {`${data.NOMBRE_GRUPO}`}
                        </option>
                      ))
                    : ""}
                </select>
              ) : (
                ""
              )}

              {Options.OrdersInactive ? (
                isActiveCase ? (
                  <select
                    value={CasosActivo_Inactivos}
                    name="ListCasos"
                    onChange={(e) =>
                      OnclickComboEstadoCase(
                        e.target.value,
                        router,
                        HrefArmado,
                        // isUserInterno,
                        isSampleGeneral
                      )
                    }
                    className={filterStyles.filter_input_w100}
                  >
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                  </select>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="N° de sticker"
                onChange={(e) => {
                  setNumeroSticker(e.target.value);
                }}
                value={NumeroSticker}
              />
              <input
                type="date"
                title="Fecha de ingreso"
                className={filterStyles.filter_input}
                placeholder="Fecha de ingreso"
                onChange={(e) => {
                  setFechaIngreso(e.target.value);
                }}
                value={FechaIngreso}
              />
              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="Resultado"
                onChange={(e) => {
                  setResultado(e.target.value);
                }}
                value={Resultado}
              />
              <select
                defaultValue={UserRegisterStiker}
                name="UserRegisterSticker"
                onClick={(e) => setUserRegisterStiker(e.target.value)}
                className={filterStyles.filter_input}
              >
                <option value="" disabled>
                  Seleccione un usuario
                </option>
                {ListadoUsuariosRegistrados != null
                  ? ListadoUsuariosRegistrados.map((data, index) => (
                      <option key={index} value={data.Id}>
                        {`${data.Numero_de_Identidad} - ${data.Email}`}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className={filterStyles.buttons_container}>
              <Link
                href={""}
                onClick={(e) => {
                  e.preventDefault();
                  FilterQuerySearch(
                    e,
                    router,
                    GruopValue,
                    NumeroSticker,
                    FechaIngreso,
                    Resultado,
                    UserRegisterStiker,
                    CasosActivo_Inactivos
                  );
                }}
                className={filterStyles.search}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </Link>
              {Options.BtnCrearStickerAndUrl ? (
                <Link
                  href={{
                    pathname: "/Sample/Create/[id]",
                    query: { id: GruopValue == "" ? 6 : GruopValue },
                  }}
                  title="Crear sticker"
                  className={filterStyles.add_followup}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-square-plus"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                  </svg>
                </Link>
              ) : (
                ""
              )}

              <Link
                href={""}
                onClick={(e) => {
                  e.preventDefault();
                  ClearFilter(e, router, GruopValue);
                }}
                className={filterStyles.search}
                title="Limpiar filtros de búsqueda"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
                  <path d="M18 13.3l-6.3 -6.3" />
                </svg>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
