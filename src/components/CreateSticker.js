import React from "react";
import styles from "../styles/CreateSticker.module.css";

function CreateSticker() {
  return (
    <>
      <section className={styles.Create_sticker}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <a href="" className={styles.back_btn}>
              Volver{" "}
            </a>
          </div>

          <p className={styles.title}>Crear sticker</p>
          <br />
          <div className={styles.card}>
            <form>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  <p className={styles.sticker_title}>Sticker</p>

                  {/* <!-- imagenes --> */}
                  <div className={styles.images_container}>
                    <figure className={styles.sticker_figure}>
                      <a href="">
                        <img
                          width="24"
                          height="24"
                          src="/public/img/camera.png"
                          alt=""
                          className={styles.img_camera}
                        />
                      </a>
                    </figure>
                    <figure className={styles.sticker_figure}>
                      <a href="">
                        <img
                          width="24"
                          height="24"
                          src="../public/img/Camera@2x.png"
                          alt=""
                          className={styles.img_camera}
                        />
                      </a>
                    </figure>
                  </div>

                  {/* <!-- estado --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <div className={styles.sticker_status}>
                        <span className={styles.group_title}>estado</span>

                        <label for="avable">Activo</label>
                        <input id="avable" type="checkbox" />
                        {/* <!-- ---- --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- form group --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>N° de Sticker</label>
                      <input type="text" className={styles.group_input}/>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>seguimiemto</label>
                      <input type="text" className={styles.group_input}/>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>seguimiemto</label>
                      <input type="text" className={styles.group_input}/>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>seguimiemto</label>
                      <input type="text" className={styles.group_input}/>
                    </div>
                  </div>
                  {/* <!-- form group --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>resultado</label>
                      <input type="text" className={styles.group_input}/>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>seguimiemto</label>
                      <input type="text" className={styles.group_input}/>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>resultado</label>
                      <select name="" id="">
                        <option selected disabled value="">
                          Seleccione un opcion
                        </option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                      </select>
                    </div>
                  </div>

                  {/* <!-- form group --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>seguimiemto</label>
                      <textarea name="" id="" cols="30" rows="5"></textarea>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Observaciones</label>
                      <textarea name="" id="" cols="30" rows="5"></textarea>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    <button className={styles.btn_send}>Guardar Cambios</button>
                    <a href="" className={styles.btn_cancel}>
                      Cancelar
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateSticker;
