import React from "react";
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
import CaseComponent from "./Body/Casecomponents/CaseComponent";
import caseStyles from "../styles/case.module.css";
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
                    <CaseComponent key={index} data={data}></CaseComponent>
                  ))
                : ListadoUsuariosInternosActivesUrgencias.map((data, index) => (
                    <CaseComponent key={index} data={data}></CaseComponent>
                  ))
              : isSampleGeneral
              ? ListadoUsuariosExternosActivesGenerales.map((data, index) => (
                  <CaseComponent key={index} data={data}></CaseComponent>
                ))
              : ListadoUsuariosExternosActivesUrgencias.map((data, index) => (
                  <CaseComponent key={index} data={data}></CaseComponent>
                ))
            : isUserInterno
            ? ListadoMuestrasInactiveUserInter.map((data, index) => (
                <CaseComponent key={index} data={data}></CaseComponent>
              ))
            : ListadoMuestrasInactiveUserExterno.map((data, index) => (
                <CaseComponent key={index} data={data}></CaseComponent>
              ))}
        </div>
      </section>
    </>
  );
}
