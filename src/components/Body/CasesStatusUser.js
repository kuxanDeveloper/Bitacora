import React from "react";
import CasesStatusStyles from "../../styles/casesStatus.module.css";
import Link from "next/link";
export default function CasesStatusUser({
  idGruop,
  isTrueActive,
  isUserInterno,
  isSampleGeneral,
  HrefArmado,
}) {


  return (
    <>
      <section className={CasesStatusStyles.type_cases_status}>
        <div className={CasesStatusStyles.cases_container}>
          <div className={CasesStatusStyles.state}>
            {/* anada active para darle el estilo de activo */}
            <p
              className={`${CasesStatusStyles.status} ${
                isUserInterno ? CasesStatusStyles.active : ""
              } `}
            >
              <Link
                href={{
                  pathname: "/[id]",
                  query: HrefArmado.query,
                  hash: `${isTrueActive ? "Cactive" : "Cinactvie"}#UserInter${
                    isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
                  }`,
                }}
                className={CasesStatusStyles.status_link}
              >
                Casos internos
              </Link>
            </p>
            <p
              className={`${CasesStatusStyles.status} ${
                !isUserInterno ? CasesStatusStyles.active : ""
              }`}
            >
              <Link
                href={{
                  pathname: "/[id]",
                  query: HrefArmado.query,
                  hash: `${isTrueActive ? "Cactive" : "Cinactvie"}#UserExter${
                    isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
                  }`,
                }}
                className={CasesStatusStyles.status_link}
              >
                Casos externos
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
