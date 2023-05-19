import React from "react";
import styles from "../../styles/StickerInfo.module.css";
import { backhistory } from "../Tools/functiones";
import Link from "next/link";
import ImageOptimize from "../Tools/ImageOptimize";
import { useContextBitacora } from "../../context/BitacoraContext";
export default function StickerInfo({ InforSampleDetails }) {
  const { setShowModal } = useContextBitacora();
  return (
    <>
      <div className={styles.sticker_info}>
        <div className={styles.info_container}>
          <div className={styles.back_btn_container}>
            <Link
              href=""
              onClick={(e) => {
                e.preventDefault();
                backhistory();
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Información de sticker</p>
          <br />
          {
            InforSampleDetails.infoBitacora!=undefined? <div className={styles.card}>
            <div className={styles.stickers_container}>
              <div className={styles.card_content}>
                {InforSampleDetails.infoBitacora.map((data, index) => (
                  <div key={index}>
                    <div className={styles.card_sticker}>
                      {/* <!-- imagenes --> */}
                      <div className={styles.images_container}>
                        <p className={styles.sticker_title}>Sticker</p>

                        <div className={styles.sticker_number}>
                          <p className={styles.info_sticker}>
                            {data.NUMERO_STICKER}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setShowModal(true);
                            }}
                            className={styles.photo}
                          >
                            <ImageOptimize
                              Values={{
                                src: "/img/Camera@2x.png",
                                alt: "Logo de camara",
                                title: "",
                                classValue: styles.photo_img,
                                width: 40,
                                height: 40,
                                style: {},
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <!-- estado --> */}
                    <div className={styles.card_body}>
                      <div className={styles.sticker_status}>
                        <span className={styles.status_title}>Estado</span>
                        <span className={styles.status}>
                          {/* <!-- añada clase active para activar --> */}
                          <span
                            className={`${styles.status_icon} ${
                              data.ESTADO_STICKER ? styles.active : ""
                            }`}
                          ></span>
                          {data.ESTADO_STICKER ? "Activo" : "Inactivo"}
                        </span>
                      </div>

                      <div className={styles.date_group}>
                        <p className={styles.date_title}>Fecha de creación</p>
                        <span className={styles.group_date}>
                          {data.FECHA_FORMAT_CREADO_COMPLETA}
                        </span>
                      </div>

                      <div className={styles.card_group}>
                        <p className={styles.group_title}>Tipo de cliente</p>
                        {/* <!-- anada la palabra internopara indicar que es interno nointerno para no interno --> */}
                        <span
                          className={`${styles.group_result}  ${
                            data.CLIENTE_INTERNO ? styles.interno : ""
                          }`}
                        >
                          {data.CLIENTE_INTERNO
                            ? "Interno"
                            : data.CLIENTE_EXTERNO
                            ? "Externo"
                            : ""}
                        </span>
                      </div>

                      <div className={styles.card_group}>
                        <p className={styles.group_title}>N° seguimientos</p>
                        <span className={styles.group_result}>
                          {InforSampleDetails.infoDetalle.length}
                        </span>
                      </div>

                      <div className={styles.card_group}>
                        <p className={styles.group_title}>
                          Usuario que creó el seguimiento
                        </p>
                        <span className={styles.group_result}>
                          {data.USUARIO_EMAIL_CREADOR}
                        </span>
                      </div>

                      <div className={styles.card_group}>
                        <p className={styles.group_title}>Grupo</p>
                        <span className={styles.group_result}>
                          {data.NOMBRE_GRUPO_ASIGNADO}
                        </span>
                      </div>

                      <div className={styles.card_group}>
                        <p className={styles.group_title}>
                          Observaciones iniciales
                        </p>

                        <span className={styles.group_result}>
                          {data.OBSERVACIONES_INICIALES}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <hr />

                <section className={styles.follow_up}>
                  <h3 className={styles.follow_up_title}>Ultimo Seguimiento</h3>
                  {InforSampleDetails.infoDetalle.length > 0 ? (
                    InforSampleDetails.infoDetalle
                      .slice(0, 1)
                      .map((data, index) => (
                        <div key={index} className={styles.follow_up_body}>
                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Observaciones seguimiemto
                            </p>

                            <span className={styles.group_result}>
                              {data.OBSERVACIONES_DETALLE}
                            </span>
                          </div>
                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Usuario que creó el seguimiento
                            </p>

                            <span className={styles.group_result}>
                              {data.EMAIL_CREADOR_DETALLE}
                            </span>
                          </div>

                          <div className={styles.card_group}>
                            <p className={styles.group_title}>Fecha</p>

                            <span className={styles.group_result}>
                              {data.FECHA_CREADO_DETALLE_FORMAT}
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <h2>Sin seguimiento registrado</h2>
                  )}
                </section>

                <hr />

                {/* <!-- resultado --> */}
                <section className={styles.result}>
                  <h3 className={styles.result_title}>Ultimo resultado</h3>

                  {InforSampleDetails.infoResultado.length > 0 ? (
                    InforSampleDetails.infoResultado
                      .slice(0, 1)
                      .map((data, index) => (
                        <div key={index} className={styles.result_body}>
                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Usuario que creo el resultado
                            </p>

                            <span className={styles.group_result}>
                              {data.USUARIO_CREADOR_RESULTADO}
                            </span>
                          </div>
                          <div className={styles.card_group}>
                            <p className={styles.group_title}>Prueba</p>

                            <span className={styles.group_result}>
                              {data.NOMBRE_PRUEBA}
                            </span>
                          </div>

                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Resultado preliminar 1
                            </p>

                            <span className={styles.group_result}>
                              {data.PRIMER_RESULTADO_PARCIAL !== null &&
                              data.PRIMER_RESULTADO_PARCIAL !== undefined
                                ? data.PRIMER_RESULTADO_PARCIAL
                                : ""}
                            </span>
                          </div>

                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Resultado preliminar 2
                            </p>

                            <span className={styles.group_result}>
                              {data.SEGUNDO_RESULTADO_PARCIAL !== null &&
                              data.SEGUNDO_RESULTADO_PARCIAL !== undefined
                                ? data.SEGUNDO_RESULTADO_PARCIAL
                                : ""}
                            </span>
                          </div>

                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Resultado preliminar 3
                            </p>

                            <span className={styles.group_result}>
                              {data.TERCER_RESULTADO_PARCIAL !== null &&
                              data.TERCER_RESULTADO_PARCIAL !== undefined
                                ? data.TERCER_RESULTADO_PARCIAL
                                : ""}
                            </span>
                          </div>

                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Resultado final
                            </p>

                            <span className={styles.group_result}>
                              {data.RESULTADO_FINAL !== null &&
                              data.RESULTADO_FINAL !== undefined
                                ? data.RESULTADO_FINAL
                                : ""}
                            </span>
                          </div>

                          <div className={styles.card_group}>
                            <p className={styles.group_title}>
                              Fecha de último resultado
                            </p>
                            <span className={styles.group_result}>
                              {data.FECHA_CREACION_RESULTADO_FORMAT !== null &&
                              data.FECHA_CREACION_RESULTADO_FORMAT !== undefined
                                ? data.FECHA_CREACION_RESULTADO_FORMAT
                                : ""}
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <h2>Sin resultado registrado</h2>
                  )}
                </section>
                <br></br>
                <div className={styles.btn_container}>
                  <button className={styles.btn_follow_up}>Ver detalle</button>
                </div>
              </div>
            </div>
          </div>:"cargando..."
          }
          
        </div>
      </div>
    </>
  );
}
