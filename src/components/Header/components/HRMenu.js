import React, { useEffect, useState } from "react";
import Styles from "../../../styles/Header.module.scss";
import { useContextBitacora } from "../../../context/BitacoraContext";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LocationUrl,
  OnclickNAvToggle,
  FechaInitSearchDiffDays,
} from "../../Tools/functiones";
function HRMenu({ Roles }) {
  const {
    MenuShow,
    setMenuShow,
    SelectMenuConfigracion,
    setSelectMenuConfigracion,
    SelectMenuTrazabilidad,
    setSelectMenuTrazabilidad,
    SelectMenuEstadistica,
    setSelectMenuEstadistica,
  } = useContextBitacora();
  const router = useRouter();

  useEffect(() => {
    setSelectMenuConfigracion(LocationUrl(router, "configuration"));
  }, []);

  useEffect(() => {
    setSelectMenuTrazabilidad(LocationUrl(router, "trazabilidad"));
  }, []);

  useEffect(() => {
    setSelectMenuEstadistica(LocationUrl(router, "Statistics"));
  }, []);

  return (
    <>
      {/* anada la clase open para abrir el menu */}
      <div className={`${Styles.menu} ${MenuShow ? Styles.open : ""}`}>
        {/* ${Styles.open}   */}
        <section className={Styles.menu_container}>
          <nav className={Styles.navegation}>
            <ul className={Styles.nav_ul}>
              <li className={Styles.nav_li}>
                <Link
                  href="/"
                  onClick={() => {
                    OnclickNAvToggle(MenuShow, setMenuShow);
                  }}
                  className={`${Styles.nav_link} ${
                    !LocationUrl(router, "configuration") &&
                    !LocationUrl(router, "Statistics")
                      ? Styles.active
                      : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              {/* <li className={Styles.nav_li}>
                <Link
                  href={{
                    pathname: "/Statistics",
                    query: {
                      DateIni: FechaInitSearchDiffDays(15),
                      DateEnd: FechaInitSearchDiffDays(0),
                    },
                  }}
                  onClick={() => {
                    OnclickNAvToggle(MenuShow, setMenuShow);
                  }}
                  className={`${Styles.nav_link} ${
                    LocationUrl(router, "Statistics") ? Styles.active : ""
                  }`}
                >
                  Estadísticas
                </Link>
              </li> */}

              {Roles != null ? (
                Roles.SectionMetrics ? (
                  <li
                    className={`${Styles.nav_li}  ${
                      SelectMenuEstadistica ? Styles.selected : ""
                    }`}
                  >
                    <button
                      className={Styles.open_icon}
                      onClick={(e) => {
                        e.preventDefault();
                        if (SelectMenuEstadistica)
                          setSelectMenuEstadistica(false);
                        else setSelectMenuEstadistica(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ff6e00"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z"
                          strokeWidth="0"
                          fill="#ff6e00"
                        />
                      </svg>
                    </button>
                    <Link
                      href={"#"}
                      className={`${Styles.nav_link} ${
                        LocationUrl(router, "Statistics") ? Styles.active : ""
                      } `}
                      onClick={(e) => {
                        e.preventDefault();
                        if (SelectMenuEstadistica)
                          setSelectMenuEstadistica(false);
                        else setSelectMenuEstadistica(true);
                      }}
                    >
                      Metricas
                    </Link>
                    <div className={Styles.submenu}>
                      <ul className={Styles.sub_ul}>                       
                          <li className={Styles.sub_li}>
                            <Link
                              href={{
                                pathname: "/Statistics/IndexStatistics",
                                query: {
                                  DateIni: FechaInitSearchDiffDays(15),
                                  DateEnd: FechaInitSearchDiffDays(0),
                                },
                              }}
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexStatistics")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Estadisticas
                            </Link>
                          </li>
                       
                        
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Statistics/IndexCsv?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexCsv")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Indicadores
                            </Link>
                          </li>                        
                      </ul>
                    </div>
                  </li>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {/* 
              <li className={Styles.nav_li}>
                <a href="" className={`${Styles.nav_link} `}>
                  Permisos
                </a>
              </li> */}
              {Roles != null ? (
                Roles.MenuSetting ? (
                  <li
                    className={`${Styles.nav_li}  ${
                      SelectMenuConfigracion ? Styles.selected : ""
                    }`}
                  >
                    <button
                      className={Styles.open_icon}
                      onClick={(e) => {
                        e.preventDefault();
                        if (SelectMenuConfigracion)
                          setSelectMenuConfigracion(false);
                        else setSelectMenuConfigracion(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ff6e00"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z"
                          strokeWidth="0"
                          fill="#ff6e00"
                        />
                      </svg>
                    </button>
                    <Link
                      href={"#"}
                      className={`${Styles.nav_link} ${
                        LocationUrl(router, "configuration")
                          ? Styles.active
                          : ""
                      } `}
                      onClick={(e) => {
                        e.preventDefault();
                        if (SelectMenuConfigracion)
                          setSelectMenuConfigracion(false);
                        else setSelectMenuConfigracion(true);
                      }}
                    >
                      configuración
                    </Link>
                    <div className={Styles.submenu}>
                      <ul className={Styles.sub_ul}>
                        {Roles.UserConfigCreateAndUrl ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/Users/IndexUsers?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexUsers")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Usuarios
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateGroupHome ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/Ancestros/IndexAncestros?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexAncestros")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Grupos Home
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.GroupConfigCreateAndUrl ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/Groups/IndexGroup?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexGroup")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Grupos
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateBossLab ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/JefeLaboratorio/IndexJefe?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexJefe")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Jefes de laboratorio
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateSiteAnatm ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/SitioAnatomico/IndexSitio?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexSitio")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Sitio Anatomico
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateTypeMue ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/TiposMuestras/IndexTipo?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexTipo")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Tipos de muestra
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateEstatusMenu ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/PruebaResultado/IndexPrueba?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexPrueba")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Estatus
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateSeguimientosMenu ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/PlantillaResultado/IndexPlantilla?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexPlantilla")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Seguimientos
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateOptionsMenu ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/OptionsResult/IndexOption?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexOption")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Opciones
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.CreateMicroorganismos ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/Microorganismos/IndexMicroorganismo?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexMicroorganismo")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Microorganismos
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.ObservacionPredeCreateAndUrl ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/DefaultObservations/IndexObservations?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexObservations")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Observaciones Predeterminadas
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        {Roles.NumberCreateAndUrl ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/Number/IndexNumber?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexNumber")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Número
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </li>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {Roles != null ? (
                Roles.SectionTrazability ? (
                  <li
                    className={`${Styles.nav_li}  ${
                      SelectMenuTrazabilidad ? Styles.selected : ""
                    }`}
                  >
                    <button
                      className={Styles.open_icon}
                      onClick={(e) => {
                        e.preventDefault();
                        if (SelectMenuTrazabilidad)
                          setSelectMenuTrazabilidad(false);
                        else setSelectMenuTrazabilidad(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ff6e00"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z"
                          strokeWidth="0"
                          fill="#ff6e00"
                        />
                      </svg>
                    </button>
                    <Link
                      href={"#"}
                      className={`${Styles.nav_link} ${
                        LocationUrl(router, "trazabilidad") ? Styles.active : ""
                      } `}
                      onClick={(e) => {
                        e.preventDefault();
                        if (SelectMenuTrazabilidad)
                          setSelectMenuTrazabilidad(false);
                        else setSelectMenuTrazabilidad(true);
                      }}
                    >
                      Trazabilidad
                    </Link>
                    <div className={Styles.submenu}>
                      <ul className={Styles.sub_ul}>
                        
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Trazabilidad/IndexBitacora?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexBitacora")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Sticker
                            </Link>
                          </li>
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Trazabilidad/IndexSistema?page=1"
                              onClick={() => {
                                OnclickNAvToggle(MenuShow, setMenuShow);
                              }}
                              className={`${Styles.sub_link} ${
                                LocationUrl(router, "IndexSistema")
                                  ? Styles.active
                                  : ""
                              }`}
                            >
                              Sistema
                            </Link>
                          </li>                        
                      </ul>
                    </div>
                  </li>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </ul>
          </nav>
        </section>
      </div>
    </>
  );
}

export default HRMenu;
