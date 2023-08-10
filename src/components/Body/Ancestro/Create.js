import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateAncestro } from "../../Tools/crudAncestro";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckAncestro } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ListGrupos from "./ListGrupos";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentGroup({ InforOptionsSelc }) {
  const [ListGruposAnc, setListGruposAnc] = useState([]);

  const validarEsquemaGrupo = Yup.object().shape({
    nombre_Ancestro: Yup.string().required(
      "El campo nombre del grupo principal es obligatorio"
    ),
    Estado_Ancestro: Yup.string().required(
      "El campo de estado del grupo principal es obligatorio"
    ),
    Orden_ancestro: Yup.string().required(
      "El campo de orden del grupo principal es obligatorio"
    ),
    Lst_grupos: Yup.array().notRequired(),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaGrupo) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    var checkbox1 = document.getElementById("EstadoAncestro");
    checkbox1.checked = true;
  }, []);

  return (
    <>
      <section className={styles.create_note}>
      <ImageOptimize
          Values={{
            src: "/img/bg_image.jpg",
            alt: "Fondo BackGround",
            title: "Fondo BackGround",
            classValue: styles.background_img,
            width: 1920,
            height: 1080,
          }}
        ></ImageOptimize>

        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/Ancestros/IndexAncestros",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Grupo Home</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateAncestro)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Nombre Grupo Home
                      </label>
                      <input
                        {...register("nombre_Ancestro")}
                        name="nombre_Ancestro"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.nombre_Ancestro?.message}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Estado del Grupo Home
                      </label>
                      <input id="EstadoAncestro" type="checkbox" />
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        N° Orden del Grupo Home
                      </label>
                      <input
                        {...register("Orden_ancestro")}
                        name="Orden_ancestro"
                        maxLength="100"
                        type="number"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Orden_ancestro?.message}
                      </div>
                    </div>
                  </div>

                  <ListGrupos
                    ListGruposAnc={ListGruposAnc}
                    setListGruposAnc={setListGruposAnc}
                    InforOptionsSelc={InforOptionsSelc}
                  ></ListGrupos>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                          setCheckAncestro(setValue);
                          setValue("Lst_grupos", ListGruposAnc);
                        }}
                        className={styles.btn_send}
                      >
                        Guardar
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Configuration/Ancestros/IndexAncestros",
                        query: { page: "1" },
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
