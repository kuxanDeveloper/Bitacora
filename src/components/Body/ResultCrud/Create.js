import React from "react";
import { onclickPruebaTarget } from "../../Tools/functiones";
import { onSubmitCreateResult } from "../../Tools/CRUD";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import styles from "../../../styles/Results.module.scss";
function ComponentCreateResult({
  ListPruebas,
  ListResultados,
  setvaluePruebachange,
  id,
  group,
}) {
  const validationSchema = Yup.object().shape({
    Codigo_prueba: Yup.string().required("Campo prueba obligatorio"),
    Codigo_resultado_preliminar_1: Yup.string(),
    Codigo_resultado_preliminar_2: Yup.string(),
    Codigo_resultado_preliminar_3: Yup.string(),
    Codigo_resultado_final: Yup.string(),
    NumSticker: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.Create_Result}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <a href="" className={styles.back_btn}>
              Volver{" "}
            </a>
          </div>

          <p className={styles.title}>Crear seguimiento</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateResult)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Prueba</label>

                      <select
                        {...register("Codigo_prueba")}
                        name="Codigo_prueba"
                        id="Codigo_prueba"
                        defaultValue={""}
                        className={styles.group_input}
                        onChange={(e) => {
                          setvaluePruebachange(e.target.value);
                          onclickPruebaTarget();
                        }}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListPruebas != null && ListPruebas != undefined
                          ? ListPruebas.map((data, index) => (
                              <option key={index} value={data.COD_PRUEBA}>
                                {`${data.CODIGO_VISIBLE} - ${data.NOMBRE_PRUEBA}`}
                              </option>
                            ))
                          : ""}
                      </select>

                      <div>{errors.Codigo_prueba?.message}</div>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Resultado preliminar 1
                      </label>
                      <select
                        {...register("Codigo_resultado_preliminar_1")}
                        name="Codigo_resultado_preliminar_1"
                        id="Codigo_resultado_preliminar_1"
                        className={styles.group_input}
                        defaultValue={""}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListResultados != null && ListResultados != undefined
                          ? ListResultados.map((data, index) => (
                              <option key={index} value={data.COD_PLANTILLA}>
                                {`${data.RESULTADO_PLANTILLA}`}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div>{errors.Codigo_resultado_preliminar_1?.message}</div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Resultado preliminar 2
                      </label>
                      <select
                        {...register("Codigo_resultado_preliminar_2")}
                        name="Codigo_resultado_preliminar_2"
                        id="Codigo_resultado_preliminar_2"
                        className={styles.input_group}
                        defaultValue={""}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListResultados != null && ListResultados != undefined
                          ? ListResultados.map((data, index) => (
                              <option key={index} value={data.COD_PLANTILLA}>
                                {`${data.RESULTADO_PLANTILLA}`}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div>{errors.Codigo_resultado_preliminar_2?.message}</div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Resultado preliminar 3
                      </label>
                      <select
                        {...register("Codigo_resultado_preliminar_3")}
                        name="Codigo_resultado_preliminar_3"
                        id="Codigo_resultado_preliminar_3"
                        defaultValue={""}
                        className={styles.input_group}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListResultados != null && ListResultados != undefined
                          ? ListResultados.map((data, index) => (
                              <option key={index} value={data.COD_PLANTILLA}>
                                {`${data.RESULTADO_PLANTILLA}`}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div>{errors.Codigo_resultado_preliminar_3?.message}</div>
                    </div>
                  </div>

                  {/* <!-- form group --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Resultado final
                      </label>
                      <select
                        {...register("Codigo_resultado_final")}
                        name="Codigo_resultado_final"
                        id="Codigo_resultado_final"
                        className={styles.input_group}
                        defaultValue={""}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListResultados != null && ListResultados != undefined
                          ? ListResultados.map((data, index) => (
                              <option key={index} value={data.COD_PLANTILLA}>
                                {`${data.RESULTADO_PLANTILLA}`}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div>{errors.Codigo_resultado_final?.message}</div>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    <button
                      className={styles.btn_send}
                      onClick={() => setValue("NumSticker", id)}
                    >
                      guardar cambios
                    </button>
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Sample/FullDetails/[id]",
                        query: { id: id },
                        hash: "Pruebas",
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

export default ComponentCreateResult;
