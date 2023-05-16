import React from "react";
import Styles from "@/styles/Recovery.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { OnSubmitForward } from "../Tools/Security";
import ImageOptimize from "../Tools/ImageOptimize";
import * as Yup from "yup";
import Link from "next/link";
function Recovery() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Campo de usuario obligatorio"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <div className={Styles.recovery}>
        <figure className={Styles.logo}>
          <ImageOptimize
            Values={{
              src: "/img/Becton_Dickinson_logo64x64.png",
              alt: "Login BD",
              title: "",
              classValue: Styles.logo_img,
              width: 64,
              height: 64,
              style: {},
            }}
          />
          {/* <img
            src="https://www.bd.com/content/dam/bdcom-assets/en/en-us/images/graphic/icon/header-bd-logo.svg"
            alt=""
            className={Styles.logo_img}
          /> */}
        </figure>
        <form onSubmit={handleSubmit(OnSubmitForward)}>
          <div className={Styles.recovery_container}>
            <div className={Styles.container_cotent}>
              <div className={Styles.inputs_container}>
                <label className={Styles.input_label}>Usuario</label>
                <input
                  id="usernameForward"
                  name="username"
                  {...register("username")}
                  type="text"
                  className={`${Styles.username}  ${
                    errors.username ? Styles.is_invalid : ""
                  }`}
                />
              </div>

              <div className={Styles.invalid_feedback}>
                {errors.username?.message}
              </div>

              <div className={Styles.btn_container}>
                <button
                  disabled={formState.isSubmitting}
                  className={Styles.btn_recovery}
                >
                  Recuperar Contraseña
                </button>
                <Link href={"/Account/Login"} className={Styles.btn_recovery}>
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Recovery;
