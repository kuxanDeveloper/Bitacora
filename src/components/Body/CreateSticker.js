import React, { useEffect } from "react";
import styles from "../../styles/CreateSticker.module.scss";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  setCheckinvalue,
  uncheckUserInterExterno,
  setImagenFile,
} from "../Tools/functiones";
import { onSubmitCreate } from "../Tools/CRUD";
import * as Yup from "yup";
import { useContextBitacora } from "../../context/BitacoraContext";
function CreateSticker({ ListadoGrupoActivo, id }) {
  const {
    setShowModal,
    setishabiliteBtn,
    ValueImagesrc,
    ValueImagesrc2,
    setisImagenOne,
    setValueImagesrc,
    setValueImagesrc2,
    setValueImagesrcExterna,
    setValueImagesrcExterna2,
    setisImagenExterna,
    ResultScanner,
    setshowModalScanner,
    setResultScanner,
  } = useContextBitacora();
  const validationSchema = Yup.object().shape({
    NumSticker: Yup.string().required("Campo N° de sticker obligatorio"),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
    ObservaInici: Yup.string(),
    // UserCheckinter: Yup.string().required("Campo obligatorio"),
    // UserCheckexter: Yup.string().required("Campo obligatorio"),
    file: Yup.mixed().notRequired(),
    file2: Yup.mixed().notRequired(),
    Sufijo: Yup.number().notRequired(),
  });

  useEffect(() => {
    setValueImagesrc(null);
    setValueImagesrc2(null);
    setisImagenExterna(false);
    setValueImagesrcExterna(null);
    setValueImagesrcExterna2(null);
  }, []);

  useEffect(() => {
    if (ResultScanner != "" && ResultScanner != null) {
      const SplitScanner = ResultScanner.split("-");
      if (SplitScanner != null && SplitScanner != undefined) {
        if (SplitScanner.length > 1) {
          document.getElementById("NumSticker").value = SplitScanner[0];
          document.getElementById("Sufijo").value = SplitScanner[1];
        } else {
          document.getElementById("NumSticker").value = SplitScanner[0];
        }
      } else {
        document.getElementById("NumSticker").value = ResultScanner;
      }
    }
  }, [ResultScanner]);

  //The class name can vary

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.Create_sticker}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link href={`/${id}`} className={styles.back_btn}>
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear sticker</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreate)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  <p className={styles.sticker_title}>Sticker</p>
                  {/* <!-- imagenes --> */}
                  <div className={styles.images_container}>
                    {ValueImagesrc != null ? (
                      <>
                        <ImageOptimize
                          Values={{
                            src: URL.createObjectURL(ValueImagesrc),
                            alt: "sticker",
                            title: "imagen sticker",
                            classValue: styles.sticker_figure,
                            width: 80,
                            height: 65,
                          }}
                        ></ImageOptimize>
                        <Link
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            setishabiliteBtn(true);
                            setisImagenOne(true);
                          }}
                        >
                          <ImageOptimize
                            Values={{
                              src: "/img/Camera@2x.png",
                              alt: "Logo de camara",
                              title: "Imagen",
                              classValue: styles.img_camera,
                              width: 34,
                              height: 34,
                            }}
                          ></ImageOptimize>
                        </Link>
                      </>
                    ) : (
                      <figure className={styles.sticker_figure}>
                        <Link
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            setishabiliteBtn(true);
                            setisImagenOne(true);
                          }}
                        >
                          <ImageOptimize
                            Values={{
                              src: "/img/Camera@2x.png",
                              alt: "Logo de camara",
                              title: "Imagen",
                              classValue: styles.img_camera,
                              width: 24,
                              height: 24,
                            }}
                          ></ImageOptimize>
                        </Link>
                      </figure>
                    )}

                    {ValueImagesrc2 != null ? (
                      <>
                        <ImageOptimize
                          Values={{
                            src: URL.createObjectURL(ValueImagesrc2),
                            alt: "sticker",
                            title: "imagen sticker 2",
                            classValue: styles.sticker_figure,
                            width: 80,
                            height: 65,
                          }}
                        ></ImageOptimize>
                        <Link
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            setishabiliteBtn(true);
                            setisImagenOne(false);
                          }}
                        >
                          <ImageOptimize
                            Values={{
                              src: "/img/Camera@2x.png",
                              alt: "Logo de camara",
                              title: "Imagen",
                              classValue: styles.img_camera,
                              width: 34,
                              height: 34,
                            }}
                          ></ImageOptimize>
                        </Link>
                      </>
                    ) : (
                      <figure className={styles.sticker_figure}>
                        <Link
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            setishabiliteBtn(true);
                            setisImagenOne(false);
                          }}
                        >
                          <ImageOptimize
                            Values={{
                              src: "/img/Camera@2x.png",
                              alt: "Logo de camara ",
                              title: "Imagen 2",
                              classValue: styles.img_camera,
                              width: 24,
                              height: 24,
                            }}
                          ></ImageOptimize>
                        </Link>
                      </figure>
                    )}
                  </div>

                  {/* <!-- estado --> */}

                  {/* <!-- form group --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        N° de Sticker
                      </label>
                      <input
                        {...register("NumSticker")}
                        name="NumSticker"
                        maxLength="100"
                        type="number"
                        min="0"
                        id="NumSticker"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NumSticker?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>N° sufijo</label>
                      <input
                        {...register("Sufijo")}
                        name="Sufijo"
                        id="Sufijo"
                        maxLength="10"
                        type="number"
                        min="0"
                        className={styles.group_input}
                      />

                      <div className={styles.invalid_feedback}>
                        {errors.GrupoSticker?.message}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setshowModalScanner(true);
                      }}
                    >
                      escanear codigo de barras
                    </button>
                  </div>

                  {/*-------------------------------Grupo------------------------------------------- */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Grupo</label>
                      <select
                        defaultValue={id}
                        {...register("GrupoSticker")}
                        name="GrupoSticker"
                        id="GrupoSticker"
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListadoGrupoActivo.map((data, index) => (
                          <option key={index} value={data.Id_grupo}>
                            {data.NOMBRE_GRUPO}
                          </option>
                        ))}
                      </select>

                      <div className={styles.invalid_feedback}>
                        {errors.GrupoSticker?.message}
                      </div>
                    </div>
                  </div>

                  {/* <!-- form group --> */}

                  {/* <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title_check}>
                        Usuario interno
                      </label>
                      <input
                        // name="UserCheckinter"
                        id="UserCheckinter"
                        type="checkbox"
                        onClick={() => uncheckUserInterExterno()}
                      />

                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title_check}>
                        Usuario externo
                      </label>
                      <input
                        // name="UserCheckexter"
                        id="UserCheckexter"
                        type="checkbox"
                        onClick={() => uncheckUserInterExterno()}
                      />
                    </div>
                  </div> */}

                  {/* <div className={styles.invalid_feedback}>
                    {errors.UserCheckexter?.message != ""
                      ? errors.UserCheckexter?.message
                      : errors.UserCheckinter?.message}
                  </div> */}

                  {/* <!-- form group --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Observaciones iniciales
                      </label>
                      <textarea
                        {...register("ObservaInici")}
                        name="ObservaInici"
                        id="ObservaInici"
                        cols="70"
                        rows="5"
                        maxLength={1500}
                      ></textarea>
                      {/* <div className={styles.invalid_feedback}>
                        {errors.ObservaInici?.message}
                      </div> */}
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                          // setCheckinvalue(setValue);
                          setImagenFile(
                            ValueImagesrc,
                            ValueImagesrc2,
                            setValue
                          );
                        }}
                        className={styles.btn_send}
                      >
                        Guardar Cambios
                      </button>
                    )}

                    {/* <button
                      id="buttonSubmitUnico"
                      style={{ display: "none" }}
                    ></button> */}
                    <Link
                      href={{
                        pathname: "/[id]",
                        query: { id: id },
                        hash: "Cactive#OverallSample",
                      }}
                      className={styles.btn_cancel}
                    >
                      Cancelar
                    </Link>
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
