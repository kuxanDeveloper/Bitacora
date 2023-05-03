import React from "react";
import CaseNavStyles from "@/styles/CaseNav.module.css";

export default function CaseNav() {
  return (
    <>
      {/* <!-- navegacion de los casos --> */}
      <section className={CaseNavStyles.case_nav}>
        <div className={CaseNavStyles.nav_container}>
          <nav className={CaseNavStyles.navegation_bar}>
            {/* <!-- list item --> */}
            <li className={CaseNavStyles.nav_li}>
              <a href="" className={CaseNavStyles.nav_link}>
                Inicio
              </a>
            </li>
            {/* <!-- list item --> */}
            <li className={`${CaseNavStyles.nav_li} ${CaseNavStyles.selected}`}>
              <a href="" className={CaseNavStyles.nav_link}>
                urocultivos
              </a>
            </li>
            {/* <!-- list item --> */}
            <li className={CaseNavStyles.nav_li}>
              <a href="" className={CaseNavStyles.nav_link}>
                hemocultivos
              </a>
            </li>
            {/* <!-- list item --> */}
            <li className={CaseNavStyles.nav_li}>
              <a href="" className={CaseNavStyles.nav_link}>
                Hongos
              </a>
            </li>
            {/* <!-- list item --> */}
            <li className={CaseNavStyles.nav_li}>
              <a href="" className={CaseNavStyles.nav_link}>
                Microbacteria
              </a>
            </li>
            {/* <!-- list item --> */}
            <li className={CaseNavStyles.nav_li}>
              <a href="" className={CaseNavStyles.nav_link}>
                Cultivos
              </a>
            </li>
          </nav>
        </div>
      </section>
    </>
  );
}
