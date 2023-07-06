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
          <Link
            href={{
              pathname: "/Configuration/Users/CreateUser",
            }}
            className={styles.btn_create}
          >
            <span>&#10010; </span>
            Crear Usuario
          </Link>
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>
                    {" "}
                    <p>Usuario</p>{" "}
                  </th>
                  <th style={{ width: "20%" }}>
                    {" "}
                    <p># de identidad</p>{" "}
                  </th>
                  <th style={{ width: "15%" }}>
                    {" "}
                    <p>Nombres</p>{" "}
                  </th>
                  <th style={{ width: "15%" }}>
                    {" "}
                    <p>Apellidos</p>{" "}
                  </th>
                  <th style={{ width: "10%" }}>
                    {" "}
                    <p>Estado</p>{" "}
                  </th>
                  <th style={{ width: "20%" }}>
                    {" "}
                    <p>Opciones</p>{" "}
                  </th>
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
                        <td className={styleTable.textCenterColumn}>
                          <Link
                            title="Cambiar contraseña"
                            className={styles.add_icon}
                            href={{
                              pathname:
                                "/Configuration/Users/ForgotPasswordAdmin/[id]",
                              query: { id: data.Id_usuario },
                            }}
                          >
                            Cambiar contraseña
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

export default ComponentUsersIndex;
