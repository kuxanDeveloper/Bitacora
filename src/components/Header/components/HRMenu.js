import React, { useEffect, useState } from "react";
import Styles from "../../../styles/Header.module.css";
import { useContextBitacora } from "../../../context/BitacoraContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { LocationUrl } from "../../Tools/functiones";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../../Tools/OpcitionHabilite";
function HRMenu() {
  const { MenuShow, setMenuShow } = useContextBitacora();
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
                  <li className={Styles.nav_li}>
                    <Link
                      href="/Configuration/Group"
                      className={`${Styles.nav_link} ${
                        LocationUrl(router, "configuration")
                          ? Styles.active
                          : ""
                      } `}
                    >
                      Configuración
                    </Link>
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
