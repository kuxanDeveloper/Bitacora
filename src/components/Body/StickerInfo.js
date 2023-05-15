import React from 'react'
import styles from "../../styles/StickerInfo.module.css";


export default function StickerInfo() {
  return (
    <>
        <div className={styles.sticker_info}>
      <div className={styles.info_container}>
        <div className={styles.back_btn_container}>
          <a href="" className={styles.back_btn}>Volver </a>
        </div>

        <p className={styles.title}>Informacion de sticker</p>
        <br />
        <div className={styles.card}>
          <div className={styles.stickers_container}>
            <div className={styles.card_content}>
              <div className={styles.card_sticker}>
                {/* <!-- imagenes --> */}
                <div className={styles.images_container}>
                  <p className={styles.sticker_title}>Sticker</p>

                  <div className={styles.sticker_number}>
                    <p className={styles.info_sticker}>0000000000000000</p>
                    <a href="" className={styles.photo}>
                      <img width="40" height="40" src="/public/img/camera.png" alt="" className={styles.photo_img} />
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- estado --> */}
              <div className={styles.card_body}>
                <div className={styles.sticker_status}>
                  <span className={styles.status_title}>estado</span>
                  <span className={styles.status}>
                    {/* <!-- añada clase active para activar --> */}
                    <span className={`${styles.status_icon} ${styles.active}`}></span>activo
                  </span>
                </div>

                <div className={styles.date_group}>
                  <p className={styles.date_title}>Fecha de creacion</p>
                  <span className={styles.group_date}>20/12/1907</span>
                </div>

                <div className={styles.card_group}>
                  <p className={styles.group_title}>Tipo de cliente</p>
                  {/* <!-- anada la palabra internopara indicar que es interno nointerno para no interno --> */}
                  <span className={`${styles.group_result} ${styles.interno}`}>Interno</span>
                </div>

                <div className={styles.card_group}>
                  <p className={styles.group_title}>N° seguimientos</p>
                  <span className={styles.group_result}>0000</span>
                </div>

                <div className={styles.card_group}>
                  <p className={styles.group_title}>Usuario Que Creó el seguimiento</p>
                  <span className={styles.group_result}>Alguien</span>
                </div>

                <div className={styles.card_group}>
                  <p className={styles.group_title}>grupo</p>
                  <span className={styles.group_result}>Hongos</span>
                </div>

                <div className={styles.card_group}>
                  <p className={styles.group_title}>Observaciones iniciales</p>
                  
                  <span className={styles.group_result}>Hongos</span>
                </div>
              </div>
              <hr />

              {/* <!-- seguimientos --> */}
              <section className={styles.follow_up}>
                <h3 className={styles.follow_up_title}>Ultimo Seguimiento</h3>

                <div className={styles.follow_up_body}>
                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Observaciones seguimiemto</p>
                    
                    <span className={styles.group_result}>Hongos</span>
                  </div>
                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Usuario que creo el seguimiento</p>
                    
                    <span className={styles.group_result}>Alvaro jose</span>
                  </div>

                  <div className={styles.card_group}>
                    <p className={styles.group_title}>fecha</p>
                    
                    <span className={styles.group_result}>20/01/2020</span>
                  </div>
                </div>
              </section>

              <hr />

              {/* <!-- resultado --> */}
              <section className={styles.result}>
                <h3 className={styles.result_title}>Ultimo resultado</h3>

                <div className={styles.result_body}>
                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Usuario que creo el resultado</p>
                    
                    <span className={styles.group_result}>Alvaro jose</span>
                  </div>
                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Prueba</p>
                    
                    <span className={styles.group_result}>00000</span>
                  </div>

                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Resultado 1</p>
                    
                    <span className={styles.group_result}>00000</span>
                  </div>

                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Resultado 2</p>
                    
                    <span className={styles.group_result}>00000</span>
                  </div>

                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Resultado 3</p>
                    
                    <span className={styles.group_result}>00000</span>
                  </div>

           

                  <div className={styles.card_group}>
                    <p className={styles.group_title}>Resultado final</p>
                    
                    <span className={styles.group_result}>00000</span>
                  </div>

                  <div className={styles.card_group}>
                    <p className={styles.group_title}>fecha de ultimo resultado</p>
                    <span className={styles.group_result}>20/01/2020</span>
                  </div>
                </div>
              </section>

              <div className={styles.btn_container}>
                <button className={styles.btn_follow_up}>Ver detalle</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
