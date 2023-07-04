import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentUsersIndex(InforSampleDetails) {
  return (
    <>
      <section className={styles.Index_users}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/[id]",
                query: {
                  id: 6,
                },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Listado de Usuarios</p>
          <br />
          <div className={styles.card}>
            <Link
              href={{
                pathname: "/Configuration/Users/CreateUser",
              }}
              className={styles.btn_create}
            >
              <span>&#10010; </span>
              Crear Usuario
            </Link>
            <table className={styleTable.tableStyle}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Usuario</th>
                  <th style={{ width: "20%" }}># de identidad</th>
                  <th style={{ width: "15%" }}>Nombres</th>
                  <th style={{ width: "15%" }}>Apellidos</th>
                  <th style={{ width: "10%" }}>Estado</th>
                  <th style={{ width: "20%" }}>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {InforSampleDetails.InforSampleDetails != null &&
                InforSampleDetails.InforSampleDetails != undefined
                  ? InforSampleDetails.InforSampleDetails.map((data, index) => (
                      <tr key={index}>
                        <td>{data.Email}</td>
                        <td>{data.Numero_de_Identidad}</td>
                        <td>{data.Nombres}</td>
                        <td>{data.Apellidos}</td>
                        <td className={styleTable.textCenterColumn}>
                          {data.LockoutEnabled == true ? (
                            <span>&#x2705;</span>
                          ) : (
                            <span>&#10060;</span>
                          )}
                        </td>
                        <td className={styleTable.textCenterColumn}>
                          <Link
                            title="Editar Usuario"
                            className={styles.add_icon}
                            href={{
                              pathname: "/Configuration/Users/[id]",
                              query: { id: data.Id_usuario },
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

export default ComponentUsersIndex;
