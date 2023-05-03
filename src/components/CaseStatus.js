import React from "react";
import CaseStyles from "@/styles/CaseStatus.module.css";

export default function CaseStatus() {
  return (
    <>
      <section className={CaseStyles.case_status}>
        <div className={CaseStyles.cases_container}>
          <div className={CaseStyles.state}>
            <p className={`${CaseStyles.status} ${CaseStyles.active}`}>
              <a href="#" className={CaseStyles.status_link}>
                casos activos
              </a>
            </p>
            <p className={CaseStyles.status}>
              <a href="#" className={CaseStyles.status_link}>
                casos Inactivos
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
