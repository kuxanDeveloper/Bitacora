import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/CreateNotes.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentGroupIndex(InforSampleDetails) {

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
                pathname: "/Configuration/Groups/CreateGroup",
              }}
              className={styles.btn_create}
            >
              <span>&#10010; </span>
              Crear Grupo
            </Link>
          </div>

          <p className={styles.title}>Listado de Grupos</p>
          <br />
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <thead>
              <tr>
                <th style={{ width: "35%" }}>Nombre Grupo</th>
                <th style={{ width: "15%" }}>Estado</th>
                <th style={{ width: "15%" }}>Admite Sufijo</th>
                <th style={{ width: "15%" }}>Orden del grupo</th>
                <th style={{ width: "20%" }}>Opciones</th>
              </tr>
              </thead>
              <tbody>
              {InforSampleDetails.InforSampleDetails != null &&
              InforSampleDetails.InforSampleDetails != undefined
                ? InforSampleDetails.InforSampleDetails.map((data, index) => (
                    <tr key={index}>
                      <td>{data.NOMBRE_GRUPO}</td>
                      <td className={styleTable.textCenterColumn}>{data.ESTADO == true ? <span>&#x2705;</span> : <span>&#10060;</span>}</td>
                      <td className={styleTable.textCenterColumn}>{data.ADMITE_SUFIJO == true ? <span>&#x2705;</span> : <span>&#10060;</span>}</td>
                      <td className={styleTable.textCenterColumn}>{data.ORDEN_GRUPO}</td>
                      <td className={styleTable.textCenterColumn}><Link
                          title="Editar Grupo"
                          className={styles.add_icon}
                          href={{
                            pathname: "/Configuration/Groups/[id]",
                            query: { id: data.Id_grupo },
                          }}
                        >
                          <span>&#x270E; </span>
                          Editar Grupo
                        </Link></td>
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
