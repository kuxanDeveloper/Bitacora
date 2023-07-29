import React from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";
import Image from "next/image";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentancestroIndex({ InfoAncestro }) {
  return (
    <>
      <section className={styles.Index_users}>
        <ImageOptimize
          Values={{
            src: "/img/photo-1614935151651-0bea6508db6b.avif",
            alt: "Fondo BackGround",
            title: "Fondo BackGround",
            classValue: styles.background_img,
            width: 1920,
            height: 1080,
          }}
        ></ImageOptimize>

        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/",
                hash: "Cactive",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Listado de Grupos Home</p>
          <Link
            href={{
              pathname: "/Configuration/Ancestros/CreateAncestros",
            }}
            className={styles.btn_create}
          >
            <span>&#10010; </span>
            Crear grupo Home
          </Link>
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <thead>
                <tr>
                  <th>Nombre grupo Home</th>
                  <th>Estado</th>
                  <th>N° Orden</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {InfoAncestro != null && InfoAncestro != undefined
                  ? InfoAncestro.map((data, index) => (
                      <tr key={index}>
                        <td>{data.NOMBRE_ANCESTRO}</td>
                        <td className={styleTable.textCenterColumn}>
                          {data.ESTADO_ANCESTRO == true ? (
                            <span>&#x2705;</span>
                          ) : (
                            <span>&#10060;</span>
                          )}
                        </td>
                        <td className={styleTable.textCenterColumn}>
                          {data.ORDEN}
                        </td>
                        <td className={styleTable.textCenterColumn}>
                          <Link
                            title="Editar grupo principal"
                            className={styles.add_icon}
                            href={{
                              pathname: "/Configuration/Ancestros/[id]",
                              query: { id: data.COD_ANCESTRO },
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

export default ComponentancestroIndex;
