import React, { useState, useEffect } from "react";
import {
  FilterSearchTrazaTables,
  ClearFilterTrazaBitacora,
} from "../../Tools/functiones";
import filterStyles from "../../../styles/filters.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Filters({
  ListadoUsuariosRegistrados,
  FechaIngreso,
  FechaIngresoFinal,
  UserRegisterStiker,
  Tipotabla,
  setFechaIngreso,
  setFechaFinal,
  setUserRegisterStiker,
  setTipo_tabla,
  MesAnio,
  setMesAnio,
}) {
  const router = useRouter();

  return (
    <>
      <div className={filterStyles.filters}>
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
                defaultValue={MesAnio}
                name="MesAni"
                onClick={(e) => setMesAnio(e.target.value)}
                className={filterStyles.filter_input}
              >
                <option value="" disabled>
                  Seleccione un mes para el filtro
                </option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
              <select
                defaultValue={UserRegisterStiker}
                name="UserRegisterSticker"
                onClick={(e) => setUserRegisterStiker(e.target.value)}
                className={filterStyles.filter_input}
              >
                <option value="">Seleccione un usuario</option>
                {ListadoUsuariosRegistrados != null &&
                ListadoUsuariosRegistrados != undefined
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
                <option value="">Seleccione un tipo</option>
                <option value="LOGIN USUARIOS">LOGIN USUARIOS</option>
                <option value="GRUPO">GRUPOS</option>
                <option value="ESTATUS">ESTATUS</option>
                <option value="REPORTES">REPORTES</option>
                <option value="OPCION">OPCION</option>
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
                    Tipotabla,
                    MesAnio
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
