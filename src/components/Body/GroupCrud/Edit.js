import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitUpdateGroup } from "../../Tools/crudGroup";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckindividual } from "../../Tools/functiones";

function ComponentGroup(InforGroup, id) {
  const validarEsquemaGrupo = Yup.object().shape({
    IdGrupo: Yup.string().required("Campo id es obligatorio"),
    EstadoGrupo: Yup.string().required(
      "Campo de estado del grupo es obligatorio"
    ),
    NombreGrupo: Yup.string().required("Campo nombre del grupo es obligatorio"),
    AdmiteSufijo: Yup.string().required(
      "Campo de admite sufijo es obligatorio"
    ),
    AlertaHoras: Yup.string().required(
      "Campo de Alerta por horas es obligatorio"
    ),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaGrupo) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (
      InforGroup.InforGroup != null &&
      InforGroup.InforGroup != undefined &&
      InforGroup.InforGroup.length > 0
    ) {
      var checkbox1 = document.getElementById("EstadoGrupo");
      checkbox1.checked =
        InforGroup.InforGroup[0].ESTADO == false
          ? null
          : InforGroup.InforGroup[0].ESTADO;

      var checkbox2 = document.getElementById("AdmiteSufijo");
      checkbox2.checked =
        InforGroup.InforGroup[0].ADMITE_SUFIJO == false
          ? null
          : InforGroup.InforGroup[0].ADMITE_SUFIJO;
    }
  }, [InforGroup]);

  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/Groups/IndexGroup",
                hash: "Normal",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar grupo</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitUpdateGroup)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  {InforGroup.InforGroup != null &&
                  InforGroup.InforGroup != undefined
                    ? InforGroup.InforGroup.map((data, index) => (
                        <div key={index}>
                          <div className={styles.form_group}>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Nombre Grupo
                              </label>
                              <input
                                {...register("NombreGrupo")}
                                name="NombreGrupo"
                                maxLength="100"
                                type="text"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.NOMBRE_GRUPO}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.NombreGrupo?.message}
                              </div>
                            </div>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Alerta por horas
                              </label>
                              <input
                                {...register("AlertaHoras")}
                                name="AlertaHoras"
                                maxLength="2"
                                max="99"
                                type="number"
                                min="0"
                                defaultValue={data.ALARMA_HORAS}
                                className={styles.group_input}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.AlertaHoras?.message}
                              </div>
                            </div>
                          </div>

                          <div className={styles.form_group}>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado del grupo
                              </label>
                              <input id="EstadoGrupo" type="checkbox" />

                              {/* <!-- ---- --> */}
                            </div>

                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Admite Sufijo
                              </label>
                              <input id="AdmiteSufijo" type="checkbox" />

                              {/* <!-- ---- --> */}
                            </div>
                          </div>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckindividual(setValue);
                                  setValue(
                                    "IdGrupo",
                                    InforGroup.InforGroup[0].Id_grupo
                                  );
                                }}
                                className={styles.btn_send}
                              >
                                Editar Grupo
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname: "/Configuration/Groups/IndexGroup",
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

export default ComponentGroup;
