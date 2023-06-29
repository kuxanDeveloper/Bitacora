import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/CreateNotes.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentUsersIndex(InforSampleDetails) {

  return (
    <>
      <section className={styles.create_note}>
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

            <Link
              href={{
                pathname: "/Configuration/Users/CreateUser",
              }}
              className={styles.btn_create}
            >
              <span>&#10010; </span>
              Crear Usuario
            </Link>
          </div>

          <p className={styles.title}>Listado de Usuarios</p>
          <br />
          <div className={styles.card}>
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
                    <>
                    <tr>
                      <td>{data.Email}</td>
                      <td>{data.Numero_de_Identidad}</td>
                      <td>{data.Nombres}</td>
                      <td>{data.Apellidos}</td>
                      <td className={styleTable.textCenterColumn}>{data.LockoutEnabled == true ? <span>&#x2705;</span> : <span>&#10060;</span>}</td>
                      <td className={styleTable.textCenterColumn}><Link
                          title="Editar Usuario"
                          className={styles.add_icon}
                          href={{
                            pathname: "/Configuration/Users/[id]",
                            query: { id: data.Id },
                          }}
                        >
                          <span>&#x270E; </span>
                          Editar Usuario
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

export default ComponentUsersIndex;
