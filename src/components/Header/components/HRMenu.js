import React from "react";
import Styles from "../../../styles/Header.module.css";
import { useContextBitacora } from "../../../context/BitacoraContext";
function HRMenu() {
  const { MenuShow, setMenuShow } = useContextBitacora();
  return (
    <>
      {/* anada la clase open para abrir el menu */}
      <div  className={`${Styles.menu} ${MenuShow ? Styles.open : ""}`}>
        {/* ${Styles.open}   */}
        <section className={Styles.menu_container}>
          <nav className={Styles.navegation}>
            <ul className={Styles.nav_ul}>
              <li className={Styles.nav_li}>
                <a href="" className={`${Styles.nav_link} ${Styles.active}`}>
                  Lik
                </a>
              </li>

              <li className={Styles.nav_li}>
                <a href="" className={`${Styles.nav_link} `}>
                  {" "}
                  {/* ${Styles.active} */}
                  Lik
                </a>
              </li>

              <li className={Styles.nav_li}>
                <a href="" className={`${Styles.nav_link} `}>
                  Lik
                </a>
              </li>

              <li className={Styles.nav_li}>
                <a href="" className={`${Styles.nav_link} `}>
                  Lik
                </a>
              </li>

              <li className={Styles.nav_li}>
                <a href="" className={`${Styles.nav_link} `}>
                  Lik
                </a>
              </li>

              <li className={Styles.nav_li}>
                <a href="" className={`${Styles.nav_link} `}>
                  Lik
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </>
  );
}

export default HRMenu;
