import React from "react";
import styles from "../../../styles/Results.module.scss";
import * as Yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onSubmitEditResult } from "../../Tools/CRUD";
import {
  onclickPruebaTarget,
  onclickPlantillaTarget,
} from "../../Tools/functiones";
function ComponentEditResult({
  InfoResul,
  ListPruebas,
  ListResultados,
  ListOptiones,
  setvaluePruebachange,
  setvaluePlantillachange,
  id,
  name_group,
  sticker,
}) {
  const validationSchema = Yup.object().shape({
    Codigo_resultado_bitacora: Yup.string(),
    Codigo_prueba: Yup.string().required("Campo prueba obligatorio"),
    Codigo_resultado_preliminar_1: Yup.string().required(
      "Campo seguimiento obligatorio"
    ),
    Codigo_opcion: Yup.string().notRequired(),
    COD_BITACORA: Yup.number().notRequired(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.Create_Result}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Sample/FullDetails/[id]",
                query: {
                  id:
                    InfoResul != null && InfoResul != undefined
                      ? InfoResul.length > 0
                        ? InfoResul[0].CODIGO_BITACORA
                        : ""
                      : "",
                },
                hash: "Pruebas",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar prueba</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitEditResult)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Número de sticker :
                      </label>
                      <p>{sticker}</p>
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Grupo :</label>
                      <p>{name_group}</p>
                    </div>
                  </div>

                  {InfoResul != null && InfoResul != undefined
                    ? InfoResul.length > 0
                      ? InfoResul.map((data, index) => (
                          <div key={index}>
                            <div className={styles.form_group}>
                              <div className={styles.input_group}>
                                <label className={styles.group_title}>
                                  Prueba
                                </label>
                                <select
                                  {...register("Codigo_prueba")}
                                  name="Codigo_prueba"
                                  id="Codigo_prueba"
                                  defaultValue={data.CODIGO_PRUEBA}
                                  className={styles.group_input}
                                  onChange={(e) => {
                                    setvaluePruebachange(e.target.value);
                                    onclickPruebaTarget(
                                      setvaluePlantillachange,
                                      setValue
                                    );
                                  }}
                                >
                                  <option disabled value="">
                                    Seleccione una opción
                                  </option>
                                  {ListPruebas != null &&
                                  ListPruebas != undefined
                                    ? ListPruebas.map((data, index) => (
                                        <option
                                          key={index}
                                          value={data.COD_PRUEBA}
                                        >
                                          {`${data.NOMBRE_PRUEBA}`}
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
                                  Seguimiento
                                </label>
                                <select
                                  {...register("Codigo_resultado_preliminar_1")}
                                  name="Codigo_resultado_preliminar_1"
                                  id="Codigo_resultado_preliminar_1"
                                  className={styles.group_input}
                                  defaultValue={data.CODIGO_RESULTADO_PLANILLA}
                                  onChange={(e) => {
                                    setvaluePlantillachange(e.target.value);
                                    onclickPlantillaTarget(setValue);
                                  }}
                                >
                                  <option disabled value="">
                                    Seleccione un seguimiento
                                  </option>
                                  {ListResultados != null &&
                                  ListResultados != undefined
                                    ? ListResultados.map((data, index) => (
                                        <option
                                          key={index}
                                          value={data.COD_PLANTILLA}
                                        >
                                          {`${data.RESULTADO_PLANTILLA}`}
                                        </option>
                                      ))
                                    : ""}
                                </select>
                                <div>
                                  {
                                    errors.Codigo_resultado_preliminar_1
                                      ?.message
                                  }
                                </div>
                              </div>
                            </div>

                            {
                              (ListOptiones =
                                !undefined && ListOptiones != null ? (
                                  ListOptiones.length > 0 ? (
                                    <div className={styles.form_group}>
                                      <div className={styles.input_group}>
                                        <label className={styles.group_title}>
                                          Opciones
                                        </label>
                                        <select
                                          {...register("Codigo_opcion")}
                                          name="Codigo_opcion"
                                          id="Codigo_opcion"
                                          className={styles.input_group}
                                          defaultValue={
                                            data.CODIGO_OPCIONES != null
                                              ? data.CODIGO_OPCIONES
                                              : ""
                                          }
                                        >
                                          <option disabled value="">
                                            Seleccione una opción
                                          </option>
                                          {ListOptiones != null &&
                                          ListOptiones != undefined
                                            ? ListOptiones.map(
                                                (data, index) => (
                                                  <option
                                                    key={index}
                                                    value={data.COD_OPCIONES}
                                                  >
                                                    {`${data.OPCION_DESCRIPCION}`}
                                                  </option>
                                                )
                                              )
                                            : ""}
                                        </select>
                                        <div>
                                          {errors.Codigo_opcion?.message}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  ""
                                ))
                            }
                          </div>
                        ))
                      : "Cargando..."
                    : "Cargando..."}

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        className={styles.btn_send}
                        onClick={() => {
                          setValue("Codigo_resultado_bitacora", id);
                          setValue(
                            "COD_BITACORA",
                            InfoResul != null && InfoResul != undefined
                              ? InfoResul.length > 0
                                ? InfoResul[0].CODIGO_BITACORA
                                : ""
                              : ""
                          );
                        }}
                      >
                        guardar cambios
                      </button>
                    )}

                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Sample/FullDetails/[id]",
                        query: {
                          id:
                            InfoResul != null && InfoResul != undefined
                              ? InfoResul.length > 0
                                ? InfoResul[0].CODIGO_BITACORA
                                : ""
                              : "",
                        },
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

export default ComponentEditResult;
