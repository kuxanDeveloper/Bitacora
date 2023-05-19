import React from "react";
import styles from "../../styles/StickerDetails.module.css";
import ImageOptimize from "../Tools/ImageOptimize";

export default function StickerDetails() {
  return (
    <>
      <div className={styles.sticker_details}>
        <div className={styles.details_container}>
          <div className={styles.back_btn_container}>
            <a href="" className={styles.back_btn}>
              Volver
            </a>
          </div>

          <p className={styles.title}>Informacion de sticker</p>
          <br />
          <div className={styles.card}>
            <div className={styles.stickers_container}>
              <div className={styles.card_content}>
                <span className={styles.status}>
                  <i className={styles.status_icon}></i>
                </span>
                <a href="#" className={styles.img_icon}>
                  <ImageOptimize
                    Values={{
                      src: "/img/Camera@2x.png",
                      alt: "Logo de camara",
                      title: "Imagen número 1",
                      classValue: styles.img_camera,
                      width: 30,
                      height: 30,
                    }}
                  ></ImageOptimize>
                </a>


                <div className={styles.form_group}>
                  {/* <!-- sticker -->
                <!-- <div className={styles.}"info_group">
                  <figure className={styles.}"group_figure">
                    <img src="" className={styles.}"img_sticker" alt="" />
                  </figure>
                  <figure className={styles.}"group_figure">
                    <img src="" className={styles.}"img_sticker" alt="" />
                  </figure>
                </div> --> */}

                  {/* <!-- info sticker --> */}
                  <div className={styles.info_group}>
                    <span className={styles.info_title}>N° Sticker</span>
                    <p className={styles.info_text}>000000</p>
                  </div>

                  <div className={styles.info_group}>
                    <span className={styles.info_title}>Fecha del sticker</span>
                    <p className={styles.info_text}>20/12/2023</p>
                  </div>
                </div>

                <div className={styles.nav}>
                  {/* <!-- agregue la clase slected para activar --> */}
                  <button className={`${styles.nav_items} ${styles.selected}`}>
                    Pruebas
                    <span className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2f2f2f"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l6 0" />
                        <path d="M12 9l0 6" />
                      </svg>
                    </span>
                  </button>
                  <button className={`${styles.nav_items} `}>
                    Notas
                    <span className={styles.icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2f2f2f"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l6 0" />
                        <path d="M12 9l0 6" />
                      </svg>
                    </span>
                  </button>
                </div>

                <div className={styles.followup}>
                  {/* <!-- pruebas --> */}

                  <a className={styles.update_icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ff9300"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                    </svg>
                  </a>

                  <div className={styles.form_group}>
                    <div className={styles.info_group}>
                      <span className={styles.info_title}>Creado por:</span>
                      <p className={styles.info_text}>Juan Padilla</p>
                    </div>

                    <div className={styles.info_group}>
                      <span className={styles.info_title}>
                        Fecha de creacion
                      </span>
                      <p className={styles.info_text}>20/12/2023</p>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.info_group}>
                      <span className={styles.info_title}>Observaciones</span>
                      <p className={styles.info_text}>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit
                        integer, curae montes lacus nisl facilisis diam
                        suspendisse potenti, vitae accumsan odio quam metus
                        himenaeos bibendum. Leo et tortor egestas vestibulum
                        curabitur tempor nec rutrum pretium, condimentum at
                        faucibus scelerisque vivamus sed lectus ad, sagittis
                        lobortis tincidunt a erat ut facilisis mi. At felis duis
                        morbi fringilla volutpat euismod accumsan, metus commodo
                        vestibulum ad senectus nibh ultrices, pulvinar torquent
                        vehicula posuere cursus auctor.
                      </p>
                    </div>
                  </div>

                  {/* <!-- -----------------    RESULTADOS      ------------------- --> */}
                </div>

                <div className={styles.restults}>
                  <a className={styles.update_icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ff9300"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                    </svg>
                  </a>

                  <div className={styles.form_group}>
                    <div className={styles.info_group}>
                      <span className={styles.info_title}>resultado 1</span>
                      <p className={styles.info_text}>resultado 1</p>
                    </div>

                    <div className={styles.info_group}>
                      <span className={styles.info_title}>resultado 2</span>
                      <p className={styles.info_text}>resultado 2</p>
                    </div>

                    <div className={styles.info_group}>
                      <span className={styles.info_title}>resultado 3</span>
                      <p className={styles.info_text}>resultado 3</p>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.info_group}>
                      <span className={styles.info_title}>Resultado Final</span>
                      <p className={styles.info_text}>resultado Final</p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
