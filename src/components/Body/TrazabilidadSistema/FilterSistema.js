import React, { useState, useEffect } from "react";
import {
    FilterSearchTrazaTables,
    ClearFilterTrazaBitacora
} from "../../Tools/functiones";
import filterStyles from "../../../styles/filters.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Filters({
  ListadoUsuariosRegistrados,
  dateAdmision,
  dateFinal,
  URS,
  Tipo_tabla
}) {
  const router = useRouter();

  const [FechaIngreso, setFechaIngreso] = useState(
    dateAdmision != undefined && dateAdmision != null ? dateAdmision : ""
  );

  const [FechaIngresoFinal, setFechaFinal] = useState(
    dateFinal != undefined && dateFinal != null ? dateFinal : ""
  );
  
  const [UserRegisterStiker, setUserRegisterStiker] = useState(
    URS != undefined && URS != null ? URS : ""
  );

  const [Tipotabla, setTipo_tabla] = useState(
    Tipo_tabla != undefined && Tipo_tabla != null ? Tipo_tabla : ""
  );
  
  return (
    <>
      <div
        className={filterStyles.filters}
      >
        
        <form>
          <div className={filterStyles.filters_container}>
            <div className={filterStyles.inputs_container}>
              
              <input
                type="date"
                title="Fecha Inicial de busqueda"
                className={filterStyles.filter_input}
                placeholder="Seleccione una fecha inicial"
                onChange={(e) => {
                  setFechaIngreso(e.target.value);
                }}
                value={FechaIngreso}
              />
              <input
                type="date"
                title="Fecha Final de busqueda"
                className={filterStyles.filter_input}
                placeholder="Seleccione una fecha final"
                onChange={(e) => {
                    setFechaFinal(e.target.value);
                }}
                value={FechaIngresoFinal}
              />
              <select
                defaultValue={UserRegisterStiker}
                name="UserRegisterSticker"
                onClick={(e) => setUserRegisterStiker(e.target.value)}
                className={filterStyles.filter_input}
              >
                <option value="">
                  Seleccione un usuario
                </option>
                {ListadoUsuariosRegistrados != null
                  ? ListadoUsuariosRegistrados.map((data, index) => (
                      <option key={index} value={data.Id}>
                        {`${data.Numero_de_Identidad} - ${data.Email}`}
                      </option>
                    ))
                  : ""}
              </select>
              <select
                defaultValue={UserRegisterStiker}
                name="TipoTable"
                onClick={(e) => setTipo_tabla(e.target.value)}
                className={filterStyles.filter_input}
              >
                <option value="">
                  Seleccione un tipo
                </option>
                <option value="LOGIN USUARIOS">
                LOGIN USUARIOS
                </option>
                <option value="GRUPO">
                GRUPOS
                </option>
                <option value="ESTATUS">
                ESTATUS
                </option>
                <option value="REPORTES">
                REPORTES
                </option>
                <option value="OPCION">
                OPCION
                </option>
              </select>
            </div>
            <div className={filterStyles.buttons_container}>
              <Link
                href={""}
                onClick={(e) => {
                  e.preventDefault();
                  FilterSearchTrazaTables(
                    e,
                    router,
                    FechaIngreso,
                    FechaIngresoFinal,
                    UserRegisterStiker,
                    Tipotabla
                  );
                }}
                className={filterStyles.search}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </Link>

              <Link
                href={""}
                onClick={(e) => {
                  e.preventDefault();
                  ClearFilterTrazaBitacora(e, router);
                }}
                className={filterStyles.search}
                title="Limpiar filtros de búsqueda"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
                  <path d="M18 13.3l-6.3 -6.3" />
                </svg>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
