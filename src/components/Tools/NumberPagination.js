import React from "react";
import { UpdateObject } from "./functiones";
import Link from "next/link";
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
      <a key={index} className="active">
        {valorMap}
      </a>
    );
  } else {
    if (valorMap === "...") {
      return <a key={index}>{valorMap}</a>;
    } else {
      return (
        <Link
          key={index}
          href={{
            pathname: pathname,
            query: UpdateObject(queryArme, valorMap),
            hash: hash != null && hash != undefined ? hash : "",
          }}
        >
          {valorMap}
        </Link>
      );
    }
  }
}

export default NumberPagination;
