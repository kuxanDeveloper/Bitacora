import React from "react";
import CasesStatusStyles from '../../styles/casesStatus.module.css';

export default function CasesStatus() {
  return (
    <>
      <section className={CasesStatusStyles.type_cases_status}>
        <div className={CasesStatusStyles.cases_container}>
          <div className={CasesStatusStyles.state}>
            {/* anada active para darle el estilo de activo */}
            <p className={`${CasesStatusStyles.status} ${CasesStatusStyles.active} `}>
              <a href="" className={CasesStatusStyles.status_link}>
                casos internos
              </a>
            </p>
            <p className={CasesStatusStyles.status}>
              <a href="" className={CasesStatusStyles.status_link}>
                casos externos
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
