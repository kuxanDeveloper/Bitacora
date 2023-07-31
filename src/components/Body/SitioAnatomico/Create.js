import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateSitioAnat } from "../../Tools/crudSitioAnatomico";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";

function ComponentCreateSitAnt() {
  const validarEsquemaobservation = Yup.object().shape({
    DESCRIPCION: Yup.string().required(
      "El campo nombre del Sitio Anatomico es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del Sitio Anatomico"
    )
  });

  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    var estd = document.getElementById("Estado");

    estd.checked = true;
  }, []);

  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/SitioAnatomico/IndexSitio",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Sitio Anatomico</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateSitioAnat)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

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
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.DESCRIPCION?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Estado del Sitio Anatomico
                      </label>
                      <input id="Estado" type="checkbox" />
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
                        }}
                        className={styles.btn_send}
                      >
                        Guardar Sitio Anatomico
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Configuration/SitioAnatomico/IndexSitio",
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

export default ComponentCreateSitAnt;
