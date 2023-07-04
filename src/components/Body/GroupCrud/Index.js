import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentGroupIndex(InforSampleDetails) {
  return (
    <>
      <section className={styles.Index_users}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/index",
                hash: "Normal",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Listado de Grupos</p>
          <Link
            href={{
              pathname: "/Configuration/Groups/CreateGroup",
            }}
            className={styles.btn_create}
          >
            <span>&#10010; </span>
            Crear Grupo
          </Link>
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <thead>
                <tr>
                  <th>Nombre Grupo</th>
                  <th>Estado</th>
                  <th>Admite Sufijo</th>
                  <th>Orden del grupo</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {InforSampleDetails.InforSampleDetails != null &&
                InforSampleDetails.InforSampleDetails != undefined
                  ? InforSampleDetails.InforSampleDetails.map((data, index) => (
                      <tr key={index}>
                        <td>{data.NOMBRE_GRUPO}</td>
                        <td className={styleTable.textCenterColumn}>
                          {data.ESTADO == true ? (
                            <span>&#x2705;</span>
                          ) : (
                            <span>&#10060;</span>
                          )}
                        </td>
                        <td className={styleTable.textCenterColumn}>
                          {data.ADMITE_SUFIJO == true ? (
                            <p>&#x2705;</p>
                          ) : (
                            <span>&#10060;</span>
                          )}
                        </td>
                        <td className={styleTable.textCenterColumn}>
                          {data.ORDEN_GRUPO}
                        </td>
                        <td className={styleTable.textCenterColumn}>
                          <Link
                            title="Editar Grupo"
                            className={styles.add_icon}
                            href={{
                              pathname: "/Configuration/Groups/[id]",
                              query: { id: data.Id_grupo },
                            }}
                          >
                            Editar
                            <span className={styleTable.edit_icon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#fff"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                          </Link>
                        </td>
                      </tr>
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

export default ComponentGroupIndex;
