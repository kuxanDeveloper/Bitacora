import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import {setCheckUsuEstado} from "../../Tools/functiones"
import { onSubmitCreateUser } from "../../Tools/crudUsers";
import styles from "../../../styles/CreateNotes.module.scss";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import Swal from "sweetalert2";

function ComponentGroup({ InforSampleDetails, InforSampleTips }) {
  const validarEsquemaGrupo = Yup.object().shape({
    Email: Yup.string().required("El campo Email del usuario es obligatorio"),
    NumIdentidad: Yup.string().required(
      "El campo Numero de identidad del usuario es obligatorio"
    ),
    TipoIdentidad: Yup.string().required(
      "Es obligatorio seleccionar el tipo de documento del usuario"
    ),
    Nombres: Yup.string().required(
      "El campo Nombres del usuario es obligatorio"
    ),
    Apellidos: Yup.string().required(
      "El campo Apellidos del usuario es obligatorio"
    ),
    Password: Yup.string().required(
      "El campo Contraseña del usuario es obligatorio"
    ),
    Celular: Yup.string().notRequired(),
    Rol: Yup.string().required(
      "Seleccionar un rol del sistema para el usuario es obligatorio"
    ),
    Telefono: Yup.string().notRequired(),
    Extencion: Yup.string().notRequired(),
    EstadoUsuario: Yup.string().required(
      "Es obligatorio seleccionar el estado del usuario"
    ),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaGrupo) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    console.log(InforSampleDetails);
    var estdUsuario = document.getElementById("EstadoUsu");

    estdUsuario.checked = true;
  }, []);

  function VerificarDatos(set) {
    var pass = document.getElementById("Password");
    var pass2 = document.getElementById("ComprobarPassword");

    if(pass.value != pass2.value)
    {
        Swal.fire({
            title: "¡Advertencia!",
            text: "Las contraseñas no coinciden, por favor verifique la informacion",
            icon: "warning",
            confirmButtonText: "Cerrar",
          });
          set("Password","");

    }
    else
    {
        set("Password",pass.value);
    }
  }

  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/Users/IndexUsers",
                hash: "Normal",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear usuario</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateUser)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Email Usuario{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input
                        {...register("Email")}
                        name="Email"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Email?.message}
                      </div>
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Estado del usuario{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input id="EstadoUsu" type="checkbox" />

                      {/* <!-- ---- --> */}
                    </div>
                  </div>

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Tipo de Identificacion{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <select defaultValue={''}
                        {...register("TipoIdentidad")}
                        name="TipoIdentidad"
                        className={styles.group_input}
                      >
                        <option value={''}>
                          Seleccione un tipo de identificacion
                        </option>
                        {InforSampleTips != null && InforSampleTips != undefined
                          ? InforSampleTips.map((data, index) => (
                              <option
                                value={data.Id_Tipo_Identificacion}
                                key={index}
                              >
                                {data.Descripcion}
                              </option>
                            ))
                          : ""}
                      </select>

                      <div className={styles.invalid_feedback}>
                        {errors.TipoIdentidad?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Numero de Identidad{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input
                        {...register("NumIdentidad")}
                        name="NumIdentidad"
                        maxLength="100"
                        type="number"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NumIdentidad?.message}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Nombres{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input
                        {...register("Nombres")}
                        name="Nombres"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Nombres?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Apellidos{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input
                        {...register("Apellidos")}
                        name="Apellidos"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Apellidos?.message}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Rol del usuario{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <select defaultValue={''}
                        {...register("Rol")}
                        name="Rol"
                        className={styles.group_input}
                      >
                        <option value={''}>Seleccione un rol</option>
                        {InforSampleDetails != null &&
                        InforSampleDetails != undefined
                          ? InforSampleDetails.map((data, index) => (
                              <option value={data.Id} key={index}>
                                {data.Name}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div className={styles.invalid_feedback}>
                        {errors.Rol?.message}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Contraseña{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input

                        name="Password"
                        id="Password"
                        maxLength="100"
                        type="password"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Password?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Repita la contraseña{" "}
                        <span className={stylesCrud.asteriscoRojo}>*</span>
                      </label>
                      <input
                        name="ComprobarPassword"
                        id="ComprobarPassword"
                        maxLength="100"
                        type="password"
                        min="0"
                        className={styles.group_input}
                      />
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Celular</label>
                      <input
                        {...register("Celular")}
                        name="Celular"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Celular?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Telefono Fijo
                      </label>
                      <input
                        {...register("Telefono")}
                        name="Telefono"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Telefono?.message}
                      </div>
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Extencion</label>
                      <input
                        {...register("Extencion")}
                        name="Extencion"
                        maxLength="100"
                        type="text"
                        min="0"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Extencion?.message}
                      </div>
                    </div>
                  </div>

                  {/* <div className={styles.btn_container_send}>
                    <Link
                    href="#"
                      onClick={() => {
                        
                      }}
                      className={styles.btn_send}
                    >
                      Guardar Usuario
                    </Link>
                  </div> */}

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                            setCheckUsuEstado(setValue);
                            VerificarDatos(setValue);
                        }}
                        className={styles.btn_send}
                        id="botonGuardar"
                      >
                        Guardar Usuario
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Configuration/Users/IndexUsers"
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
