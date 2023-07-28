import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";
import Image from "next/image";
function ComponentTipomueIndex({InfoTipoMue}) {
  return (
    <>
      <section className={styles.Index_users}>
      <Image src="/img/bg_image.jpg" width={1000} height={1000} alt="a" className={styles.background_img} />

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

          <p className={styles.title}>Listado de Tipos de muestra</p>
          <Link
            href={{
              pathname: "/Configuration/TiposMuestras/index",
            }}
            className={styles.btn_create}
          >
            <span>&#10010; </span>
            Crear Tipo de Muestra
          </Link>
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <thead>
                <tr>
                  <th>Tipo de muestra</th>
                  <th>Grupo</th>  
                  <th>Estado</th> 
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {InfoTipoMue != null &&
                 InfoTipoMue != undefined
                  ? InfoTipoMue.map((data, index) => (
                      <tr key={index}>
                        <td>{data.NOMBRE_TIPO_MUESTRA}</td>
                        <td>{data.NOMBRE_GRUPO}</td>
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
                                pathname: "/Configuration/TiposMuestras/index",
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

export default ComponentTipomueIndex;
