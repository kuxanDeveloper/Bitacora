import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateNote } from "../../Tools/CRUD";
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
    <section>
      <p>Crear nota de seguimiento</p>
      <div>Número de sticker : {id}</div>
      <form onSubmit={handleSubmit(onSubmitCreateNote)}>
        <div>
          <label>Observación</label>
          <textarea
            rows="5"
            cols="50"
            name="Observaciones_detalle"
            maxLength={1500}
            {...register("Observaciones_detalle")}
          ></textarea>
          <div>{errors.Observaciones_detalle?.message}</div>
        </div>
        {!formState.isSubmitting && (
          <button onClick={() => setValue("NumSticker", id)}>
            Guardar cambios
          </button>
        )}
        <Link
          href={{
            pathname: "/Sample/FullDetails/[id]",
            query: { id: id },
            hash: "Notas",
          }}
        >
          Cancelar
        </Link>
      </form>
    </section>
  );
}

export default ComponentsCreateNote;
