import React from "react";
import styles from "../../styles/StickerDetails.module.css";
import ImageOptimize from "../Tools/ImageOptimize";
import { EstadoFunction } from "../Tools/functiones";
import { useContextBitacora } from "../../context/BitacoraContext";
import Link from "next/link";
import Details from "./StickerDetails/Details";
import Results from "./StickerDetails/Results";
export default function StickerDetails({ InforSampleDetails, query, Pruebas }) {
  const { setShowModal } = useContextBitacora();
  return (
    <>
      <div className={styles.sticker_details}>
        <div className={styles.details_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Sample/ViewDetails/[id]",
                query: {
                  id: query.id,
                },
              }}
              className={styles.back_btn}
            >
              Volver
            </Link>
          </div>

          <p className={styles.title}>Informacion de sticker</p>
          <br />
          <div className={styles.card}>
            <div className={styles.stickers_container}>
              <div className={styles.card_content}>
                <span className={styles.status}>
                  <i
                    className={`${styles.status_icon} ${
                      EstadoFunction(InforSampleDetails) ? styles.active : ""
                    }`}
                  ></i>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className={styles.img_icon}
                >
                  <ImageOptimize
                    Values={{
                      src: "/img/Camera@2x.png",
                      alt: "Logo de camara",
                      title: "Imagen número 1",
                      classValue: styles.img_camera,
                      width: 40,
                      height: 40,
                    }}
                  ></ImageOptimize>
                </button>
                {Pruebas ? (
                  <Link
                    title="agregar resultado"
                    href={{
                      pathname: "/Sample/CreateResult/[id]",
                      query: {
                        id: query.id,
                        group:
                          InforSampleDetails.infoBitacora != undefined &&
                          InforSampleDetails.infoBitacora != null
                            ? InforSampleDetails.infoBitacora[0]
                                .ID_GRUPO_ASIGNADO
                            : "",
                      },
                    }}
                  >
                    agregar resultado
                  </Link>
                ) : (
                  <Link
                    title="Agregar segumiento"
                    href={{
                      pathname: "/Sample/CreateFollowUp/[id]",
                      query: { id: query.id },
                    }}
                  >
                    agregar seguimiento
                  </Link>
                )}
                {InforSampleDetails.infoBitacora != undefined &&
                InforSampleDetails.infoBitacora != null
                  ? InforSampleDetails.infoBitacora.map((data, index) => (
                      <div key={index} className={styles.form_group}>
                        {/* <!-- info sticker --> */}
                        <div className={styles.info_group}>
                          <span className={styles.info_title}>N° Sticker</span>
                          <p className={styles.info_text}>
                            {data.NUMERO_STICKER}
                          </p>
                        </div>

                        <div className={styles.info_group}>
                          <span className={styles.info_title}>
                            Fecha del sticker
                          </span>
                          <p className={styles.info_text}>
                            {data.FECHA_FORMAT_CREADO_COMPLETA}
                          </p>
                        </div>
                      </div>
                    ))
                  : "cargando..."}

                <div className={styles.nav}>
                  {/* <!-- agregue la clase slected para activar --> */}
                  <Link
                    href={{
                      pathname: "/Sample/FullDetails/[id]",
                      query: query,
                      hash: "Pruebas",
                    }}
                    className={`${styles.nav_items} ${
                      Pruebas ? styles.selected : ""
                    }`}
                  >
                    Pruebas
                    <span className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2f2f2f"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l6 0" />
                        <path d="M12 9l0 6" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href={{
                      pathname: "/Sample/FullDetails/[id]",
                      query: query,
                      hash: "Notas",
                    }}
                    className={`${styles.nav_items} ${
                      !Pruebas ? styles.selected : ""
                    }`}
                  >
                    Notas
                    <span className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2f2f2f"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l6 0" />
                        <path d="M12 9l0 6" />
                      </svg>
                    </span>
                  </Link>
                </div>

                {Pruebas ? (
                  InforSampleDetails.infoResultado != undefined &&
                  InforSampleDetails.infoResultado != null ? (
                    InforSampleDetails.infoResultado.length > 0 ? (
                      InforSampleDetails.infoResultado.map((data, index) => (
                        <Results key={index} data={data}></Results>
                      ))
                    ) : (
                      <h2>Sin resultados registrados</h2>
                    )
                  ) : (
                    "cargando..."
                  )
                ) : InforSampleDetails.infoDetalle != undefined &&
                  InforSampleDetails.infoDetalle != null ? (
                  InforSampleDetails.infoDetalle.length > 0 ? (
                    InforSampleDetails.infoDetalle.map((data, index) => (
                      <Details key={index} data={data}></Details>
                    ))
                  ) : (
                    <h2>Sin seguimientos registrados</h2>
                  )
                ) : (
                  "cargando..."
                )}

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
