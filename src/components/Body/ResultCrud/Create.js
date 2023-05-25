import React from "react";
import { onclickPruebaTarget } from "../../Tools/functiones";
import { onSubmitCreateResult } from "../../Tools/CRUD";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
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
    <section>
      <p>Crear seguimiento</p>
      <form onSubmit={handleSubmit(onSubmitCreateResult)}>
        {/* <div>
          <label>Grupo : {group}</label>

        </div> */}

        <div>
          <label>Prueba</label>
          <select
            {...register("Codigo_prueba")}
            name="Codigo_prueba"
            id="Codigo_prueba"
            defaultValue={""}
            onChange={(e) => {
              setvaluePruebachange(e.target.value);
              onclickPruebaTarget();
            }}
          >
            <option disabled value="">
              Seleccione una opción
            </option>
            {ListPruebas != undefined && ListPruebas != null
              ? ListPruebas.map((data, index) => (
                  <option key={index} value={data.COD_PRUEBA}>
                    {`${data.CODIGO_VISIBLE} - ${data.NOMBRE_PRUEBA}`}
                  </option>
                ))
              : ""}
          </select>
          <div>{errors.Codigo_prueba?.message}</div>
        </div>

        <div>
          <label>Resultado preliminar 1</label>
          <select
            {...register("Codigo_resultado_preliminar_1")}
            name="Codigo_resultado_preliminar_1"
            id="Codigo_resultado_preliminar_1"
            defaultValue={""}
          >
            <option disabled value="">
              Seleccione una opción
            </option>
            {ListResultados.map((data, index) => (
              <option key={index} value={data.COD_PLANTILLA}>
                {`${data.RESULTADO_PLANTILLA}`}
              </option>
            ))}
          </select>
          <div>{errors.Codigo_resultado_preliminar_1?.message}</div>
        </div>

        <div>
          <label>Resultado preliminar 2</label>
          <select
            {...register("Codigo_resultado_preliminar_2")}
            name="Codigo_resultado_preliminar_2"
            id="Codigo_resultado_preliminar_2"
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

        <div>
          <label>Resultado preliminar 3</label>
          <select
            {...register("Codigo_resultado_preliminar_3")}
            name="Codigo_resultado_preliminar_3"
            id="Codigo_resultado_preliminar_3"
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
          <div>{errors.Codigo_resultado_preliminar_3?.message}</div>
        </div>

        <div>
          <label>Resultado final</label>
          <select
            {...register("Codigo_resultado_final")}
            name="Codigo_resultado_final"
            id="Codigo_resultado_final"
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
        <button onClick={() => setValue("NumSticker", id)}>
          guardar cambios
        </button>
        <Link
          href={{
            pathname: "/Sample/FullDetails/[id]",
            query: { id: id },
            hash: "Pruebas",
          }}
        >
          Cancelar
        </Link>
      </form>
    </section>
  );
}

export default ComponentCreateResult;
