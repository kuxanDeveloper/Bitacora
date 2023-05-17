import React, { useState } from "react";
import { FilterQuerySearch, ClearFilter } from "../Tools/functiones";
import filterStyles from "../../styles/filters.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Filters({
  CasosActivo_Inactivos,
  isActiveGroup,
  id,
  ListadoUsuariosRegistrados,
  ListadoGrupoActivo,
  NumSticker,
  dateAdmision,
  result,
  URS,
}) {
  const router = useRouter();

  const [GruopValue, setGruopValue] = useState(
    id != undefined && id != null ? id : ""
  );

  const [NumeroSticker, setNumeroSticker] = useState(
    NumSticker != undefined && NumSticker != null ? NumSticker : ""
  );
  const [FechaIngreso, setFechaIngreso] = useState(
    dateAdmision != undefined && dateAdmision != null ? dateAdmision : ""
  );
  const [Resultado, setResultado] = useState(
    result != undefined && result != null ? result : ""
  );
  const [UserRegisterStiker, setUserRegisterStiker] = useState(
    URS != undefined && URS != null ? URS : ""
  );

  return (
    <>
      <div className={filterStyles.filters}>
        <form action="">
          <div className={filterStyles.filters_container}>
            <div className={filterStyles.inputs_container}>
              {isActiveGroup ? (
                <select
                  defaultValue={GruopValue}
                  name="ListGroup"
                  onClick={(e) => setGruopValue(e.target.value)}
                  className={filterStyles.filter_input_w100}
                >
                  <option value="" selected disabled>
                    Seleccione un grupo
                  </option>
                  {ListadoGrupoActivo != null
                    ? ListadoGrupoActivo.map((data, index) => (
                        <option key={index} value={data.Id_grupo}>
                          {`${data.NOMBRE_GRUPO}`}
                        </option>
                      ))
                    : ""}
                </select>
              ) : (
                ""
              )}

              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="N° de sticker"
                onChange={(e) => {
                  setNumeroSticker(e.target.value);
                }}
                value={NumeroSticker}
              />
              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="Fecha de ingreso"
                onChange={(e) => {
                  setFechaIngreso(e.target.value);
                }}
                value={FechaIngreso}
              />
              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="Resultado"
                onChange={(e) => {
                  setResultado(e.target.value);
                }}
                value={Resultado}
              />
              <select
                defaultValue={UserRegisterStiker}
                name="UserRegisterSticker"
                onClick={(e) => setUserRegisterStiker(e.target.value)}
                className={filterStyles.filter_input}
              >
                <option value="" selected disabled>
                  Seleccione un valor
                </option>
                {ListadoUsuariosRegistrados != null
                  ? ListadoUsuariosRegistrados.map((data, index) => (
                      <option key={index} value={data.Id}>
                        {`${data.Numero_de_Identidad} - ${data.Email}`}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className={filterStyles.buttons_container}>
              <button
                onClick={(e) =>
                  FilterQuerySearch(
                    e,
                    router,
                    GruopValue,
                    NumeroSticker,
                    FechaIngreso,
                    Resultado,
                    UserRegisterStiker,
                    CasosActivo_Inactivos
                  )
                }
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
              </button>
              <Link
                href={"/Sample/Create"}
                className={filterStyles.add_followup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-square-plus"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
              </Link>
              <button
                onClick={(e) => ClearFilter(e, router, GruopValue)}
                className={filterStyles.search}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#fff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
                  <path d="M18 13.3l-6.3 -6.3" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
