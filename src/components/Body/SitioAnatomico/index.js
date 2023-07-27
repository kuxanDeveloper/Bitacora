import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentSitioIndex({InfoSitioAnt}) {
  return (
    <>
      <section className={styles.Index_users}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Listado de Sitios Anatomicos</p>
          <Link
            href={{
              pathname: "/Configuration/SitioAnatomico/IndexSitio",
            }}
            className={styles.btn_create}
          >
            <span>&#10010; </span>
            Crear Sitio Anatomico
          </Link>
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <thead>
                <tr>
                  <th>Sitio Anatomico</th>
                  <th>Estado</th>                  
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {InfoSitioAnt != null &&
                InfoSitioAnt != undefined
                  ? InfoSitioAnt.map((data, index) => (
                      <tr key={index}>
                        <td>{data.DESCRIPCION}</td>
                        <td className={styleTable.textCenterColumn}>
                          {data.ESTADO == true ? (
                            <span>&#x2705;</span>
                          ) : (
                            <span>&#10060;</span>
                          )}
                        </td>                        
                        <td className={styleTable.textCenterColumn}>
                          <Link
                            title="Editar Opcion"
                            className={styles.add_icon}
                            href={{
                              pathname: "/Configuration/SitioAnatomico/IndexSitio",
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

export default ComponentSitioIndex;
