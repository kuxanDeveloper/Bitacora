import React from "react";
import CaseNavStyles from "@/styles/CaseNav.module.css";
import Link from "next/link";
export default function CaseNav({
  ListadoGrupo,
  idGruop,
  isTrueActive,
  isUserInterno,
  isSampleGeneral,
}) {
  return (
    <>
      {/* <!-- navegacion de los casos --> */}
      <section className={CaseNavStyles.case_nav}>
        <div className={CaseNavStyles.nav_container}>
          <nav className={CaseNavStyles.navegation_bar}>
            {/* <!-- list item --> */}
            <li className={CaseNavStyles.nav_li}>
              <Link
                href={{
                  pathname: "/",
                  hash: isTrueActive ? "Cactive" : "Cinactvie",
                }}
                className={CaseNavStyles.nav_link}
              >
                Inicio
              </Link>
            </li>
            {ListadoGrupo.map((data, index) => (
              <li
                key={index}
                className={`${CaseNavStyles.nav_li} ${
                  data.Id_grupo == idGruop ? CaseNavStyles.selected : ""
                }`}
              >
                <Link
                  href={{
                    pathname: "/[id]",
                    query: {
                      id: data.Id_grupo,
                    },
                    hash: `${isTrueActive ? "Cactive" : "Cinactvie"}${
                      isUserInterno ? "#UserInter" : "#UserExter"
                    }${isSampleGeneral ? "#OverallSample" : "#UrgentSamples"}`,
                  }}
                  className={CaseNavStyles.nav_link}
                >
                  {data.NOMBRE_GRUPO}
                </Link>
              </li>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
