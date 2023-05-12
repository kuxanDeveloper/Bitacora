import React from "react";
import caseStyles from "@/styles/Case.module.css";
import CaseNav from "./CaseNav";
import CasesStatusUser from "./Body/CasesStatusUser";
import CasesStatusUrgentGen from "./Body/CasesStatusUrgentGen";
import {
  UserInternosActive,
  UserExternosActive,
  UserInternosInactive,
  UserExternosInactive,
} from "./Tools/functiones";
export default function Case({
  ListadoGrupo,
  ListadoMuestraActivo,
  ListadoMuestraInactivo,
  isTrueActive,
  idGruop,
  isUserInterno,
  isSampleGeneral,
}) {
  const ListadoMuestrasActiveUserInter =
    UserInternosActive(ListadoMuestraActivo);
  const ListadoMuestrasActiveUserExterno =
    UserExternosActive(ListadoMuestraActivo);

  const ListadoMuestrasInactiveUserInter = UserInternosInactive(
    ListadoMuestraInactivo
  );
  const ListadoMuestrasInactiveUserExterno = UserExternosInactive(
    ListadoMuestraInactivo
  );

  return (
    <>
      <section className={caseStyles.cases}>
        <CasesStatusUser
          isTrueActive={isTrueActive}
          isUserInterno={isUserInterno}
          idGruop={idGruop}
          isSampleGeneral={isSampleGeneral}
        ></CasesStatusUser>
        <CaseNav
          ListadoGrupo={ListadoGrupo}
          idGruop={idGruop}
          isTrueActive={isTrueActive}
          isUserInterno={isUserInterno}
          isSampleGeneral={isSampleGeneral}
        ></CaseNav>
        <div className={caseStyles.cases_container}>
          <CasesStatusUrgentGen
            isTrueActive={isTrueActive}
            isSampleGeneral={isSampleGeneral}
            isUserInterno={isUserInterno}
            idGruop={idGruop}
          ></CasesStatusUrgentGen>
          {isTrueActive
            ? isUserInterno
              ? ListadoMuestrasActiveUserInter.map((data, index) => (
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
              : ListadoMuestrasActiveUserExterno.map((data, index) => (
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
            : isUserInterno
            ? ListadoMuestrasInactiveUserInter.map((data, index) => (
                <div key={index} className={caseStyles.card}>
                  <div className={caseStyles.sticker}>
                    <p className={caseStyles.sticker_title}>Sticker</p>

                    <div className={caseStyles._image}></div>
                    <div className={caseStyles._image}></div>
                  </div>

                  <div className={caseStyles.card_body}>
                    <span className={`${caseStyles.card_state}`}></span>
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
            : ListadoMuestrasInactiveUserExterno.map((data, index) => (
                <div key={index} className={caseStyles.card}>
                  <div className={caseStyles.sticker}>
                    <p className={caseStyles.sticker_title}>Sticker</p>

                    <div className={caseStyles._image}></div>
                    <div className={caseStyles._image}></div>
                  </div>

                  <div className={caseStyles.card_body}>
                    <span className={`${caseStyles.card_state}`}></span>
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
              ))}
        </div>
      </section>
    </>
  );
}
