import React from "react";
import styles from "../../styles/StickerDetails.module.scss";
import ImageOptimize from "../Tools/ImageOptimize";
import { EstadoFunction } from "../Tools/functiones";
import { useContextBitacora } from "../../context/BitacoraContext";
import Link from "next/link";
import Details from "./StickerDetails/Details";
import Results from "./StickerDetails/Results";
import Image from "next/image"; 
export default function StickerDetails({
  InforSampleDetails,
  query,
  Pruebas,
  Options,
  setHasValue,
}) {
  const {
    setShowModal,
    setdobleImagen,
    setisImagenExterna,
    setValueImagesrcExterna2,
    setValueImagesrcExterna,
    setishabiliteBtn,
    setValueImagesrc2,
    setValueImagesrc,
  } = useContextBitacora();
  
  return (
    <>
      <div className={styles.sticker_details}>
      <Image src="/img/bg_image.jpg" width={1000} height={1000} alt="a" className={styles.background_img} />
        <div className={styles.details_container}>
          <div className={styles.home_btn_container}>
            <Link
              title="Inicio"
              href={{
                pathname: "/[id]",
                query: {
                  id:
                    InforSampleDetails.infoBitacora != undefined &&
                    InforSampleDetails.infoBitacora != null
                      ? InforSampleDetails.infoBitacora[0].ID_GRUPO_ASIGNADO
                      : "1",
                  idAncestro: "1",
                  page: "1",
                },
                hash: "Cactive#OverallSample",
              }}
              className={styles.home_btn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#fff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M10 12h4v4h-4z" />
              </svg>
            </Link>
          </div>

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="#e57d00"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
              Volver
            </Link>
          </div>

          <p className={styles.title}>Detalle de sticker</p>
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
                    setdobleImagen(true);
                    setisImagenExterna(true);
                    setValueImagesrc(null);
                    setValueImagesrc2(null);
                    setishabiliteBtn(false);
                    setValueImagesrcExterna(
                      InforSampleDetails.infoBitacora != undefined &&
                        InforSampleDetails.infoBitacora != null
                        ? InforSampleDetails.infoBitacora[0]
                            .URL_PRIMERA_IMAGEN != null &&
                          InforSampleDetails.infoBitacora[0]
                            .URL_PRIMERA_IMAGEN != undefined &&
                          InforSampleDetails.infoBitacora[0]
                            .URL_PRIMERA_IMAGEN != ""
                          ? /*process.env.NEXT_PUBLIC_URL_API +*/
                            InforSampleDetails.infoBitacora[0]
                              .URL_PRIMERA_IMAGEN
                          : null
                        : null
                    );
                    setValueImagesrcExterna2(
                      InforSampleDetails.infoBitacora != undefined &&
                        InforSampleDetails.infoBitacora != null
                        ? InforSampleDetails.infoBitacora[0]
                            .URL_SEGUNDA_IMAGEN != null &&
                          InforSampleDetails.infoBitacora[0]
                            .URL_SEGUNDA_IMAGEN != undefined &&
                          InforSampleDetails.infoBitacora[0]
                            .URL_SEGUNDA_IMAGEN != ""
                          ? /*process.env.NEXT_PUBLIC_URL_API +*/
                            InforSampleDetails.infoBitacora[0]
                              .URL_SEGUNDA_IMAGEN
                          : null
                        : null
                    );
                  }}
                  className={styles.img_icon}
                >
                  <ImageOptimize
                    Values={{
                      src: "/img/Camera@2x.png",
                      alt: "Logo de camara",
                      title: "Imagen número 1",
                      classValue: styles.img_camera,
                      width: 35,
                      height: 35,
                    }}
                  ></ImageOptimize>
                </button>

                {Pruebas ? (
                  <>
                    {Options.BtnCrearResultAndUrl && EstadoFunction(InforSampleDetails) ? (
                      <Link
                        title="Agregar estatus"
                        className={styles.add_icon}
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
                            name_group:
                              InforSampleDetails.infoBitacora != undefined &&
                              InforSampleDetails.infoBitacora != null
                                ? InforSampleDetails.infoBitacora[0]
                                    .NOMBRE_GRUPO_ASIGNADO
                                : "",
                            sticker:
                              InforSampleDetails.infoBitacora != undefined &&
                              InforSampleDetails.infoBitacora != null
                                ? InforSampleDetails.infoBitacora[0]
                                    .NUMERO_STICKER +
                                  "-" +
                                  InforSampleDetails.infoBitacora[0].SUFIJO
                                : "",
                          },
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-square-plus"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="#ffffff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <line x1="9" y1="12" x2="15" y2="12" />
                          <line x1="12" y1="9" x2="12" y2="15" />
                        </svg>
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    {Options.BtnCrearNotaAndUrl && EstadoFunction(InforSampleDetails) ? (
                      <Link
                        title="Agregar nota"
                        className={styles.add_icon}
                        href={{
                          pathname: "/Sample/CreateFollowUp/[id]",
                          query: {
                            id: query.id,
                            name_group:
                              InforSampleDetails.infoBitacora != undefined &&
                              InforSampleDetails.infoBitacora != null
                                ? InforSampleDetails.infoBitacora[0]
                                    .NOMBRE_GRUPO_ASIGNADO
                                : "",
                            group:
                              InforSampleDetails.infoBitacora != undefined &&
                              InforSampleDetails.infoBitacora != null
                                ? InforSampleDetails.infoBitacora[0]
                                    .ID_GRUPO_ASIGNADO
                                : "",
                            sticker:
                              InforSampleDetails.infoBitacora != undefined &&
                              InforSampleDetails.infoBitacora != null
                                ? InforSampleDetails.infoBitacora[0]
                                    .NUMERO_STICKER +
                                  "-" +
                                  InforSampleDetails.infoBitacora[0].SUFIJO
                                : "",
                          },
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-square-plus"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="#ffffff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <line x1="9" y1="12" x2="15" y2="12" />
                          <line x1="12" y1="9" x2="12" y2="15" />
                        </svg>
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {Options.BtnEditStickerAndUrl ? (
                  <Link
                    title="Editar sticker"
                    className={styles.Edit_icon}
                    href={{
                      pathname: "/Sample/Edit/[id]",
                      query: {
                        id: query.id,
                        group:
                          InforSampleDetails.infoBitacora != undefined &&
                          InforSampleDetails.infoBitacora != null
                            ? InforSampleDetails.infoBitacora[0]
                                .ID_GRUPO_ASIGNADO
                            : "",
                        isHabilteGroup:
                          InforSampleDetails.infoBitacora != undefined &&
                          InforSampleDetails.infoBitacora != null
                            ? InforSampleDetails.infoResultado.length > 0
                              ? true
                              : false
                            : false,
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#fff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                    </svg>
                  </Link>
                ) : (
                  ""
                )}

                {InforSampleDetails.infoBitacora != undefined &&
                InforSampleDetails.infoBitacora != null
                  ? InforSampleDetails.infoBitacora.map((data, index) => (
                      <div key={index}>
                        <div className={styles.form_group}>
                          {/* <!-- info sticker --> */}
                          <div className={styles.info_group}>
                            <span
                              className={`${styles.info_title} ${styles.inline}`}
                            >
                              N° Sticker
                            </span>
                            <p
                              className={`${styles.info_text} ${styles.inline}`}
                            >
                              {`${data.NUMERO_STICKER}-${data.SUFIJO}`}
                            </p>
                          </div>

                          <div className={styles.info_group}>
                            <span
                              className={`${styles.info_title} ${styles.inline}`}
                            >
                              Fecha del sticker
                            </span>
                            <p
                              className={`${styles.info_text} ${styles.inline}`}
                            >
                              {data.FECHA_FORMAT_CREADO_COMPLETA}
                            </p>
                          </div>
                        </div>
                        <div className={`${styles.form_group} ${styles.mt}`}>
                          {/* <!-- info sticker --> */}
                          <div className={styles.info_group}>
                            <span className={styles.info_title}>Grupo</span>
                            <p className={styles.info_text}>
                              {data.NOMBRE_GRUPO_ASIGNADO}
                            </p>
                          </div>
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
                    onClick={() => {
                      setHasValue("Pruebas");
                    }}
                    className={`${styles.nav_items} ${
                      Pruebas ? styles.selected : ""
                    }`}
                  >
                    Estatus
                  </Link>
                  <Link
                    href={{
                      pathname: "/Sample/FullDetails/[id]",
                      query: query,
                      hash: "Notas",
                    }}
                    onClick={() => {
                      setHasValue("Notas");
                    }}
                    className={`${styles.nav_items} ${
                      !Pruebas ? styles.selected : ""
                    }`}
                  >
                    Notas
                  </Link>
                </div>

                {Pruebas ? (
                  InforSampleDetails.infoResultado != undefined &&
                  InforSampleDetails.infoResultado != null ? (
                    InforSampleDetails.infoResultado.length > 0 ? (
                      InforSampleDetails.infoResultado.map((data, index) => (
                        <Results
                          key={index}
                          data={data}
                          Options={Options}
                          group={
                            InforSampleDetails.infoBitacora != undefined &&
                            InforSampleDetails.infoBitacora != null
                              ? InforSampleDetails.infoBitacora[0]
                                  .ID_GRUPO_ASIGNADO
                              : ""
                          }
                          name_group={
                            InforSampleDetails.infoBitacora[0]
                              .NOMBRE_GRUPO_ASIGNADO
                          }
                          sticker={
                            InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                            "-" +
                            InforSampleDetails.infoBitacora[0].SUFIJO
                          }
                        ></Results>
                      ))
                    ) : (
                      <h2>Sin estatus registrado</h2>
                    )
                  ) : (
                    "cargando..."
                  )
                ) : InforSampleDetails.infoDetalle != undefined &&
                  InforSampleDetails.infoDetalle != null ? (
                  InforSampleDetails.infoDetalle.length > 0 ? (
                    InforSampleDetails.infoDetalle.map((data, index) => (
                      <Details
                        key={index}
                        data={data}
                        Options={Options}
                        name_group={
                          InforSampleDetails.infoBitacora[0]
                            .NOMBRE_GRUPO_ASIGNADO
                        }
                        group={
                          InforSampleDetails.infoBitacora != undefined &&
                          InforSampleDetails.infoBitacora != null
                            ? InforSampleDetails.infoBitacora[0]
                                .ID_GRUPO_ASIGNADO
                            : ""
                        }
                        sticker={
                          InforSampleDetails.infoBitacora[0].NUMERO_STICKER +
                          "-" +
                          InforSampleDetails.infoBitacora[0].SUFIJO
                        }
                      ></Details>
                    ))
                  ) : (
                    <h2>Sin notas registradas</h2>
                  )
                ) : (
                  "cargando..."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
