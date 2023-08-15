import React, {useEffect} from "react";
import filterStyles from "../../styles/filters.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  FilterSearchCsvTables
} from "../Tools/functiones";
import "dayjs/locale/en-gb";
  import dayjs from "dayjs";

function FilterCsv({
  FechaIngreso,
  FechaIngresoFinal,
  setFechaIngreso,
  setFechaFinal,
  setvalueGrupo,
  valueGrupo,
  InforGroupCombo
}) {
  const router = useRouter();

  useEffect(() => {
    let cmbGrup = document.getElementById("cmbGrupo");
    cmbGrup.value = valueGrupo;
  }, [InforGroupCombo]);

  useEffect(() => {
    let cmb2 = document.getElementById("FechaFin");
    if(FechaIngresoFinal == "" || FechaIngresoFinal == null)
    {      
      const fchFn = formatDatefn();
      cmb2.value = fchFn;
      setFechaFinal(fchFn);
    }
    else
    {
      cmb2.value = FechaIngresoFinal;
    }
    
  }, [FechaIngresoFinal]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  useEffect(() => {
    let cmb1 = document.getElementById("FechaIni");
    if(FechaIngreso == "" || FechaIngreso == null)
    {   
      const fchIn = formatDate();   
      cmb1.value = fchIn;
      setFechaIngreso(fchIn);
    }
    else
    {
      cmb1.value = FechaIngreso;
    }
    
  }, [FechaIngreso]);


  

  function formatDatefn(date = new Date()) {
    
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth(+1) + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  function formatDate(date = new Date()) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth(-1)),
      padTo2Digits(date.getDate()),
    ].join('-');
  }


  return (
    <>
      <div className={filterStyles.filters}>
        <form>
          <div className={filterStyles.filters_container}>
            <div className={filterStyles.inputs_container}>
              <input
                type="date"
                id="FechaIni"
                title="Fecha Inicial de busqueda"
                className={filterStyles.filter_input}
                placeholder="Seleccione una fecha inicial"
                onChange={(e) => {
                  setFechaIngreso(e.target.value);
                }}
              />
              <input
                type="date"
                id="FechaFin"
                title="Fecha Final de busqueda"
                className={filterStyles.filter_input}
                placeholder="Seleccione una fecha final"
                onChange={(e) => {
                  setFechaFinal(e.target.value);
                }}
              />
              
              <select
              defaultValue={valueGrupo}
              name="cmbGrupo"
              id="cmbGrupo"
              onClick={(e) => setvalueGrupo(e.target.value)}
              className={filterStyles.filter_input}
            >
              <option value="">Seleccione un grupo</option>
              {InforGroupCombo != null
                ? InforGroupCombo.map((data, index) => (
                    <option key={index} value={data.Id_grupo}>
                      {data.NOMBRE_GRUPO}
                    </option>
                  ))
                : ""}
            </select> 
              
              
            </div>
            <div className={filterStyles.buttons_container}>
              <Link
                href={""}
                onClick={(e) => {
                  e.preventDefault();
                  FilterSearchCsvTables(
                    e,
                    router,
                    FechaIngreso,
                    FechaIngresoFinal,
                    valueGrupo
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FilterCsv;
