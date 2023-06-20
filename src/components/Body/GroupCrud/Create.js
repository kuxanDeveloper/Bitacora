import React from "react";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreateGroup } from "../../Tools/crudGroup";
import styles from "../../../styles/CreateNotes.module.scss";
import {
    setCheckindividual
  } from "../../Tools/functiones";

function ComponentGroup()
{

    const validarEsquemaGrupo = Yup.object().shape({
        NombreGrupo: Yup.string().required("Campo nombre del grupo es obligatorio"),
        EstadoGrupo: Yup.string().required("Campo de estado del grupo es obligatorio")
    });
    
    const formOptions = {resolver: yupResolver(validarEsquemaGrupo)};
    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors } = formState;
    
    return (
    <>
<section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Sample/FullDetails/[id]",
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
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NombreGrupo?.message}
                      </div>
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title_check}>
                        Estado
                      </label>
                      <input
                        id="EstadoGrupo"
                        type="checkbox"
                      />

                      {/* <!-- ---- --> */}
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button   
                      onClick={() => {
                        setCheckindividual(setValue);                        
                      }}                     
                        className={styles.btn_send}
                      >
                        Guardar Grupo
                      </button>
                    )}

                    {/* <button
                      id="buttonSubmitUnico"
                      style={{ display: "none" }}
                    ></button> */}
                    <Link
                      href={{
                        pathname: "/[id]",
                        hash: "Cactive#UserInter#OverallSample",
                      }}
                      className={styles.btn_cancel}
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