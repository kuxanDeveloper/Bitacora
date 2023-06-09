import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateGroup } from "../../Tools/crudGroup";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckindividual } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ListSufij from "../GroupCrud/ListSufijos";

function ComponentGroup() {
  const [ListSufijo, setListSufijo] = useState([]);

  const validarEsquemaGrupo = Yup.object().shape({
    NombreGrupo: Yup.string().required(
      "El campo nombre del grupo es obligatorio"
    ),
    AlertaHoras: Yup.string().required(
      "El campo de Alerta por horas es obligatorio"
    ),
    EstadoGrupo: Yup.string().required(
      "El campo de estado del grupo es obligatorio"
    ),
    AdmiteSufijo: Yup.string().required(
      "El campo de admite sufijo es obligatorio"
    ),
    OrdenGrupo: Yup.string().required(
      "El campo de orden de grupo es obligatorio"
    ),
    ListSufijo: Yup.array()
      .min(1, "Es obligatorio digitar por lo menos un sufijo para el grupo")
      .required("Es obligatorio digitar por lo menos un sufijo para el grupo"),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaGrupo) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    var checkbox1 = document.getElementById("EstadoGrupo");
    checkbox1.checked = true;
  }, []);

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

          <p className={styles.title}>Crear grupo</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateGroup)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Nombre Grupo</label>
                      <input
                        {...register("NombreGrupo")}
                        name="NombreGrupo"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NombreGrupo?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Estado del grupo
                      </label>
                      <input id="EstadoGrupo" type="checkbox" />
                    </div>
                  </div>

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Orden Grupo</label>
                      <input
                        {...register("OrdenGrupo")}
                        name="OrdenGrupo"
                        maxLength="100"
                        type="number"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.OrdenGrupo?.message}
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
                        max="5000"
                        type="number"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.AlertaHoras?.message}
                      </div>
                    </div>
                  </div>

                  <ListSufij
                    ListSufijo={ListSufijo}
                    setListSufijo={setListSufijo}
                  ></ListSufij>
                  <div className={styles.invalid_feedback}>
                    {errors.ListSufijo?.message}
                  </div>
                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                          setCheckindividual(setValue);
                          setValue("ListSufijo",ListSufijo);
                        }}
                        className={styles.btn_send}
                      >
                        Guardar Grupo
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
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ComponentGroup;
