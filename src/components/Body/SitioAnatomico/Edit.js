import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitEditSitioAnat } from "../../Tools/crudSitioAnatomico";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentEditSitAnt({ InfoSitioAnt, idSitio }) {
  const validarEsquemaobservation = Yup.object().shape({
    ID: Yup.string().required("El codigo es obligatorio"),
    DESCRIPCION: Yup.string().required(
      "El campo nombre del Sitio Anatomico es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del Sitio Anatomico"
    ),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.create_note}>
        <ImageOptimize
          Values={{
            src: "/img/photo-1614935151651-0bea6508db6b.avif",
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
              href={{
                pathname: "/Configuration/SitioAnatomico/IndexSitio",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Sitio Anatomico</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitEditSitioAnat)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  {InfoSitioAnt.listadositios != null &&
                  InfoSitioAnt.listadositios != undefined
                    ? InfoSitioAnt.listadositios.map((data, index) => (
                        <div key={index}>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Nombre del Sitio Anatomico
                              </label>
                              <input
                                {...register("DESCRIPCION")}
                                name="DESCRIPCION"
                                maxLength="150"
                                className={styles.group_input}
                                defaultValue={data.DESCRIPCION}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.DESCRIPCION?.message}
                              </div>
                            </div>

                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado del Sitio Anatomico
                              </label>
                              <input
                                id="Estado"
                                type="checkbox"
                                defaultChecked={data.ESTADO}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.ESTADO?.message}
                              </div>
                            </div>
                          </div>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckEstadoCrud(setValue);
                                  setValue("ID", idSitio);
                                }}
                                className={styles.btn_send}
                              >
                                Editar Sitio Anatomico
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname:
                                  "/Configuration/SitioAnatomico/IndexSitio",
                                query: { page: "1" },
                              }}
                            >
                              Cancelar
                            </Link>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ComponentEditSitAnt;
