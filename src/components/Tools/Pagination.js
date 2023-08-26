import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Paginacion.module.scss";
import { FormatPage, UpdateObject } from "./functiones";
import NumberPagination from "./NumberPagination";
function Pagination({ TotalPage, page, pathname, queryArme, hash, CountPage }) {
  let pageObject = [];
  if (page !== null && page !== "" && page != undefined) {
    pageObject = FormatPage(TotalPage, page, CountPage);
  }
  useEffect(() => {
    if(page == 1)
    {
      document.getElementById("Anterior").style.pointerEvents = "none";
      document.getElementById("Inicio").style.pointerEvents = "none";
    }

    const maxpag = pageObject.final;
    if(maxpag == page)
    {
      document.getElementById("Siguiente").style.pointerEvents = "none";
      document.getElementById("Ultima").style.pointerEvents = "none";      
    }
  },[pageObject]);

  return (
    <>
      {/* pagination */}

      <div className={styles.Centrarpag}>
        <ul className={styles.pagination}>
          <li>
            <Link
              title="Inicio"
              id="Inicio"
              className={`pagination-blog-btn-start ${
                parseInt(page) === 1 ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, 1),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              <b>{"<<"}</b>
            </Link>
          </li>
          <li>
            <Link
              title="Anterior"
              id="Anterior"              
              className={`pagination-blog-btn-before ${
                parseInt(page) === 1 ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, parseInt(page) - 1),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              <b>{"<"}</b>
            </Link>
          </li>
          {pageObject.array.map((data, index) => {
            return (
              <NumberPagination
                key={index}
                valorMap={data}
                page={page}
                index={index}
                pathname={pathname}
                hash={hash}
                CountPage={CountPage}
                queryArme={queryArme}
              />
            );
          })}
          <li>
            <Link
            title="Siguiente"
            id="Siguiente"
              className={`pagination-blog-btn ${
                pageObject.final === parseInt(page) ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, parseInt(page) + 1),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              <b>{">"}</b>
            </Link>
          </li>
          <li>
            <Link
            title="Última"
            id="Ultima"
              className={`pagination-blog-btn-latest ${
                pageObject.final === parseInt(page) ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, pageObject.final),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              <b>{">>"}</b>
            </Link>
          </li>
        </ul>
      </div>

      
    </>
  );
}

export default Pagination;
