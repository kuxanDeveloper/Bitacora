import React from "react";
import styleLogin from "../../styles/Login.module.css";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onSubmit } from "../Tools/Security";
import * as Yup from "yup";

function Logincomponents() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Campo de usuario obligatorio"),
    pass: Yup.string().required("Campo de contraseña obligatorio"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <div className={styleLogin.login}>
      <figure className={styleLogin.logo}>
        <ImageOptimize
          Values={{
            src: "/img/Becton_Dickinson_logo256x256.png",
            alt: "Login BD",
            title: "",
            classValue: styleLogin.logo_img,
            width: 256,
            height: 256,
            style: {},
          }}
        />
      </figure>

      <div className={styleLogin.login_container}>
        <div className={styleLogin.container_cotent}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styleLogin.inputs_container}>
              <label className={styleLogin.input_label}>Usuario</label>
              <input
                type="text"
                name="username"
                {...register("username")}
                className={`${styleLogin.username} ${
                  errors.username ? styleLogin.is_invalid : ""
                }`}
                placeholder="usuario@dominio.co ó CI"
              />
              <div className={styleLogin.invalid_feedback}>
                {errors.username?.message}
              </div>

              <label className={styleLogin.input_label}>Contraseña</label>
              <input
                {...register("pass")}
                name="pass"
                type="password"
                className={`${styleLogin.userpassword} ${
                  errors.password ? styleLogin.is_invalid : ""
                }`}
                placeholder="Contraseña"
              />
              <div className={styleLogin.invalid_feedback}>
                {errors.password?.message}
              </div>
            </div>

            <Link
              href={"/account/ForgotPassword"}
              className={styleLogin.recovery_password}
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <Link
              href={"/Privacypolicy"}
              target="_blank"
              rel="noopener noreferrer"
              className={styleLogin.politics}
            >
              Políticas de privacidad y condiciones de uso
            </Link>

            <div className={styleLogin.btn_container}>
              {!formState.isSubmitting && (
                <button
                  className={`${styleLogin.btn_login} ${
                    formState.isSubmitting && styleLogin.disabled
                  }`}
                >
                  {" "}
                  {/*${styleLogin.disabled}*/}
                  Ingresar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Logincomponents;
