import React from "react";
import CasesStatusStyles from "../../styles/casesStatus.module.css";
import Link from "next/link";
export default function CasesStatusUrgentGen({
  idGruop,
  isTrueActive,
  isUserInterno,
  isSampleGeneral,
}) {
  return (
    <>
      <section className={CasesStatusStyles.type_cases_status}>
        <div className={CasesStatusStyles.cases_container}>
          <div className={CasesStatusStyles.state}>
            {/* anada active para darle el estilo de activo */}
            <p
              className={`${CasesStatusStyles.status} ${
                isSampleGeneral ? CasesStatusStyles.active : ""
              } `}
            >
              <Link
                href={{
                  pathname: "/[id]",
                  query: { id: idGruop },
                  hash: `${isTrueActive ? "Cactive" : "Cinactvie"}${
                    isUserInterno ? "#UserInter" : "#UserExter"
                  }#OverallSample`,
                }}
                className={CasesStatusStyles.status_link}
              >
                Casos generales
              </Link>
            </p>
            <p
              className={`${CasesStatusStyles.status} ${
                !isSampleGeneral ? CasesStatusStyles.active : ""
              }`}
            >
              <Link
                href={{
                  pathname: "/[id]",
                  query: { id: idGruop },
                  hash: `${isTrueActive ? "Cactive" : "Cinactvie"}${
                    isUserInterno ? "#UserInter" : "#UserExter"
                  }#UrgentSamples`,
                }}
                className={CasesStatusStyles.status_link}
              >
                Casos urgentes
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
