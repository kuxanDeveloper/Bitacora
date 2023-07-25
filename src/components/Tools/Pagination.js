import React from "react";
import Link from "next/link";
import { FormatPage, UpdateObject } from "./functiones";
import NumberPagination from "./NumberPagination"
function Pagination({ TotalPage, page, pathname, queryArme, hash, CountPage }) {
  let pageObject = [];
  if (page !== null && page !== "" && page != undefined) {
    pageObject = FormatPage(TotalPage, page, CountPage);
  }
  return (
    <>
      {/* pagination */}

      <div className="row">
        <div className="row blogs-pagination">
          <div className=" my-3 d-flex justify-content-center pagination-container">
            <Link
              className={`pagination-blog-btn-start ${
                parseInt(page) === 1 ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, 1),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              Inicio
            </Link>
            <Link
              className={`pagination-blog-btn-before ${
                parseInt(page) === 1 ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, parseInt(page) - 1),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              Anterior
            </Link>

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

            <Link
              className={`pagination-blog-btn ${
                pageObject.final === parseInt(page) ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, parseInt(page) + 1),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              Siguiente
            </Link>

            <Link
              className={`pagination-blog-btn-latest ${
                pageObject.final === parseInt(page) ? "disabled" : ""
              }`}
              href={{
                pathname: pathname,
                query: UpdateObject(queryArme, pageObject.final),
                hash: hash != undefined && hash != null ? hash : "",
              }}
            >
              Última
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
