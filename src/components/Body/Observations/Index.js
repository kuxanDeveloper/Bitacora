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
                query: { id: 6, page:"1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>

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
              {InforSampleDetails != null &&
              InforSampleDetails != undefined
                ? InforSampleDetails.map((data, index) => (
                    <>
                    <tr>
                      <td>{data.Descripcion_Observacion}</td>
                      <td className={styleTable.textCenterColumn}>{data.Observacion_cierre == true ? <span>&#x2705;</span> : <span>&#10060;</span>}</td>
                      <td className={styleTable.textCenterColumn}>{data.Observacion_reapertura == true ? <span>&#x2705;</span> : <span>&#10060;</span>}</td>
                      <td className={styleTable.textCenterColumn}>{data.Observacion_Bitacora == true ? <span>&#x2705;</span> : <span>&#10060;</span>}</td>
                      <td className={styleTable.textCenterColumn}>{data.EstadoObservacion == true ? <span>&#x2705;</span> : <span>&#10060;</span>}</td>
                      <td className={styleTable.textCenterColumn}><Link
                          title="Editar Grupo"
                          className={styles.add_icon}
                          href={{
                            pathname: "/Configuration/DefaultObservations/[id]",
                            query: { id: data.Codigo_observacion },
                          }}
                        >
                          Editar
                            <span className={styleTable.edit_icon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#fff"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M8 20l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z" />
                                <path d="M13.5 6.5l4 4" />
                                <path d="M16 18h4" />
                              </svg>
                            </span>
                        </Link></td>
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
