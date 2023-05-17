import React from "react";
import caseStyles from "@/styles/Case.module.css";
import CaseNav from "./CaseNav";
import CasesStatusUser from "./Body/CasesStatusUser";
import {
  UserInternosActive,
  UserExternosActive,
  UserInternosInactive,
  UserExternosInactive,
  UserInternosActiveGenerales,
  UserInternosActiveUrgencias,
  UserExternosActiveGenerales,
  UserExternosActiveUrgencias,
} from "./Tools/functiones";
import Link from "next/link";
export default function Case({
  ListadoGrupo,
  ListadoMuestraActivo,
  ListadoMuestraInactivo,
  isTrueActive,
  idGruop,
  isUserInterno,
  isSampleGeneral,
  HrefArmado,
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

  const ListadoUsuariosInternosActivesGenerales = UserInternosActiveGenerales(
    ListadoMuestrasActiveUserInter
  );

  const ListadoUsuariosInternosActivesUrgencias = UserInternosActiveUrgencias(
    ListadoMuestrasActiveUserInter
  );

  const ListadoUsuariosExternosActivesGenerales = UserExternosActiveGenerales(
    ListadoMuestrasActiveUserExterno
  );

  const ListadoUsuariosExternosActivesUrgencias = UserExternosActiveUrgencias(
    ListadoMuestrasActiveUserExterno
  );

  return (
    <>
      <CasesStatusUser
        HrefArmado={HrefArmado}
        isTrueActive={isTrueActive}
        isUserInterno={isUserInterno}
        idGruop={idGruop}
        isSampleGeneral={isSampleGeneral}
      ></CasesStatusUser>
      {/* grupos */}

      
      <CaseNav
        HrefArmado={HrefArmado}
        ListadoGrupo={ListadoGrupo}
        idGruop={idGruop}
        isTrueActive={isTrueActive}
        isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
      ></CaseNav>
      <div className={caseStyles.filters_case}>
        <select className={caseStyles.select_filter}>
          <option>1</option>
          <option>casos Activos </option>
          <option>casos inactivos</option>
        </select>
        <select className={caseStyles.select_filter}>
          <option selected="selected">Tipo de caso</option>
          <option>casos internos</option>
          <option>casos externos</option>
        </select>
      </div>
      <section className={caseStyles.cases}>
        {isTrueActive ? (
          <div className={caseStyles.cases_nav}>
            <div className={caseStyles.state}>
              <p
                className={`${caseStyles.status} ${
                  isSampleGeneral ? caseStyles.active : ""
                }`}
              >
                <Link
                  href={{
                    pathname: "/[id]",
                    query: HrefArmado.query,
                    hash: `${isTrueActive ? "Cactive" : "Cinactvie"}${
                      isUserInterno ? "#UserInter" : "#UserExter"
                    }#OverallSample`,
                  }}
                  className={caseStyles.status_link}
                >
                  Casos generales
                </Link>
              </p>
              <p
                className={`${caseStyles.status} ${
                  !isSampleGeneral ? caseStyles.active : ""
                }`}
              >
                <Link
                  href={{
                    pathname: "/[id]",
                    query: HrefArmado.query,
                    hash: `${isTrueActive ? "Cactive" : "Cinactvie"}${
                      isUserInterno ? "#UserInter" : "#UserExter"
                    }#UrgentSamples`,
                  }}
                  className={caseStyles.status_link}
                >
                  Casos urgentes
                </Link>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={caseStyles.cases_container}>
          {isTrueActive
            ? isUserInterno
              ? isSampleGeneral
                ? ListadoUsuariosInternosActivesGenerales.map((data, index) => (
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
                        <span className={caseStyles.body_title}>
                          N° Sticker
                        </span>
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
                          <Link
                            href={{
                              pathname: "/Sample/ViewDetails/[id]",
                              query: { id: data.NUMERO_STICKER },
                            }}
                            className={caseStyles.btn_sticker}
                          >
                            Ver Más
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                : ListadoUsuariosInternosActivesUrgencias.map((data, index) => (
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
                        <span className={caseStyles.body_title}>
                          N° Sticker
                        </span>
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
                          <Link
                            href={{
                              pathname: "/Sample/ViewDetails/[id]",
                              query: { id: data.NUMERO_STICKER },
                            }}
                            className={caseStyles.btn_sticker}
                          >
                            Ver Más
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
              : isSampleGeneral
              ? ListadoUsuariosExternosActivesGenerales.map((data, index) => (
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
                        <Link
                          href={{
                            pathname: "/Sample/ViewDetails/[id]",
                            query: { id: data.NUMERO_STICKER },
                          }}
                          className={caseStyles.btn_sticker}
                        >
                          Ver Más
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : ListadoUsuariosExternosActivesUrgencias.map((data, index) => (
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
                        <Link
                          href={{
                            pathname: "/Sample/ViewDetails/[id]",
                            query: { id: data.NUMERO_STICKER },
                          }}
                          className={caseStyles.btn_sticker}
                        >
                          Ver Más
                        </Link>
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
                      <Link
                        href={{
                          pathname: "/Sample/ViewDetails/[id]",
                          query: { id: data.NUMERO_STICKER },
                        }}
                        className={caseStyles.btn_sticker}
                      >
                        Ver Más
                      </Link>
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
                      <Link
                        href={{
                          pathname: "/Sample/ViewDetails/[id]",
                          query: { id: data.NUMERO_STICKER },
                        }}
                        className={caseStyles.btn_sticker}
                      >
                        Ver Más
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </>
  );
}
