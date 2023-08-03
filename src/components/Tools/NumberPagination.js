import React from "react";
import { UpdateObject } from "./functiones";
import Link from "next/link";
import styles from "../../styles/Paginacion.module.scss";

function NumberPagination({
  valorMap,
  page,
  index,
  pathname,
  hash,
  queryArme,
}) {
  let pageUnica = parseInt(page);
  if (parseInt(valorMap) === pageUnica) {
    return (
      <li>
        <a key={index} className={styles.active}>
          {valorMap}
        </a>
      </li>
    );
  } else {
    if (valorMap === "...") {
      return (
        <li>
          <a key={index}>{valorMap}</a>
        </li>
      );
    } else {
      return (
        <li        
        >
          <Link
            key={index}
            className={page == valorMap ? styles.active : ""}
            href={{
              pathname: pathname,
              query: UpdateObject(queryArme, valorMap),
              hash: hash != null && hash != undefined ? hash : "",
            }}
          >
            {valorMap}
          </Link>
        </li>
      );
    }
  }
}

export default NumberPagination;
