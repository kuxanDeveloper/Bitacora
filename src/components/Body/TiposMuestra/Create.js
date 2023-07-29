import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateTipoMue } from "../../Tools/crudTipoMuestra";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";

function ComponentCreateTipoMue({ InforOptionsSelc }) {
  const validarEsquemaobservation = Yup.object().shape({
    NOMBRE_TIPO_MUESTRA: Yup.string().required(
      "El campo nombre del tipo de muestra es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del tipo de muestra"
    ),
    ID_GRUPO: Yup.string().required(
      "El campo documento del jefe de laboratorio es obligatorio"
    ),
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
                pathname: "/Configuration/TiposMuestras/IndexTipo",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Tipo de muestra</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateTipoMue)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Nombre del Tipo de muestra
                      </label>
                      <input
                        {...register("NOMBRE_TIPO_MUESTRA")}
                        name="NOMBRE_TIPO_MUESTRA"
                        maxLength="150"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NOMBRE_TIPO_MUESTRA?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Estado del Tipo de muestra
                      </label>
                      <input id="Estado" type="checkbox" />
                      <div className={styles.invalid_feedback}>
                        {errors.ESTADO?.message}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Grupo</label>
                      <select
                        {...register("ID_GRUPO")}
                        name="ID_GRUPO"
                        maxLength="150"
                        className={styles.group_input}
                      >
                        <option value="" selected>Seleccione un grupo</option>
                      {InforOptionsSelc != null && InforOptionsSelc != undefined
                        ? InforOptionsSelc.map((data, index) => (
                            <option key={index} value={data.Id_grupo}>
                              {data.NOMBRE_GRUPO}
                            </option>
                          ))
                        : ""}
                        </select>
                      <div className={styles.invalid_feedback}>
                        {errors.ID_GRUPO?.message}
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
                        Guardar Tipo de muestra
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Configuration/TiposMuestras/IndexTipo",
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

export default ComponentCreateTipoMue;
