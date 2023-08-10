import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitMicroorganismo } from "../../Tools/crudMicroorganismos";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentMicroCreate() {
  const validarEsquemaobservation = Yup.object().shape({
    DESCRIPCION: Yup.string().required(
      "El campo nombre del microorganismo es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del microorganismo"
    ),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    var estdOpcion = document.getElementById("Estado");

    estdOpcion.checked = true;
  }, []);

  return (
    <>
      <section className={styles.create_note}>
        <ImageOptimize
          Values={{
            src: "/img/bg_image.jpg",
            alt: "Fondo BackGround",
            title: "Fondo BackGround",
            classValue: styles.background_img,
            width: 1920,
            height: 1080,
          }}
        ></ImageOptimize>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href="/Configuration/Microorganismos/IndexMicroorganismo?page=1"
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Microorganismo</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitMicroorganismo)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Estado</label>
                      <input id="Estado" type="checkbox" />
                      <div className={styles.invalid_feedback}>
                        {errors.ESTADO?.message}
                      </div>
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Nombre de Microorganismo
                      </label>
                      <input
                        {...register("DESCRIPCION")}
                        name="DESCRIPCION"
                        maxLength="150"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.DESCRIPCION?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                          setCheckEstadoCrud(setValue);
                        }}
                        className={styles.btn_send}
                      >
                        Guardar Microorganismo
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname:
                          "/Configuration/Microorganismos/IndexMicroorganismo",
                        query: { page: "1" },
                      }}
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

export default ComponentMicroCreate;
