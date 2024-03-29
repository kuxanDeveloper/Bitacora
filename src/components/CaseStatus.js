import React from "react";
import CaseStyles from "../styles/CaseStatus.module.css";
import Link from "next/link";
export default function CaseStatus({
  HrefArmado,
  isActiveCase,
  isTrueActive,
  // isUserInterno,
  isSampleGeneral,
  Options,
  idAncestro,
  setHasValue,
}) {
  return (
    <>
      {isActiveCase ? (
        <section className={CaseStyles.case_status}>
          <div className={CaseStyles.cases_container}>
            <div className={CaseStyles.state}>
              <p
                className={`${CaseStyles.status} ${
                  isTrueActive ? CaseStyles.active : ""
                }`}
              >
                {HrefArmado.query != undefined && HrefArmado.query != null ? (
                  <Link
                    href={{
                      pathname: HrefArmado.pathname,
                      query: HrefArmado.query,
                      hash: `Cactive${
                        isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
                      }`,
                    }}
                    onClick={() => setHasValue("Cactive")}
                    className={CaseStyles.status_link}
                  >
                    Casos activos
                  </Link>
                ) : (
                  <Link
                    href={{
                      pathname: HrefArmado.pathname,
                      query: { page: "1", idAncest: idAncestro },
                      hash: "Cactive",
                    }}
                    onClick={() => setHasValue("Cactive")}
                    className={CaseStyles.status_link}
                  >
                    Casos activos
                  </Link>
                )}
              </p>
              <p
                className={`${CaseStyles.status} ${
                  !isTrueActive ? CaseStyles.active : ""
                }`}
              >
                {HrefArmado.query != undefined && HrefArmado.query != null ? (
                  <Link
                    href={{
                      pathname: HrefArmado.pathname,
                      query: HrefArmado.query,
                      hash: `Cinactvie${
                        isSampleGeneral ? "#OverallSample" : "#UrgentSamples"
                      }`,
                    }}
                    onClick={()=> setHasValue("Cinactvie")}
                    className={CaseStyles.status_link}
                  >
                    Casos inactivos
                  </Link>
                ) : (
                  <Link
                    href={{
                      pathname: HrefArmado.pathname,
                      query: { page: "1", idAncest: idAncestro },
                      hash: "Cinactvie",
                    }}
                    onClick={()=> setHasValue("Cinactvie")}
                    className={CaseStyles.status_link}
                  >
                    Casos inactivos
                  </Link>
                )}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
