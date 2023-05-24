import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
function ComponentCreateResult({
  ListGroup,
  ListPruebas,
  valueGroupchange,
  setvalueGroupchange,
}) {
  console.log(ListPruebas);
  const validationSchema = Yup.object().shape({
    Codigo_prueba: Yup.string().required("Campo prueba obligatorio"),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
    Codigo_resultado_preliminar_1: Yup.string(),
    Codigo_resultado_preliminar_2: Yup.string(),
    Codigo_resultado_preliminar_3: Yup.string(),
    Codigo_resultado_final: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setError, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;

  return (
    <section>
      <p>Crear seguimiento</p>
      <form>
        <div>
          <label>Grupo</label>
          <select
            {...register("GrupoSticker")}
            name="GrupoSticker"
            id="GrupoSticker"
            value={valueGroupchange}
            onChange={(e) => {
              setvalueGroupchange(e.target.value);
            }}
          >
            <option disabled value="">
              Seleccione una opción
            </option>
            {ListGroup.map((data, index) => (
              <option key={index} value={data.Id_grupo}>
                {data.NOMBRE_GRUPO}
              </option>
            ))}
          </select>
          <div>{errors.GrupoSticker?.message}</div>
        </div>
        <div>
          <label>Prueba</label>
          <select
            {...register("Codigo_prueba")}
            name="Codigo_prueba"
            id="Codigo_prueba"
          >
            <option disabled value="">
              Seleccione una opción
            </option>
            {ListPruebas.map((data, index) => (
              <option key={index} value={data.COD_PRUEBA}>
                {`${data.CODIGO_VISIBLE} - ${data.NOMBRE_PRUEBA}`}
              </option>
            ))}
          </select>
          <div>{errors.Codigo_resultado_preliminar_1?.message}</div>
        </div>

        <div>
          <label>Prueba</label>
          <select
            {...register("Codigo_prueba")}
            name="Codigo_prueba"
            id="Codigo_prueba"
          >
            <option disabled value="">
              Seleccione una opción
            </option>
            {ListPruebas.map((data, index) => (
              <option key={index} value={data.COD_PRUEBA}>
                {`${data.CODIGO_VISIBLE} - ${data.NOMBRE_PRUEBA}`}
              </option>
            ))}
          </select>
          <div>{errors.Codigo_prueba?.message}</div>
        </div>

        <div>
          <label>Resultado preliminar 1</label>
          <select
            {...register("Codigo_prueba")}
            name="Codigo_prueba"
            id="Codigo_prueba"
          >
            <option disabled value="">
              Seleccione una opción
            </option>
            {ListPruebas.map((data, index) => (
              <option key={index} value={data.COD_PRUEBA}>
                {`${data.CODIGO_VISIBLE} - ${data.NOMBRE_PRUEBA}`}
              </option>
            ))}
          </select>
          <div>{errors.Codigo_prueba?.message}</div>
        </div>
      </form>
    </section>
  );
}

export default ComponentCreateResult;
