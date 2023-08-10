import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import {
  setCheckUsuEstado,
  SearchValueArrayListGroupCheck,
  AddListSetValue,
  SelectAllCheck,
} from "../../Tools/functiones";
import { onSubmitCreateEdit } from "../../Tools/crudUsers";
import styles from "../../../styles/CreateNotes.module.scss";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";
import Image from "next/image";
function ComponentGroup({
  InforSampleDetails,
  InforSampleTips,
  InforSampleInfoUser,
  id_usu,
  GroupxUserandList,
}) {
  const validarEsquemaGrupo = Yup.object().shape({
    Id_Usuario: Yup.string().required(
      "El id del usuario a editar es obligatorio"
    ),
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
    Celular: Yup.string().notRequired(),
    Rol: Yup.string().required(
      "Seleccionar un rol del sistema para el usuario es obligatorio"
    ),
    Telefono: Yup.string().notRequired(),
    Extencion: Yup.string().notRequired(),
    EstadoUsuario: Yup.string().required(
      "Es obligatorio seleccionar el estado del usuario"
    ),

    ListGroupArray: Yup.array()
      .min(
        1,
        "Debe seleccionar uno o varios grupo perteneciente al usuario por favor"
      )
      .required("Debe seleccionar uno o varios grupo perteneciente al usuario"),
  });
  const formOptions = { resolver: yupResolver(validarEsquemaGrupo) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  console.log(GroupxUserandList);
  useEffect(() => {
    if (
      InforSampleInfoUser != null &&
      InforSampleInfoUser != undefined &&
      InforSampleInfoUser.length > 0
    ) {
      var checkbox1 = document.getElementById("EstadoUsu");
      checkbox1.checked =
        InforSampleInfoUser[0].LockoutEnabled == false
          ? null
          : InforSampleInfoUser[0].LockoutEnabled;
    }
  }, [InforSampleInfoUser]);

  useEffect(() => {
    if (
      InforSampleInfoUser != null &&
      InforSampleInfoUser != undefined &&
      InforSampleInfoUser.length > 0
    ) {
      var select = document.getElementById("Rol");
      select.value = InforSampleInfoUser[0].Id_rol;
      setValue("Rol", InforSampleInfoUser[0].Id_rol);
    }

    if (
      InforSampleInfoUser != null &&
      InforSampleInfoUser != undefined &&
      InforSampleInfoUser.length > 0
    ) {
      var select = document.getElementById("TipoIdentidad");
      select.value = InforSampleInfoUser[0].Id_tipo_documento;
      setValue("TipoIdentidad", InforSampleInfoUser[0].Id_tipo_documento);
    }
  }, [InforSampleTips, InforSampleDetails, InforSampleInfoUser]);

  useEffect(() => {
    if (
      GroupxUserandList.ListadoinfoGrupo != undefined &&
      GroupxUserandList.ListadoinfoGrupo != null
    ) {
      setTimeout(() => {
        GroupxUserandList.ListadoinfoGrupo.map((data) => {
          let ValorSearch = GroupxUserandList.ListGrupoxUser.some(
            (a) => a.Id_grupo == data.Id_grupo
          );
          if (ValorSearch) {
            let idValue = document.getElementById(`IdGroup_${data.Id_grupo}`);
            if (idValue != null) {
              idValue.checked = ValorSearch;
            }
          }
        });
      }, 500);
    }
  }, [GroupxUserandList.ListadoinfoGrupo]);

  return (
    <>
      <section className={styles.create_note}>
        <Image
          src="/img/bg_image.jpg"
          width={1920}
          height={1080}
          alt="a"
          className={styles.background_img}
        />
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/Users/IndexUsers",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar usuario</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateEdit)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}
                  {InforSampleInfoUser != null &&
                  InforSampleInfoUser != undefined
                    ? InforSampleInfoUser.map((data, index) => (
                        <div key={index}>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Email Usuario{" "}
                                <span className={stylesCrud.asteriscoRojo}>
                                  *
                                </span>
                              </label>
                              <input
                                {...register("Email")}
                                name="Email"
                                maxLength="100"
                                type="text"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.Email}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Email?.message}
                              </div>
                            </div>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado del usuario{" "}
                                <span className={stylesCrud.asteriscoRojo}>
                                  *
                                </span>
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
                                <span className={stylesCrud.asteriscoRojo}>
                                  *
                                </span>
                              </label>
                              <select
                                {...register("TipoIdentidad")}
                                name="TipoIdentidad"
                                id="TipoIdentidad"
                                className={styles.group_input}
                              >
                                <option value={""}>
                                  Seleccione un tipo de identificacion
                                </option>
                                {InforSampleTips != null &&
                                InforSampleTips != undefined
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
                                <span className={stylesCrud.asteriscoRojo}>
                                  *
                                </span>
                              </label>
                              <input
                                {...register("NumIdentidad")}
                                name="NumIdentidad"
                                maxLength="100"
                                type="number"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.Numero_de_Identidad}
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
                                <span className={stylesCrud.asteriscoRojo}>
                                  *
                                </span>
                              </label>
                              <input
                                {...register("Nombres")}
                                name="Nombres"
                                maxLength="100"
                                type="text"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.Nombres}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Nombres?.message}
                              </div>
                            </div>

                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Apellidos{" "}
                                <span className={stylesCrud.asteriscoRojo}>
                                  *
                                </span>
                              </label>
                              <input
                                {...register("Apellidos")}
                                name="Apellidos"
                                maxLength="100"
                                type="text"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.Apellidos}
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
                                <span className={stylesCrud.asteriscoRojo}>
                                  *
                                </span>
                              </label>
                              <select
                                {...register("Rol")}
                                name="Rol"
                                id="Rol"
                                className={styles.group_input}
                              >
                                <option value={""}>Seleccione un rol</option>
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

                          <div className={styles.form_group}>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Celular
                              </label>
                              <input
                                {...register("Celular")}
                                name="Celular"
                                maxLength="100"
                                type="text"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.PhoneNumber}
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
                                defaultValue={data.TELEFONO}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Telefono?.message}
                              </div>
                            </div>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Extencion
                              </label>
                              <input
                                {...register("Extencion")}
                                name="Extencion"
                                maxLength="100"
                                type="text"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.EXTENSION}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Extencion?.message}
                              </div>
                            </div>
                          </div>

                          <div className={styles.form_group}>
                            <table className={styleTable.tableStyle}>
                              <thead>
                                <tr>
                                  <th colSpan={2}>
                                    <input
                                      id={`allCheckbox`}
                                      type="checkbox"
                                      onClick={() =>
                                        SelectAllCheck(
                                          "allCheckbox",
                                          "inputCheckoutCrearUser"
                                        )
                                      }
                                    />
                                    Selec. Todos
                                  </th>
                                </tr>
                              </thead>
                              <thead>
                                <tr>
                                  <th
                                    style={{ width: "25%" }}
                                    className={styles.group_title}
                                  >
                                    Seleccionable
                                  </th>
                                  <th style={{ width: "75%" }}>Grupo</th>
                                </tr>
                              </thead>
                              <tbody>
                                {GroupxUserandList.ListadoinfoGrupo !=
                                  undefined &&
                                GroupxUserandList.ListadoinfoGrupo != null ? (
                                  GroupxUserandList.ListadoinfoGrupo.map(
                                    (data, index) => (
                                      <tr key={index}>
                                        <td
                                          className={
                                            styleTable.textCenterColumn
                                          }
                                        >
                                          <input
                                            id={`IdGroup_${data.Id_grupo}`}
                                            type="checkbox"
                                            name="inputCheckoutCrearUser"
                                            value={data.Id_grupo}
                                          />
                                        </td>
                                        <td
                                          className={
                                            styleTable.textCenterColumn
                                          }
                                        >
                                          {data.NOMBRE_GRUPO}
                                        </td>
                                      </tr>
                                    )
                                  )
                                ) : (
                                  <tr>
                                    <td colSpan={2}>Cargando...</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className={styles.invalid_feedback}>
                            {errors.ListGroupArray?.message}
                          </div>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  AddListSetValue(
                                    setValue,
                                    "inputCheckoutCrearUser"
                                  );
                                  setCheckUsuEstado(setValue);
                                  setValue("Id_Usuario", id_usu);
                                }}
                                className={styles.btn_send}
                                id="botonGuardar"
                              >
                                Editar Usuario
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname: "/Configuration/Users/IndexUsers",
                                query: { page: "1" },
                              }}
                            >
                              Cancelar
                            </Link>
                          </div>
                        </div>
                      ))
                    : ""}
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
