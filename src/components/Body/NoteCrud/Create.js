import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateNote } from "../../Tools/CRUD";
import styles from "../../../styles/CreateNotes.module.scss";

function ComponentsCreateNote({ id }) {
  const validationSchema = Yup.object().shape({
    Observaciones_detalle: Yup.string().required(
      "Campo observaciones obligatorio"
    ),
    NumSticker: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <a href="" className={styles.back_btn}>
              Volver{" "}
            </a>
          </div>

          <p className={styles.title}>Crear nota de seguimiento</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateNote)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
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
                        onClick={() => setValue("NumSticker", id)}
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
