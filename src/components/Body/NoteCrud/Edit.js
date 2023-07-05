import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageOptimize from "../../Tools/ImageOptimize";
import Link from "next/link";
import { useContextBitacora } from "../../../context/BitacoraContext";
import styles from "../../../styles/CreateNotes.module.scss";
import {
  setImagenfileUpdateNote,
  OnchangeObservaCrearEdit,
  RegisterEditNoteObservaciones,
} from "../../Tools/functiones";
import { UpdateNote } from "../../../pages/api/Note/Crud";
function ComponentEditNote({
  InfoNote,
  sticker,
  name_group,
  LstObservacionesPrede,
}) {
  const {
    setShowModal,
    setishabiliteBtn,
    ValueImagesrc,
    setValueImagesrc,
    setisImagenOne,
    setisImagenExterna,
    setValueImagesrcExterna,
  } = useContextBitacora();
  const [ShowobservaTextare, setShowobservaTextare] = useState(false);

  const validationSchema = Yup.object().shape({
    CODIGO_BITACORA: Yup.number(),
    codigo_detalle_bitacora: Yup.string(),
    Cod_Imagen1: Yup.string(),
    Observaciones_detalle: Yup.string().required(
      "Campo observaciones obligatorio"
    ),
    file: Yup.mixed().notRequired(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    setisImagenExterna(true);
    setValueImagesrc(null);
  }, []);

  useEffect(() => {
    if (InfoNote != null && InfoNote != undefined) {
      if (InfoNote.length > 0) {
        if (
          LstObservacionesPrede != null &&
          LstObservacionesPrede != undefined
        ) {
          let retornoValor = LstObservacionesPrede.find(
            (e) =>
              e.Descripcion_Observacion.toLowerCase() ==
              InfoNote[0].OBSERVACIONES_DETALLE.toLowerCase()
          );

          if (retornoValor != undefined && retornoValor != null) {
            document.getElementById("sltObservaIni").value =
              retornoValor.Codigo_observacion;
          } else if (
            InfoNote[0].OBSERVACIONES_DETALLE != "" &&
            InfoNote[0].OBSERVACIONES_DETALLE.toLowerCase() != null
          ) {
            setShowobservaTextare(true);
          } else {
            document.getElementById("sltObservaIni").value = "";
          }
        }
      }
    }
  }, [InfoNote]);

  return (
    <section className={styles.create_note}>
      <div className={styles.sticker_container}>
        <div className={styles.back_btn_container}>
          <Link
            href={{
              pathname: "/Sample/FullDetails/[id]",
              query: {
                id:
                  InfoNote != undefined &&
                  InfoNote != null &&
                  InfoNote.length > 0
                    ? InfoNote[0].CODIGO_BITACORA
                    : null,
              },
              hash: "Notas",
            }}
            className={styles.back_btn}
          >
            Volver{" "}
          </Link>
        </div>

        <p className={styles.title}>Editar nota de seguimiento</p>
        <br />
        <div className={styles.card}>
          <form onSubmit={handleSubmit(UpdateNote)}>
            {InfoNote != null && InfoNote != undefined && InfoNote.length > 0
              ? InfoNote.map((data, index) => (
                  <div key={index} className={styles.stickers_container}>
                    <div className={styles.card_sticker}>
                      {/* <!-- imagenes --> */}
                      <div className={styles.images_container}>
                        {ValueImagesrc != null ||
                        data.URL_PRIMERA_IMAGEN_DETALLE != null ? (
                          <>
                            <ImageOptimize
                              Values={{
                                src:
                                  ValueImagesrc != null
                                    ? URL.createObjectURL(ValueImagesrc)
                                    : process.env.NEXT_PUBLIC_URL_API +
                                      data.URL_PRIMERA_IMAGEN_DETALLE,
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
                                ValueImagesrc != null
                                  ? setisImagenExterna(false)
                                  : setisImagenExterna(true);
                                data.URL_PRIMERA_IMAGEN_DETALLE != null
                                  ? setValueImagesrcExterna(
                                      process.env.NEXT_PUBLIC_URL_API +
                                        data.URL_PRIMERA_IMAGEN_DETALLE
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
                      </div>
                      {/* <!-- estado --> */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Número de sticker :
                          </label>
                          <p>{sticker}</p>
                        </div>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>Grupo :</label>
                          <p>{name_group}</p>
                        </div>
                      </div>

                      {/* <!-- form group --> */}
                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Obsevraciones predeterminada
                          </label>
                          <select
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
                              defaultValue={data.OBSERVACIONES_DETALLE}
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
                              setValue(
                                "codigo_detalle_bitacora",
                                data.COD_DETALLE_BITACORA
                              );
                              RegisterEditNoteObservaciones(setValue);
                              setValue("CODIGO_BITACORA", data.CODIGO_BITACORA);
                              setImagenfileUpdateNote(
                                ValueImagesrc,
                                setValue,
                                data.CODIGO_PRIMERA_IMAGEN_DETALLE
                              );
                            }}
                          >
                            Guardar cambios
                          </button>
                        )}
                        <Link
                          className={styles.btn_cancel}
                          href={{
                            pathname: "/Sample/FullDetails/[id]",
                            query: { id: data.CODIGO_BITACORA },
                            hash: "Notas",
                          }}
                        >
                          Cancelar
                        </Link>
                        {/* ----- */}
                      </div>
                    </div>
                  </div>
                ))
              : "cargando..."}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ComponentEditNote;
