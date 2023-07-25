import React from "react";
import styles from "../../styles/StickerInfo.module.css";
import Link from "next/link";
import InformacionStciker from "./StickerInfo/InformacionStciker";
import Lastfollow_up from "./StickerInfo/Lastfollow_up";
import Result from "./StickerInfo/Result";
export default function StickerInfo({
  InforSampleDetails,
  id,
  Options,
  LstObservacionesPrede,
}) {
  return (
    <>
      <div className={styles.sticker_info}>
        <div className={styles.info_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/[id]",
                query: {
                  id:
                    InforSampleDetails.infoBitacora != null &&
                    InforSampleDetails.infoBitacora != undefined
                      ? InforSampleDetails.infoBitacora[0].ID_GRUPO_ASIGNADO
                      : "",
                },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Información de sticker</p>
          <br />
          {InforSampleDetails.infoBitacora != undefined ? (
            <div className={styles.card}>
              <div className={styles.stickers_container}>
                <div className={styles.card_content}>
                  {InforSampleDetails.infoBitacora.map((data, index) => (
                    <InformacionStciker
                      data={data}
                      key={index}
                      Options={Options}
                      CountSeguimienti={InforSampleDetails.infoDetalle.length}
                      LstObservacionesPrede={LstObservacionesPrede}
                      GrupoHabilite={
                        InforSampleDetails.infoResultado.length > 0
                          ? true
                          : false
                      }
                    />
                  ))}

                  <hr />

                  <section className={styles.follow_up}>
                    <h3 className={styles.follow_up_title}>Última nota</h3>
                    {InforSampleDetails.infoDetalle.length > 0 ? (
                      InforSampleDetails.infoDetalle
                        .slice(0, 1)
                        .map((data, index) => (
                          <Lastfollow_up
                            data={data}
                            infoBitacora={InforSampleDetails.infoBitacora}
                            key={index}
                            Options={Options}
                          />
                        ))
                    ) : (
                      <>
                        <Link
                          title="Agregar nota"
                          href={{
                            pathname: "/Sample/CreateFollowUp/[id]",
                            query: {
                              id: InforSampleDetails.infoBitacora[0]
                                .CODIGO_BITACORA,
                              group:
                                InforSampleDetails.infoBitacora[0]
                                  .ID_GRUPO_ASIGNADO,
                              name_group:
                                InforSampleDetails.infoBitacora[0]
                                  .NOMBRE_GRUPO_ASIGNADO,
                              sticker:
                                InforSampleDetails.infoBitacora[0]
                                  .NUMERO_STICKER +
                                "-" +
                                InforSampleDetails.infoBitacora[0].SUFIJO,
                            },
                          }}
                          className={styles.create_followUp}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-circle-plus"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#fff"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l6 0" />
                            <path d="M12 9l0 6" />
                          </svg>
                        </Link>

                        <h2>Sin nota registrada</h2>
                      </>
                    )}
                  </section>

                  <hr />

                  {/* <!-- resultado --> */}
                  <section className={styles.result}>
                    <h3 className={styles.result_title}>Último estatus</h3>

                    {InforSampleDetails.infoResultado.length > 0 ? (
                      InforSampleDetails.infoResultado
                        .slice(0, 1)
                        .map((data, index) => (
                          <Result
                            data={data}
                            key={index}
                            infoBitacora={InforSampleDetails.infoBitacora}
                            Options={Options}
                          ></Result>
                        ))
                    ) : (
                      <>
                        <Link
                          title="Agregar nota"
                          href={{
                            pathname: "/Sample/CreateResult/[id]",
                            query: {
                              id: InforSampleDetails.infoBitacora[0]
                                .CODIGO_BITACORA,
                              group:
                                InforSampleDetails.infoBitacora[0]
                                  .ID_GRUPO_ASIGNADO,
                              name_group:
                                InforSampleDetails.infoBitacora[0]
                                  .NOMBRE_GRUPO_ASIGNADO,
                              sticker:
                                InforSampleDetails.infoBitacora[0]
                                  .NUMERO_STICKER +
                                "-" +
                                InforSampleDetails.infoBitacora[0].SUFIJO,
                            },
                          }}
                          className={styles.create_followUp}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-circle-plus"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#fff"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l6 0" />
                            <path d="M12 9l0 6" />
                          </svg>
                        </Link>

                        <h2>Sin estatus registrado</h2>
                      </>
                    )}
                  </section>
                  <br></br>
                  <div className={styles.btn_container}>
                    <Link
                      href={{
                        pathname: "/Sample/FullDetails/[id]",
                        query: { id: id },
                        hash: "Pruebas",
                      }}
                      className={styles.btn_follow_up}
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "cargando..."
          )}
        </div>
      </div>
    </>
  );
}
