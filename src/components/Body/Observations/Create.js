import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateObservations } from "../../Tools/crudObservations";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckObservations } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";

function ComponentObservationCreate() {
  const validarEsquemaobservation = Yup.object().shape({
    DescripcionObservacion: Yup.string().required("El campo descripcion de la observacion es obligatorio"),
    obs_cierre: Yup.string().required(
      "El Campo observacion cierre es obligatorio"
    ),
    obs_reapertura: Yup.string().required(
      "El Campo observacion reapertura es obligatorio"
    ),
    obs_bitacora: Yup.string().required(
      "El Campo observacion bitacora es obligatorio"
    ),
    Estado_observacion: Yup.string().required(
        "Es obligatorio seleccionar un estado para la observacion"
      ),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    var estdObserv = document.getElementById("EstadoObs");

    estdObserv.checked = true;
  }, []);

  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/DefaultObservations/IndexObservations"
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Observacion predeterminada</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateObservations)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div className={`${styles.form_group} ${stylesCrud.SinLinea}`}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Estado de la Observacion
                      </label>
                      <input id="EstadoObs" type="checkbox" />
                      <div className={styles.invalid_feedback}>
                        {errors.Estado_observacion?.message}
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.form_group} ${stylesCrud.SinLinea}`}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Descripcion predeterminada de la observacion</label>
                      <textarea
                        {...register("DescripcionObservacion")}
                        name="DescripcionObservacion"
                        id="DescripcionObservacion"
                        cols="70"
                        rows="10"
                        maxLength={1000}></textarea>                      
                      <div className={styles.invalid_feedback}>
                        {errors.DescripcionObservacion?.message}
                      </div>
                    </div>                    
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Observacion de cierre
                      </label>
                      <input id="ObsCierre" type="checkbox" />

                      {/* <!-- ---- --> */}
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                      Observacion de reapertura
                      </label>
                      <input id="ObsReapertura" type="checkbox" />

                      {/* <!-- ---- --> */}
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                      Observacion de bitacora
                      </label>
                      <input id="ObsBitacora" type="checkbox" />

                      {/* <!-- ---- --> */}
                    </div>
                  </div>

                  

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                            setCheckObservations(setValue);
                        }}
                        className={styles.btn_send}
                      >
                        Guardar Observacion
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Configuration/DefaultObservations/IndexObservations"
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

export default ComponentObservationCreate;
