import React from "react";
import styles from "../../styles/StickerInfo.module.css";
import Link from "next/link";
import InformacionStciker from "./StickerInfo/InformacionStciker";
import Lastfollow_up from "./StickerInfo/Lastfollow_up";
import Result from "./StickerInfo/Result"
export default function StickerInfo({ InforSampleDetails, id }) {
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
              // onClick={(e) => {
              //   e.preventDefault();
              //   backhistory();
              // }}
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
                      CountSeguimienti={InforSampleDetails.infoDetalle.length}
                    />
                  ))}

                  <hr />

                  <section className={styles.follow_up}>
                    <h3 className={styles.follow_up_title}>
                      Ultimo Seguimiento
                    </h3>
                    {InforSampleDetails.infoDetalle.length > 0 ? (
                      InforSampleDetails.infoDetalle
                        .slice(0, 1)
                        .map((data, index) => (
                          <Lastfollow_up data={data} key={index} />
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
                        <Result data={data} key={Result}></Result>
                        ))
                    ) : (
                      <h2>Sin resultado registrado</h2>
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
