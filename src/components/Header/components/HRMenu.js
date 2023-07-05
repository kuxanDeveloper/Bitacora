import React, { useEffect, useState } from "react";
import Styles from "../../../styles/Header.module.scss";
import { useContextBitacora } from "../../../context/BitacoraContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { LocationUrl, OnclickNAvToggle } from "../../Tools/functiones";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../Tools/OpcitionHabilite";
function HRMenu() {
  const {
    MenuShow,
    setMenuShow,
    SelectMenuConfigracion,
    setSelectMenuConfigracion,
  } = useContextBitacora();
  const [Roles, setRoles] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("RolUser") != null) {
      const ArrayRoles = JSON.parse(localStorage.getItem("RolUser"));
      ArrayRoles.map((data) => {
        if (data == 1) {
          setRoles(OptionAdministrator);
        } else if (data == 2) {
          setRoles(OptionTecnichal);
        } else if (data == 3) {
          setRoles(OptionAsiste);
        } else if (data == 4) {
          setRoles(OptionConsult);
        } else {
          setRoles(OptionDefault);
        }
      });
    }

    setSelectMenuConfigracion(LocationUrl(router, "configuration"));
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
                  onClick={(e) => {
                    OnclickNAvToggle(MenuShow, setMenuShow);
                  }}
                  className={`${Styles.nav_link} ${
                    !LocationUrl(router, "configuration") ? Styles.active : ""
                  }`}
                >
                  Home
                </Link>
              </li>
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
                      Parametrización
                    </Link>
                    <div className={Styles.submenu}>
                      <ul className={Styles.sub_ul}>
                        {Roles.UserConfigCreateAndUrl ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/Users/IndexUsers"
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
                        {Roles.GroupConfigCreateAndUrl ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/Groups/IndexGroup"
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

                        {Roles.ObservacionPredeCreateAndUrl ? (
                          <li className={Styles.sub_li}>
                            <Link
                              href="/Configuration/DefaultObservations/IndexObservations"
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
