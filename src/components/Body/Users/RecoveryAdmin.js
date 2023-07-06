import React from "react";
import styles from "../../../styles/CreateNotes.module.scss";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { ChangeForgotPasswordAdmin } from "../../../pages/api/Users/[id]";
function ComponentRecoveryAdmin({ id }) {
  const validationSchema = Yup.object().shape({
    NewPassword: Yup.string().required(
      "El campo Nueva contraseña es obligatorio"
    ),
    ConfirmNewPassword: Yup.string()
      .required("El campo Confirmar nueva contraseña es obligatorio")
      .oneOf([Yup.ref("NewPassword"), null], "Las contraseñas no coinciden."),
    Iduser: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={"/Configuration/Users/IndexUsers"}
              className={styles.back_btn}
            >
              Volver
            </Link>
          </div>

          <p className={styles.title}>Cambiar contraseña</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(ChangeForgotPasswordAdmin)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Nueva contraseña
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input
                        {...register("NewPassword")}
                        name="NewPassword"
                        id="NewPassword"
                        maxLength="100"
                        type="password"
                        placeholder="Nueva contraseña"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NewPassword?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Confirmar nueva contraseña
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input
                        {...register("ConfirmNewPassword")}
                        name="ConfirmNewPassword"
                        id="ConfirmNewPassword"
                        maxLength="100"
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.ConfirmNewPassword?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        className={styles.btn_send}
                        onClick={() => {
                          setValue("Iduser", id);
                        }}
                      >
                        Guardar
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={"/Configuration/Users/IndexUsers"}
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

export default ComponentRecoveryAdmin;
