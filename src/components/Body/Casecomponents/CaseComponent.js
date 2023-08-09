import React from "react";
import caseStyles from "../../../styles/case.module.scss";
import { useContextBitacora } from "../../../context/BitacoraContext";
import ImageOptimize from "../../Tools/ImageOptimize";
import Link from "next/link";
import { AperturaandCierre } from "../../Tools/functiones";
export default function CaseComponent({
  data,
  isActive,
  Options,
  isSampleGeneral,
  LstObservacionesPrede,
}) {
  const {
    setShowModal,
    setishabiliteBtn,
    setdobleImagen,
    setisImagenExterna,
    setValueImagesrcExterna2,
    setValueImagesrcExterna,
    setValueImagesrc2,
    setValueImagesrc,
  } = useContextBitacora();

  return (
    <div className={caseStyles.card}>
      <div className={caseStyles.card_container}>
        <div className={caseStyles.sticker}>
          <p className={caseStyles.sticker_title}>Sticker</p>
          {console.log(
            data.URL_PRIMERA_IMAGEN,
            process.env.NEXT_PUBLIC_URL_API
          )}
          <button
            type="button"
            onClick={() => {
              setShowModal(true);
              setishabiliteBtn(false);
              setdobleImagen(true);
              setisImagenExterna(true);
              setValueImagesrc2(null);
              setValueImagesrc(null);
              setValueImagesrcExterna(
                data.URL_PRIMERA_IMAGEN != null &&
                  data.URL_PRIMERA_IMAGEN != undefined &&
                  data.URL_PRIMERA_IMAGEN != ""
                  ? process.env.NEXT_PUBLIC_URL_API + data.URL_PRIMERA_IMAGEN
                  : null
              );
              setValueImagesrcExterna2(
                data.URL_SEGUNDA_IMAGEN != null &&
                  data.URL_SEGUNDA_IMAGEN != undefined &&
                  data.URL_SEGUNDA_IMAGEN != ""
                  ? process.env.NEXT_PUBLIC_URL_API + data.URL_SEGUNDA_IMAGEN
                  : null
              );
            }}
          >
            {data.URL_PRIMERA_IMAGEN != undefined &&
            data.URL_PRIMERA_IMAGEN != null &&
            data.URL_PRIMERA_IMAGEN != "" ? (
              <>
              {/* <img  src={process.env.NEXT_PUBLIC_URL_API + data.URL_PRIMERA_IMAGEN}/> */}
                <ImageOptimize
                  Values={{
                    src:
                      process.env.NEXT_PUBLIC_URL_API + data.URL_PRIMERA_IMAGEN,
                    alt: "sticker",
                    title: "imagen sticker",
                    classValue: "",
                    width: 55,
                    height: 28,
                  }}
                ></ImageOptimize>
              </>
            ) : (
              <img className={caseStyles._image}></img>
            )}

            {data.URL_SEGUNDA_IMAGEN != undefined &&
            data.URL_SEGUNDA_IMAGEN != null &&
            data.URL_SEGUNDA_IMAGEN != "" ? (
              <ImageOptimize
                Values={{
                  src:
                    process.env.NEXT_PUBLIC_URL_API + data.URL_SEGUNDA_IMAGEN,
                  alt: "sticker",
                  title: "imagen sticker",
                  classValue: "",
                  width: 55,
                  height: 28,
                }}
              ></ImageOptimize>
            ) : (
              <img className={caseStyles._image}></img>
            )}
          </button>
        </div>

        <div className={caseStyles.card_body}>
          <span
            className={`${caseStyles.card_state} ${
              isActive ? caseStyles.active : ""
            }`}
          ></span>
          <span className={caseStyles.body_title}>N° Sticker</span>
          <p className={caseStyles.card_number}>
            {data.NUMERO_STICKER + `-` + data.SUFIJO}
          </p>
          <span className={caseStyles.body_title}> Fecha de Ingreso</span>
          <p className={caseStyles.card_date}>
            {data.FECHA_FORMAT_CREADO_COMPLETA}
          </p>

          <div className={caseStyles.card_btn_container}>
            {isActive ? (
              Options.Cerrarorden ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    AperturaandCierre(data, LstObservacionesPrede);
                  }}
                  className={caseStyles.btn_sticker}
                >
                  {isActive ? "Cerrar orden" : "Abrir orden"}
                </button>
              ) : (
                ""
              )
            ) : Options.ActivarOrden ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  AperturaandCierre(data, LstObservacionesPrede);
                }}
                className={caseStyles.btn_sticker}
              >
                {isActive ? "Cerrar orden" : "Abrir orden"}
              </button>
            ) : (
              ""
            )}

            <Link
              href={{
                pathname: "/Sample/ViewDetails/[id]",
                query: { id: data.CODIGO_BITACORA },
              }}
              className={caseStyles.btn_sticker}
            >
              Ver Más
            </Link>
            <Link
              href={{
                pathname: "/Sample/CreateResult/[id]",
                query: {
                  id: data.CODIGO_BITACORA,
                  group:
                    data.ID_GRUPO_ASIGNADO != undefined &&
                    data.ID_GRUPO_ASIGNADO != null
                      ? data.ID_GRUPO_ASIGNADO
                      : "",
                  name_group:
                    data.NOMBRE_GRUPO_ASIGNADO != undefined &&
                    data.NOMBRE_GRUPO_ASIGNADO != null
                      ? data.NOMBRE_GRUPO_ASIGNADO
                      : "",
                  sticker:
                  data.NUMERO_STICKER != undefined &&
                  data.NUMERO_STICKER != null
                      ? data.NUMERO_STICKER +
                        "-" +
                        data.SUFIJO
                      : "",
                },
              }}
              className={caseStyles.btn_sticker}
            >
              Agregar Estatus
            </Link>
          </div>
        </div>
        {/* <div className={caseStyles.sticker} style={{color:"red", fontWeight:"500"}}>aaa</div> */}
      </div>
      {!isSampleGeneral ? (
        <p className={caseStyles.card_info}>
          Los casos de esta orden superaron el tiempo máximo permitido de su
          procesamiento.
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
