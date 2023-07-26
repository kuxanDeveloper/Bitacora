import React, { useState, useEffect } from "react";
import {
  FilterQuerySearch,
  ClearFilter,
  OnclickComboEstadoCase,
  OnkeyDowNumberOneCharater,
  OnPasteNumberOneCharater,
} from "../Tools/functiones";
import filterStyles from "../../styles/filters.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import CaseStatus from "../CaseStatus";
import { useContextBitacora } from "../../context/BitacoraContext";

export default function Filters({
  CasosActivo_Inactivos,
  isActiveGroup,
  id,
  ListadoSufijosxGroupAll,
  isActiveCase,
  ListadoGrupoActivo,
  NumSticker,
  dateAdmision,
  isSampleGeneral,
  HrefArmado,
  Options,
  ListaAncestros,
  setidAncestro,
  idAncestro,
  setcmbFiltroCambio,
}) {
  const router = useRouter();
  const [GruopValue, setGruopValue] = useState(
    id != undefined && id != null ? id : ""
  );
  const { ResultScanner, setResultScanner, setshowModalScanner } =
    useContextBitacora();

  const [Option, setOption] = useState(Options);

  const [NumeroSticker, setNumeroSticker] = useState(
    NumSticker != undefined && NumSticker != null ? NumSticker : ""
  );
  const [FechaIngreso, setFechaIngreso] = useState(
    dateAdmision != undefined && dateAdmision != null ? dateAdmision : ""
  );

  // const [Resultado, setResultado] = useState(
  //   result != undefined && result != null ? result : ""
  // );
  // const [UserRegisterStiker, setUserRegisterStiker] = useState(
  //   URS != undefined && URS != null ? URS : ""
  // );

  useEffect(() => {
    const AncestroLst = document.getElementById("ListAncestro");
    console.log(idAncestro);
    if (idAncestro != "" && idAncestro != undefined) {
      AncestroLst.value = idAncestro.toString();
    }
  }, [ListaAncestros]);

  const [isTrueActive, setisTrueActive] = useState(false);
  useEffect(() => {
    if (Option.OrdersInactive) {
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
      if (Option.OrdersInactive) {
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

  useEffect(() => {
    if (ResultScanner != "" && ResultScanner != null) {
      const SplitScanner = ResultScanner.split("-");
      if (SplitScanner != null && SplitScanner != undefined) {
        if (SplitScanner.length > 1) {
          let SearchGroupSufij = ListadoSufijosxGroupAll.find(
            (data) => data.SUFIJO_GRUPO == SplitScanner[1]
          );

          if (SearchGroupSufij != undefined && SearchGroupSufij != null) {
            setGruopValue(SearchGroupSufij.Id_grupo);
          }
        }
      }

      setNumeroSticker(ResultScanner);
      setResultScanner(null);
      let clickSearch = document.getElementById("clickFilter");
      setTimeout(() => {
        if (clickSearch != null && clickSearch != undefined) {
          clickSearch.click();
        }
      }, 100);
    }
  }, [ResultScanner]);

  // useEffect(() => {
  //   let numStickerpaste = document.getElementById("numStickerText");
  //   if (numStickerpaste != undefined && numStickerpaste != null) {
  //     OnPasteNumberOneCharater(numStickerpaste, setNumeroSticker);
  //   }
  // }, []);

  return (
    <>
      <div
        className={
          isActiveGroup
            ? `${filterStyles.filters} ${filterStyles.filtershome} ${filterStyles.special_filters}`
            : filterStyles.filters
        }
      >
        <div className={filterStyles.center}>
          {Option.OrdersInactive ? (
            isActiveGroup ? (
              <CaseStatus
                Options={Option}
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
              <div className={filterStyles.controls}>
                <div className={filterStyles.inputs_container}>
                  {Options.BtnCrearStickerAndUrl ? (
                    <div className={filterStyles.add_followup_container}>
                      <Link
                        href={{
                          pathname: "/Sample/Create/[id]",
                          query: { id: GruopValue == "" ? 6 : GruopValue },
                        }}
                        title="Leer sticker"
                        className={filterStyles.add_followup}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-square-plus"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="#fff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                          <path d="M9 12l6 0" />
                          <path d="M12 9l0 6" />
                        </svg>
                        Leer sticker
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className={filterStyles.divFiltro}>
                    <select
                      name="ListAncestro"
                      id="ListAncestro"
                      onChange={(e) => {
                        setidAncestro(e.target.value);
                        setcmbFiltroCambio(e.target.value);
                      }}
                      className={filterStyles.filter_input_w45}
                      defaultValue={0}
                    >
                      <option value={0} disabled>
                        Seleccione un Grupo Principal
                      </option>
                      {ListaAncestros != null && ListaAncestros.length > 0
                        ? ListaAncestros.map((data, index) => (
                            <option key={index} value={data.COD_ANCESTRO}>
                              {data.NOMBRE_ANCESTRO}
                            </option>
                          ))
                        : ""}
                    </select>

                    {isActiveGroup ? (
                      <select
                        defaultValue={GruopValue}
                        name="ListGroup"
                        onClick={(e) => setGruopValue(e.target.value)}
                        className={`${filterStyles.filter_input_w45} ${filterStyles.sinmarginleft}`}
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
                  </div>

                  {Option.OrdersInactive ? (
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

                  <div className={filterStyles.search_sticker}>
                    <Link
                      href={""}
                      title="Leer sticker"
                      onClick={(e) => {
                        e.preventDefault();
                        setshowModalScanner(true);
                      }}
                      className={filterStyles.add_followup}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={filterStyles.icon}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#fff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7v-1a2 2 0 0 1 2 -2h2" />
                        <path d="M4 17v1a2 2 0 0 0 2 2h2" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v1" />
                        <path d="M16 20h2a2 2 0 0 0 2 -2v-1" />
                        <path d="M5 12l14 0" />
                      </svg>
                    </Link>

                    <input
                      type="text"
                      id="numStickerText"
                      className={filterStyles.filter_input}
                      placeholder="N° de sticker"
                      onChange={(e) => {
                        setNumeroSticker(e.target.value);
                      }}
                      autoComplete="off"
                      onKeyPress={(e) => OnkeyDowNumberOneCharater(e)}
                      onPaste={(e) =>
                        OnPasteNumberOneCharater(
                          e,
                          document.getElementById("numStickerText"),
                          setNumeroSticker
                        )
                      }
                      value={NumeroSticker}
                    />
                  </div>

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
                </div>
                <div className={filterStyles.buttons_container}>
                  <Link
                    href={""}
                    id="clickFilter"
                    onClick={(e) => {
                      e.preventDefault();
                      FilterQuerySearch(
                        e,
                        router,
                        GruopValue,
                        NumeroSticker,
                        FechaIngreso,
                        document.getElementById("ListAncestro").value
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
