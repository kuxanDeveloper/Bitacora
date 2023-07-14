import React from "react";
import CaseNavStyles from "../styles/CaseNav.module.scss";
import Link from "next/link";
export default function CaseNav({
  ListadoGrupo,
  idGruop,
  isTrueActive,
  // isUserInterno,
  isSampleGeneral,
  HrefArmado,
}) {
  function QueryReturnNew(obj, idNEw) {
    let newObje = {};
    newObje.id = idNEw;
    newObje.idAncestro = obj.idAncestro;
    if (
      (obj.Numstiker !== undefined &&
        obj.Numstiker !== null &&
        obj.Numstiker !== "") ||
      (obj.DateAdmission !== "" &&
        obj.DateAdmission !== undefined &&
        obj.DateAdmission !== null) ||
      (obj.result !== "" && obj.result !== null && obj.result !== undefined) ||
      (obj.URS !== "" && obj.URS !== null && obj.URS !== undefined)
    ) {
      
      newObje.Numstiker = obj.Numstiker;
      newObje.DateAdmission = obj.DateAdmission;
      newObje.result = obj.result;
      newObje.URS = obj.URS;
      
    }

    return newObje;
  }
  function Retorno() {
    try {
      return ListadoGrupo.map((data, index) => (
        <li
          key={index}
          className={`${CaseNavStyles.nav_li} ${
            data.Id_grupo == idGruop ? CaseNavStyles.selected : ""
          }`}
        >
          <Link
            href={{
              pathname: "/[id]",
              query: QueryReturnNew(HrefArmado.query, data.Id_grupo),
              hash: `${isTrueActive ? "Cactive" : "Cinactvie"}${
                isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
              }`,
            }}
            className={CaseNavStyles.nav_link}
          >
            {data.NOMBRE_GRUPO}
          </Link>
        </li>
      ));
    } catch (error) {
      return console.log(error);
    }
  }

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
            {ListadoGrupo != null && ListadoGrupo != undefined ? Retorno() : ""}
          </nav>
        </div>
      </section>
    </>
  );
}
