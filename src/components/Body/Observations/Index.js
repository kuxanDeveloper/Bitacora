import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentObservationIndex({ InforSampleDetails }) {
  return (
    <>
      <section className={styles.Index_users}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/[id]",
                query: { id: 6 },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>

            <Link
              href={{
                pathname:
                  "/Configuration/DefaultObservations/CreateObservations",
              }}
              className={styles.btn_create}
            >
              <span>&#10010; </span>
              Crear Observacion
            </Link>
          </div>

          <p className={styles.title}>
            Listado de Observaciones predeterminadas
          </p>
          <br />
          </div>

          <p className={styles.title}>Listado de Observaciones predeterminadas</p>
          <Link
            href={{
              pathname: "/Configuration/DefaultObservations/CreateObservations",
            }}
            className={styles.btn_create}
          >
            <span>&#10010; </span>
            Crear Observacion
          </Link>
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Descripcion</th>
                  <th style={{ width: "15%" }}>Observacion cierre</th>
                  <th style={{ width: "15%" }}>Observacion reapertura</th>
                  <th style={{ width: "15%" }}>Observacion bitacora</th>
                  <th style={{ width: "15%" }}>Estado Observacion</th>
                  <th style={{ width: "15%" }}>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {InforSampleDetails != null && InforSampleDetails != undefined
                  ? InforSampleDetails.map((data, index) => (
                      <>
                        <tr>
                          <td>{data.Descripcion_Observacion}</td>
                          <td className={styleTable.textCenterColumn}>
                            {data.Observacion_cierre == true ? (
                              <span>&#x2705;</span>
                            ) : (
                              <span>&#10060;</span>
                            )}
                          </td>
                          <td className={styleTable.textCenterColumn}>
                            {data.Observacion_reapertura == true ? (
                              <span>&#x2705;</span>
                            ) : (
                              <span>&#10060;</span>
                            )}
                          </td>
                          <td className={styleTable.textCenterColumn}>
                            {data.Observacion_Bitacora == true ? (
                              <span>&#x2705;</span>
                            ) : (
                              <span>&#10060;</span>
                            )}
                          </td>
                          <td className={styleTable.textCenterColumn}>
                            {data.EstadoObservacion == true ? (
                              <span>&#x2705;</span>
                            ) : (
                              <span>&#10060;</span>
                            )}
                          </td>
                          <td className={styleTable.textCenterColumn}>
                            <Link
                              title="Editar Grupo"
                              className={styles.add_icon}
                              href={{
                                pathname:
                                  "/Configuration/DefaultObservations/[id]",
                                query: { id: data.Codigo_observacion },
                              }}
                            >
                              <span>&#x270E; </span>
                              Editar Grupo
                            </Link>
                          </td>
                        </tr>
                      </>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default ComponentObservationIndex;
