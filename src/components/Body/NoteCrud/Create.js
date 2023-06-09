import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateNote } from "../../Tools/CRUD";
import styles from "../../../styles/CreateNotes.module.scss";
import { useContextBitacora } from "../../../context/BitacoraContext";
import ImageOptimize from "../../Tools/ImageOptimize";
import {
  OnchangeObservaCrearEdit,
  RegisterEditNoteObservaciones,
} from "../../Tools/functiones";

function ComponentsCreateNote({
  id,
  sticker,
  name_group,
  group,
  LstObservacionesPrede,
}) {
  const {
    setValueImagesrc,
    setValueImagesrc2,
    ValueImagesrc,
    setishabiliteBtn,
    setShowModal,
    setisImagenOne,
    setValueImagesrcExterna,
    setValueImagesrcExterna2,
    setisImagenExterna,
  } = useContextBitacora();

  const [ShowobservaTextare, setShowobservaTextare] = useState(false);

  const validationSchema = Yup.object().shape({
    Observaciones_detalle: Yup.string().required(
      "Campo observaciones obligatorio"
    ),
    COD_BITACORA: Yup.number(),
    file: Yup.mixed().notRequired(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    setValueImagesrc(null);
    setValueImagesrc2(null);
    setisImagenExterna(false);
    setValueImagesrcExterna(null);
    setValueImagesrcExterna2(null);
  }, []);

  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.home_btn_container}>
            <Link
              href={`/${group}#Cactive#OverallSample`}
              className={styles.home_btn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={styles.icon}
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
                pathname: "/Sample/FullDetails/[id]",
                query: { id: id },
                hash: "Pruebas",
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

          <p className={styles.title}>Crear nota de seguimiento</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateNote)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- imagenes --> */}
                  <div className={styles.images_container}>
                    {ValueImagesrc != null ? (
                      <>
                        <ImageOptimize
                          Values={{
                            src: URL.createObjectURL(ValueImagesrc),
                            alt: "Notaimg",
                            title: "imagen nota",
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
                  </div>
                  {/* <!-- estado --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label
                        className={`${styles.group_title} ${styles.inline}`}
                      >
                        Número de sticker :
                      </label>
                      <p className={styles.inline}>{sticker}</p>
                    </div>
                    <div className={styles.input_group}>
                      <label
                        className={`${styles.group_title} ${styles.inline}`}
                      >
                        Grupo :
                      </label>
                      <p className={styles.inline}>{name_group}</p>
                    </div>
                  </div>

                  {/* <!-- form group --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Observaciones predeterminada
                      </label>
                      <select
                        defaultValue={""}
                        name="sltObservaIni"
                        id="sltObservaIni"
                        onChange={(e) => {
                          OnchangeObservaCrearEdit(
                            e.target.value,
                            setShowobservaTextare
                          );
                        }}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {LstObservacionesPrede != null &&
                        LstObservacionesPrede != undefined
                          ? LstObservacionesPrede.length > 0
                            ? LstObservacionesPrede.map((data, index) => {
                                if (data.Observacion_Bitacora) {
                                  return (
                                    <option
                                      key={index}
                                      value={data.Codigo_observacion}
                                    >
                                      {data.Descripcion_Observacion}
                                    </option>
                                  );
                                }
                              })
                            : ""
                          : ""}
                      </select>
                      <div>{errors.Observaciones_detalle?.message}</div>
                    </div>
                    {ShowobservaTextare ? (
                      <div className={styles.input_group}>
                        <label className={styles.group_title}>
                          Observación
                        </label>
                        <textarea
                          rows="5"
                          cols="50"
                          name="Observaciones_detalle"
                          className={styles.input_group}
                          maxLength={1500}
                          {...register("Observaciones_detalle")}
                        ></textarea>
                        <div>{errors.Observaciones_detalle?.message}</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        className={styles.btn_send}
                        onClick={() => {
                          setValue("COD_BITACORA", id);
                          setValue("file", ValueImagesrc);
                          RegisterEditNoteObservaciones(setValue);
                        }}
                      >
                        Guardar cambios
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Sample/FullDetails/[id]",
                        query: { id: id },
                        hash: "Notas",
                      }}
                    >
                      Cancelar
                    </Link>
                    {/* ----- */}
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

export default ComponentsCreateNote;
