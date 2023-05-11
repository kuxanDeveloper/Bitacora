import React from "react";
import caseStyles from "@/styles/Case.module.css";
import CaseNav from "./CaseNav";

export default function Case({
  ListadoGrupo,
  ListadoMuestraActivo,
  ListadoMuestraInactivo,
  isTrueActive,
  idGruop,
}) {
  return (
    <>
      <section className={caseStyles.cases}>
        <CaseNav
          ListadoGrupo={ListadoGrupo}
          idGruop={idGruop}
          isTrueActive={isTrueActive}
        ></CaseNav>
        <div className={caseStyles.cases_container}>
          {isTrueActive
            ? ListadoMuestraActivo.map((data, index) => (
                <div key={index} className={caseStyles.card}>
                  <div className={caseStyles.sticker}>
                    <p className={caseStyles.sticker_title}>Sticker</p>

                    <div className={caseStyles._image}></div>
                    <div className={caseStyles._image}></div>
                  </div>

                  <div className={caseStyles.card_body}>
                    <span
                      className={`${caseStyles.card_state} ${caseStyles.active}`}
                    ></span>
                    <span className={caseStyles.body_title}>N° Sticker</span>
                    <p className={caseStyles.card_number}>
                      {data.NUMERO_STICKER}
                    </p>
                    <span className={caseStyles.body_title}>
                      {" "}
                      Fecha de Ingreso
                    </span>
                    <p className={caseStyles.card_date}>
                      {data.FECHA_FORMAT_CREADO_BITACORA}
                    </p>

                    <div className={caseStyles.card_btn_container}>
                      <a href="" className={caseStyles.btn_sticker}>
                        Ver Más
                      </a>
                    </div>
                  </div>
                </div>
              ))
            : ListadoMuestraInactivo.map((data, index) => (
                <div key={index} className={caseStyles.card}>
                  <div className={caseStyles.sticker}>
                    <p className={caseStyles.sticker_title}>Sticker</p>

                    <div className={caseStyles._image}></div>
                    <div className={caseStyles._image}></div>
                  </div>

                  <div className={caseStyles.card_body}>
                    <span className={caseStyles.card_state}></span>
                    <span className={caseStyles.body_title}> N° Sticker </span>
                    <p className={caseStyles.card_number}>{data.NUMERO_STICKER}</p>
                    <span className={caseStyles.body_title}>
                      {" "}
                      Fecha de Ingreso
                    </span>
                    <p className={caseStyles.card_date}>{data.FECHA_FORMAT_CREADO_BITACORA}</p>

                    <div className={caseStyles.card_btn_container}>
                      <a href="" className={caseStyles.btn_sticker}>
                        Ver Más
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </>
  );
}
