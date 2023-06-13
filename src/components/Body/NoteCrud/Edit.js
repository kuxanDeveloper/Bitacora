import React, { useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageOptimize from "../../Tools/ImageOptimize";
import Link from "next/link";
import { useContextBitacora } from "../../../context/BitacoraContext";
function ComponentEditNote({ InfoNote, id }) {
  console.log(InfoNote);

  const {
    setShowModal,
    setishabiliteBtn,
    ValueImagesrc,
    setisImagenOne,
    setisImagenExterna,
    setValueImagesrcExterna,
  } = useContextBitacora();

  const validationSchema = Yup.object().shape({
    NumSticker: Yup.string(),
    Cod_Imagen1: Yup.string(),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
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

  
  return (
    <section className={styles.create_note}>
    <div className={styles.sticker_container}>
      <div className={styles.back_btn_container}>
        <Link
          href={{
            pathname: "/Sample/FullDetails/[id]",
            query: { id: id },
            hash: "Notas",
          }}
          className={styles.back_btn}
        >
          Volver{" "}
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
                        alt: "sticker",
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
                  <label className={styles.group_title}>
                    Número de sticker :
                  </label>

                  <p>{id}</p>
                </div>
              </div>

              {/* <!-- form group --> */}
              <div className={styles.form_group}>
                <div className={styles.input_group}>
                  <label className={styles.group_title}>Observación</label>
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
              </div>

              <div className={styles.btn_container_send}>
                {!formState.isSubmitting && (
                  <button
                    className={styles.btn_send}
                    onClick={() => {
                      setValue("NumSticker", id);
                      setValue("file", ValueImagesrc);
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
  );
}

export default ComponentEditNote;
