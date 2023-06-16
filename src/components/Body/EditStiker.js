import React, { useEffect } from "react";
import styles from "../../styles/CreateSticker.module.scss";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";
import { useContextBitacora } from "../../context/BitacoraContext";
import {
  // setCheckinvalue,
  // uncheckUserInterExterno,
  setImagenFileUpdate,
} from "../Tools/functiones";

import { onSubmitUpdate } from "../Tools/CRUD";

function EditStickerComponents({
  ListadoGrupoActivo,
  InforSampleDetails,
  group,
  id,
  isHabilteGroup,
}) {
  const {
    setShowModal,
    setishabiliteBtn,
    ValueImagesrc,
    ValueImagesrc2,
    setisImagenOne,
    setisImagenExterna,

    setValueImagesrcExterna,
    setValueImagesrcExterna2,
  } = useContextBitacora();

  const validationSchema = Yup.object().shape({
    NumSticker: Yup.string(),
    Cod_Imagen1: Yup.string(),
    Cod_Imagen2: Yup.string(),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
    ObservaInici: Yup.string(),
    // UserCheckinter: Yup.string().required("Campo obligatorio"),
    // UserCheckexter: Yup.string().required("Campo obligatorio"),
    file: Yup.mixed().notRequired(),
    file2: Yup.mixed().notRequired(),
  });

  useEffect(() => {
    setisImagenExterna(true);

    if (
      InforSampleDetails.infoBitacora != null &&
      InforSampleDetails.infoBitacora != undefined
    ) {
      // var checkbox1 = document.getElementById("UserCheckinter");
      // var checkbox2 = document.getElementById("UserCheckexter");

      // checkbox1.checked =
      //   InforSampleDetails.infoBitacora[0].CLIENTE_INTERNO == false
      //     ? null
      //     : InforSampleDetails.infoBitacora[0].CLIENTE_INTERNO;

      // checkbox2.checked =
      //   InforSampleDetails.infoBitacora[0].CLIENTE_EXTERNO == false
      //     ? null
      //     : InforSampleDetails.infoBitacora[0].CLIENTE_EXTERNO;

      var grupoSticker = document.getElementById("GrupoSticker");
      if (isHabilteGroup == "true") {
        grupoSticker.setAttribute("disabled", "");
      } else {
        grupoSticker.disabled = false;
      }
    }
  }, [InforSampleDetails.infoBitacora]);

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <section className={styles.Create_sticker}>
      <div className={styles.sticker_container}>
        <div className={styles.back_btn_container}>
          <Link href="/6" className={styles.back_btn}>
            Volver{" "}
          </Link>
        </div>

        <p className={styles.title}>Edición sticker</p>
        <br />
        <div className={styles.card}>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            {InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora.map((data, index) => (
                  <div key={index} className={styles.stickers_container}>
                    <div className={styles.card_sticker}>
                      <p className={styles.sticker_title}>Sticker</p>
                      {/* <!-- imagenes --> */}
                      <div className={styles.images_container}>
                        {ValueImagesrc != null ||
                        data.URL_PRIMERA_IMAGEN != null ? (
                          <>
                            <ImageOptimize
                              Values={{
                                src:
                                  ValueImagesrc != null
                                    ? URL.createObjectURL(ValueImagesrc)
                                    : process.env.NEXT_PUBLIC_URL_API +
                                      data.URL_PRIMERA_IMAGEN,
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
                                ValueImagesrc != null
                                  ? setisImagenExterna(false)
                                  : setisImagenExterna(true);
                                data.URL_PRIMERA_IMAGEN != null
                                  ? setValueImagesrcExterna(
                                      process.env.NEXT_PUBLIC_URL_API +
                                        data.URL_PRIMERA_IMAGEN
                                    )
                                  : setValueImagesrcExterna(null);
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
                                setisImagenExterna(false);
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

                        {ValueImagesrc2 != null ||
                        data.URL_SEGUNDA_IMAGEN != null ? (
                          <>
                            <ImageOptimize
                              Values={{
                                src:
                                  ValueImagesrc2 != null
                                    ? URL.createObjectURL(ValueImagesrc2)
                                    : process.env.NEXT_PUBLIC_URL_API +
                                      data.URL_SEGUNDA_IMAGEN,

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
                                ValueImagesrc2 != null
                                  ? setisImagenExterna(false)
                                  : setisImagenExterna(true);
                                data.URL_SEGUNDA_IMAGEN != null
                                  ? setValueImagesrcExterna2(
                                      process.env.NEXT_PUBLIC_URL_API +
                                        data.URL_SEGUNDA_IMAGEN
                                    )
                                  : setValueImagesrcExterna2(null);
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
                                setisImagenExterna(false);
                                setValueImagesrcExterna2(null);
                                setValueImagesrcExterna(null);
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
                          {/* <input
                            {...register("NumSticker")}
                            name="NumSticker"
                            maxLength="100"
                            type="number"
                            min="0"
                            className={styles.group_input}
                          /> */}
                          <label>{data.NUMERO_STICKER}</label>
                        </div>

                        <div className={styles.input_group}>
                          <label className={styles.group_title}>Grupo</label>
                          <select
                            defaultValue={group}
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
                            onChange={() => uncheckUserInterExterno()}
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
                            onChange={() => uncheckUserInterExterno()}
                          />
                        </div>
                      </div>
                      <div className={styles.invalid_feedback}>
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
                            defaultValue={data.OBSERVACIONES_INICIALES}
                          ></textarea>
                          <div className={styles.invalid_feedback}>
                            {errors.ObservaInici?.message}
                          </div>
                        </div>
                      </div>

                      <div className={styles.btn_container_send}>
                        {!formState.isSubmitting && (
                          <button
                            onClick={() => {
                              isHabilteGroup == "true"
                                ? setValue("GrupoSticker", group)
                                : "";
                              // setCheckinvalue(setValue);
                              setImagenFileUpdate(
                                ValueImagesrc,
                                ValueImagesrc2,
                                setValue,
                                data.CODIGO_PRIMERA_IMAGEN,
                                data.CODIGO_SEGUNDA_IMAGEN
                              );
                              setValue("NumSticker", data.NUMERO_STICKER);
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
                            pathname: "/Sample/FullDetails/[id]",
                            query: { id: id },
                            hash: "Pruebas",
                          }}
                          className={styles.btn_cancel}
                        >
                          Cancelar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditStickerComponents;
