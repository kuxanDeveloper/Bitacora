import React from "react";
import caseStyles from "../../../styles/case.module.css";
import { useContextBitacora } from "../../../context/BitacoraContext";
import ImageOptimize from "../../Tools/ImageOptimize";
import Link from "next/link";
function CaseComponent({ data }) {
  const { setShowModal, setishabiliteBtn } = useContextBitacora();
  console.log(data);
  return (
    <div className={caseStyles.card}>
      <div className={caseStyles.sticker}>
        <p className={caseStyles.sticker_title}>Sticker</p>

        <button
          type="button"
          onClick={() => {
            setShowModal(true);
            setishabiliteBtn(false);
          }}
        >
          {data.URL_PRIMERA_IMAGEN != undefined &&
          data.URL_PRIMERA_IMAGEN != null &&
          data.URL_PRIMERA_IMAGEN != "" ? (
            <ImageOptimize
              Values={{
                src: process.env.NEXT_PUBLIC_URL_API + data.URL_PRIMERA_IMAGEN,
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

          {data.URL_SEGUNDA_IMAGEN != undefined &&
          data.URL_SEGUNDA_IMAGEN != null &&
          data.URL_SEGUNDA_IMAGEN != "" ? (
            <ImageOptimize
              Values={{
                src: process.env.NEXT_PUBLIC_URL_API + data.URL_SEGUNDA_IMAGEN,
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
          {/* <img className={caseStyles._image}></img> */}
          {/* <img className={caseStyles._image}></img> */}
        </button>
      </div>

      <div className={caseStyles.card_body}>
        <span
          className={`${caseStyles.card_state} ${caseStyles.active}`}
        ></span>
        <span className={caseStyles.body_title}>N° Sticker</span>
        <p className={caseStyles.card_number}>{data.NUMERO_STICKER}</p>
        <span className={caseStyles.body_title}> Fecha de Ingreso</span>
        <p className={caseStyles.card_date}>
          {data.FECHA_FORMAT_CREADO_BITACORA}
        </p>

        <div className={caseStyles.card_btn_container}>
          <Link
            href={{
              pathname: "/Sample/ViewDetails/[id]",
              query: { id: data.NUMERO_STICKER },
            }}
            className={caseStyles.btn_sticker}
          >
            Ver Más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CaseComponent;
