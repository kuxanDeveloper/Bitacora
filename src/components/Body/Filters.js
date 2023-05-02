import React from "react";
import filterStyles from "../../styles/filters.module.css";

export default function Filters() {
  return (
    <>
      <div className={filterStyles.filters}>
        <form action="">
          <div className={filterStyles.filters_container}>
            <div className={filterStyles.inputs_container}>
              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="N° de sticker"
              />
              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="Fecha de ingreso"
              />
              <input type="text" className={filterStyles.filter_input} placeholder="Resultado" />
              <input
                type="text"
                className={filterStyles.filter_input}
                placeholder="Usuario ingreso sticker"
              />
            </div>
            <div className={filterStyles.buttons_container}>
              <button className={filterStyles.search}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </button>
              <button className={filterStyles.add_followup}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-square-plus"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
