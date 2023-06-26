import React from "react";
import CaseNav from "./CaseNav";
import CasesStatusUser from "./Body/CasesStatusUser";
import { UserActiveGenerales, UserActiveUrgencias } from "./Tools/functiones";
import CaseComponent from "./Body/Casecomponents/CaseComponent";
import caseStyles from "../styles/case.module.scss";
import Link from "next/link";
export default function Case({
  ListadoGrupo,
  ListadoMuestraActivo,
  ListadoMuestraInactivo,
  isTrueActive,
  idGruop,
  // isUserInterno,
  isSampleGeneral,
  HrefArmado,
  Options,
}) {
  const ListadoMuestraActiveGenerals =
    UserActiveGenerales(ListadoMuestraActivo);
  const ListadoMuestrasActivePendiente =
    UserActiveUrgencias(ListadoMuestraActivo);

  // const ListadoMuestrasInactiveUserInter = UserInternosInactive(
  //   ListadoMuestraInactivo
  // );
  // const ListadoMuestrasInactiveUserExterno = UserExternosInactive(
  //   ListadoMuestraInactivo
  // );

  // const ListadoUsuariosInternosActivesGenerales = UserInternosActiveGenerales(
  //   ListadoMuestrasActiveUserInter
  // );

  // const ListadoUsuariosInternosActivesUrgencias = UserInternosActiveUrgencias(
  //   ListadoMuestrasActiveUserInter
  // );

  // const ListadoUsuariosExternosActivesGenerales = UserExternosActiveGenerales(
  //   ListadoMuestrasActiveUserExterno
  // );

  // const ListadoUsuariosExternosActivesUrgencias = UserExternosActiveUrgencias(
  //   ListadoMuestrasActiveUserExterno
  // );

  return (
    <>
      {/* usuario externo o interno... <CasesStatusUser
        HrefArmado={HrefArmado}
        isTrueActive={isTrueActive}
        isUserInterno={isUserInterno}
        idGruop={idGruop}
        isSampleGeneral={isSampleGeneral}
      ></CasesStatusUser> */}
      {/* grupos */}
      <CaseNav
        HrefArmado={HrefArmado}
        ListadoGrupo={ListadoGrupo}
        idGruop={idGruop}
        isTrueActive={isTrueActive}
        // isUserInterno={isUserInterno}
        isSampleGeneral={isSampleGeneral}
      ></CaseNav>
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
                    hash: `${
                      isTrueActive ? "Cactive" : "Cinactvie"
                    }#OverallSample`,
                  }}
                  className={caseStyles.status_link}
                >
                  Ordenes generales
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
                    hash: `${
                      isTrueActive ? "Cactive" : "Cinactvie"
                    }#UrgentSamples`,
                  }}
                  className={caseStyles.status_link}
                >
                  Ordenes pendientes
                </Link>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={caseStyles.cases_container}>
          {isTrueActive
            ? isSampleGeneral
              ? ListadoMuestraActiveGenerals.map((data, index) => (
                  <CaseComponent
                    key={index}
                    data={data}
                    isActive={true}
                    Options={Options}
                  ></CaseComponent>
                ))
              : ListadoMuestrasActivePendiente.map((data, index) => (
                  <CaseComponent
                    key={index}
                    data={data}
                    isActive={true}
                    Options={Options}
                  ></CaseComponent>
                ))
            : ListadoMuestraInactivo.length > 0
            ? ListadoMuestraInactivo.map((data, index) => (
                <CaseComponent
                  key={index}
                  data={data}
                  isActive={false}
                  Options={Options}
                ></CaseComponent>
              ))
            : "Cargando..."}
        </div>
      </section>{" "}
      {/* */}
    </>
  );
}

/*isUserInterno
            ? ListadoMuestrasInactiveUserInter.map((data, index) => (
                <CaseComponent key={index} data={data} isActive={false}></CaseComponent>
              ))
            : ListadoMuestrasInactiveUserExterno.map((data, index) => (
                <CaseComponent key={index} data={data} isActive={false}></CaseComponent>
            ))*/
